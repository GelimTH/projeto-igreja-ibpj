import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  
  // ADICIONAR ESTA SEÇÃO DE RESOLVE
  resolve: {
    alias: {
      // Configura o alias @/ para apontar para a pasta src/
      "@": path.resolve(__dirname, "./src"), 
      // O código de Postagem.jsx usa especificamente @entities
      // Se você quiser mapear explicitamente:
      "@entities": path.resolve(__dirname, "./src/entities"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@components": path.resolve(__dirname, "./src/components"),
      "react": path.resolve("./node_modules/react"),
      "react-dom": path.resolve("./node_modules/react-dom"),
    },
  },
});