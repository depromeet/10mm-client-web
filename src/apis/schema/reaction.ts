export enum EmojiType {
  BLUE_HEART = 'BLUE_HEART',
  THUMBS_UP = 'THUMBS_UP',
  FIRE = 'FIRE',
  PARTY_POPPER = 'PARTY_POPPER',
  UNICORN = 'UNICORN',
  PARTYING_FACE = 'PARTYING_FACE',
  SOMETHING_SPECIAL = 'SOMETHING_SPECIAL',
  GLOWING_STAR = 'GLOWING_STAR',
  SPARKLING_HEART = 'SPARKLING_HEART',
  EYES = 'EYES',
}

export const REACTION_EMOJI_IMAGE: Record<EmojiType, string> = {
  [EmojiType.BLUE_HEART]: '/images/reaction/BLUE_HEART.png',
  [EmojiType.GLOWING_STAR]: '/images/reaction/GLOWING_STAR.png',
  [EmojiType.SPARKLING_HEART]: '/images/reaction/SPARKLING_HEART.png',
  [EmojiType.UNICORN]: '/images/reaction/UNICORN.png',
  [EmojiType.EYES]: '/images/reaction/EYES.png',
  [EmojiType.FIRE]: '/images/reaction/FIRE.png',
  [EmojiType.PARTY_POPPER]: '/images/reaction/PARTY_POPPER.png',
  [EmojiType.PARTYING_FACE]: '/images/reaction/PARTYING_FACE.png',
  [EmojiType.SOMETHING_SPECIAL]: '/images/reaction/SOMETHING_SPECIAL.png',
  [EmojiType.THUMBS_UP]: '/images/reaction/THUMBS_UP.png',
};

export const REACTION_EMOJI_LIST = Object.keys(EmojiType) as EmojiType[];
