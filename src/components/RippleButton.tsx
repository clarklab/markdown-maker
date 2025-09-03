import React from 'react';
import { useRipple } from '../hooks/useRipple';

interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  rippleColor?: string;
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  href?: string;
  onMouseEnter?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const RippleButton: React.FC<RippleButtonProps> = ({
  children,
  className = '',
  onClick,
  onMouseDown,
  onMouseEnter,
  rippleColor = '#FF00C8',
  as: Component = 'button',
  ...props
}) => {
  const { ripples, addRipple, addHoverRipple } = useRipple();

  const handleMouseDown = (event: React.MouseEvent<HTMLElement>) => {
    addRipple(event);
    onMouseDown?.(event as React.MouseEvent<HTMLButtonElement>);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
  };

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    // Only add hover ripple on desktop (when we have a mouse)
    if (window.matchMedia && window.matchMedia('(hover: hover)').matches) {
      addHoverRipple(event);
    }
    onMouseEnter?.(event as React.MouseEvent<HTMLButtonElement>);
  };

  const rippleStyles = `
    .ripple-container {
      position: relative;
      overflow: hidden;
    }
    
    .button-content {
      position: relative;
      z-index: 2;
      display: inherit;
      align-items: inherit;
      justify-content: inherit;
      flex-direction: inherit;
      gap: inherit;
    }
    
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: radial-gradient(circle, ${rippleColor}80 0%, ${rippleColor}40 50%, ${rippleColor}20 100%);
      transform: scale(0);
      animation: ripple-animation 0.49s cubic-bezier(0.4, 0, 0.1, 1);
      pointer-events: none;
      z-index: 1;
    }
    
    @keyframes ripple-animation {
      0% {
        transform: scale(0);
        opacity: 1;
      }
      70% {
        transform: scale(0.9);
        opacity: 0.8;
      }
      85% {
        transform: scale(1);
        opacity: 0.4;
      }
      100% {
        transform: scale(1);
        opacity: 0;
      }
    }
  `;

  return (
    <>
      <style>{rippleStyles}</style>
      <Component
        className={`ripple-container ${className}`}
        onMouseDown={handleMouseDown}
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
        {...props}
      >
        {ripples.map((ripple, index) => (
          <span
            key={index}
            className="ripple"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
            }}
          />
        ))}
        <span className="button-content">
          {children}
        </span>
      </Component>
    </>
  );
};

export default RippleButton;
