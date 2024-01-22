import { createContext, type PropsWithChildren, useContext, useState } from 'react';

const ProfileIdContext = createContext<{
  profileId: number | null;
  setProfileId: (profileId: number | null) => void;
} | null>(null);

function ProfileIdProvider({ children }: PropsWithChildren) {
  const [profileId, setProfileId] = useState<number | null>(null);

  return <ProfileIdContext.Provider value={{ profileId, setProfileId }}>{children}</ProfileIdContext.Provider>;
}

export default ProfileIdProvider;

export const useProfileId = () => {
  const context = useContext(ProfileIdContext);

  if (!context) {
    throw new Error('ProfileIdProvider not found');
  }

  return {
    profileId: context.profileId,
    setProfileId: context.setProfileId,
  };
};
