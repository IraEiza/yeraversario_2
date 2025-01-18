import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/yeraversario_2/', // Reemplaza REPO_NAME con el nombre de tu repositorio
  build: {
    outDir: 'docs' // Genera los archivos en la carpeta 'docs'
  }
})
