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
    social: {
        hashtag: "#M365DC",
        linkedin: "https://linkedin.com/company/m365dc-community",
        instagram: "https://instagram.com/m365dc",
        twitter: "https://x.com/search?q=%23M365Community"
    },
    sharePointSessionsUrl: import.meta.env.VITE_SHAREPOINT_SESSIONS_URL,
};
