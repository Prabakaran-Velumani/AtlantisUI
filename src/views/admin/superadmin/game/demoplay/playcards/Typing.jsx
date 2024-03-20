import React, { useState, useEffect } from 'react';

function TypingEffect({ text, speed}) {
    const [displayText, setDisplayText] = useState();
   
    const [currentIndex, setCurrentIndex] = useState(0);
    
    console.log('displayText', displayText)

      useEffect(()=>{
        setDisplayText(text);
      },[ text, speed])


    useEffect(() => {
     
      if (currentIndex < text.length) {
        const timer = setTimeout(() => {
          setDisplayText(prevText => prevText + text[currentIndex]);
          setCurrentIndex(prevIndex => prevIndex + 1);
        }, speed);
  
        return () => clearTimeout(timer);
      }
    }, [displayText]);

    // useEffect(()=>{
    //   if(currentIndex>0)
    //   {
    //     const timer = setTimeout(() => {
    //       setDisplayText(prevText => prevText + text[currentIndex]);
    //       setCurrentIndex(prevIndex => prevIndex + 1);
    //     }, speed);
    //     return () => clearTimeout(timer);
    //   }
    // },[currentIndex])
  
    return <div style={{color:'#312821'}}>{displayText}</div>;
  }

  export default TypingEffect;