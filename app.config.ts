import { defineConfig } from '@solidjs/start/config';

export default defineConfig({
    server: {
        compatibilityDate: '2024-12-24',
    },
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    api: 'modern',
                },
            },
        },
    },
});
