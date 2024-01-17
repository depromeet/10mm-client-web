export const EVENT_LOG_CATEGORY = {
  SELECT_CATEGORY: 'select_category',
  STOPWATCH: 'stopwatch',
  CERTIFICATION: 'certification',
  HEADER: 'header',
};

type EventLogCategoryType = keyof typeof EVENT_LOG_CATEGORY;

export const EVENT_LOG_NAME: Record<EventLogCategoryType, Record<string, string>> = {
  SELECT_CATEGORY: {
    CLICK_NEXT_BUTTON: 'click/nextButton',
    CLICK_SELECT_CATEGORY: 'click/selectCategory',
  },
  STOPWATCH: {
    CLICK_FINISH_BUTTON: 'click/finishButton',
    CLICK_FINISH: 'click/finish',
    CLICK_CANCEL: 'click/cancel',
    CLICK_STOP: 'click/stop',
    CLICK_START: 'click/start',
    CLICK_RESTART: 'click/restart',
    MID_SAVE: 'mid-save',
    MID_SAVE_2: 'mid-save-2',
    CLICK_BACK: 'click/back',
    CLICK_MID_OUT: 'click/mid-out',
    API_RECORD_TIME: 'api/record-time',
    CLICK_FINISH_BUTTON_BEFORE_10MM: 'click/finishButton-before-10mm',
    CLICK_AUTO_FINISH: 'click/auto-finish',
  },
  CERTIFICATION: {
    CLICK_IMAGE_PREVIEW: 'click/imagePreview',
    CLICK_CONFIRM: 'click/confirm',
    CLICK_CANCEL: 'click/cancel',
  },
  HEADER: {
    CLICK_BACK_BUTTON: 'click/backButton',
  },
};
