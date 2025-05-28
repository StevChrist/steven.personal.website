// Dipakai di About.tsx
import React, { useEffect, useRef, useState } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delayStep?: number; // delay antar karakter dalam detik, default 0.05
  triggerOnce?: boolean; // kalau true, animasi hanya sekali saat pertama muncul
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  style = {},
  delayStep = 0.05,
  triggerOnce = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          // kalau triggerOnce false, reset animasi saat elemen keluar viewport
          setIsVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [triggerOnce]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ display: 'inline-block', ...style, overflow: 'hidden' }}
      aria-label={text}
    >
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="inline-block opacity-0 translate-y-6"
          style={{
            animationName: isVisible ? 'fadeUp' : 'none',
            animationDuration: '0.5s',
            animationFillMode: 'forwards',
            animationTimingFunction: 'ease-out',
            animationDelay: isVisible ? `${i * delayStep}s` : '0s',
          }}
          aria-hidden="true"
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}

      <style jsx>{`
        @keyframes fadeUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedText;
