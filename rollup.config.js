import path from "path";
import fs from "fs";
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

function getPackageJSON(packageName) {
  const path = `${resolvePackagePath(packageName)}/package.json`;
  const str = fs.readFileSync(path, "utf-8");
  return JSON.parse(str);
}

const { module } = getPackageJSON("");
const inputPath = resolvePackagePath("");
const outputPath = resolvePackagePath("", true);

export default {
  input: `${inputPath}/${module}`,
  output: {
    file: `${outputPath}/index.js`,
    name: "Adaptor",
    format: "umd",
    exports: "named",
  },
  plugins: [
    ts({
      tsconfig: "tsconfig.json",
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
