import { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { FaHeart } from 'react-icons/fa';
import './SecretCodeModal.css';

const SECRET_CODE = '2320';

function SecretCodeModal({ onSuccess }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Modal entrance animation
  const modalSpring = useSpring({
    from: { opacity: 0, scale: 0.8, y: -50 },
    to: { opacity: 1, scale: 1, y: 0 },
    config: { tension: 200, friction: 20 }
  });

  // Backdrop animation
  const backdropSpring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 300 }
  });

  // Shake animation for error
  const shakeSpring = useSpring({
    x: error ? [-10, 10, -10, 10, 0] : 0,
    config: { tension: 300, friction: 10 }
  });

  // Heart icons animation
  const heart1Spring = useSpring({
    from: { opacity: 0, scale: 0, rotate: -45 },
    to: { opacity: 0.6, scale: 1, rotate: 0 },
    delay: 200,
    config: { tension: 150, friction: 10 }
  });

  const heart2Spring = useSpring({
    from: { opacity: 0, scale: 0, rotate: 45 },
    to: { opacity: 0.6, scale: 1, rotate: 0 },
    delay: 400,
    config: { tension: 150, friction: 10 }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(false);

    if (code === SECRET_CODE) {
      // Success - animate out then call onSuccess
      setTimeout(() => {
        onSuccess();
      }, 500);
    } else {
      // Error - shake animation
      setError(true);
      setIsSubmitting(false);
      setTimeout(() => {
        setError(false);
        setCode('');
      }, 1000);
    }
  };

  return (
    <animated.div 
      className="modal-backdrop" 
      style={backdropSpring}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          // Optional: prevent closing on backdrop click for Valentine theme
        }
      }}
    >
      <animated.div 
        className="modal-container"
        style={{
          ...modalSpring,
          ...shakeSpring,
          transform: shakeSpring.x.to(x => `translateX(${x}px) scale(${modalSpring.scale.get()})`)
        }}
      >
        {/* Decorative hearts */}
        <animated.div 
          className="heart-decoration heart-left"
          style={heart1Spring}
        >
          <FaHeart />
        </animated.div>
        <animated.div 
          className="heart-decoration heart-right"
          style={heart2Spring}
        >
          <FaHeart />
        </animated.div>

        <div className="modal-content">
          <h1 className="modal-title">
            <FaHeart className="title-heart" /> Enter Your Secret Code <FaHeart className="title-heart" />
          </h1>
          
          <form onSubmit={handleSubmit} className="code-form">
            <div className="input-wrapper">
              <input
                type="text"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setError(false);
                }}
                placeholder="Enter your secret code"
                className={`code-input ${error ? 'error' : ''}`}
                disabled={isSubmitting}
                autoFocus
              />
              {error && (
                <animated.div 
                  className="error-message"
                  style={{
                    opacity: error ? 1 : 0,
                    transform: error ? 'translateY(0)' : 'translateY(-10px)'
                  }}
                >
                  ❤️ Wrong code, try again! ❤️
                </animated.div>
              )}
            </div>

            <button 
              type="submit" 
              className="submit-button"
              disabled={isSubmitting || !code.trim()}
            >
              {isSubmitting ? 'Opening...' : 'Open'}
            </button>
          </form>
        </div>
      </animated.div>
    </animated.div>
  );
}

export default SecretCodeModal;
