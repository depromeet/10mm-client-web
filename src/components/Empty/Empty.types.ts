export interface DefaultEmptyProps {
  title: string;
  description: string;
  image: 'docs' | 'celebratory';
}

export interface SuggestEmptyProps extends DefaultEmptyProps {
  type: 'suggest';
  buttonText: string;
  buttonAction: () => void;
}

export interface NoticesEmptyProps extends DefaultEmptyProps {
  type: 'notice';
}

export interface RefreshEmptyProps {
  type: 'refresh';
}

export type EmptyProps = SuggestEmptyProps | NoticesEmptyProps | RefreshEmptyProps;
