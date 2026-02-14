import { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import BottomDialogPortal from './BottomDialogPortal';
import './DateTypeSelection.css';

const dateTypes = [
  {
    id: 'adventurous',
    name: 'Adventurous Date',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    icon: '🏔️'
  },
  {
    id: 'gym',
    name: 'Gym Date',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop',
    icon: '💪'
  },
  {
    id: 'mandir',
    name: 'Mandir Date',
    image: 'https://images.unsplash.com/photo-1585504198199-20277593b94f?w=400&h=300&fit=crop',
    icon: '🕉️'
  }
];

function DateCard({ dateType, index, onClick }) {
  const cardSpring = useSpring({
    from: { opacity: 0, scale: 0.8, y: 30 },
    to: { opacity: 1, scale: 1, y: 0 },
    delay: index * 150,
    config: { tension: 200, friction: 20 }
  });

  return (
    <animated.div className="date-card" style={cardSpring} onClick={onClick}>
      <div className="card-image-wrapper">
        <img src={dateType.image} alt={dateType.name} className="card-image" />
        <div className="card-overlay">
          <span className="card-icon">{dateType.icon}</span>
        </div>
      </div>
      <h3 className="card-title">{dateType.name}</h3>
    </animated.div>
  );
}

function DateTypeSelection({ onSelect }) {
  const [showSpeech, setShowSpeech] = useState(false);
  const [showCards, setShowCards] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowSpeech(true), 500);
  }, []);

  const handleTypingComplete = () => setShowCards(true);

  const handleCardClick = (dateTypeId) => {
    setShowSpeech(false);
    setShowCards(false);
    setTimeout(() => onSelect(dateTypeId), 300);
  };

  const cardSpring = useSpring({
    opacity: showCards ? 1 : 0,
    y: showCards ? 0 : 50,
    config: { tension: 200, friction: 20 }
  });

  return (
    <div className="date-type-selection">
      <div className="selection-container">
        <h1 className="selection-title">What kind of date you want?</h1>
        
        {showCards && (
          <animated.div className="date-cards-grid" style={cardSpring}>
            {dateTypes.map((dateType, index) => (
              <DateCard
                key={dateType.id}
                dateType={dateType}
                index={index}
                onClick={() => handleCardClick(dateType.id)}
              />
            ))}
          </animated.div>
        )}
      </div>

      <BottomDialogPortal
        showSpeech={showSpeech}
        speechMessage="What kind of date you want?"
        onTypingComplete={handleTypingComplete}
      />
    </div>
  );
}

export default DateTypeSelection;
