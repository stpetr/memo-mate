import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default ({ mode }) => {
  const DEFAULT_SERVER_PORT = 3000
  const env = loadEnv(mode, process.cwd())

  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        store: '/src/store',
        components: '/src/components',
        pages: '/src/pages',
        hooks: '/src/hooks',
        assets: '/src/assets',
        entities: '/src/entities',
        types: '/src/types',
        utils: '/src/utils',
        services: '/src/services',
        theme: '/src/theme',
      }
    },
    server: {
      port: parseInt(env.VITE_SERVER_PORT) || DEFAULT_SERVER_PORT,
      strictPort: true,
    },
    css: {
      modules: {
        localsConvention: 'camelCaseOnly',
      },
    },
  })
}
