// This file contains static data for speakers of the sessions. In a real application, 
// this data would likely come from an API or database, however, in order to perform the demo live,
//  I've decided to only work with one real data source.
export interface StaticSpeaker {
    id: string
    name: string
    title: string
    bio: string
    sessions: string
    company?: string
}

export const speakers: StaticSpeaker[] = [
    { id: '1', name: 'Matthew J. Bailey', title: 'AI Specialist', bio: 'Expert in Microsoft AI tools and implementation', sessions: '1' },
    { id: '2', name: 'Stalin Ponnusamy', title: 'Power Platform Governance Expert', bio: 'Specialist in Power Platform governance and security', sessions: '2' },
    { id: '3', name: 'Azhavee Grajeda', title: 'Microsoft 365 Administrator', bio: 'Expert in Microsoft 365 administration and security', sessions: '3' },
    { id: '4', name: 'Karen Dredske', title: 'Security & Compliance Expert', bio: 'Specialist in sensitivity labels and data protection', sessions: '4' },
    { id: '5', name: 'Samir Makwana', title: 'Copilot Studio Expert', bio: 'Developer specializing in Copilot Studio agents', sessions: '5' },
    { id: '6', name: 'Peter Ward', title: 'AI Strategy Leader', bio: 'Expert in AI adoption and AI agents', sessions: '6' },
    { id: '7', name: 'John Kerski', title: 'Power BI & SharePoint Expert', bio: 'Specialist in data analytics and Power BI', sessions: '7' },
    { id: '8', name: 'Mayuri Lahane', title: 'GitHub Copilot Expert', bio: 'Specialist in GitHub Copilot and AI development tools', sessions: '8' },
    { id: '9', name: 'Mitch Salopek', title: 'Power Apps Expert', bio: 'Microsoft MVP specializing in Power Apps Code-First development', sessions: '9,32' },
    { id: '10', name: 'Susan Hanley', title: 'Digital Workplace & Governance Expert', bio: 'Expert in intranet governance and Microsoft Viva', sessions: '10' },
]
