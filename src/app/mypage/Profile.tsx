'use client';

import { useGetMembersMe } from '@/apis/member';
import ProfileContent from '@/app/mypage/ProfileContent';

function Profile() {
  const { data } = useGetMembersMe();
  const { nickname, profileImageUrl } = data;
  return <ProfileContent nickname={nickname} profileUrl={profileImageUrl} />;
}

export default Profile;
