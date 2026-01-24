/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_SHAREPOINT_SESSIONS_URL: string
    readonly VITE_SHAREPOINT_SPEAKERS_URL: string
    readonly VITE_SHAREPOINT_SPONSORS_URL: string
    readonly VITE_AZURE_AD_CLIENT_ID?: string
    readonly VITE_AZURE_AD_TENANT_ID?: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
