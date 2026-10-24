import { type PropsWithChildren } from 'react';
import apiInstance from '@/apis/instance.api';
import WithdrawalPage from '@/pages/mypage/withdrawal/index.page';
import { getWithdrawalErrorReason } from '@/pages/mypage/withdrawal/withdrawal.utils';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { AxiosError, type AxiosResponse } from 'axios';

import '@testing-library/jest-dom';

const mockReplace = jest.fn();
const mockTriggerSnackBar = jest.fn();

jest.mock('next/router', () => ({
  useRouter: () => ({ replace: mockReplace, push: jest.fn(), back: jest.fn() }),
}));

jest.mock('@/components/SnackBar/SnackBarProvider', () => ({
  useSnackBar: () => ({ triggerSnackBar: mockTriggerSnackBar }),
}));

jest.mock('@/components/Header/Header', () => ({
  __esModule: true,
  default: () => null,
}));

jest.mock('@/apis/instance.api', () => ({
  __esModule: true,
  default: { delete: jest.fn() },
}));

const mockDelete = apiInstance.delete as jest.Mock;

const createHttpError = (status: number) =>
  new AxiosError('Request failed', 'ERR_BAD_REQUEST', undefined, undefined, { status } as AxiosResponse);

const createNetworkError = () => new AxiosError('Network Error', AxiosError.ERR_NETWORK);

const renderPage = () => {
  const queryClient = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
  const wrapper = ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  return render(<WithdrawalPage />, { wrapper });
};

const getWithdrawalButton = () => screen.getByRole('button', { name: '탈퇴하기' });

describe('회원탈퇴 화면', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.setItem('accessToken', 'access');
    localStorage.setItem('refreshToken', 'refresh');
  });

  test('성공하면 토큰을 지우고 로그인 화면으로 보낸다', async () => {
    mockDelete.mockResolvedValueOnce({ data: null });
    renderPage();

    fireEvent.click(getWithdrawalButton());

    await waitFor(() => expect(mockReplace).toHaveBeenCalledWith('/auth/login'));
    expect(mockTriggerSnackBar).toHaveBeenCalledWith({ message: '회원탈퇴 했습니다.' });
    expect(localStorage.getItem('accessToken')).toBeNull();
  });

  test('401이면 로그인 만료를 안내하고, 다시 로그인한 뒤 탈퇴 화면으로 돌아오게 보낸다', async () => {
    mockDelete.mockRejectedValueOnce(createHttpError(401));
    renderPage();

    fireEvent.click(getWithdrawalButton());

    await waitFor(() => expect(mockReplace).toHaveBeenCalledWith('/auth/login?redirect=/mypage/withdrawal'));
    expect(mockTriggerSnackBar).toHaveBeenCalledWith({
      message: '로그인이 만료됐어요. 다시 로그인한 뒤 탈퇴해 주세요.',
    });
    expect(localStorage.getItem('accessToken')).toBeNull();
  });

  test('요청 중에는 버튼을 막아 연속 탭에도 요청이 한 번만 나간다', async () => {
    let resolveRequest: (value: unknown) => void = () => {};
    mockDelete.mockReturnValueOnce(new Promise((resolve) => (resolveRequest = resolve)));
    renderPage();

    fireEvent.click(getWithdrawalButton());
    fireEvent.click(getWithdrawalButton());

    await waitFor(() => expect(getWithdrawalButton()).toBeDisabled());
    fireEvent.click(getWithdrawalButton());
    expect(mockDelete).toHaveBeenCalledTimes(1);

    resolveRequest({ data: null });
    await waitFor(() => expect(mockReplace).toHaveBeenCalledWith('/auth/login'));
  });

  test('404(이미 탈퇴됨)는 성공으로 처리해 로그아웃 흐름으로 보낸다', async () => {
    mockDelete.mockRejectedValueOnce(createHttpError(404));
    renderPage();

    fireEvent.click(getWithdrawalButton());

    await waitFor(() => expect(mockReplace).toHaveBeenCalledWith('/auth/login'));
    expect(mockTriggerSnackBar).toHaveBeenCalledWith({ message: '회원탈퇴 했습니다.' });
    expect(localStorage.getItem('accessToken')).toBeNull();
  });

  test('네트워크 오류는 연결 확인 문구를 띄우고, 화면에 머물러 다시 시도할 수 있다', async () => {
    mockDelete.mockRejectedValueOnce(createNetworkError()).mockResolvedValueOnce({ data: null });
    renderPage();

    fireEvent.click(getWithdrawalButton());

    await waitFor(() =>
      expect(mockTriggerSnackBar).toHaveBeenCalledWith({
        message: '네트워크 연결이 불안정해요. 연결을 확인한 뒤 다시 시도해 주세요.',
      }),
    );
    expect(mockReplace).not.toHaveBeenCalled();
    expect(localStorage.getItem('accessToken')).toBe('access');

    await waitFor(() => expect(getWithdrawalButton()).not.toBeDisabled());
    fireEvent.click(getWithdrawalButton());
    await waitFor(() => expect(mockReplace).toHaveBeenCalledWith('/auth/login'));
  });

  test('그 밖의 서버 오류는 일반 실패 문구를 띄운다', async () => {
    mockDelete.mockRejectedValueOnce(createHttpError(500));
    renderPage();

    fireEvent.click(getWithdrawalButton());

    await waitFor(() =>
      expect(mockTriggerSnackBar).toHaveBeenCalledWith({
        message: '회원탈퇴에 실패했어요. 잠시 후 다시 시도해 주세요.',
      }),
    );
    expect(mockReplace).not.toHaveBeenCalled();
  });
});

describe('getWithdrawalErrorReason', () => {
  test.each([
    ['401', createHttpError(401), 'AUTH_EXPIRED'],
    ['404', createHttpError(404), 'ALREADY_WITHDRAWN'],
    ['500', createHttpError(500), 'UNKNOWN'],
    ['네트워크 오류', createNetworkError(), 'NETWORK'],
    ['타임아웃', new AxiosError('timeout', AxiosError.ECONNABORTED), 'NETWORK'],
    ['axios 외 오류', new Error('boom'), 'UNKNOWN'],
  ])('%s → %s', (_label, error, expected) => {
    expect(getWithdrawalErrorReason(error)).toBe(expected);
  });
});
