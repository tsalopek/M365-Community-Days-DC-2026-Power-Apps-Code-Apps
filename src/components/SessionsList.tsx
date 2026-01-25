import React, { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { eventConfig } from '@/config/eventConfig'
import styles from './SessionsList.module.css'
import { Cr552_m365communitydayssessionsesService, Cr552_m365communitydayssessionsesModel } from '@/generated';

interface Session {
    id: string;
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
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                setLoading(true)
                setError(null)

                const result = await Cr552_m365communitydayssessionsesService.getAll() as { data: Cr552_m365communitydayssessionsesModel.Cr552_m365communitydayssessionses[] }
                let data: Cr552_m365communitydayssessionsesModel.Cr552_m365communitydayssessionses[] = result.data

                // Map service data to Session interface
                const mappedSessions: Session[] = data.map(
                    (item: Cr552_m365communitydayssessionsesModel.Cr552_m365communitydayssessionses, index: number) => ({
                        id: `session-${index}`,
                        title: item.cr552_title || '',
                        speaker: item.cr552_speaker || '',
                        description: item.cr552_description || '',
                        timeSlot: item.cr552_timeslot || '',
                        room: item.cr552_room || '',
                        track: item.cr552_track || 'Unassigned',
                    })
                )
                console.log('Fetched mapped sessions:', mappedSessions)
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
    }, [])

    const tracks = [...new Set(sessions.map((s) => s.track))].sort()
    const filteredSessions =
        selectedTrack === null ? sessions : sessions.filter((s) => s.track === selectedTrack)

    if (authLoading) {
        return (
            <section className={styles.section} id="sessions">
                <div className={styles.container}>
                    <h2>Sessions</h2>
                    <p>Loading...</p>
                </div>
            </section>
        )
    }

    return (
        <section className={styles.section} id="sessions">
            <div className={styles.container}>
                <h2>Sessions</h2>

                {loading && <p>Loading sessions...</p>}
                {error && <p style={{ color: 'orange' }}>⚠️ {error}</p>}

                {!loading && !error && sessions.length === 0 && (
                    <p>No sessions available.</p>
                )}

                {!loading && !error && sessions.length > 0 && (
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
            </div>
        </section>
    )
}
