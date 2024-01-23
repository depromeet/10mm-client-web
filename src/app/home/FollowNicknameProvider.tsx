import { createContext, type PropsWithChildren, useContext, useState } from 'react';

const FollowNicknameContext = createContext<{
  followNickname: string | null;
  setFollowNickname: (followNickname: string | null) => void;
} | null>(null);

function FollowNicknameProvider({ children }: PropsWithChildren) {
  const [followNickname, setFollowNickname] = useState<string | null>(null);

  return (
    <FollowNicknameContext.Provider value={{ followNickname, setFollowNickname }}>
      {children}
    </FollowNicknameContext.Provider>
  );
}

export default FollowNicknameProvider;

export const useFollowNickname = () => {
  const context = useContext(FollowNicknameContext);

  if (!context) {
    throw new Error('FollowNicknameProvider not found');
  }

  return {
    followNickname: context.followNickname,
    setFollowNickname: context.setFollowNickname,
  };
};
