import { defineConfig } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
    define: {
        'process.env': {
            ULCA_API_URI: process.env.ULCA_API_URI ?? null,
            ULCA_USER_ID: process.env.ULCA_USER_ID ?? null,
            ULCA_API_KEY: process.env.ULCA_API_KEY ?? null,
            ULCA_AUTH_TOKEN: process.env.ULCA_AUTH_TOKEN ?? null
        }
    }
});
