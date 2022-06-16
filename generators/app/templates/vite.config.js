import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { loadEnv } from "vite";

// https://vitejs.dev/config/
export default ({ mode }) => {
  return defineConfig({
    base: "./",
    build: {
      outDir: "./dist"
    },
    // 配置文件别名 vite1.0是/@/  2.0改为/@

    // 这里是将src目录配置别名为 /@ 方便在项目中导入src目录下的文件
    resolve: {
      alias: {
        "@": resolve(__dirname, "src")
      },
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"]
    },
    define: { "process.env": {} },
    plugins: [vue()],

    server: {
      host: "localhost",
      port: 3000,
      proxy: {
        "/api": {
          target: loadEnv(mode, process.cwd()).VITE_RES_URL,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, "")
        }
      }
    }
  });
};
