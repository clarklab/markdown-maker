import { useState, useEffect, useRef } from 'react';

interface TypingTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
}

const TypingText: React.FC<TypingTextProps> = ({ 
  text, 
  speed = 50, 
  delay = 1000, 
  className = '' 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [containerHeight, setContainerHeight] = useState<number | null>(null);
  const [isReady, setIsReady] = useState(false);
  const measureRef = useRef<HTMLPreElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initial measurement and setup
  useEffect(() => {
    const measureHeight = () => {
      if (measureRef.current) {
        const height = measureRef.current.offsetHeight;
        setContainerHeight(height);
        if (!isReady) {
          setIsReady(true);
        }
      }
    };

    // Initial measurement
    measureHeight();
  }, [text, className, isReady]);

  // Handle resize separately - only update height, don't restart typing
  useEffect(() => {
    const handleResize = () => {
      if (measureRef.current && isReady) {
        const height = measureRef.current.offsetHeight;
        setContainerHeight(height);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isReady]);

  // Start typing after height is locked
  useEffect(() => {
    if (!isReady || containerHeight === null) return;

    const startTyping = () => {
      setIsTyping(true);
      let currentIndex = 0;
      
      const typeNextChar = () => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
          setTimeout(typeNextChar, speed);
        } else {
          setIsTyping(false);
        }
      };
      
      typeNextChar();
    };

    const timer = setTimeout(startTyping, delay);
    return () => clearTimeout(timer);
  }, [text, speed, delay, isReady, containerHeight]);

  return (
    <div 
      ref={containerRef}
      className="typing-container"
      style={{ 
        height: containerHeight ? `${containerHeight}px` : 'auto',
        opacity: isReady ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out'
      }}
    >
      <pre 
        ref={measureRef}
        className={`typing-measure ${className}`}
        style={{ 
          visibility: isReady ? 'hidden' : 'visible',
          position: isReady ? 'absolute' : 'static'
        }}
      >
        {text}
      </pre>
      {isReady && (
        <pre 
          className={`${className} ${isTyping ? 'typing-active' : ''}`}
          style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            margin: 0,
            padding: 0
          }}
        >
          {displayedText}
        </pre>
      )}
    </div>
  );
};

export default TypingText;
