import React from 'react';
import { eventConfig } from '@/config/eventConfig';
import styles from './Hero.module.css';

export const Hero: React.FC = () => {
    const event = eventConfig.event;

    return (
        <section className={styles.hero} id="home">
            <div className={styles.content}>
                <div className={styles.eventDetails}>
                    <p>{event.dates.start.slice(5)} - {event.dates.end.slice(5)}</p>
                    <p>{event.location.city}, {event.location.state}</p>
                </div>
                <p className={styles.description}>{event.description}</p>
                <a href={event.registrationUrl} className={styles.cta} target="_blank" rel="noopener noreferrer">
                    Register Now - ${event.ticketPrice}
                </a>
            </div>
        </section>
    );
};
