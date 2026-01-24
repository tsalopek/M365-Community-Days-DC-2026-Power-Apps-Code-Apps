import type { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import AzureADProvider from 'next-auth/providers/azure-ad';

export const authOptions: NextAuthOptions = {
    providers: [
        AzureADProvider({
            clientId: process.env.AZURE_AD_CLIENT_ID || '',
            clientSecret: process.env.AZURE_AD_CLIENT_SECRET || '',
            tenantId: process.env.AZURE_AD_TENANT_ID || 'common',
            authorization: {
                params: {
                    scope: 'openid profile email https://andworx.sharepoint.com/.default',
                },
            },
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session({ session, token }) {
            (session as any).accessToken = token.accessToken;
            return session;
        },
    },
};

export const { auth } = NextAuth(authOptions);
