import React from 'react';
import { eventConfig } from '@/config/eventConfig';
import styles from './Sponsors.module.css';

export const Sponsors: React.FC = () => {
    return (
        <section className={styles.section} id="sponsors">
            <div className={styles.container}>
                <h2>Sponsors</h2>

                <div className={styles.sponsorSection}>
                    <h3 className={styles.tierName}>Platinum Sponsors</h3>
                    <div className={styles.sponsorGrid}>
                        {eventConfig.sponsors.platinum.map((sponsor, idx) => (
                            <a
                                key={idx}
                                href={sponsor.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.sponsorCard}
                            >
                                <span>{sponsor.name}</span>
                            </a>
                        ))}
                    </div>
                </div>

                <div className={styles.sponsorSection}>
                    <h3 className={styles.tierName}>Gold Sponsors</h3>
                    <div className={styles.sponsorGrid}>
                        {eventConfig.sponsors.gold.map((sponsor, idx) => (
                            <a
                                key={idx}
                                href={sponsor.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.sponsorCard}
                            >
                                <span>{sponsor.name}</span>
                            </a>
                        ))}
                    </div>
                </div>

                <div className={styles.sponsorSection}>
                    <h3 className={styles.tierName}>Web Sponsors</h3>
                    <div className={styles.sponsorGrid}>
                        {eventConfig.sponsors.web.map((sponsor, idx) => (
                            <a
                                key={idx}
                                href={sponsor.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.sponsorCard}
                            >
                                <span>{sponsor.name}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
