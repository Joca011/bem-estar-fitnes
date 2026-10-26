// React Bits — ScrollVelocity (https://reactbits.dev/text-animations/scroll-velocity)
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react';
import { useLayoutEffect, useRef, useState } from 'react';
import './ScrollVelocity.css';

function useElementWidth(ref) {
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    const update = () => ref.current && setWidth(ref.current.offsetWidth);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [ref]);
  return width;
}

const wrap = (min, max, v) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

function VelocityText({ children, baseVelocity, className, numCopies = 6 }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });

  const copyRef = useRef(null);
  const copyWidth = useElementWidth(copyRef);
  const x = useTransform(baseX, (v) => (copyWidth === 0 ? '0px' : `${wrap(-copyWidth, 0, v)}px`));

  const directionFactor = useRef(1);
  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="parallax">
      <motion.div className="scroller" style={{ x }}>
        {Array.from({ length: numCopies }).map((_, i) => (
          <span className={className} key={i} ref={i === 0 ? copyRef : null}>
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

const ScrollVelocity = ({ texts = [], velocity = 60, className = '' }) => (
  <section className="scroll-velocity" aria-hidden="true">
    {texts.map((text, i) => (
      <VelocityText key={i} className={className} baseVelocity={i % 2 !== 0 ? -velocity : velocity}>
        {text}&nbsp;
      </VelocityText>
    ))}
  </section>
);

export default ScrollVelocity;
