import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import  {createStyleImportPlugin, VantResolve } from "vite-plugin-style-import";
import { resolve } from "path";
import postCssPxToRem from "postcss-pxtorem";
import { loadEnv } from "vite";

// https://vitejs.dev/config/
export default ({ mode }) => {
  return defineConfig({
    base: "./",
    build: {
      outDir: "./dist",
      minify: 'terser',
      terserOptions: {
        // 生产环境是移除console debugger
        compress: {
          drop_console: true,
          drop_debugger: true,
        }
      }
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
    plugins: [
      vue(),
      createStyleImportPlugin({
        resolves: [VantResolve()],
        libs: [
          {
            libraryName: "vant",
            esModule: true,
            resolveStyle: name => `../es/${name}/style`
          }
        ]
      })
    ],
    css: {
      postcss: {
        plugins: [
          postCssPxToRem({
            rootValue({ file }) {
              return file.indexOf("vant") !== -1 ? 37.5 : 75;
            },
            propList: ["*"]
          })
        ]
      }
    },
    server: {
      host: "127.0.0.1",
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
