import { createContext, type PropsWithChildren, useContext, useState } from 'react';

const FollowIdContext = createContext<{
  followId: number | null;
  setFollowId: (followId: number | null) => void;
} | null>(null);

function FollowIdProvider({ children }: PropsWithChildren) {
  const [followId, setFollowId] = useState<number | null>(null);

  return <FollowIdContext.Provider value={{ followId, setFollowId }}>{children}</FollowIdContext.Provider>;
}

export default FollowIdProvider;

export const useFollowId = () => {
  const context = useContext(FollowIdContext);

  if (!context) {
    throw new Error('followIdProvider not found');
  }

  return {
    followId: context.followId,
    setFollowId: context.setFollowId,
  };
};
