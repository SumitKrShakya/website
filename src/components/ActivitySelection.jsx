import { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import BottomDialogPortal from './BottomDialogPortal';
import './ActivitySelection.css';

const activities = {
  adventurous: [
    { id: 'go-karting', name: 'Go Karting', icon: '🏎️' },
    { id: 'ice-skating', name: 'Ice Skating', icon: '⛸️' },
    { id: 'hiking', name: 'Hiking', icon: '🥾' }
  ],
  gym: [
    { id: 'chest', name: 'Chest Exercise', icon: '💪' },
    { id: 'back', name: 'Back Exercise', icon: '🏋️' },
    { id: 'leg', name: 'Leg Exercise', icon: '🦵' }
  ],
  mandir: [
    { id: 'iskcon', name: 'ISKCON Temple', icon: '🕉️' },
    { id: 'hanuman', name: 'Hanuman Temple', icon: '🙏' },
    { id: 'shiv', name: 'Shiv Temple', icon: '🔱' }
  ]
};

function ActivityCard({ activity, index, onClick }) {
  const cardSpring = useSpring({
    from: { opacity: 0, scale: 0.8, y: 30 },
    to: { opacity: 1, scale: 1, y: 0 },
    delay: index * 100,
    config: { tension: 200, friction: 20 }
  });

  return (
    <animated.div className="activity-card" style={cardSpring} onClick={onClick}>
      <div className="activity-icon">{activity.icon}</div>
      <h3 className="activity-name">{activity.name}</h3>
    </animated.div>
  );
}

function ActivitySelection({ selectedDateType, onSelect }) {
  const [showSpeech, setShowSpeech] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const currentActivities = activities[selectedDateType] || [];

  useEffect(() => {
    setTimeout(() => setShowSpeech(true), 500);
  }, [selectedDateType]);

  const handleTypingComplete = () => setShowCards(true);

  const handleSelect = (activityId) => {
    setShowSpeech(false);
    setShowCards(false);
    setTimeout(() => onSelect(activityId), 300);
  };

  const containerSpring = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { tension: 200, friction: 20 }
  });

  const cardSpring = useSpring({
    opacity: showCards ? 1 : 0,
    y: showCards ? 0 : 50,
    config: { tension: 200, friction: 20 }
  });

  return (
    <div className="activity-selection">
      <animated.div className="activity-container" style={containerSpring}>
        <h1 className="activity-title">Pick your favorite!</h1>
        
        {showCards && (
          <animated.div className="activity-cards-grid" style={cardSpring}>
            {currentActivities.map((activity, index) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                index={index}
                onClick={() => handleSelect(activity.id)}
              />
            ))}
          </animated.div>
        )}
      </animated.div>

      <BottomDialogPortal
        showSpeech={showSpeech}
        speechMessage="Pick your favorite!"
        onTypingComplete={handleTypingComplete}
      />
    </div>
  );
}

export default ActivitySelection;
