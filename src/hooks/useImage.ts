import { useRef, useState } from 'react';
import RECORD_API from '@/apis/record';
import { IMAGE_File_Extension, type ImageFileExtensionType } from '@/apis/schema/upload';
import axios from 'axios';

export const getUrlImageType = (url?: string) => {
  if (!url) return '';
  const imageType = url.split('/').pop();
  if (!imageType) return '';
  return imageType.replace('.', '/');
};

export const useImage = (initialImagePreviewUrl?: string) => {
  const [imagePreview, setImagePreview] = useState<string | null>(initialImagePreviewUrl ?? null);
  const imageFile = useRef<File>();

  const uploadImageChange = (files: FileList) => {
    const file = files[0];
    if (!file) throw new Error('file not found');

    setImagePreview(URL.createObjectURL(file));
    imageFile.current = file;
  };

  return { imagePreview, imageFile: imageFile.current, uploadImageChange };
};

export const uploadImageToServer = async (missionRecordId: string, imageFile: File) => {
  if (!missionRecordId) {
    throw new Error('missionRecordId is required');
  }
  if (!imageFile) {
    throw new Error('Image file Not Found');
  }

  const imageType = imageFile.type;
  const imageFileExtension = checkImageType(imageType);

  if (!imageFileExtension) {
    throw new Error('Image Type Not Found');
  }

  try {
    const res = await RECORD_API.uploadUrl({ missionRecordId, imageFileExtension });
    const presignedUrl = res.data.presignedUrl;

    if (!presignedUrl) throw new Error('Presigned Url not found');

    await axios.put(presignedUrl, imageFile, { headers: { 'Content-Type': imageType } });
    return { imageFileExtension };
  } catch (error) {
    throw error;
  }
};

export const checkImageType = (type?: string): ImageFileExtensionType | false => {
  if (!type) return false;
  if (type in IMAGE_File_Extension) return IMAGE_File_Extension[type];
  return false;
};
