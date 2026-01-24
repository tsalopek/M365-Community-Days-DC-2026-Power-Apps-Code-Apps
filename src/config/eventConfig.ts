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
            title: "Opening Keynote: When to Use Which AI Tool in the Microsoft Cloud",
            speaker: "Matthew J. Bailey",
            description: "Learn which AI tool is best for your needs—comparing custom Copilots, Agent Builder, SharePoint AI, Copilot Studio, AI Builder, and Azure AI Foundry.",
            timeSlot: "9:00 AM - 9:30 AM",
            room: "Envisioning Theater",
            track: "AI & Copilot"
        },
        {
            id: 2,
            title: "Mastering Power Platform Governance: Strategies for Security, Compliance, and Control",
            speaker: "Stalin Ponnusamy",
            description: "Explore proven strategies to establish strong governance across Power Platform environments including DLP policies, RBAC, and Environment Management.",
            timeSlot: "9:30 AM - 12:30 PM",
            room: "Great Falls",
            track: "Power Platform"
        },
        {
            id: 3,
            title: "What Microsoft 365 Admins Must Know in the Age of AI",
            speaker: "Azhavee Grajeda",
            description: "Hands-on workshop equipping Microsoft 365 admins with modern skills and governance mindset needed to operate and protect an AI-powered tenant.",
            timeSlot: "9:30 AM - 12:30 PM",
            room: "York",
            track: "Security"
        },
        {
            id: 4,
            title: "How Sensitivity Labels Protect Your Organization from Oversharing with Copilot",
            speaker: "Karen Dredske",
            description: "Learn about sensitivity labels, retention labels, and DLP policies and how they work together to extend security and compliance in a tenant.",
            timeSlot: "1:30 PM - 4:30 PM",
            room: "Envisioning Theater",
            track: "Security"
        },
        {
            id: 5,
            title: "Bring Copilot Studio Agents to Life with Power Automate & Azure Functions",
            speaker: "Samir Makwana",
            description: "Build a secure IT Service Desk agent that searches KB articles, creates requests in SharePoint Lists, and runs privileged actions via Azure Functions.",
            timeSlot: "1:30 PM - 4:30 PM",
            room: "York",
            track: "Power Platform"
        },
        {
            id: 6,
            title: "How to Make AI Agents Your New Intern",
            speaker: "Peter Ward",
            description: "Learn how AI agents are taking on entry-level and repetitive tasks, reshaping entry-level work and freeing humans for complex, creative, strategic tasks.",
            timeSlot: "9:00 AM - 9:40 AM",
            room: "Envisioning Theater",
            track: "AI & Copilot"
        },
        {
            id: 7,
            title: "Querying SharePoint Data in Power BI - Options & Performance",
            speaker: "John Kerski",
            description: "Review ways to connect to SharePoint within Power BI and techniques to improve refresh times.",
            timeSlot: "9:40 AM - 10:30 AM",
            room: "Great Falls",
            track: "SharePoint"
        },
        {
            id: 8,
            title: "Getting Started with GitHub Copilot in VS Code",
            speaker: "Mayuri Lahane",
            description: "Hands-on introduction to GitHub Copilot in Visual Studio Code, showcasing code generation, refactoring, documentation, and real-world use cases.",
            timeSlot: "9:40 AM - 10:30 AM",
            room: "York",
            track: "Developer"
        },
        {
            id: 9,
            title: "Power Apps and Power Automate - Government Success Stories",
            speaker: "Jeremy Wood",
            description: "Real-world use cases where Power Apps and Power Automate have been employed in government to meet business needs.",
            timeSlot: "9:40 AM - 10:30 AM",
            room: "13.1A",
            track: "Power Platform"
        },
        {
            id: 10,
            title: "Ensure Your Intranet is Ready for Copilot: How to Plan an Effective Governance Strategy",
            speaker: "Susan Hanley",
            description: "Learn how to plan and implement governance for your intranet, Microsoft Viva, and Microsoft 365 in a way that actually works.",
            timeSlot: "9:40 AM - 10:30 AM",
            room: "13.1B",
            track: "SharePoint"
        },
        {
            id: 11,
            title: "Getting Started with Data Governance in Microsoft Purview",
            speaker: "Nick Brattoli",
            description: "Unlock the potential of your data with Microsoft Purview! Learn essentials of data governance and master the Data Map and Unified Catalog.",
            timeSlot: "9:40 AM - 10:30 AM",
            room: "13.1D",
            track: "Security"
        },
        {
            id: 12,
            title: "How to Create Your Own Business to Deliver M365 Engagements",
            speaker: "Greg Chong",
            description: "Learn how to start your own business to architect or implement M365 solutions, covering financial, technical, and administrative perspectives.",
            timeSlot: "9:40 AM - 10:30 AM",
            room: "13.2A",
            track: "Community"
        },
        {
            id: 13,
            title: "Amplify Adoption: Driving Copilot Awareness with Viva Amplify",
            speaker: "Shari Oswald",
            description: "Hands-on workshop using Viva Amplify to plan and deliver a Copilot adoption campaign with multi-channel messaging.",
            timeSlot: "9:40 AM - 10:30 AM",
            room: "13.2E",
            track: "AI & Copilot"
        },
        {
            id: 14,
            title: "Dataverse: Everything, Everywhere, Here and There",
            speaker: "Charles Lakes II",
            description: "Learn why Microsoft Dataverse is the better data storage offering for enterprise low-code and pro-code initiatives.",
            timeSlot: "11:00 AM - 11:50 AM",
            room: "Envisioning Theater",
            track: "Power Platform"
        },
        {
            id: 15,
            title: "What is Microsoft Fabric?",
            speaker: "David Patrick",
            description: "Comprehensive overview of Microsoft Fabric, an end-to-end analytics and data platform for enterprises.",
            timeSlot: "11:00 AM - 11:50 AM",
            room: "Great Falls",
            track: "AI & Copilot"
        },
        {
            id: 16,
            title: "From Copilot Curiosity to AI-First IT: Real-Time RCA, Autonomous Helpdesk & Measurable ROI",
            speaker: "Palwinder Singh",
            description: "Show how to become an AI-first organization with small, high-impact wins across Microsoft Teams and M365.",
            timeSlot: "11:00 AM - 11:50 AM",
            room: "York",
            track: "AI & Copilot"
        },
        {
            id: 17,
            title: "From Concert Hall to Code Review, Symphony to Software",
            speaker: "Sarah Peters",
            description: "Learn teamwork and collaboration lessons from a professional violinist turned software developer.",
            timeSlot: "11:00 AM - 11:50 AM",
            room: "13.1A",
            track: "Community"
        },
        {
            id: 18,
            title: "No More Manual Moves: Automating Copilot Agent Lifecycle with Power Platform Pipelines",
            speaker: "Rafsan Huseyinov",
            description: "Build Power Platform pipelines to support Copilot Studio agent solutions with automated deployment, versioning, and governance.",
            timeSlot: "11:00 AM - 11:50 AM",
            room: "13.1B",
            track: "Power Platform"
        },
        {
            id: 19,
            title: "Challenge: MS Teams + Power Platform for Single Tenant Application Lifecycle Environments",
            speaker: "Richard Toland",
            description: "Examine possibilities of leveraging a Microsoft Team and private channels for segmented Power Platform environments.",
            timeSlot: "11:00 AM - 11:50 AM",
            room: "13.1C",
            track: "Teams"
        },
        {
            id: 20,
            title: "Secure Microsoft 365 at the Era of AI",
            speaker: "Clément Serafin",
            description: "Discover how to secure Microsoft 365 AI functionalities and deploy agents to help secure Entra and 365.",
            timeSlot: "11:00 AM - 11:50 AM",
            room: "13.1D",
            track: "Security"
        },
        {
            id: 21,
            title: "Building Your First Agent with Copilot Studio",
            speaker: "Alan Cox",
            description: "Demo-packed session showing how to build a domain-specific agent in under an hour with Copilot Studio.",
            timeSlot: "11:00 AM - 11:50 AM",
            room: "13.2A",
            track: "AI & Copilot"
        },
        {
            id: 22,
            title: "From Files to Intelligence: Designing the Knowledge Layer for AI Agents",
            speaker: "Jamel Abed",
            description: "Learn technical foundations for designing knowledge layers that make enterprise content usable for AI-driven experiences.",
            timeSlot: "11:00 AM - 11:50 AM",
            room: "13.2E",
            track: "AI & Copilot"
        },
        {
            id: 23,
            title: "Civic Agents in Practice: The Next Phase of AI for Government Workflows",
            speaker: "Himanshu Goil",
            description: "See how Civic Agents can meaningfully assist public staff in their everyday responsibilities.",
            timeSlot: "12:00 PM - 12:50 PM",
            room: "Envisioning Theater",
            track: "Government"
        },
        {
            id: 24,
            title: "Turn Up the Volume: How Viva Amplify Elevates Your Communications",
            speaker: "Shari Oswald",
            description: "Learn how to streamline communication planning and publish content across Microsoft 365 channels at scale.",
            timeSlot: "1:00 PM - 1:50 PM",
            room: "Great Falls",
            track: "SharePoint"
        },
        {
            id: 25,
            title: "Modernizing Leave & Work Location Tracking with the Power Platform",
            speaker: "Sophia Reitz & John Burgess",
            description: "See how to streamline hybrid work challenges through a customizable group calendar solution with Power Apps and Power Automate.",
            timeSlot: "1:00 PM - 1:50 PM",
            room: "York",
            track: "Power Platform"
        },
        {
            id: 26,
            title: "AI Governance for Government Agencies: Frameworks, Risks, and Real-World Scenario",
            speaker: "Shadeed Eleazer",
            description: "Equip yourself with foundations of effective AI governance tailored for government environments.",
            timeSlot: "1:00 PM - 1:50 PM",
            room: "13.1A",
            track: "Government"
        },
        {
            id: 27,
            title: "Strengthen cyber resilience for Entra ID and Microsoft 365",
            speaker: "Vanessa Toves",
            description: "Uncover key vulnerabilities and actionable strategies to strengthen your data security posture against evolving threats.",
            timeSlot: "1:00 PM - 1:50 PM",
            room: "13.1B",
            track: "Security"
        },
        {
            id: 28,
            title: "Freelancing in Power Platform: My Journey, and How You Can Start Yours",
            speaker: "Denes Halasz",
            description: "Learn how to move from business analyst to Power Platform freelancer with practical insights.",
            timeSlot: "1:00 PM - 1:50 PM",
            room: "13.1C",
            track: "Power Platform"
        },
        {
            id: 29,
            title: "How to Build a Gen AI Chatbot in 3 Steps",
            speaker: "Kate Faailand",
            description: "In-depth look into developing a generative AI chatbot with Microsoft's cutting-edge technologies.",
            timeSlot: "1:00 PM - 1:50 PM",
            room: "13.1D",
            track: "AI & Copilot"
        },
        {
            id: 30,
            title: "M365 Hardening - Mandatory Security Configurations",
            speaker: "Kishore Bitra",
            description: "Learn about security configurations and optimal practices for setting up policies across Microsoft 365 services.",
            timeSlot: "1:00 PM - 1:50 PM",
            room: "13.2A",
            track: "Security"
        },
        {
            id: 31,
            title: "From Idea to Agent: Simple Copilot Automations That Drive Customer Value",
            speaker: "Sylvester Gittens",
            description: "Learn how to turn everyday work problems into small Copilot agent projects that deliver quick wins.",
            timeSlot: "1:00 PM - 1:50 PM",
            room: "13.2E",
            track: "AI & Copilot"
        },
        {
            id: 32,
            title: "Developing and Deploying Custom, Code-First Web Apps with Power Apps Code Apps",
            speaker: "Mitch Salopek",
            description: "Learn how to wrap existing code-first web apps as Power Apps Code Apps and deploy with Power Platform capabilities.",
            timeSlot: "2:00 PM - 2:50 PM",
            room: "Envisioning Theater",
            track: "Power Platform"
        },
        {
            id: 33,
            title: "Maximize your SharePoint Content with No-Code Custom Copilots",
            speaker: "Matt Wade",
            description: "Create custom Q&A Copilots without writing code, focused on specific knowledge sources.",
            timeSlot: "2:00 PM - 2:50 PM",
            room: "Great Falls",
            track: "SharePoint"
        },
        {
            id: 34,
            title: "Strategic AI Adoption: Lessons Learned from Scaling Copilot Across the Enterprise",
            speaker: "Jill Hannemann",
            description: "Learn how to develop a practical roadmap, establish governance, and ensure security while scaling Copilot.",
            timeSlot: "2:00 PM - 2:50 PM",
            room: "York",
            track: "AI & Copilot"
        },
        {
            id: 35,
            title: "Make Your Power BI Desktop Report Print-Ready (In One Hour or Less)",
            speaker: "Lenore Flower",
            description: "Convert a Power BI report into its paginated equivalent using Power BI Report Builder.",
            timeSlot: "2:00 PM - 2:50 PM",
            room: "13.1A",
            track: "AI & Copilot"
        },
        {
            id: 36,
            title: "Build Apps of the Future: Power Platform Reborn",
            speaker: "Manpreet Singh",
            description: "Explore how Power Platform AI is redefining what's possible across Power Apps, Power Automate, Dataverse, Power Pages, and Copilot Agents.",
            timeSlot: "2:00 PM - 2:50 PM",
            room: "13.1B",
            track: "Power Platform"
        },
        {
            id: 37,
            title: "Data Governance in the Age of Copilot",
            speaker: "Patrick Cash-Peterson",
            description: "Learn about scenarios where permissions could lead to Copilot viewing sensitive information.",
            timeSlot: "2:00 PM - 2:50 PM",
            room: "13.1C",
            track: "Security"
        },
        {
            id: 38,
            title: "From Copilot Studio to Azure AI Foundry - Scaling Agents from Low-Code to Enterprise-Grade",
            speaker: "Madhavi Najana",
            description: "Learn how to evolve AI agents from Copilot Studio into enterprise-grade solutions using Azure AI Foundry.",
            timeSlot: "2:00 PM - 2:50 PM",
            room: "13.2A",
            track: "AI & Copilot"
        },
        {
            id: 39,
            title: "Zero Trust for the AI Era: Securing Today's Cloud with Microsoft's Well-Architected Principles",
            speaker: "Saul Patino",
            description: "Learn how to implement Zero Trust principles within modern AI environments.",
            timeSlot: "2:00 PM - 2:50 PM",
            room: "13.2E",
            track: "Security"
        },
        {
            id: 40,
            title: "Supercharging SharePoint, Outlook and OneDrive with Power Platform",
            speaker: "Hasan Jamal (Jammy) Siddiqui",
            description: "Learn how to automate, innovate, and transform with Power Platform integration across Microsoft 365 tools.",
            timeSlot: "3:10 PM - 4:00 PM",
            room: "Envisioning Theater",
            track: "SharePoint"
        },
        {
            id: 41,
            title: "Agent-First with Copilot Studio & Power Platform: from Pilot to Scale",
            speaker: "Nicolas Georgeault",
            description: "Learn how to turn agent-first ideas into an execution blueprint for Microsoft 365 organizations.",
            timeSlot: "3:10 PM - 4:00 PM",
            room: "Great Falls",
            track: "Power Platform"
        },
        {
            id: 42,
            title: "Intelligent Document Processing in Microsoft 365",
            speaker: "Mohamed Derhalli",
            description: "Learn how to transform Microsoft 365 into your intelligent document powerhouse with automation.",
            timeSlot: "3:10 PM - 4:00 PM",
            room: "York",
            track: "SharePoint"
        },
        {
            id: 43,
            title: "SharePoint Brand Center in Real Life: Wins, Fails, and Everything In-Between",
            speaker: "Diego Domingos da Silva",
            description: "Real-world experiences deploying SharePoint Brand Center across an enterprise.",
            timeSlot: "3:10 PM - 4:00 PM",
            room: "13.1A",
            track: "SharePoint"
        },
        {
            id: 44,
            title: "Improving Your Azure Governance with Bicep & GitHub Copilot",
            speaker: "Elkhan Yusubov",
            description: "Learn how to use Bicep and GitHub Copilot to strengthen your Azure governance strategy.",
            timeSlot: "3:10 PM - 4:00 PM",
            room: "13.1B",
            track: "Developer"
        },
        {
            id: 45,
            title: "Data Loss Prevention in the Age of AI",
            speaker: "Carley Salmon",
            description: "Learn how Data Loss Prevention evolves in the era of AI to safeguard sensitive information.",
            timeSlot: "3:10 PM - 4:00 PM",
            room: "13.1C",
            track: "Security"
        },
        {
            id: 46,
            title: "Building Modern Intelligent Solutions with the Power Platform and Azure AI",
            speaker: "Jason Rivera",
            description: "Learn how to design and deliver modern intelligent solutions combining Power Platform with Azure AI.",
            timeSlot: "3:10 PM - 4:00 PM",
            room: "13.1D",
            track: "AI & Copilot"
        },
        {
            id: 47,
            title: "Elevating Productivity with Teams AI Tools",
            speaker: "Satish Upadhyaya",
            description: "Comprehensive walkthrough of the newest AI-powered features in Microsoft Teams.",
            timeSlot: "3:10 PM - 4:00 PM",
            room: "13.2A",
            track: "Teams"
        },
        {
            id: 48,
            title: "AI Fluency vs. Tool Mastery: The Skills That Will Define the Modern Workplace",
            speaker: "Deborah McIsaac",
            description: "Learn the critical skills of AI fluency and how to shift from task-based prompting to outcome-driven strategies.",
            timeSlot: "3:10 PM - 4:00 PM",
            room: "13.2E",
            track: "AI & Copilot"
        }
    ],
    speakers: [
        {
            id: 1,
            name: "Matthew J. Bailey",
            title: "AI Specialist",
            bio: "Expert in Microsoft AI tools and implementation",
            sessions: [1]
        },
        {
            id: 2,
            name: "Stalin Ponnusamy",
            title: "Power Platform Governance Expert",
            bio: "Specialist in Power Platform governance and security",
            sessions: [2]
        },
        {
            id: 3,
            name: "Azhavee Grajeda",
            title: "Microsoft 365 Administrator",
            bio: "Expert in Microsoft 365 administration and security",
            sessions: [3]
        },
        {
            id: 4,
            name: "Karen Dredske",
            title: "Security & Compliance Expert",
            bio: "Specialist in sensitivity labels and data protection",
            sessions: [4]
        },
        {
            id: 5,
            name: "Samir Makwana",
            title: "Copilot Studio Expert",
            bio: "Developer specializing in Copilot Studio agents",
            sessions: [5]
        },
        {
            id: 6,
            name: "Peter Ward",
            title: "AI Strategy Leader",
            bio: "Expert in AI adoption and AI agents",
            sessions: [6]
        },
        {
            id: 7,
            name: "John Kerski",
            title: "Power BI & SharePoint Expert",
            bio: "Specialist in data analytics and Power BI",
            sessions: [7]
        },
        {
            id: 8,
            name: "Mayuri Lahane",
            title: "GitHub Copilot Expert",
            bio: "Specialist in GitHub Copilot and AI development tools",
            sessions: [8]
        },
        {
            id: 9,
            name: "Mitch Salopek",
            title: "Power Apps Expert",
            bio: "Microsoft MVP specializing in Power Apps Code-First development",
            sessions: [9, 32]
        },
        {
            id: 10,
            name: "Susan Hanley",
            title: "Digital Workplace & Governance Expert",
            bio: "Expert in intranet governance and Microsoft Viva",
            sessions: [10]
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
