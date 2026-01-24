'use client';

import React, { useState } from 'react';
import { eventConfig } from '@/config/eventConfig';
import styles from './SessionsList.module.css';

export const SessionsList: React.FC = () => {
    const [selectedTrack, setSelectedTrack] = useState<string | null>(null);

    const tracks = [...new Set(eventConfig.sessions.map(s => s.track))];
    const filteredSessions = selectedTrack
        ? eventConfig.sessions.filter(s => s.track === selectedTrack)
        : eventConfig.sessions;

    return (
        <section className={styles.section} id="sessions">
            <div className={styles.container}>
                <h2>Sessions</h2>

                <div className={styles.filters}>
                    <button
                        className={`${styles.filterBtn} ${!selectedTrack ? styles.active : ''}`}
                        onClick={() => setSelectedTrack(null)}
                    >
                        All Sessions
                    </button>
                    {tracks.map(track => (
                        <button
                            key={track}
                            className={`${styles.filterBtn} ${selectedTrack === track ? styles.active : ''}`}
                            onClick={() => setSelectedTrack(track)}
                        >
                            {track}
                        </button>
                    ))}
                </div>

                <div className={styles.sessionGrid}>
                    {filteredSessions.map(session => (
                        <div key={session.id} className={styles.sessionCard}>
                            <div className={styles.sessionHeader}>
                                <h3>{session.title}</h3>
                                <span className={styles.track}>{session.track}</span>
                            </div>
                            <p className={styles.speaker}>{session.speaker}</p>
                            <p className={styles.description}>{session.description}</p>
                            <div className={styles.sessionMeta}>
                                <span className={styles.time}>{session.timeSlot}</span>
                                <span className={styles.room}>{session.room}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
