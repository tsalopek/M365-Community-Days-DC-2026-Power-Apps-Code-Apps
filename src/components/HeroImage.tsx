import React, { useState } from 'react';
import { eventConfig } from '@/config/eventConfig';
import { Countdown } from './Countdown';
import styles from './HeroImage.module.css';

export const HeroImage: React.FC = () => {
    const event = eventConfig.event;
    const [imageLoaded, setImageLoaded] = useState(true);

    return (
        <section className={styles.heroImage}>
            {imageLoaded && (
                <img
                    src="/images/lincoln memorial.jpg"
                    alt="Lincoln Memorial Washington DC"
                    className={styles.image}
                    onError={() => setImageLoaded(false)}
                    crossOrigin="anonymous"
                />
            )}
            {!imageLoaded && (
                <div className={styles.imageFallback} />
            )}
            <div className={styles.overlay}>
                <div className={styles.content}>
                    <h1 className={styles.title}>{event.name}</h1>
                    <p className={styles.subtitle}>{event.tagline}</p>
                    <Countdown />
                </div>
            </div>
        </section>
    );
};
