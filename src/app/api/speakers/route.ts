import { eventConfig } from '@/config/eventConfig';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';

export async function GET(request: Request) {
    try {
        // Check authentication
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return Response.json(
                { error: 'Unauthorized. Please sign in to view speakers.' },
                { status: 401 }
            );
        }

        const listUrl = eventConfig.sharePointSpeakersUrl;
        if (!listUrl) {
            return Response.json({ error: 'SharePoint speakers URL is not configured.' }, { status: 500 });
        }

        const accessToken = (session as any).accessToken;
        if (!accessToken) {
            return Response.json(
                { error: 'No access token. Please sign in again.' },
                { status: 401 }
            );
        }

        const response = await fetch(listUrl, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            if (response.status === 401) {
                return Response.json(
                    { error: 'Your account does not have permission to access the speakers list.' },
                    { status: 401 }
                );
            }
            if (response.status === 403) {
                return Response.json(
                    { error: 'Access forbidden. Contact your SharePoint administrator.' },
                    { status: 403 }
                );
            }
            throw new Error(`SharePoint API error: ${response.statusText}`);
        }

        const data = await response.json();
        return Response.json(data);
    } catch (error) {
        console.error('Error fetching from SharePoint:', error);
        return Response.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : 'Failed to fetch speakers from SharePoint',
            },
            { status: 500 }
        );
    }
}
