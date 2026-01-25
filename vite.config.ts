import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
        // Use relative paths for assets to work correctly in Power Apps
        assetsDir: 'assets',
        rollupOptions: {
            output: {
                // Ensure all asset references use relative paths
                entryFileNames: 'assets/[name]-[hash].js',
                chunkFileNames: 'assets/[name]-[hash].js',
                assetFileNames: 'assets/[name]-[hash][extname]'
            }
        }
    },
    server: {
        port: 3000,
        open: true,
        proxy: {
            // This proxy is optional - for development, you can proxy to a backend server
            // '/api': {
            //   target: 'http://localhost:3001',
            //   changeOrigin: true,
            // }
        }
    }
})
