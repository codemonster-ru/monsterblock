import dts from 'vite-plugin-dts';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'url';
import path from 'path';
import fs from 'fs';

let entry: string = './src/index.ts';

if (process.env.NODE_ENV === 'development') {
    entry = './src/dev/main.ts';
}

const removeUnnecessaryFiles = () => {
    return {
        name: 'remove-files',
        writeBundle(outputOptions, inputOptions) {
            const outDir = outputOptions.dir;
            const devDir = path.resolve(outDir, 'dev');

            fs.rm(devDir, { recursive: true }, () => console.log(`Deleted ${devDir}`));
        },
    };
};

export default defineConfig({
    plugins: [
        vue(),
        dts(),
        removeUnnecessaryFiles(),
    ],
    resolve: {
        alias: [
            { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
        ],
    },
    build: {
        emptyOutDir: true,
        cssCodeSplit: true,
        lib: {
            name: 'index',
            entry: resolve(__dirname, entry),
            fileName: 'index.ts',
            formats: ['es', 'umd'],
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue',
                },
            },
        },
    },
});