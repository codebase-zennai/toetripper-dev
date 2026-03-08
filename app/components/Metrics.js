'use client';

import { animate, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const METRICS = [
  { id: 'journeys', value: 36, suffix: 'K', label: 'Journeys Planned' },
  { id: 'clients', value: 28, label: 'Corporate Clients' },
  { id: 'destinations', value: 14, label: 'Global Destinations' },
  { id: 'experience', value: 15, label: 'Years of Experience' }
];

function CounterMetric({ value, label, suffix = '' }) {
  const metricRef = useRef(null);
  const isInView = useInView(metricRef, { once: true, amount: 0.5 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) {
      return;
    }

    const controls = animate(0, value, {
      duration: 1.4,
      ease: 'easeOut',
      onUpdate: (latest) => {
        setDisplayValue(Math.round(latest));
      }
    });

    return () => controls.stop();
  }, [isInView, value]);

  return (
    <div ref={metricRef} className="metrics-block">
      <h2 className="metrics-text">
        {displayValue}
        {suffix}
      </h2>
      <p>{label}</p>
    </div>
  );
}

export default function Metrics() {
  return (
    <div className=""> 
      <div className="background-black rounded-corners">
        <div className="space-7rem"></div>
        <div className="metrics-wrapper text-site-white">
          {METRICS.map((metric) => (
            <CounterMetric
              key={metric.id}
              value={metric.value}
              suffix={metric.suffix}
              label={metric.label}
            />
          ))}
        </div>
        <div className="space-7rem"></div>
      </div>
    </div>
  );
}
