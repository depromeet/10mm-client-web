import { useState } from 'react';
import Image from 'next/image';
import { useGetReactions } from '@/apis/reaction';
import { type EmojiType, REACTION_EMOJI_IMAGE, REACTION_EMOJI_LIST } from '@/apis/schema/reaction';
import { GradientFeedIcon } from '@/components/Icon/NavigationFeedIcon';
import { reactionBarContainerCss, titleSectionCss } from '@/components/ReactionBar/ReactionBar.style';
import { gradientTextCss } from '@/constants/style/gradient';
import { css } from '@/styled-system/css';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  recordId: number;
}

function OtherReactionBar(props: Props) {
  const { data } = useGetReactions(props.recordId);
  const [selectEmoji, setSelectEmoji] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  // console.log('data: ', data);

  const onSelectEmoji = (emoji: string) => {
    setSelectEmoji(emoji);
  };

  return (
    <div className={reactionBarContainerCss}>
      <div className={titleSectionCss} onClick={() => setIsOpen((prev) => !prev)}>
        <GradientFeedIcon />
        <span className={gradientTextCss}>응원하기</span>
      </div>
      <ReactSelect selectEmoji={selectEmoji} onSelect={onSelectEmoji} isOpen={isOpen} />
    </div>
  );
}

export default OtherReactionBar;

interface ReactSelectProps {
  selectEmoji: string;
  onSelect: (emoji: string) => void;
  isOpen: boolean;
}

function ReactSelect(props: ReactSelectProps) {
  return (
    <AnimatePresence>
      {props.isOpen && (
        <motion.article
          className={reactionSelectCss}
          variants={reactionVariant}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <div className={innerCss}>
            {REACTION_EMOJI_LIST.map((emoji: EmojiType) => (
              <div key={emoji} className={emojiItemCss}>
                {props.selectEmoji === emoji && <div className={selectCircleCss} />}
                <Image src={REACTION_EMOJI_IMAGE[emoji]} alt={emoji} width={28} height={28} />
              </div>
            ))}
          </div>
        </motion.article>
      )}
    </AnimatePresence>
  );
}

const reactionVariant = {
  initial: { scale: 0, opacity: 0.7 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 500, // Tension
      damping: 25, // Friction
      duration: 0.5,
      transformOrigin: 'bottom left',
    },
  },
  exit: { opacity: 0.7, scale: 0, transition: { ease: 'easeInOut', duration: 0.3 } },
};

const innerCss = css({
  display: 'flex',
  padding: '10px 12px',
});

const reactionSelectCss = css({
  // backgroundColor: 'purple.purple100',
  background:
    'linear-gradient(0deg, rgba(32, 30, 40, 0.9), rgba(32, 30, 40, 0.9)), linear-gradient(0deg, token(purple.purple100), token(purple.purple100))',
  border: '1px solid',
  borderColor: 'purple.purple100',
  boxShadow: '0px 5px 50px 4px #5C4E7A4D inset',
  position: 'absolute',
  bottom: '100%',
  marginBottom: '8px',
  left: 0,
  borderRadius: '20px',
  transformOrigin: 'bottom left',
});

const emojiItemCss = css({
  position: 'relative',
  padding: '6px',
  cursor: 'pointer',
  width: '40px',
  height: '40px',

  '& img': {
    position: 'relative',
    zIndex: 1,
    width: '28px',
    height: '28px',
  },
});

const selectCircleCss = css({
  background: '#312E3FE5',
  borderRadius: '50%',
  pointerEvents: 'none',
  position: 'absolute',
  boxShadow: '0px 5.625px 56.25px 4.5px #5C4E7A4D inset',
  width: '36px',
  height: '36px',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 0,
});
