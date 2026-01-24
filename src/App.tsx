import React from 'react'
import { Header } from '@/components/Header'
import { HeroImage } from '@/components/HeroImage'
import { Hero } from '@/components/Hero'
import { SessionsList } from '@/components/SessionsList'
import { Details } from '@/components/Details'
import { Sponsors } from '@/components/Sponsors'
import { Footer } from '@/components/Footer'
import styles from './App.module.css'

function App() {
    return (
        <div className={styles.container}>
            <Header />
            <HeroImage />
            <Hero />
            <SessionsList />
            <Details />
            <Sponsors />
            <Footer />
        </div>
    )
}

export default App
