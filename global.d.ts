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
          usePopup: boolean,
          nonce: string,
        }) => void;
        signIn: () => void;
      };
    };
  }
}

export {};
