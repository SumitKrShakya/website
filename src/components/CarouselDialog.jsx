import { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './CarouselDialog.css';

function CarouselDialog({ items, onSelect, message }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const handleSelect = () => {
    if (items[currentIndex]) {
      onSelect(items[currentIndex].id || items[currentIndex].name);
    }
  };

  const slideSpring = useSpring({
    transform: `translateX(-${currentIndex * 100}%)`,
    config: { tension: 300, friction: 30 }
  });

  if (!items || items.length === 0) return null;

  return (
    <div className="carousel-dialog-container">
      {message && (
        <div className="carousel-message">
          {message}
        </div>
      )}
      
      <div className="carousel-wrapper">
        <button 
          className="carousel-nav-button carousel-nav-left"
          onClick={handlePrevious}
          aria-label="Previous"
        >
          <FaChevronLeft />
        </button>

        <div className="carousel-viewport">
          <animated.div 
            className="carousel-track"
            style={slideSpring}
          >
            {items.map((item, index) => (
              <div 
                key={item.id || index} 
                className="carousel-slide"
                onClick={handleSelect}
              >
                <div className="carousel-card">
                  {item.image && (
                    <div className="carousel-card-image-wrapper">
                      <img 
                        src={item.image} 
                        alt={item.name || item.title} 
                        className="carousel-card-image"
                      />
                      {item.icon && (
                        <div className="carousel-card-overlay">
                          <span className="carousel-card-icon">{item.icon}</span>
                        </div>
                      )}
                    </div>
                  )}
                  {!item.image && item.icon && (
                    <div className="carousel-card-icon-only">
                      <span className="carousel-icon-large">{item.icon}</span>
                    </div>
                  )}
                  <h3 className="carousel-card-title">
                    {item.name || item.title}
                  </h3>
                </div>
              </div>
            ))}
          </animated.div>
        </div>

        <button 
          className="carousel-nav-button carousel-nav-right"
          onClick={handleNext}
          aria-label="Next"
        >
          <FaChevronRight />
        </button>
      </div>

      <div className="carousel-indicators">
        {items.map((_, index) => (
          <button
            key={index}
            className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default CarouselDialog;
