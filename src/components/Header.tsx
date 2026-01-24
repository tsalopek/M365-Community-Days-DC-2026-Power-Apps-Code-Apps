import React from 'react';
import styles from './Header.module.css';

export const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <h1>Community Days</h1>
                </div>
                <nav className={styles.nav}>
                    <a href="#home" className={styles.navLink}>Home</a>
                    <a href="#sessions" className={styles.navLink}>Sessions</a>
                    <a href="#speakers" className={styles.navLink}>Speakers</a>
                    <a href="#schedule" className={styles.navLink}>Schedule</a>
                    <a href="#sponsors" className={styles.navLink}>Sponsors</a>
                    <a href="#contact" className={styles.navLink}>Contact</a>
                </nav>
            </div>
        </header>
    );
};
