import { useCallback, useState } from 'react';

export interface RippleEvent {
  x: number;
  y: number;
  size: number;
}

export const useRipple = () => {
  const [ripples, setRipples] = useState<RippleEvent[]>([]);

  const addRipple = useCallback((event: React.MouseEvent<HTMLElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    
    // Calculate position relative to the button
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Calculate size based on button dimensions for full coverage
    const size = Math.max(rect.width, rect.height) * 1.5;
    
    const newRipple: RippleEvent = {
      x: x - size / 2,
      y: y - size / 2,
      size,
    };

    setRipples((prev) => [...prev, newRipple]);

    // Remove ripple after animation completes (115% faster = 1050ms / 2.15 = ~490ms)
    setTimeout(() => {
      setRipples((prev) => prev.slice(1));
    }, 490);
  }, []);

  const addHoverRipple = useCallback((event: React.MouseEvent<HTMLElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    
    // Calculate position relative to the button for hover (center of button)
    const x = rect.width / 2;
    const y = rect.height / 2;
    
    // Smaller size for hover effect
    const size = Math.max(rect.width, rect.height) * 1.2;
    
    const newRipple: RippleEvent = {
      x: x - size / 2,
      y: y - size / 2,
      size,
    };

    setRipples((prev) => [...prev, newRipple]);

    // Remove ripple after animation completes (115% faster = 1050ms / 2.15 = ~490ms)
    setTimeout(() => {
      setRipples((prev) => prev.slice(1));
    }, 490);
  }, []);

  const clearRipples = useCallback(() => {
    setRipples([]);
  }, []);

  return { ripples, addRipple, addHoverRipple, clearRipples };
};
