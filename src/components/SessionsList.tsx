'use client';

import React, { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import styles from './SessionsList.module.css';

interface Session {
    id: number;
    title: string;
    speaker: string;
    description: string;
    timeSlot: string;
    room: string;
    track: string;
}

export const SessionsList: React.FC = () => {
    const { data: session, status } = useSession();
    const [sessions, setSessions] = useState<Session[]>([]);
    const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (status !== 'authenticated') {
            setLoading(false);
            return;
        }

        const fetchSessions = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch('/api/sessions');

                if (!response.ok) {
                    const data = await response.json();
                    throw new Error(data.error || `Failed to fetch sessions: ${response.statusText}`);
                }

                const data = await response.json();

                // Map SharePoint list items to Session interface
                // SharePoint uses internal field names (field_1, field_2, etc.)
                const mappedSessions: Session[] = data.value.map(
                    (item: any, index: number) => ({
                        id: item.ID || index,
                        title: item.field_1 || '',
                        speaker: item.field_2 || '',
                        description: item.field_3 || '',
                        timeSlot: item.field_4 || '',
                        room: item.field_5 || '',
                        track: item.field_6 || 'Unassigned',
                    })
                );

                setSessions(mappedSessions);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : 'Failed to load sessions from SharePoint'
                );
                console.error('Error fetching sessions:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchSessions();
    }, [status]);

    const tracks = [...new Set(sessions.map(s => s.track))].sort();
    const filteredSessions = selectedTrack
        ? sessions.filter(s => s.track === selectedTrack)
        : sessions;

    return (
        <section className={styles.section} id="sessions">
            <div className={styles.container}>
                <h2>Sessions</h2>

                {status === 'unauthenticated' && (
                    <div style={{ textAlign: 'center', padding: '2rem' }}>
                        <p>Sign in with your Microsoft account to view sessions.</p>
                        <button
                            onClick={() => signIn('azure-ad')}
                            style={{
                                padding: '0.75rem 1.5rem',
                                fontSize: '1rem',
                                backgroundColor: '#0078d4',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                        >
                            Sign in with Microsoft
                        </button>
                    </div>
                )}

                {status === 'loading' && <p>Loading...</p>}

                {status === 'authenticated' && (
                    <>
                        {loading && <p>Loading sessions...</p>}
                        {error && <p style={{ color: 'orange' }}>⚠️ {error}</p>}

                        {!loading && (
                            <>
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
                            </>
                        )}
                    </>
                )}
            </div>
        </section>
    );
};
