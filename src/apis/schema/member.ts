/**
 * @description 멤버 스키마
 * @param memberId - 멤버 UUID
 * @param name - 멤버 이름
 * @param nickname - 멤버 닉네임
 * @param profileUrl - 프로필 이미지 URL
 */
export interface MemberType {
  memberId: number;
  name: string;
  nickname: string;
  profileImageUrl?: string;
  imageFileExtension: FileExtension;
  memberStatus: string;
  memberRole: string;
  memberVisibility: string;
  username: string;
}


export type FollowStatusType = 'FOLLOWING' | 'FOLLOWED_BY_ME' | 'NOT_FOLLOWING';

export enum FileExtension {
  JPEG = 'JPEG',
  JPG = 'JPG',
  PNG = 'PNG',
}

