declare global {
  interface Window {
    ReactNativeWebView: {
      postMessage: (message: string) => void;
    };
    Kakao: {
      init: (keyValue: string) => void;
      isInitialized: () => boolean;
      Auth: {
        authorize: ({ redirectUri: string, nonce: string, throughTalk: boolean }) => void;
      };
    };
    AppleID: {
      auth: {
        init: ({
          clientId: string,
          scope: string,
          redirectURI: string,
          state: string,
          usePopup: boolean,
          nonce: string,
        }) => void;
        signIn: () => void;
      };
    };
  }
}

export {};
