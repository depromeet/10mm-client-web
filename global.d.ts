declare global {
  interface Window {
    Kakao: {
      init: (keyValue: string) => void;
      isInitialized: () => boolean;
      Auth: {
        authorize: ({ redirectUri: string }) => void;
      };
    };
    AppleID: {
      auth: {
        init: ({
          clientId: string,
          scope: string,
          redirectURI: string,
          state: string,
          nonce: string,
          usePopup: boolean,
        }) => void;
        signIn: () => void;
      };
    };
  }
}

export {};
