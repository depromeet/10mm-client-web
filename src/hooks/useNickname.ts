import { useState } from 'react';
import { useCheckNickname } from '@/apis/member';

const useNickname = (initialNickName?: string) => {
  const { mutate } = useCheckNickname();
  const [nickname, setNickname] = useState(initialNickName || '');
  const [massageState, setMassageState] = useState({
    errorMsg: '',
    validMsg: '',
  });

  const handleDuplicateCheck = () => {
    mutate(
      { nickname },
      {
        onSuccess: () => {
          setMassageState({
            errorMsg: '',
            validMsg: '사용 가능한 닉네임입니다.',
          });
        },
        onError: () => {
          setMassageState({
            errorMsg: '중복된 닉네임입니다. 다른 닉네임으로 변경해주세요.',
            validMsg: '',
          });
        },
      },
    );
  };

  const handleNicknameChange = (value: string) => {
    setNickname(value);

    if (!validateNickname(value)) {
      setMassageState({
        errorMsg: '2~20자 이내의 한글, 영문, 숫자로만 입력해 주세요.',
        validMsg: '',
      });
      return;
    }
    setMassageState({
      errorMsg: '',
      validMsg: '',
    });
  };

  return {
    nickname,
    massageState,
    handleNicknameChange,
    handleDuplicateCheck,
  };
};

const validateNickname = (value: string) => {
  const regex = /^[가-힣a-zA-Z0-9]{2,20}$/;
  const hasInvalidCharacter = /^[\wㄱ-ㅎㅏ-ㅣ가-힣]*$/.test(value);
  return regex.test(value) && hasInvalidCharacter;
};

export default useNickname;
