import React, { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { authService } from '@/services/msal'
import { eventConfig } from '@/config/eventConfig'
import styles from './SessionsList.module.css'

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
    const { isAuthenticated, isLoading: authLoading, login, logout } = useAuth()
    const [sessions, setSessions] = useState<Session[]>([])
    const [selectedTrack, setSelectedTrack] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!isAuthenticated) {
            setSessions([])
            setError(null)
            return
        }

        const fetchSessions = async () => {
            try {
                setLoading(true)
                setError(null)

                const listUrl = eventConfig.sharePointSessionsUrl
                if (!listUrl) {
                    throw new Error('SharePoint sessions URL is not configured.')
                }

                const data = await authService.fetchSharePointList(listUrl)

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
                )

                setSessions(mappedSessions)
            } catch (err) {
                const message = err instanceof Error ? err.message : 'Failed to fetch sessions'
                setError(message)
                console.error('Error fetching sessions:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchSessions()
    }, [isAuthenticated])

    const tracks = [...new Set(sessions.map((s) => s.track))].sort()
    const filteredSessions =
        selectedTrack === null ? sessions : sessions.filter((s) => s.track === selectedTrack)

    if (authLoading) {
        return (
            <section className={styles.section} id="sessions">
                <div className={styles.container}>
                    <h2>Sessions</h2>
                    <p>Loading authentication...</p>
                </div>
            </section>
        )
    }

    return (
        <section className={styles.section} id="sessions">
            <div className={styles.container}>
                <h2>Sessions</h2>

                {!isAuthenticated && (
                    <div style={{ textAlign: 'center', padding: '2rem' }}>
                        <p>Sign in with your Microsoft account to view sessions.</p>
                        <button
                            onClick={login}
                            style={{
                                marginTop: '1rem',
                                padding: '0.75rem 1.5rem',
                                fontSize: '1rem',
                                backgroundColor: '#0078d4',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontWeight: '500',
                            }}
                        >
                            Sign in with Microsoft
                        </button>
                    </div>
                )}

                {isAuthenticated && (
                    <>
                        <div style={{ marginBottom: '1rem', textAlign: 'right' }}>
                            <button
                                onClick={logout}
                                style={{
                                    padding: '0.5rem 1rem',
                                    fontSize: '0.9rem',
                                    backgroundColor: '#f3f2f1',
                                    color: '#323130',
                                    border: '1px solid #d0d0d0',
                                    borderRadius: '2px',
                                    cursor: 'pointer',
                                }}
                            >
                                Sign out
                            </button>
                        </div>

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
                                    {tracks.map((track) => (
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
                                    {filteredSessions.map((session) => (
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
    )
}
