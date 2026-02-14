import { useRef, useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { FaHeart } from 'react-icons/fa';
import './Timeline.css';

function TimelineItem({ date, title, description, index }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const spring = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
    config: { tension: 200, friction: 20 },
    delay: index * 100
  });

  return (
    <animated.div
      ref={ref}
      className="timeline-item"
      style={spring}
    >
      <div className="timeline-marker">
        <FaHeart />
      </div>
      <div className="timeline-content">
        <div className="timeline-date">{date}</div>
        <h3 className="timeline-title">{title}</h3>
        <p className="timeline-description">{description}</p>
      </div>
    </animated.div>
  );
}

function Timeline({ memories = [] }) {
  // Default memories if none provided
  const defaultMemories = [
    {
      date: 'Our First Meeting',
      title: 'The Beginning',
      description: 'In that single moment, time stood still. The universe conspired to bring our souls together, and my heart knew it had found its forever home. From that day forward, every breath I take is filled with the promise of us, and every dream I dream includes you.'
    },
    {
      date: 'First Date',
      title: 'Unforgettable Moments',
      description: 'The butterflies, the laughter, the connection. Everything felt perfect.'
    },
    {
      date: 'Special Moments',
      title: 'Growing Together',
      description: 'Every day brings new reasons to smile, new memories to cherish.'
    }
  ];

  const displayMemories = memories.length > 0 ? memories : defaultMemories;

  return (
    <div className="timeline-container">
      <h2 className="timeline-header">
        <FaHeart className="header-heart" /> Our Journey <FaHeart className="header-heart" />
      </h2>
      <div className="timeline">
        {displayMemories.map((memory, index) => (
          <TimelineItem
            key={index}
            date={memory.date}
            title={memory.title}
            description={memory.description}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

export default Timeline;
