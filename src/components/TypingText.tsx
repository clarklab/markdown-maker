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
  const [loadingSymbol, setLoadingSymbol] = useState('※');
  const measureRef = useRef<HTMLPreElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const loadingSymbols = ['※', '⁂', '⌾', '⌘'];
  const prefixText = '※ Generating from Post ID: 79\n\n';

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

  // Update loading symbol every 15 characters typed
  useEffect(() => {
    if (displayedText.length > 0) {
      const charactersTyped = displayedText.length;
      const symbolIndex = Math.floor(charactersTyped / 15) % loadingSymbols.length;
      const newSymbol = loadingSymbols[symbolIndex];
      if (newSymbol !== loadingSymbol) {
        console.log('Updating symbol at', charactersTyped, 'chars:', loadingSymbol, '→', newSymbol);
        setLoadingSymbol(newSymbol);
      }
    }
  }, [displayedText, loadingSymbols, loadingSymbol]);

  // Start typing after height is locked
  useEffect(() => {
    if (!isReady || containerHeight === null) return;

    const startTyping = () => {
      setIsTyping(true);
      let currentIndex = 0;
      const fullText = prefixText + text;
      
      const typeNextChar = () => {
        if (currentIndex < fullText.length) {
          setDisplayedText(fullText.slice(0, currentIndex + 1));
          currentIndex++;
          setTimeout(typeNextChar, speed);
        } else {
          setIsTyping(false);
          setLoadingSymbol('※'); // Always reset to original symbol when done
        }
      };
      
      typeNextChar();
    };

    const timer = setTimeout(startTyping, delay);
    return () => clearTimeout(timer);
  }, [text, speed, delay, isReady, containerHeight, prefixText]);

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
        {prefixText + text}
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
          {(() => {
            // Replace the first ※ symbol with the current loading symbol in cyan
            const text = displayedText;
            if (text.length > 0 && text.charAt(0) === '※') {
              return (
                <>
                  <span id="loading-symbol" style={{ color: '#06b6d4' }}>{loadingSymbol}</span>
                  {text.slice(1)}
                </>
              );
            }
            return text;
          })()}
        </pre>
      )}
    </div>
  );
};

export default TypingText;
