// React Bits — ShinyText (https://reactbits.dev/text-animations/shiny-text)
import './ShinyText.css';

const ShinyText = ({ text, disabled = false, speed = 4, className = '' }) => (
  <span className={`shiny-text ${disabled ? 'disabled' : ''} ${className}`} style={{ animationDuration: `${speed}s` }}>
    {text}
  </span>
);

export default ShinyText;
