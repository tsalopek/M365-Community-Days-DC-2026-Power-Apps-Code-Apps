// This file contains static data for speakers of the sessions. In a real application, 
// this data would likely come from an API or database, however, in order to perform the demo live,
// I've decided to only work with one real data source.
export interface StaticSponsor {
    tier: string
    name: string
    url: string
}

export const sponsors: StaticSponsor[] = [
    { tier: 'Platinum', name: 'EZAIX Inc.', url: 'https://www.ezaix.com/' },
    { tier: 'Platinum', name: 'DocPoint Solutions', url: 'https://www.docpointsolutions.com/' },
    { tier: 'Platinum', name: 'Andworx, LLC', url: 'https://andworx.com/' },
    { tier: 'Platinum', name: 'DAn Solutions', url: 'http://reveldata.com/' },
    { tier: 'Gold', name: 'Exclaimer', url: 'https://exclaimer.com/' },
    { tier: 'Gold', name: 'Cloudwell', url: 'https://cloudwell.io/' },
    { tier: 'Gold', name: 'Symposit', url: 'https://symposit.com/' },
    { tier: 'Gold', name: 'Acuity, Inc.', url: 'https://www.myacuity.com/' },
    { tier: 'Gold', name: 'Crow Canyon Software', url: 'https://www.crowcanyon.com/' },
    { tier: 'Web', name: 'Seisay IT Solutions', url: 'https://seisayitsolutions.com/' },
    { tier: 'Web', name: 'Packt', url: 'https://www.packtpub.com/' },
]
