import React from 'react';
import { eventConfig } from '@/config/eventConfig';
import styles from './Details.module.css';

export const Details: React.FC = () => {
    const event = eventConfig.event;

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2>Event Details</h2>

                <div className={styles.grid}>
                    <div className={styles.card}>
                        <h3>📍 Location</h3>
                        <p className={styles.cardTitle}>{event.location.name}</p>
                        <p>{event.location.address}</p>
                        <p>{event.location.city}, {event.location.state} {event.location.zip}</p>
                        <p>{event.location.country}</p>
                    </div>

                    <div className={styles.card}>
                        <h3>📅 Date & Time</h3>
                        <p className={styles.cardTitle}>January 29-30, 2026</p>
                        <p>Doors Open: {event.dates.doorsOpen}</p>
                        <p>Sessions: {event.dates.sessionsStart} - {event.dates.sessionsEnd}</p>
                    </div>

                    <div className={styles.card}>
                        <h3>🎫 Registration</h3>
                        <p className={styles.cardTitle}>${event.ticketPrice} USD</p>
                        <p>Helps offset breakfast and lunch costs</p>
                        <p>All proceeds support: {event.charityPartner.name}</p>
                    </div>
                </div>

                <div className={styles.charity}>
                    <h3>Charity Partner</h3>
                    <p className={styles.charityName}>{event.charityPartner.name}</p>
                    <p>{event.charityPartner.description}</p>
                    <a href={event.charityPartner.url} target="_blank" rel="noopener noreferrer">
                        Learn More →
                    </a>
                </div>
            </div>
        </section>
    );
};
