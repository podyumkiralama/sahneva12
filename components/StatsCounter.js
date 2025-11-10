'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export default function StatsCounter() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [counters, setCounters] = useState({ 
    projects: 0, 
    experience: 0, 
    cities: 0 
  });

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
      };

      increment(700, 'projects');
      increment(12, 'experience');
      increment(81, 'cities');
    }
  }, [inView]);

  const stats = [
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
  ];

  return (
    <div ref={ref} className="container -mt-16 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white/90 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105"
          >
            <div className={`text-4xl font-black bg-gradient-to-r ${stat.color} text-transparent bg-clip-text mb-2`}>
              {stat.number}
            </div>
            <div className="text-lg font-semibold text-neutral-700">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
