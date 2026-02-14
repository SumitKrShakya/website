import { useSpring, animated } from '@react-spring/web';
import characterImage from '../assets/character2.png';
import './AnimatedCharacter.css';

function AnimatedCharacter({ 
  state = 'idle', 
  showSpeechBubble = false, 
  speechText = ''
}) {
  // Character state-based animations
  const stateSpring = useSpring({
    scale: state === 'talking' ? 1.05 : 1,
    config: { 
      tension: 200, 
      friction: 20 
    }
  });

  const speechBubbleSpring = useSpring({
    opacity: showSpeechBubble ? 1 : 0,
    scale: showSpeechBubble ? 1 : 0.8,
    y: showSpeechBubble ? 0 : -10,
    config: { tension: 300, friction: 20 }
  });

  return (
    <div className="character-container-new">
      <div className="character-circle-wrapper">
        <animated.div
          className={`character-circle ${state}`}
          style={{
            transform: stateSpring.scale.to(s => `scale(${s})`)
          }}
        >
          <img 
            src={characterImage} 
            alt="Character" 
            className="character-image-circle"
          />
        </animated.div>
        {showSpeechBubble && (
          <animated.div
            className="speech-bubble-new"
            style={{
              transform: speechBubbleSpring.scale.to(s => `scale(${s})`) +
                        speechBubbleSpring.y.to(y => `translateY(${y}px)`),
              opacity: speechBubbleSpring.opacity
            }}
          >
            <div className="speech-bubble-content-new">{speechText}</div>
            <div className="speech-bubble-arrow-new"></div>
          </animated.div>
        )}
      </div>
    </div>
  );
}

export default AnimatedCharacter;
