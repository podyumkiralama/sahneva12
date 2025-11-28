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

function mergeRefs(...refs) {
  return (node) => {
    refs.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === 'function') {
        ref(node);
      } else {
        ref.current = node;
      }
    });
  };
}

const ScrollReveal = memo(function ScrollReveal({
  children,
  className = '',
  delay = '',
  direction = 'up',
  asChild = false,
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

  if (asChild && isValidElement(children)) {
    const childClass = children.props.className;
    const mergedClassName = childClass
      ? `${childClass} ${composedClassName}`.trim()
      : composedClassName;

    return cloneElement(children, {
      className: mergedClassName,
      ref: mergeRefs(children.ref, ref),
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
