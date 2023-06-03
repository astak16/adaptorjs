import path from "path";
import ts from "rollup-plugin-typescript2";
import cjs from "@rollup/plugin-commonjs";
import { babel } from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";

const packagePath = path.resolve(__dirname, "./packages");
const distPath = path.resolve(__dirname, "./dist");

function resolvePackagePath(packageName, isDist) {
  return isDist
    ? `${distPath}/${packageName}`
    : `${packagePath}/${packageName}`;
}

const inputPath = resolvePackagePath("");
const outputPath = resolvePackagePath("", true);

export default {
  input: `${inputPath}index.ts`,
  output: {
    file: `${outputPath}index.js`,
    name: "Adaptor",
    format: "umd",
    exports: "named",
  },
  plugins: [
    ts({
      tsconfig: "tsconfig.rollup.json",
    }),
    babel({
      exclude: "node_modules/**",
      extensions: [".js", ".ts"],
      babelHelpers: "runtime",
      presets: [
        ["@babel/preset-env", { targets: "defaults" }],
        "@babel/preset-typescript",
      ],
      plugins: ["@babel/plugin-transform-runtime"],
    }),
    cjs(),
    terser(),
  ],
};
