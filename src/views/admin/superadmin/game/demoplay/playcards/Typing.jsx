import React, { useState, useEffect } from 'react';

function TypingEffect({ text, speed }) {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      if (currentIndex < text.length) {
        const timer = setTimeout(() => {
          setDisplayText(prevText => prevText + text[currentIndex]);
          setCurrentIndex(prevIndex => prevIndex + 1);
        }, speed);
  
        return () => clearTimeout(timer);
      }
    }, [currentIndex, text, speed]);
  
    return <div style={{color:'#312821'}}>{displayText}</div>;
  }

  export default TypingEffect;