import React from 'react';
import { eventConfig } from '@/config/eventConfig';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
    const social = eventConfig.social;

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.column}>
                        <h4>About</h4>
                        <p>M365 Community Days DC 2026 brings together the Microsoft community for learning, connection, and inspiration.</p>
                    </div>

                    <div className={styles.column}>
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="#sessions">Sessions</a></li>
                            <li><a href="#sponsors">Sponsors</a></li>
                            <li><a href={eventConfig.event.registrationUrl} target="_blank" rel="noopener noreferrer">Register</a></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h4>Follow Us</h4>
                        <div className={styles.social}>
                            <p>Hashtag: <strong>{social.hashtag}</strong></p>
                            <div className={styles.links}>
                                <a href={social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                                <a href={social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
                                <a href={social.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.divider}></div>

                <div className={styles.bottom}>
                    <p>Simple demonstration web app intended for use during M365 Community Days DC 2026.</p>
                </div>
            </div>
        </footer>
    );
};
