import React from 'react'
import styles from './Speakers.module.css'
import { speakers as staticSpeakers } from '@/data/speakers'

interface Speaker {
    id: string
    name: string
    title: string
    bio: string
    company?: string
}

export const Speakers: React.FC = () => {
    const speakers: Speaker[] = staticSpeakers

    return (
        <section className={styles.section} id="speakers">
            <div className={styles.container}>
                <h2>Speakers</h2>

                {speakers.length === 0 && (
                    <p>No speakers available yet.</p>
                )}

                {speakers.length > 0 && (
                    <div className={styles.speakersGrid}>
                        {speakers.map((speaker) => (
                            <div key={speaker.id} className={styles.speakerCard}>
                                <h3>{speaker.name}</h3>
                                <p className={styles.title}>{speaker.title}</p>
                                {speaker.company && <p className={styles.company}>{speaker.company}</p>}
                                <p className={styles.bio}>{speaker.bio}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
