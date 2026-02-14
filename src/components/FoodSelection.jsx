import { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import BottomDialogPortal from './BottomDialogPortal';
import './FoodSelection.css';

const foodOptions = [
  { id: 'italian', name: 'Italian', icon: '🍝', image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop' },
  { id: 'indian', name: 'Indian', icon: '🍛', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop' },
  { id: 'chinese', name: 'Chinese', icon: '🥢', image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=400&h=300&fit=crop' },
  { id: 'fast-food', name: 'Fast Food', icon: '🍔', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop' },
  { id: 'dessert', name: 'Dessert', icon: '🍰', image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop' },
  { id: 'cafe', name: 'Cafe', icon: '☕', image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop' }
];

function FoodCard({ food, index, onClick }) {
  const cardSpring = useSpring({
    from: { opacity: 0, scale: 0.8, y: 30 },
    to: { opacity: 1, scale: 1, y: 0 },
    delay: index * 100,
    config: { tension: 200, friction: 20 }
  });

  return (
    <animated.div className="food-card" style={cardSpring} onClick={onClick}>
      <div className="food-image-wrapper">
        <img src={food.image} alt={food.name} className="food-image" />
        <div className="food-overlay">
          <span className="food-icon">{food.icon}</span>
        </div>
      </div>
      <h3 className="food-name">{food.name}</h3>
    </animated.div>
  );
}

function FoodSelection({ onSelect }) {
  const [showSpeech, setShowSpeech] = useState(false);
  const [showCards, setShowCards] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowSpeech(true), 500);
  }, []);

  const handleTypingComplete = () => setShowCards(true);

  const handleSelect = (foodId) => {
    setShowSpeech(false);
    setShowCards(false);
    setTimeout(() => onSelect(foodId), 300);
  };

  const containerSpring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { tension: 200, friction: 20 }
  });

  const cardSpring = useSpring({
    opacity: showCards ? 1 : 0,
    y: showCards ? 0 : 50,
    config: { tension: 200, friction: 20 }
  });

  return (
    <div className="food-selection">
      <animated.div className="food-container" style={containerSpring}>
        <h1 className="food-title">What kind of food you want to eat?</h1>
        
        {showCards && (
          <animated.div className="food-cards-grid" style={cardSpring}>
            {foodOptions.map((food, index) => (
              <FoodCard
                key={food.id}
                food={food}
                index={index}
                onClick={() => handleSelect(food.id)}
              />
            ))}
          </animated.div>
        )}
      </animated.div>

      <BottomDialogPortal
        showSpeech={showSpeech}
        speechMessage="What kind of food you want to eat?"
        onTypingComplete={handleTypingComplete}
      />
    </div>
  );
}

export default FoodSelection;
