// React Bits — BlurText (https://reactbits.dev/text-animations/blur-text)
import { motion } from 'motion/react';
import { useEffect, useMemo, useRef, useState } from 'react';

const buildKeyframes = (from, steps) => {
  const keys = new Set([...Object.keys(from), ...steps.flatMap((s) => Object.keys(s))]);
  const keyframes = {};
  keys.forEach((k) => {
    keyframes[k] = [from[k], ...steps.map((s) => s[k])];
  });
  return keyframes;
};

const BlurText = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  stepDuration = 0.35,
  as: Tag = 'p',
  highlight = [],
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const from = useMemo(
    () =>
      direction === 'top'
        ? { filter: 'blur(10px)', opacity: 0, y: -50 }
        : { filter: 'blur(10px)', opacity: 0, y: 50 },
    [direction]
  );
  const to = useMemo(
    () => [
      { filter: 'blur(5px)', opacity: 0.5, y: direction === 'top' ? 5 : -5 },
      { filter: 'blur(0px)', opacity: 1, y: 0 },
    ],
    [direction]
  );

  const stepCount = to.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)));

  return (
    <Tag ref={ref} className={`blur-text ${className}`} style={{ display: 'flex', flexWrap: 'wrap' }}>
      {elements.map((segment, index) => (
        <motion.span
          key={index}
          initial={from}
          animate={inView ? buildKeyframes(from, to) : from}
          transition={{ duration: totalDuration, times, delay: (index * delay) / 1000 }}
          className={highlight.includes(index) ? 'blur-text__hl' : undefined}
          style={{ display: 'inline-block', willChange: 'transform, filter, opacity' }}
        >
          {segment === ' ' ? ' ' : segment}
          {animateBy === 'words' && index < elements.length - 1 && ' '}
        </motion.span>
      ))}
    </Tag>
  );
};

export default BlurText;
