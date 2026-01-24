import React, { useState, useEffect } from 'react';
import styles from './Countdown.module.css';

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

interface GaugeProps {
    value: number;
    max: number;
    label: string;
}

const Gauge: React.FC<GaugeProps> = ({ value, max, label }) => {
    const percentage = (value / max) * 100;
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className={styles.gauge}>
            <svg width="120" height="120" viewBox="0 0 120 120">
                <circle
                    cx="60"
                    cy="60"
                    r="45"
                    className={styles.gaugeBackground}
                />
                <circle
                    cx="60"
                    cy="60"
                    r="45"
                    className={styles.gaugeFill}
                    style={{
                        strokeDashoffset: offset
                    }}
                />
            </svg>
            <div className={styles.gaugeText}>
                <div className={styles.gaugeValue}>{String(value).padStart(2, '0')}</div>
                <div className={styles.gaugeLabel}>{label}</div>
            </div>
        </div>
    );
};

export const Countdown: React.FC = () => {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        const calculateTimeLeft = () => {
            const targetDate = new Date('2026-02-03T09:00:00').getTime();
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <div className={styles.countdown}>
            <p className={styles.label}>Event Starts In:</p>
            <div className={styles.gaugesContainer}>
                <Gauge value={timeLeft.days} max={30} label="Days" />
                <Gauge value={timeLeft.hours} max={24} label="Hours" />
                <Gauge value={timeLeft.minutes} max={60} label="Minutes" />
                <Gauge value={timeLeft.seconds} max={60} label="Seconds" />
            </div>
        </div>
    );
};
