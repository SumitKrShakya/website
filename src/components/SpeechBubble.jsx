import { useSpring, animated } from '@react-spring/web';
import './SpeechBubble.css';

function SpeechBubble({ text, show = true }) {
  const spring = useSpring({
    opacity: show ? 1 : 0,
    transform: show ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(-10px)',
    config: { tension: 300, friction: 20 }
  });

  if (!show) return null;

  return (
    <animated.div className="speech-bubble" style={spring}>
      <div className="speech-bubble-content">
        {text}
      </div>
      <div className="speech-bubble-arrow"></div>
    </animated.div>
  );
}

export default SpeechBubble;
