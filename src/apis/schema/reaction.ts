// PURPLE_HEART, UNICORN, GLOWING_STAR, SPARKLING_HEART, EYES, FIRE, PARTY_POPPER

export enum EmojiType {
  PURPLE_HEART = 'PURPLE_HEART',
  UNICORN = 'UNICORN',
  GLOWING_STAR = 'GLOWING_STAR',
  SPARKLING_HEART = 'SPARKLING_HEART',
  EYES = 'EYES',
  FIRE = 'FIRE',
  PARTY_POPPER = 'PARTY_POPPER',
}

export const REACTION_EMOJI_IMAGE: Record<EmojiType, string> = {
  [EmojiType.PURPLE_HEART]: '/images/reaction/PURPLE_HEART.png',
  [EmojiType.GLOWING_STAR]: '/images/reaction/GLOWING_STAR.png',
  [EmojiType.SPARKLING_HEART]: '/images/reaction/SPARKLING_HEART.png',
  [EmojiType.UNICORN]: '/images/reaction/UNICORN.png',
  [EmojiType.EYES]: '/images/reaction/EYES.png',
  [EmojiType.FIRE]: '/images/reaction/FIRE.png',
  [EmojiType.PARTY_POPPER]: '/images/reaction/PARTY_POPPER.png',
};

export const REACTION_EMOJI_LIST = Object.keys(EmojiType) as EmojiType[];
