import { useEffect, useState } from 'react';
import '../styles/Gradient.scss';

function MovingGradient() {
  const [gradient, setGradient] = useState('');
  const [animationProperties, setAnimationProperties] = useState({});

  useEffect(() => {
    const generateDistinctColors = () => {
      const colors = [];
      while (colors.length < 6) {
        const hue = Math.floor(Math.random() * 361);
        const saturation = Math.floor(Math.random() * 31) + 50; // Saturation between 50% and 80%
        const lightness = Math.floor(Math.random() * 21) + 42;  // Lightness between 42% and 62%
        const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        
        
        // Ensure colors are distinct by checking hue differences
        if (colors.every(existingColor => Math.abs(existingColor.hue - hue) > 30)) {
          colors.push({ color, hue });
        }
      }
      return colors.map(c => c.color);
    };

    const generateRandomGradient = () => {
      const degrees = Math.floor(Math.random() * 360);
      const colors = generateDistinctColors();
      return `linear-gradient(${degrees}deg, ${colors.join(', ')})`;
    };

    const generateRandomAnimationProperties = () => {
      return {
        '--start-x': `${Math.random() * 100}%`,
        '--start-y': `${Math.random() * 100}%`,
        '--mid-x': `${Math.random() * 100}%`,
        '--mid-y': `${Math.random() * 100}%`,
        '--end-x': `${Math.random() * 100}%`,
        '--end-y': `${Math.random() * 100}%`,
        '--animation-duration': `${10 + Math.random() * 10}s`, // Random duration between 10s and 20s
      };
    };

    // const updateGradient = () => {
    //   setGradient(generateRandomGradient());
    //   setAnimationProperties(generateRandomAnimationProperties());
    // };

    // updateGradient(); // Initial set
    // const interval = setInterval(updateGradient, 20000); // Update every 20 seconds

    // return () => clearInterval(interval); // Cleanup on unmount
    setGradient(generateRandomGradient());
    setAnimationProperties(generateRandomAnimationProperties());

  }, []);

  return (
    <div
      className="moving-gradient"
      style={{
        backgroundImage: gradient,
        ...animationProperties,
      }}
    ></div>
  );
}

export default MovingGradient;
