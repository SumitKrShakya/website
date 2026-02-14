import { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { FaHeart } from 'react-icons/fa';
import Timeline from './Timeline';
import './ValentinePage.css';

function FloatingHeart({ delay, left, duration }) {
  const spring = useSpring({
    from: {
      y: window.innerHeight + 50,
      opacity: 0,
      x: 0
    },
    to: {
      y: -100,
      opacity: [0, 1, 1, 0],
      x: Math.random() * 100 - 50
    },
    config: { duration: duration || 8000 },
    delay: delay || 0,
    loop: true
  });

  return (
    <animated.div
      className="floating-heart"
      style={{
        ...spring,
        left: `${left}%`,
        position: 'absolute',
        fontSize: '2rem',
        color: 'rgba(255, 105, 180, 0.4)',
        pointerEvents: 'none'
      }}
    >
      <FaHeart />
    </animated.div>
  );
}

function PhotoItem({ photo, index, onClick }) {
  const itemSpring = useSpring({
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1 },
    delay: index * 100,
    config: { tension: 200, friction: 20 }
  });

  return (
    <animated.div
      className="photo-item"
      style={itemSpring}
      onClick={onClick}
    >
      <img src={photo.url} alt={photo.alt || `Memory ${index + 1}`} />
      <div className="photo-overlay">
        <FaHeart className="overlay-heart" />
      </div>
    </animated.div>
  );
}

function PhotoGallery({ photos = [] }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Default placeholder photos
  const defaultPhotos = [
    { id: 1, url: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=400&h=400&fit=crop', alt: 'Beautiful moment' },
    { id: 2, url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=400&fit=crop', alt: 'Special memory' },
    { id: 3, url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=400&fit=crop', alt: 'Cherished time' },
    { id: 4, url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=400&fit=crop', alt: 'Love story' },
    { id: 5, url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=400&fit=crop', alt: 'Together forever' },
    { id: 6, url: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=400&h=400&fit=crop', alt: 'Beautiful moments' }
  ];

  const displayPhotos = photos.length > 0 ? photos : defaultPhotos;

  const gallerySpring = useSpring({
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0 },
    config: { tension: 200, friction: 20 }
  });

  return (
    <animated.section className="photo-gallery-section" style={gallerySpring}>
      <h2 className="gallery-header">
        <FaHeart className="header-heart" /> Our Memories <FaHeart className="header-heart" />
      </h2>
      <div className="photo-grid">
        {displayPhotos.map((photo, index) => (
          <PhotoItem
            key={photo.id || index}
            photo={photo}
            index={index}
            onClick={() => setSelectedPhoto(photo)}
          />
        ))}
      </div>

      {selectedPhoto && (
        <div className="photo-modal" onClick={() => setSelectedPhoto(null)}>
          <div className="photo-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setSelectedPhoto(null)}>×</button>
            <img src={selectedPhoto.url} alt={selectedPhoto.alt} />
          </div>
        </div>
      )}
    </animated.section>
  );
}

function ValentinePage() {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    // Create floating hearts
    const heartCount = 5;
    const newHearts = Array.from({ length: heartCount }, (_, i) => ({
      id: i,
      left: (i * 20) + 10,
      delay: i * 1000,
      duration: 6000 + Math.random() * 4000
    }));
    setHearts(newHearts);
  }, []);

  const heroSpring = useSpring({
    from: { opacity: 0, y: -50 },
    to: { opacity: 1, y: 0 },
    config: { tension: 200, friction: 20 }
  });

  return (
    <div className="valentine-page">
      {/* Floating hearts background */}
      {hearts.map(heart => (
        <FloatingHeart
          key={heart.id}
          delay={heart.delay}
          left={heart.left}
          duration={heart.duration}
        />
      ))}

      {/* Hero Section */}
      <animated.section className="hero-section" style={heroSpring}>
        <div className="hero-content">
          <h1 className="hero-title">
            <FaHeart className="title-heart" /> For My Beautiful Love <FaHeart className="title-heart" />
          </h1>
          <p className="hero-subtitle">
            Every moment with you is a treasure. This is our story, filled with love, laughter, and endless memories.
          </p>
          <div className="hero-hearts">
            <FaHeart />
            <FaHeart />
            <FaHeart />
          </div>
        </div>
      </animated.section>

      {/* Timeline Section */}
      <Timeline />

      {/* Photo Gallery Section */}
      <PhotoGallery />
    </div>
  );
}

export default ValentinePage;
