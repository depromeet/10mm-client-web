import { type ChangeEvent, useRef, useState } from 'react';
import { useUploadUrl } from '@/apis/record';
import { EVENT_LOG_CATEGORY, EVENT_LOG_NAME } from '@/constants/eventLog';
import { eventLogger } from '@/utils';

export const useImage = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const imageFile = useRef<File>();
  console.log('imageFile: ', imageFile);

  const { mutate } = useUploadUrl({
    onSuccess: (res) => {
      const presignedUrl = res.presignedUrl;
      console.log('presignedUrl: ', presignedUrl);
      console.log(res);
    },
    onError: (err) => console.error(err),
  });

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

  const getPresignedUrl = async (missionRecordId: string) => {
    // TODO : error handling
    if (!imageFile.current) return;

    const type = checkImageType(imageFile.current.type);
    if (!type) return;

    console.log('type: ', type);
    console.log('missionRecordId: ', missionRecordId);
    mutate({ missionRecordId, imageFileExtension: 'JPG' });
  };

  const uploadUrl = (missionRecordId: string) => {
    getPresignedUrl(missionRecordId);
  };

  // TODO:
  function uploadImageToS3(url: string, file: File) {
    axios
      .put(url, file)
      .then((response) => console.log(response))
      .catch((error) => console.error(error));
  }
  return { handleUploadChange, imagePreview, uploadUrl, textClick };
};

const checkImageType = (type: string) => {
  //  JPEG, JPG, PNG
  const IMAGE_TYPE: Record<string, string> = {
    'image/jpeg': 'JPEG',
    'image/png': 'PNG',
    'image/jpg': 'JPG',
  };
  if (type in IMAGE_TYPE) return IMAGE_TYPE[type];
  return false;
};

};
