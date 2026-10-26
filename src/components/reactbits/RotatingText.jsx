// React Bits — RotatingText (https://reactbits.dev/text-animations/rotating-text)
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import './RotatingText.css';

const RotatingText = ({
  texts,
  rotationInterval = 2200,
  staggerDuration = 0.025,
  staggerFrom = 'last',
  mainClassName = '',
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % texts.length), rotationInterval);
    return () => clearInterval(id);
  }, [texts.length, rotationInterval]);

  const chars = Array.from(texts[index]);
  const delayFor = (i) => {
    const total = chars.length;
    if (staggerFrom === 'first') return i * staggerDuration;
    if (staggerFrom === 'center') return Math.abs(Math.floor(total / 2) - i) * staggerDuration;
    return (total - 1 - i) * staggerDuration;
  };

  return (
    <motion.span className={`text-rotate ${mainClassName}`} layout transition={{ type: 'spring', damping: 30, stiffness: 400 }}>
      <span className="text-rotate-sr-only">{texts[index]}</span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={index} className="text-rotate-word" aria-hidden="true" layout>
          {chars.map((char, i) => (
            <motion.span
              key={i}
              className="text-rotate-element"
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-120%', opacity: 0 }}
              transition={{ type: 'spring', damping: 30, stiffness: 400, delay: delayFor(i) }}
            >
              {char === ' ' ? ' ' : char}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
};

export default RotatingText;
