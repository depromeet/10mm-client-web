'use client';

import { useGetMembersMe } from '@/apis/member';
import ProfileContent from '@/app/mypage/ProfileContent';

function Profile() {
  const { data } = useGetMembersMe();
  if (!data) return <ProfileContent nickname={''} profileUrl={null} />;
  const { nickname, profileUrl } = data;
  return <ProfileContent nickname={nickname} profileUrl={profileUrl} />;
}

export default Profile;
