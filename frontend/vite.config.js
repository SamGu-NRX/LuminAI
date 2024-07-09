import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import path from "path";
import { SourceMap } from "module";

export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  build: {
    sourcemap: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "#": path.resolve(__dirname, "frontend"),
    },
  },
});

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import { TanStackRouterVite } from '@tanstack/router-vite-plugin'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     react({
//       babel: {
//         plugins: [
//           "babel-plugin-react-compiler"
//         ]
//       }
//     }),
//     TanStackRouterVite()
//   ],
// })
