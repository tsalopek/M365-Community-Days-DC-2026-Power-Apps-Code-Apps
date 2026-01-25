import React from 'react'
import styles from './Sponsors.module.css'
import { sponsors as staticSponsors } from '@/data/sponsors'

interface Sponsor {
    id: number
    name: string
    url: string
    tier: string
}

export const Sponsors: React.FC = () => {
    const sponsors: Sponsor[] = staticSponsors.map((s, index) => ({
        id: index,
        ...s,
    }))

    const platinumSponsors = sponsors.filter((s) => s.tier === 'Platinum')
    const goldSponsors = sponsors.filter((s) => s.tier === 'Gold')
    const webSponsors = sponsors.filter((s) => s.tier === 'Web')

    return (
        <section className={styles.section} id="sponsors">
            <div className={styles.container}>
                <h2>Sponsors</h2>

                {sponsors.length === 0 && (
                    <p>No sponsors available.</p>
                )}

                {sponsors.length > 0 && (
                    <>
                        {platinumSponsors.length > 0 && (
                            <div className={styles.sponsorSection}>
                                <h3 className={styles.tierName}>Platinum Sponsors</h3>
                                <div className={styles.sponsorGrid}>
                                    {platinumSponsors.map((sponsor) => (
                                        <a
                                            key={sponsor.id}
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
                        )}

                        {goldSponsors.length > 0 && (
                            <div className={styles.sponsorSection}>
                                <h3 className={styles.tierName}>Gold Sponsors</h3>
                                <div className={styles.sponsorGrid}>
                                    {goldSponsors.map((sponsor) => (
                                        <a
                                            key={sponsor.id}
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
                        )}

                        {webSponsors.length > 0 && (
                            <div className={styles.sponsorSection}>
                                <h3 className={styles.tierName}>Web Sponsors</h3>
                                <div className={styles.sponsorGrid}>
                                    {webSponsors.map((sponsor) => (
                                        <a
                                            key={sponsor.id}
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
                        )}
                    </>
                )}
            </div>
        </section>
    )
}
