import { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { FaHeart, FaCalendarAlt } from 'react-icons/fa';
import AnimatedCharacter from './AnimatedCharacter';
import SpeechBubbleDialog from './SpeechBubbleDialog';
import memory1 from '../assets/Gemini_Generated_Image_df24z0df24z0df24.png';
import memory2 from '../assets/Gemini_Generated_Image_jtpckpjtpckpjtpc.png';
import memory3 from '../assets/IMG20260118165954.jpg.jpeg';
import memory4 from '../assets/IMG20260118173340.jpg.jpeg';
import './FinalSummary.css';

const memories = [
  { id: 1, src: memory1, alt: 'Beautiful moment together' },
  { id: 2, src: memory2, alt: 'Love and cherish' },
  { id: 3, src: memory3, alt: 'Skating memories' },
  { id: 4, src: memory4, alt: 'Ice skating fun' }
];

// Use first memory photo as main couple photo
const couplePhoto = memory1;

const dateTypeNames = {
  adventurous: 'Adventurous Date',
  gym: 'Gym Date',
  mandir: 'Mandir Date'
};

const activityNames = {
  'go-karting': 'Go Karting',
  'ice-skating': 'Ice Skating',
  'hiking': 'Hiking',
  'chest': 'Chest Exercise',
  'back': 'Back Exercise',
  'leg': 'Leg Exercise',
  'iskcon': 'ISKCON Temple',
  'hanuman': 'Hanuman Temple',
  'shiv': 'Shiv Temple'
};

const foodNames = {
  italian: 'Italian',
  indian: 'Indian',
  chinese: 'Chinese',
  'fast-food': 'Fast Food',
  dessert: 'Dessert',
  cafe: 'Cafe'
};

function MemoryItem({ memory, index }) {
  const memorySpring = useSpring({
    from: { opacity: 0, scale: 0.9, y: 20 },
    to: { opacity: 1, scale: 1, y: 0 },
    delay: 600 + (index * 100),
    config: { tension: 200, friction: 20 }
  });

  return (
    <animated.div
      className="memory-item"
      style={memorySpring}
    >
      <img 
        src={memory.src} 
        alt={memory.alt}
        className="memory-photo"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=400&h=400&fit=crop';
        }}
      />
      <div className="memory-overlay">
        <FaHeart className="memory-heart" />
      </div>
    </animated.div>
  );
}

function FinalSummary({ selectedDateType, selectedActivity, selectedFood }) {
  const [showSpeech, setShowSpeech] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowSpeech(true);
    }, 500);
  }, []);

  const handleDateSubmit = (e) => {
    e.preventDefault();
    if (selectedDate) {
      // Handle date submission
      alert(`Perfect! Our date is set for ${selectedDate}! ❤️`);
    }
  };

  const containerSpring = useSpring({
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0 },
    config: { tension: 200, friction: 20 }
  });

  const itemsSpring = useSpring({
    from: { opacity: 0, scale: 0.9 },
    to: { opacity: 1, scale: 1 },
    delay: 300,
    config: { tension: 200, friction: 20 }
  });

  return (
    <div className="final-summary">
      <animated.div className="summary-container" style={containerSpring}>
        <div className="summary-header">
          <h1 className="summary-title">
            <FaHeart className="title-heart" /> Our Perfect Date Plan <FaHeart className="title-heart" />
          </h1>
        </div>

        <animated.div className="summary-content" style={itemsSpring}>
          {/* Loving Message */}
          <div className="loving-message-card">
            <div className="message-content">
              <p className="message-text">
                My Dearest Love,
              </p>
              <p className="message-text">
                I've planned something special just for us. Every moment with you is magical, and I can't wait to create more beautiful memories together.
              </p>
              <p className="message-text">
                You mean the world to me, and I'm so excited to spend this perfect day with you. ❤️
              </p>
              <p className="message-signature">
                Forever Yours
              </p>
            </div>
          </div>

          {/* Complete Photo */}
          <div className="photo-section">
            <div className="photo-container">
              <img 
                src={couplePhoto} 
                alt="Our beautiful moment"
                className="complete-photo"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=800&h=600&fit=crop';
                }}
              />
              <div className="photo-overlay-text">
                <FaHeart /> Our Beautiful Moments <FaHeart />
              </div>
            </div>
          </div>

          {/* Selected Options Summary */}
          <div className="selections-summary">
            <h2 className="selections-title">What We'll Do Together</h2>
            <div className="selection-items">
              <div className="selection-item">
                <span className="selection-label">Date Type:</span>
                <span className="selection-value">{dateTypeNames[selectedDateType] || 'Not selected'}</span>
              </div>
              <div className="selection-item">
                <span className="selection-label">Activity:</span>
                <span className="selection-value">{activityNames[selectedActivity] || 'Not selected'}</span>
              </div>
              <div className="selection-item">
                <span className="selection-label">Food:</span>
                <span className="selection-value">{foodNames[selectedFood] || 'Not selected'}</span>
              </div>
            </div>
          </div>

          {/* Memories Gallery */}
          <div className="memories-section">
            <h2 className="memories-title">
              <FaHeart /> Our Beautiful Memories <FaHeart />
            </h2>
            <div className="memories-grid">
              {memories.map((memory, index) => (
                <MemoryItem
                  key={memory.id}
                  memory={memory}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* Date Selection */}
          <div className="date-selection-section">
            <h2 className="date-title">
              <FaCalendarAlt /> When Should We Go?
            </h2>
            <form onSubmit={handleDateSubmit} className="date-form">
              <div className="date-input-wrapper">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="date-input"
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
                <button type="submit" className="date-submit-button">
                  Confirm Date ❤️
                </button>
              </div>
            </form>
          </div>
        </animated.div>
      </animated.div>
    </div>
  );
}

export default FinalSummary;
