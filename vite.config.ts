import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import mkcert from 'vite-plugin-mkcert';
const env = loadEnv('', process.cwd(), '');

const hosts = env.VITE_LOCAL_HOST.split(',') ?? [
    'localhost',
    'content-agent-dev.promerlabs.com',
];

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        env.NODE_ENV === 'development'
            ? mkcert({
                  hosts: hosts,
                  savePath: './cert',
                  force: true,
              })
            : null,
    ],
    server: {
        port: parseInt(env.VITE_PORT),
        host: true,
        allowedHosts: [],
    },
    resolve: {
        alias: {
            '@components': resolve(__dirname, 'src/components'),
            '@configs': resolve(__dirname, 'src/configs'),
            '@hooks': resolve(__dirname, 'src/hooks'),
            '@locales': resolve(__dirname, 'src/locales'),
            '@modules': resolve(__dirname, 'src/modules'),
            '@providers': resolve(__dirname, 'src/providers'),
            '@routes': resolve(__dirname, 'src/routes'),
            '@services': resolve(__dirname, 'src/services'),
            '@stores': resolve(__dirname, 'src/stores'),
            '@styles': resolve(__dirname, 'src/styles'),
            '@types': resolve(__dirname, 'src/types'),
            '@utils': resolve(__dirname, 'src/utils'),
            '@layout': resolve(__dirname, 'src/layout'),
            '@': resolve(__dirname, 'src'),
        },
    },
});
