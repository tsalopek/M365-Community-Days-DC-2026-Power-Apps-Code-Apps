import React, { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { authService } from '@/services/msal'
import { eventConfig } from '@/config/eventConfig'
import styles from './Sponsors.module.css'

interface Sponsor {
    id: number;
    name: string;
    url: string;
    tier: string;
}

export const Sponsors: React.FC = () => {
    const { isAuthenticated } = useAuth()
    const [sponsors, setSponsors] = useState<Sponsor[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!isAuthenticated) {
            setSponsors([])
            setError(null)
            return
        }

        const fetchSponsors = async () => {
            try {
                setLoading(true)
                setError(null)

                const listUrl = eventConfig.sharePointSponsorsUrl
                if (!listUrl) {
                    throw new Error('SharePoint sponsors URL is not configured.')
                }

                const data = await authService.fetchSharePointList(listUrl)

                // Map SharePoint list items to Sponsor interface
                const mappedSponsors: Sponsor[] = data.value.map(
                    (item: any, index: number) => ({
                        id: item.ID || index,
                        name: item.field_1 || '',
                        url: item.field_2 || '',
                        tier: item.field_3 || 'Web',
                    })
                )

                setSponsors(mappedSponsors)
            } catch (err) {
                const message = err instanceof Error ? err.message : 'Failed to fetch sponsors'
                setError(message)
                console.error('Error fetching sponsors:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchSponsors()
    }, [isAuthenticated])

    const platinumSponsors = sponsors.filter((s) => s.tier === 'Platinum')
    const goldSponsors = sponsors.filter((s) => s.tier === 'Gold')
    const webSponsors = sponsors.filter((s) => s.tier === 'Web')

    return (
        <section className={styles.section} id="sponsors">
            <div className={styles.container}>
                <h2>Sponsors</h2>

                {!isAuthenticated && (
                    <div style={{ textAlign: 'center', padding: '2rem' }}>
                        <p>Sign in with your Microsoft account to view sponsors.</p>
                    </div>
                )}

                {isAuthenticated && (
                    <>
                        {loading && <p>Loading sponsors...</p>}
                        {error && <p style={{ color: 'orange' }}>⚠️ {error}</p>}

                        {!loading && (
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
                    </>
                )}
            </div>
        </section>
    )
}
