import { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import BottomDialogPortal from './BottomDialogPortal';
import './CharacterEntrance.css';

function CharacterEntrance({ onComplete }) {
  const [phase, setPhase] = useState('entering');
  const [showSpeech, setShowSpeech] = useState(false);

  useEffect(() => {
    const greetingTimer = setTimeout(() => {
      setShowSpeech(true);
      setPhase('greeting');
    }, 800);

    const completeTimer = setTimeout(() => {
      setShowSpeech(false);
      setPhase('complete');
      onComplete();
    }, 3500);

    return () => {
      clearTimeout(greetingTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const screenSpring = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { tension: 200, friction: 25 }
  });

  return (
    <animated.div className="character-entrance" style={screenSpring}>
      <div className="entrance-screen">
        <div className="entrance-content">
          <h1 className="entrance-title">Welcome!</h1>
        </div>
      </div>
      
      <BottomDialogPortal
        showSpeech={showSpeech}
        speechMessage="Hi! Let's plan your perfect date!"
      >
        <div className="welcome-message-portal">
          {showSpeech && <p>Hi! Let's plan your perfect date!</p>}
        </div>
      </BottomDialogPortal>
    </animated.div>
  );
}

export default CharacterEntrance;
