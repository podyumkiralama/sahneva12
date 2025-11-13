'use client';

import { useScrollAnimation } from '@/components/hooks/useScrollAnimation';

export function ScrollReveal({ 
  children, 
  className = '', 
  delay = '',
  direction = 'up',
  ...props 
}) {
  const ref = useScrollAnimation();
  
  const getAnimationClass = () => {
    switch (direction) {
      case 'left': return 'reveal-left';
      case 'right': return 'reveal-right';
      case 'scale': return 'reveal-scale';
      default: return 'reveal';
    }
  };

  return (
    <div
      ref={ref}
      className={`${getAnimationClass()} ${delay ? `delay-${delay}` : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

// Grup halinde animasyon için bileşen
export function ScrollRevealGroup({
  children,
  className = ''
}) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}
