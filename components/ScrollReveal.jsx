'use client';

import { cloneElement, isValidElement, memo, useMemo } from 'react';
import { useScrollAnimation } from '@/components/hooks/useScrollAnimation';

const ANIMATION_CLASSES = {
  left: 'reveal-left',
  right: 'reveal-right',
  scale: 'reveal-scale',
  default: 'reveal'
};

function getAnimationClass(direction) {
  return ANIMATION_CLASSES[direction] ?? ANIMATION_CLASSES.default;
}

const ScrollReveal = memo(function ScrollReveal({
  children,
  className = '',
  delay = '',
  direction = 'up',
  ...props
}) {
  const ref = useScrollAnimation();

  const animationClass = useMemo(
    () => getAnimationClass(direction),
    [direction]
  );

  const delayClass = useMemo(
    () => (delay ? `delay-${delay}` : ''),
    [delay]
  );

  const composedClassName = useMemo(() => {
    const classNames = [animationClass];

    if (delayClass) {
      classNames.push(delayClass);
    }

    if (className) {
      classNames.push(className);
    }

    return classNames.join(' ');
  }, [animationClass, className, delayClass]);

  if (isValidElement(children)) {
    const mergedClassName = [children.props.className, composedClassName]
      .filter(Boolean)
      .join(' ');

    return cloneElement(children, {
      ref,
      className: mergedClassName,
      ...props
    });
  }

  return (
    <div
      ref={ref}
      className={composedClassName}
      {...props}
    >
      {children}
    </div>
  );
});

ScrollReveal.displayName = 'ScrollReveal';

// Grup halinde animasyon için bileşen
const ScrollRevealGroup = memo(function ScrollRevealGroup({
  children,
  className = ''
}) {
  return (
    <div className={className}>
      {children}
    </div>
  );
});

ScrollRevealGroup.displayName = 'ScrollRevealGroup';

export { ScrollReveal, ScrollRevealGroup };
