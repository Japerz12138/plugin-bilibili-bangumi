import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import VueJsx from "@vitejs/plugin-vue-jsx";
import Icons from "unplugin-icons/vite";

//暂时不启用插件用户界面
const pluginEntryName = "plugin-bilibili-bangumi-forbidden";

export default ({ mode }: { mode: string }) => {
  const isProduction = mode === "production";
  const outDir = isProduction
    ? "../src/main/resources/console"
    : "../build/resources/main/console";

  return defineConfig({
    plugins: [
      Vue(), 
      VueJsx(), 
      Icons({ 
        compiler: "vue3",
        autoInstall: false
      })
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    define: {
      "process.env": process.env,
    },
    optimizeDeps: {
      include: ['@iconify/utils']
    },
    build: {
      outDir,
      emptyOutDir: true,
      lib: {
        entry: "src/index.ts",
        name: pluginEntryName,
        formats: ["iife"],
        fileName: () => "main.js",
      },
      rollupOptions: {
        external: [
          "vue",
          "vue-router",
          "@vueuse/core",
          "@vueuse/components",
          "@vueuse/router",
          "@halo-dev/shared",
          "@halo-dev/components",
        ],
        output: {
          globals: {
            vue: "Vue",
            "vue-router": "VueRouter",
            "@vueuse/core": "VueUse",
            "@vueuse/components": "VueUse",
            "@vueuse/router": "VueUse",
            "@halo-dev/console-shared": "HaloConsoleShared",
            "@halo-dev/components": "HaloComponents",
          },
          extend: true,
        },
      },
    },
  });
};
