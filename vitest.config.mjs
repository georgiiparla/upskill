import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./vitest.setup.js'],
        alias: {
            '@': path.resolve(__dirname, './')
        },
    },
    esbuild: {
        loader: "jsx",
        include: /.*\.(js|jsx)$/,
        exclude: [],
    },
})
