import Input from '@/components/Input/Input';
import { type Meta, type StoryObj } from '@storybook/react';

const meta = {
  title: 'Component/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NormalInput: Story = {
  args: {
    variant: 'normal',
    name: '미션명',
    placeholder: '미션명을 입력하세요',
    value: '운동',
    description: '디스크립션 영역입니다',
    required: false,
    maxLength: 20,
    errorMsg: '',
  },
  argTypes: {
    title: { table: { disable: true } },
    onSelect: { table: { disable: true } },
    onChange: { table: { disable: true } },
    selected: { table: { disable: true } },
    list: { table: { disable: true } },
    variant: { table: { disable: true } },
  },
};

export const Dropdown: Story = {
  args: {
    variant: 'drop-down',
    title: '카테고리',
    required: true,
    list: [
      {
        label: '운동',
        value: '운동',
        imgUrl: '/images/category/exercise.png',
      },
      {
        label: '공부',
        value: '공부',
        imgUrl: '/images/category/study.png',
      },
      {
        label: '글 읽기',
        value: '글 읽기',
        imgUrl: '/images/category/reading.png',
      },
      {
        label: '글 쓰기',
        value: '글 쓰기',
        imgUrl: '/images/category/writing.png',
      },
      {
        label: '프로젝트 / 작업',
        value: '프로젝트 / 작업',
        imgUrl: '/images/category/laptop.png',
      },
      {
        label: '영상 보기 / 팟캐스트 듣기',
        value: '영상 보기 / 팟캐스트 듣기',
        imgUrl: '/images/category/play-button.png',
      },
      {
        label: '기타',
        value: '기타',
        imgUrl: '/images/category/exercise.png',
      },
    ],
    selected: {
      label: '운동',
      value: '운동',
      imgUrl: '/images/category/exercise.png',
    },
    onSelect: (item) => alert(item.label),
    placeholder: '카테고리를 선택해주세요.',
  },
};

export const NormalButtonInput: Story = {
  args: {
    onTextButtonClick: () => alert('버튼 클릭'),
    variant: 'normal-button',
    name: '미션명',
    placeholder: '미션명을 입력하세요',
    value: '운동',
    description: '디스크립션 영역입니다',
    buttonText: '확인',
    required: false,
    maxLength: 20,
    errorMsg: '',
    buttonDisabeld: true,
  },
  argTypes: {
    title: { table: { disable: true } },
    onSelect: { table: { disable: true } },
    onChange: { table: { disable: true } },
    selected: { table: { disable: true } },
    list: { table: { disable: true } },
    variant: { table: { disable: true } },
  },
};
