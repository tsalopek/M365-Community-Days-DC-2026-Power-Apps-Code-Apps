import React from 'react'
import { sponsors } from '@/data/sponsors'
import styles from './Sponsors.module.css'

export const Sponsors: React.FC = () => {
    const platinumSponsors = sponsors.filter((s) => s.tier === 'Platinum')
    const goldSponsors = sponsors.filter((s) => s.tier === 'Gold')
    const webSponsors = sponsors.filter((s) => s.tier === 'Web')

    return (
        <section className={styles.section} id="sponsors">
            <div className={styles.container}>
                <h2>Sponsors</h2>

                {platinumSponsors.length > 0 && (
                    <div className={styles.sponsorSection}>
                        <h3 className={styles.tierName}>Platinum Sponsors</h3>
                        <div className={styles.sponsorGrid}>
                            {platinumSponsors.map((sponsor, index) => (
                                <a
                                    key={index}
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
                            {goldSponsors.map((sponsor, index) => (
                                <a
                                    key={index}
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
                            {webSponsors.map((sponsor, index) => (
                                <a
                                    key={index}
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
            </div>
        </section>
    )
}
