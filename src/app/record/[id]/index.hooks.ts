import { type ChangeEvent, useRef, useState } from 'react';
import { useUploadUrl } from '@/apis/record';
import { EVENT_LOG_CATEGORY, EVENT_LOG_NAME } from '@/constants/eventLog';
import { eventLogger } from '@/utils';

export const useImage = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const imageFile = useRef<File>();
  console.log('imageFile: ', imageFile);

  const { mutate } = useUploadUrl({ onSuccess: (res) => console.log(res), onError: (err) => console.error(err) });

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
    console.log('missionRecordId: ', missionRecordId);
    mutate({ missionRecordId, imageFileExtension: 'JPEG' });
  };

  const uploadUrl = (missionRecordId: string) => {
    getPresignedUrl(missionRecordId);
  };
  // TODO:
  // function uploadImageToS3(url: string, file: File) {
  //   axios
  //       .put(url, file)
  //       .then((response) => console.log(response))
  //       .catch((error) => console.error(error));

  return { handleUploadChange, imagePreview, uploadUrl };
};
