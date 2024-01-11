import { useRef, useState } from 'react';
import STOPWATCH_APIS from '@/apis/record';
import { IMAGE_File_Extension, type ImageFileExtensionType } from '@/apis/schema/record';
import axios from 'axios';

export const useImage = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const imageFile = useRef<File>();

  const uploadImageChange = (files: FileList) => {
    const file = files[0];
    if (!file) throw new Error('file not found');

    setImagePreview(URL.createObjectURL(file));
    imageFile.current = file;
  };

  return { imagePreview, imageFile: imageFile.current, uploadImageChange };
};

export const useUploadImage = () => {
  const onSubmitImage = async (missionRecordId: string, imageFile: File) => {
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
      const presignedUrl = await getPresignedUrl(missionRecordId, imageFileExtension);
      await axios.put(presignedUrl, imageFile, { headers: { 'Content-Type': imageType } });
      return { isSuccess: true, imageFileExtension };
    } catch (error) {
      throw error;
    }
  };

  return { onSubmitImage };
};

const checkImageType = (type?: string): ImageFileExtensionType | false => {
  if (!type) return false;
  if (type in IMAGE_File_Extension) return IMAGE_File_Extension[type];
  return false;
};

const getPresignedUrl = async (
  missionRecordId: string,
  imageFileExtension: ImageFileExtensionType,
): Promise<string> => {
  const res = await STOPWATCH_APIS.uploadUrl({ missionRecordId, imageFileExtension });
  const presignedUrl = res.data.presignedUrl;
  return presignedUrl;
};
