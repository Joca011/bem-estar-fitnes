import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Evita que o Vite troque o caminho real da pasta (útil em pastas redirecionadas do Windows)
  resolve: { preserveSymlinks: true },
});
