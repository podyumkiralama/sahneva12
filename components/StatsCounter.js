'use client';

import { memo, useEffect, useId, useMemo, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

function StatsCounter() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [counters, setCounters] = useState({
    projects: 0,
    experience: 0,
    cities: 0
  });
  const timersRef = useRef([]);

  useEffect(() => {
    if (inView) {
      const duration = 2000;
      const steps = 60;
      
      const increment = (target, key) => {
        let start = 0;
        const step = target / steps;
        const timer = setInterval(() => {
          start += step;
          if (start >= target) {
            setCounters(prev => ({ ...prev, [key]: target }));
            clearInterval(timer);
          } else {
            setCounters(prev => ({ ...prev, [key]: Math.floor(start) }));
          }
        }, duration / steps);
        timersRef.current.push(timer);
      };

      increment(700, 'projects');
      increment(12, 'experience');
      increment(81, 'cities');
    }
    return () => {
      timersRef.current.forEach(clearInterval);
      timersRef.current = [];
    };
  }, [inView]);

  const stats = useMemo(() => [
    {
      number: `${counters.projects}+`,
      label: "Başarılı Proje",
      color: "from-blue-500 to-cyan-500"
    },
    {
      number: `${counters.experience}+`,
      label: "Yıl Deneyim",
      color: "from-purple-500 to-pink-500"
    },
    {
      number: `${counters.cities}`,
      label: "İlde Hizmet",
      color: "from-green-500 to-emerald-500"
    },
  ], [counters.cities, counters.experience, counters.projects]);

  const sectionTitleId = useId();

  return (
    <section
      ref={ref}
      className="container -mt-16 relative z-10"
      role="region"
      aria-labelledby={sectionTitleId}
    >
      <h2 id={sectionTitleId} className="sr-only">
        Sahneva performans istatistikleri
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto" role="list">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white/90 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105"
            role="listitem"
            >
            <div
              className="text-4xl font-black gradient-text gradient-text--safe-xl mb-2"
              aria-live="polite"
              aria-atomic="true"
            >
              {stat.number}
            </div>
            <div className="text-lg font-semibold text-neutral-700">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default memo(StatsCounter);
