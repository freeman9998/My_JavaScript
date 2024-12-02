import { defineConfig } from 'tsup'
import { sassPlugin } from 'esbuild-sass-plugin'

export default defineConfig({
    external: ["react", "react-dom"],
    sourcemap: true,
    clean: true,
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    esbuildOptions: (options) => {
        options.external = ['swiper']
    },
    dts: true,
    esbuildPlugins: [
        sassPlugin({
            filter:/\.module\.scss$/,
            type: 'local-css'
        })
    ],
    loader: {
        '.svg': 'dataurl',
        '.png': 'dataurl',
        '.jpg': 'dataurl',
        '.jpeg': 'dataurl',
        '.webp': 'dataurl',
    }
})