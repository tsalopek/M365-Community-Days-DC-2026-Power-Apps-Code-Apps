'use client';

import React, { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import styles from './Sponsors.module.css';

interface Sponsor {
    id: number;
    name: string;
    url: string;
    tier: string;
}

export const Sponsors: React.FC = () => {
    const { data: session, status } = useSession();
    const [sponsors, setSponsors] = useState<Sponsor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (status !== 'authenticated') {
            setLoading(false);
            return;
        }

        const fetchSponsors = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch('/api/sponsors');

                if (!response.ok) {
                    const data = await response.json();
                    throw new Error(data.error || `Failed to fetch sponsors: ${response.statusText}`);
                }

                const data = await response.json();

                // Map SharePoint list items to Sponsor interface
                const mappedSponsors: Sponsor[] = data.value.map(
                    (item: any, index: number) => ({
                        id: item.ID || index,
                        name: item.field_1 || '',
                        url: item.field_2 || '',
                        tier: item.field_3 || 'Web',
                    })
                );

                setSponsors(mappedSponsors);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : 'Failed to load sponsors from SharePoint'
                );
                console.error('Error fetching sponsors:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchSponsors();
    }, [status]);

    const platinumSponsors = sponsors.filter(s => s.tier === 'Platinum');
    const goldSponsors = sponsors.filter(s => s.tier === 'Gold');
    const webSponsors = sponsors.filter(s => s.tier === 'Web');

    return (
        <section className={styles.section} id="sponsors">
            <div className={styles.container}>
                <h2>Sponsors</h2>

                {status === 'unauthenticated' && (
                    <div style={{ textAlign: 'center', padding: '2rem' }}>
                        <p>Sign in with your Microsoft account to view sponsors.</p>
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
    );
};
