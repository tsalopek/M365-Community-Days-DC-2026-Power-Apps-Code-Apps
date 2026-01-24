import type { Metadata } from "next";
import { AuthSessionProvider } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
    title: "M365 Community Days DC 2026",
    description: "Microsoft DC Community: Discover, Connect, Thrive",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <AuthSessionProvider>
                    {children}
                </AuthSessionProvider>
            </body>
        </html>
    );
}
