// Event configuration with static data
export const eventConfig = {
    event: {
        name: "M365 Community Days DC 2026",
        tagline: "Microsoft DC Community: Discover, Connect, Thrive",
        dates: {
            start: "2026-01-29",
            end: "2026-01-30",
            displayStart: "Thu, 29 Jan 2026, 9:00 AM",
            displayEnd: "Fri, 30 Jan 2026, 5:00 PM",
            doorsOpen: "8:30 AM",
            sessionsStart: "9:00 AM",
            sessionsEnd: "5:00 PM"
        },
        location: {
            name: "Microsoft Innovation Hub",
            address: "1300 Wilson Boulevard",
            city: "Arlington",
            state: "VA",
            zip: "22209",
            country: "United States",
            coordinates: {
                lat: 38.894356,
                lng: -77.07268
            }
        },
        description: "The conference brings together Microsoft MVPs, Regional Directors, Microsoft employees, and professionals from across the DMV and beyond. Whether you're just getting started with Microsoft 365 or are an experienced practitioner, you'll find valuable learning, connections, and inspiration.",
        fullDescription: "Expect a packed schedule with sessions across the Microsoft 365 ecosystem—including Power Platform, SharePoint, Teams, Azure, Security, AI, and Copilot(s). From keynotes and breakout sessions to hands-on workshops and unconference discussions, you'll leave with practical skills and fresh ideas to take back to your organization.",
        ticketPrice: 20,
        ticketCurrency: "USD",
        registrationUrl: "https://aka.ms/m365dc/ticket",
        registrationDeadline: "2026-01-30",
        charityPartner: {
            name: "Computer CORE",
            url: "https://www.computercore.org/",
            description: "Computer CORE is a 501.3c non-profit whose mission is to prepare underserved adults in Virginia to realize career aspirations with foundational digital and professional skills."
        }
    },
    sessions: [
        {
            id: 1,
            title: "Opening Keynote: The Future of AI in Microsoft 365",
            speaker: "Microsoft Leadership",
            description: "Discover how AI and Copilot are transforming productivity across Microsoft 365 applications, from Word to Teams to Excel.",
            timeSlot: "9:00 AM - 10:00 AM",
            room: "Grand Ballroom",
            track: "Keynote"
        },
        {
            id: 2,
            title: "Power Apps Code-First Development: Building Enterprise Solutions",
            speaker: "Mitch Salopek, MVP",
            description: "Learn how to build scalable enterprise applications using Power Apps with a code-first approach. Perfect for developers.",
            timeSlot: "10:15 AM - 11:15 AM",
            room: "Crystal A",
            track: "Power Platform"
        },
        {
            id: 3,
            title: "SharePoint Site Design & Hub Governance at Scale",
            speaker: "Community Expert",
            description: "Best practices for managing modern SharePoint environments, site designs, and hub governance for enterprise organizations.",
            timeSlot: "10:15 AM - 11:15 AM",
            room: "Crystal B",
            track: "SharePoint"
        },
        {
            id: 4,
            title: "Building Custom Microsoft Teams Apps",
            speaker: "Developer Expert",
            description: "Hands-on workshop building custom Teams applications and integrations using the latest Microsoft Teams SDK and APIs.",
            timeSlot: "11:30 AM - 12:30 PM",
            room: "Crystal A",
            track: "Teams"
        },
        {
            id: 5,
            title: "Azure Security Best Practices for Microsoft 365",
            speaker: "Security Specialist",
            description: "Deep dive into Azure security architecture, identity protection, and compliance strategies for Microsoft 365 environments.",
            timeSlot: "11:30 AM - 12:30 PM",
            room: "Crystal C",
            track: "Security"
        },
        {
            id: 6,
            title: "Copilot Pro: Maximizing AI in Your Organization",
            speaker: "AI Strategy Lead",
            description: "Explore Copilot Pro features and how organizations can implement AI responsibly to enhance productivity and experience.",
            timeSlot: "1:30 PM - 2:30 PM",
            room: "Crystal A",
            track: "AI & Copilot"
        },
        {
            id: 7,
            title: "Governance & Compliance in Power Platform",
            speaker: "Governance Expert",
            description: "Establish guardrails and governance policies to ensure Power Platform adoption is secure, compliant, and sustainable.",
            timeSlot: "1:30 PM - 2:30 PM",
            room: "Crystal B",
            track: "Power Platform"
        },
        {
            id: 8,
            title: "Unconference: Community Q&A & Networking",
            speaker: "Community Leaders",
            description: "Open discussion session where community members ask questions and share experiences on various Microsoft 365 topics.",
            timeSlot: "3:00 PM - 4:00 PM",
            room: "Networking Lounge",
            track: "Community"
        }
    ],
    speakers: [
        {
            id: 1,
            name: "Mitch Salopek",
            title: "Power Apps Expert",
            bio: "Microsoft MVP and Power Apps specialist",
            sessions: [2]
        }
    ],
    sponsors: {
        platinum: [
            { name: "EZAIX Inc.", url: "https://www.ezaix.com/" },
            { name: "DocPoint Solutions", url: "https://www.docpointsolutions.com/" },
            { name: "Andworx, LLC", url: "https://andworx.com/" },
            { name: "DAn Solutions", url: "http://reveldata.com/" }
        ],
        gold: [
            { name: "Exclaimer", url: "https://exclaimer.com/" },
            { name: "Cloudwell", url: "https://cloudwell.io/" },
            { name: "Symposit", url: "https://symposit.com/" },
            { name: "Acuity, Inc.", url: "https://www.myacuity.com/" },
            { name: "Crow Canyon Software", url: "https://www.crowcanyon.com/" }
        ],
        web: [
            { name: "Seisay IT Solutions", url: "https://seisayitsolutions.com/" },
            { name: "Packt", url: "https://www.packtpub.com/" }
        ]
    },
    social: {
        hashtag: "#M365DC",
        linkedin: "https://linkedin.com/company/m365dc-community",
        instagram: "https://instagram.com/m365dc",
        twitter: "https://x.com/search?q=%23M365Community"
    }
};
