// React Bits — CountUp (https://reactbits.dev/text-animations/count-up)
import { useInView, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useRef } from 'react';

const CountUp = ({ to, from = 0, delay = 0, duration = 2, className = '', separator = '.' }) => {
  const ref = useRef(null);
  const motionValue = useMotionValue(from);
  const damping = 20 + 40 * (1 / duration);
  const stiffness = 100 * (1 / duration);
  const springValue = useSpring(motionValue, { damping, stiffness });
  const isInView = useInView(ref, { once: true, margin: '0px' });

  const format = (n) =>
    Math.round(n)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, separator);

  useEffect(() => {
    if (ref.current) ref.current.textContent = format(from);
  }, [from]);

  useEffect(() => {
    if (!isInView) return;
    const t = setTimeout(() => motionValue.set(to), delay * 1000);
    return () => clearTimeout(t);
  }, [isInView, motionValue, to, delay]);

  useEffect(
    () =>
      springValue.on('change', (latest) => {
        if (ref.current) ref.current.textContent = format(latest);
      }),
    [springValue]
  );

  return <span className={className} ref={ref} />;
};

export default CountUp;
