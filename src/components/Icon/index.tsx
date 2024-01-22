import { type SVGProps } from 'react';
import AlarmIcon from '@/components/Icon/AlarmIcon';
import ArrowBackIcon from '@/components/Icon/ArrowBackIcon';
import ArrowDiagonalIcon from '@/components/Icon/ArrowDiagonalIcon';
import ArrowDownIcon from '@/components/Icon/ArrowDownIcon';
import ArrowFoWardIcon from '@/components/Icon/ArrowFowardIcon';
import CameraIcon from '@/components/Icon/CameraIcon';
import CheckCircleIcon from '@/components/Icon/CheckCircleIcon';
import CloseCircleIcon from '@/components/Icon/CloseCircleIcon';
import CloseIcon from '@/components/Icon/CloseIcon';
import CopyLinkIcon from '@/components/Icon/CopyLinkIcon';
import LoginInInformationIcon from '@/components/Icon/LoginInInformationIcon';
import LogOutIcon from '@/components/Icon/LogOutIcon';
import MenuIcon from '@/components/Icon/MenuIcon';
import NavigationFeedIcon from '@/components/Icon/NavigationFeedIcon';
import NavigationMissionIcon from '@/components/Icon/NavigationMissionIcon';
import NavigationMypageIcon from '@/components/Icon/NavigationMypageIcon';
import NavigationResultIcon from '@/components/Icon/NavigationResultIcon';
import NavigationUsersearchIcon from '@/components/Icon/NavigationUsersearchIcon';
import PlusCircleIcon from '@/components/Icon/PlusCircleIcon';
import PlusIcon from '@/components/Icon/PlusIcon';
import RefreshIcon from '@/components/Icon/RefreshIcon';
import ShareIcon from '@/components/Icon/ShareIcon';
import SpinnerIcon from '@/components/Icon/SpinnerIcon';
import TENMMSymbolIcon from '@/components/Icon/TENMMSymbolIcon';
import TermsIcon from '@/components/Icon/TermsIcon';
import WithdrawalIcon from '@/components/Icon/WithdrawalIcon';
import { type ColorToken } from '@styled-system/tokens';

import AppleLoginIcon from './AppleLoginIcon';
import EllipseCameraIcon from './EllipseCameraIcon';
import InputArrowDownIcon from './InputArrowDownIcon';
import InputCloseCircleIcon from './InputCloseCircleIcon';
import KakaoLoginIcon from './KakaoLoginIcon';
import NormalCalender from './NormalCalenderIcon';
import NormalClose from './NormalClose';
import NormalLink from './NormalLinkIcon';
import NormalSetting from './NormalSettingIcon';
import NormalTerms from './NormalTermsIcon';
import PlusCircleLarge from './PlusCircleLargeIcon';
import TENMMSymbolCircleIcon from './TENMMSymbolCircleIcon';

export const IconComponentMap = {
  'arrow-down': ArrowDownIcon,
  'arrow-back': ArrowBackIcon,
  'arrow-forward': ArrowFoWardIcon,
  'check-circle': CheckCircleIcon,
  share: ShareIcon,
  alarm: AlarmIcon,
  plus: PlusIcon,
  menu: MenuIcon,
  'copy-link': CopyLinkIcon,
  'arrow-diagonal': ArrowDiagonalIcon,
  'close-circle': CloseCircleIcon,
  'navigation-result': NavigationResultIcon,
  'navigation-mypage': NavigationMypageIcon,
  'navigation-usersearch': NavigationUsersearchIcon,
  'navigation-mission': NavigationMissionIcon,
  'navigation-feed': NavigationFeedIcon,
  camera: CameraIcon,
  'plus-circle': PlusCircleIcon,
  close: CloseIcon,
  'ellipse-camera-icon': EllipseCameraIcon,
  'normal-close': NormalClose,
  'input-close-circle': InputCloseCircleIcon,
  'input-arrow-down': InputArrowDownIcon,
  refresh: RefreshIcon,
  'plus-circle-large': PlusCircleLarge,
  '10mm-symbol': TENMMSymbolIcon,
  '10mm-symbol-circle': TENMMSymbolCircleIcon,
  'apple-login': AppleLoginIcon,
  'kakao-login': KakaoLoginIcon,
  terms: TermsIcon,
  'log-in-information': LoginInInformationIcon,
  'log-out': LogOutIcon,
  withdrawal: WithdrawalIcon,
  spinner: SpinnerIcon,
  'normal-calender': NormalCalender,
  'normal-setting': NormalSetting,
  'normal-terms': NormalTerms,
  'normal-link': NormalLink,
} as const;

interface Props extends IconComponentProps {
  name: keyof typeof IconComponentMap;
  color?: ColorToken;
}

export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  color?: ColorToken;
  onClick?: () => void;
  size?: number;
}

export default function Icon({ name, ...props }: Props) {
  const IconComponent = IconComponentMap[name];

  return <IconComponent {...props} />;
}

export const DEFAULT_ICON_COLOR = '#D8D8DD';
