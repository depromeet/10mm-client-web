export interface UploadBaseRequest {
  imageFileExtension: ImageFileExtensionType;
}

export type ImageFileExtensionType = 'JPG' | 'JPEG' | 'PNG';

export const IMAGE_File_Extension: Record<string, ImageFileExtensionType> = {
  'image/jpeg': 'JPEG',
  'image/png': 'PNG',
  'image/jpg': 'JPG',
};

export interface UploadUrlBaseResponse {
  presignedUrl: string;
}
