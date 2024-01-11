import { type ChangeEvent, useRef, useState } from 'react';
import STOPWATCH_APIS from '@/apis/record';
import { EVENT_LOG_CATEGORY, EVENT_LOG_NAME } from '@/constants/eventLog';
import { eventLogger } from '@/utils';
import axios from 'axios';

export const useImage = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const imageFile = useRef<File>();

  const handleUploadChange = async ({ target: { files } }: ChangeEvent<HTMLInputElement>) => {
    eventLogger.logEvent(EVENT_LOG_NAME.CERTIFICATION.CLICK_IMAGE_PREVIEW, EVENT_LOG_CATEGORY.CERTIFICATION);
    const file = files?.[0];
    if (!file) {
      return;
    }

    // TODO: 이미지 확장자 가져오기,
    setImagePreview(URL.createObjectURL(file));
    imageFile.current = file;
  };

  const getPresignedUrl = async (missionRecordId: string): Promise<string> => {
    const res = await STOPWATCH_APIS.uploadUrl({ missionRecordId, imageFileExtension: 'PNG' });
    const presignedUrl = res.data.presignedUrl;
    return presignedUrl;
  };

  const onSubmitImage = async (missionRecordId: string) => {
    if (!imageFile.current) {
      throw new Error('Image file Not Found');
    }
    const imageType = imageFile.current.type;
    const imageFileExtension = checkImageType(imageType) as string;

    try {
      const presignedUrl = await getPresignedUrl(missionRecordId);
      const res = await axios.put(presignedUrl, imageFile.current, {
        headers: {
          'Content-Type': 'image/png',
        },
      });
      console.log('res: ', res);
      return { isSuccess: true, imageFileExtension };
    } catch (error) {
      throw error;
    }
  };

  return { handleUploadChange, imagePreview, onSubmitImage };
};

const checkImageType = (type?: string) => {
  //  JPEG, JPG, PNG
  const IMAGE_TYPE: Record<string, string> = {
    'image/jpeg': 'JPEG',
    'image/png': 'PNG',
    'image/jpg': 'JPG',
  };
  if (!type) return false;
  if (type in IMAGE_TYPE) return IMAGE_TYPE[type];
  return false;
};
