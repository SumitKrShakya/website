import { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import './SpeechBubbleDialog.css';

function SpeechBubbleDialog({ message, show = false, onTypingComplete }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (show && message) {
      setIsTyping(true);
      setDisplayedText('');
      let currentIndex = 0;
      
      const typingInterval = setInterval(() => {
        if (currentIndex < message.length) {
          setDisplayedText(message.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          setIsTyping(false);
          clearInterval(typingInterval);
          if (onTypingComplete) {
            setTimeout(() => onTypingComplete(), 500);
          }
        }
      }, 50);

      return () => clearInterval(typingInterval);
    } else {
      setDisplayedText('');
      setIsTyping(false);
    }
  }, [show, message, onTypingComplete]);

  const bubbleSpring = useSpring({
    opacity: show ? 1 : 0,
    y: show ? 0 : 20,
    config: { tension: 300, friction: 25 }
  });

  if (!show) return null;

  return (
    <animated.div 
      className="speech-bubble-dialog-modern"
      style={bubbleSpring}
    >
      <div className="speech-bubble-panel">
        <div className="speech-bubble-content-modern">
          <div className="speech-bubble-text-modern">
            {displayedText}
            {isTyping && <span className="typing-cursor-modern">|</span>}
          </div>
        </div>
        <div className="speech-bubble-pointer"></div>
      </div>
    </animated.div>
  );
}

export default SpeechBubbleDialog;
