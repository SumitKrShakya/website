import { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import SecretCodeModal from './components/SecretCodeModal';
import CharacterEntrance from './components/CharacterEntrance';
import DateTypeSelection from './components/DateTypeSelection';
import ActivitySelection from './components/ActivitySelection';
import FoodSelection from './components/FoodSelection';
import FinalSummary from './components/FinalSummary';
import BottomDialogPortal from './components/BottomDialogPortal';
import './App.css';

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [screen, setScreen] = useState('entrance'); // entrance, dateType, activity, food, summary
  const [selectedDateType, setSelectedDateType] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedFood, setSelectedFood] = useState(null);
  const [showSummarySpeech, setShowSummarySpeech] = useState(false);

  const handleCodeSuccess = () => {
    setIsUnlocked(true);
    setScreen('entrance');
  };

  const handleEntranceComplete = () => {
    setScreen('dateType');
  };

  const handleDateTypeSelect = (dateType) => {
    setSelectedDateType(dateType);
    setScreen('activity');
  };

  const handleActivitySelect = (activityId) => {
    setSelectedActivity(activityId);
    setScreen('food');
  };

  const handleFoodSelect = (foodId) => {
    setSelectedFood(foodId);
    setScreen('summary');
    setTimeout(() => {
      setShowSummarySpeech(true);
    }, 500);
  };

  // Screen transition animation
  const screenSpring = useSpring({
    opacity: isUnlocked ? 1 : 0,
    config: { tension: 200, friction: 25 }
  });

  // Screen transition animations
  const entranceSpring = useSpring({
    opacity: screen === 'entrance' ? 1 : 0,
    x: screen === 'entrance' ? 0 : -100,
    display: screen === 'entrance' ? 'block' : 'none',
    config: { tension: 200, friction: 25 }
  });

  const dateTypeSpring = useSpring({
    opacity: screen === 'dateType' ? 1 : 0,
    x: screen === 'dateType' ? 0 : screen === 'entrance' ? 100 : -100,
    display: screen === 'dateType' ? 'block' : 'none',
    config: { tension: 200, friction: 25 }
  });

  const activitySpring = useSpring({
    opacity: screen === 'activity' ? 1 : 0,
    x: screen === 'activity' ? 0 : screen === 'dateType' ? 100 : -100,
    display: screen === 'activity' ? 'block' : 'none',
    config: { tension: 200, friction: 25 }
  });

  const foodSpring = useSpring({
    opacity: screen === 'food' ? 1 : 0,
    x: screen === 'food' ? 0 : screen === 'activity' ? 100 : -100,
    display: screen === 'food' ? 'block' : 'none',
    config: { tension: 200, friction: 25 }
  });

  const summarySpring = useSpring({
    opacity: screen === 'summary' ? 1 : 0,
    x: screen === 'summary' ? 0 : screen === 'food' ? 100 : -100,
    display: screen === 'summary' ? 'block' : 'none',
    config: { tension: 200, friction: 25 }
  });

  return (
    <div className="app-container">
      {!isUnlocked ? (
        <SecretCodeModal onSuccess={handleCodeSuccess} />
      ) : (
        <animated.div style={screenSpring} className="page-wrapper">
          <animated.div
            style={{
              ...entranceSpring,
              transform: entranceSpring.x.to(x => `translateX(${x}%)`),
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: 0,
              left: 0
            }}
          >
            {screen === 'entrance' && (
              <CharacterEntrance onComplete={handleEntranceComplete} />
            )}
          </animated.div>
          
          <animated.div
            style={{
              ...dateTypeSpring,
              transform: dateTypeSpring.x.to(x => `translateX(${x}%)`),
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: 0,
              left: 0
            }}
          >
            {screen === 'dateType' && (
              <DateTypeSelection onSelect={handleDateTypeSelect} />
            )}
          </animated.div>
          
          <animated.div
            style={{
              ...activitySpring,
              transform: activitySpring.x.to(x => `translateX(${x}%)`),
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: 0,
              left: 0
            }}
          >
            {screen === 'activity' && (
              <ActivitySelection 
                selectedDateType={selectedDateType} 
                onSelect={handleActivitySelect} 
              />
            )}
          </animated.div>
          
          <animated.div
            style={{
              ...foodSpring,
              transform: foodSpring.x.to(x => `translateX(${x}%)`),
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: 0,
              left: 0
            }}
          >
            {screen === 'food' && (
              <FoodSelection onSelect={handleFoodSelect} />
            )}
          </animated.div>
          
          <animated.div
            style={{
              ...summarySpring,
              transform: summarySpring.x.to(x => `translateX(${x}%)`),
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: 0,
              left: 0
            }}
          >
            {screen === 'summary' && (
              <FinalSummary 
                selectedDateType={selectedDateType}
                selectedActivity={selectedActivity}
                selectedFood={selectedFood}
                showBottomDialog={false}
              />
            )}
          </animated.div>
        </animated.div>
      )}
      
      {/* Bottom dialog for summary - using portal */}
      {screen === 'summary' && (
        <BottomDialogPortal
          showSpeech={showSummarySpeech}
          speechMessage="I can't wait for our perfect date! When should we go?"
        />
      )}
    </div>
  );
}

export default App;
