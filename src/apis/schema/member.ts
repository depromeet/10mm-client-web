/**
 * @description 멤버 스키마
 * @param memberId - 멤버 UUID
 * @param name - 멤버 이름
 * @param nickname - 멤버 닉네임
 * @param profileUrl - 프로필 이미지 URL
 */
export interface MemberType {
  memberId: string;
  name: string;
  nickname: string;
  profileUrl: string;
}
