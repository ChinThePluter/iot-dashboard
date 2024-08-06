import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    envPrefix: "ENV_",
    define: {
      "process.env": process.env,
    },
    plugins: [react(), nodePolyfills()],
    resolve: {
      alias: {
        src: path.resolve(__dirname, "src"),
      },
    },
    server: {
      port: 8080,
    },
    optimizeDeps: {
      exclude: ["js-big-decimal"],
      // esbuildOptions: {
      //   // Node.js global to browser globalThis
      //   define: {
      //     global: "globalThis",
      //   },
      //   // Enable esbuild polyfill plugins
      //   plugins: [
      //     NodeGlobalsPolyfillPlugin({
      //       buffer: true,
      //     }),
      //   ],
      // },
    },
  };
});
