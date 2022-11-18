import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import alias from '@rollup/plugin-alias';
import image from '@rollup/plugin-image';
import license from 'rollup-plugin-license';
import progress from 'rollup-plugin-progress';
import nodeGlobals from 'rollup-plugin-node-globals';
// import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { optimizeLodashImports } from '@optimize-lodash/rollup-plugin';
import svgr from '@svgr/rollup';
import pkg from './package.json';
import map from 'lodash/map';
import isArray from 'lodash/isArray';
import mergeWith from 'lodash/mergeWith';
import path from 'path';
import cp from 'child_process';
import comments from 'postcss-discard-comments';

function customizer(objValue, srcValue) {
  if (isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}

const resolve = function (...args) {
  return path.resolve(__dirname, ...args);
};

const commitHash = cp.execSync('git rev-parse --short HEAD', { encoding: 'utf-8' }).trim();

const genLisence = license({
  sourcemap: true,
  banner: `/*! @datlas/design <%= pkg.version %> (${commitHash})*/`,
});

const baseConfig = {
  input: resolve('./src/index.ts'),
  output: {
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
  },
  external: map(pkg.peerDependencies, (_, k) => k),
  plugins: [
    // peerDepsExternal(),
    alias({
      entries: [{ find: '@', replacement: resolve('src') }],
    }),
    postcss({
      extract: true, // 可配置生成绝对路径
      minimize: process.env.FORMAT === 'min',
      use: {
        less: { javascriptEnabled: true },
      },
      extensions: ['css', 'less'],
      plugins: [autoprefixer, comments({ removeAll: true })],
    }),
    commonjs(),
    nodeResolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.less'],
    }),
    image(),
    svgr({
      svgoConfig: {
        plugins: {
          removeViewBox: false,
        },
      },
    }),
    nodeGlobals(),
    typescript({
      useTsconfigDeclarationDir: true,
    }),
    optimizeLodashImports(),
    progress(),
  ],
  onwarn(error, warn) {
    if (error.code === 'THIS_IS_UNDEFINED') {
      return;
    }
    if (error.code !== 'CIRCULAR_DEPENDENCY') {
      warn(error);
    }
  },
};

// 打包任务的个性化配置
const jobs = {
  umd: {
    output: {
      inlineDynamicImports: true,
      format: 'umd',
      file: resolve(pkg.umd),
      name: 'mdtd',
    },
    plugins: [genLisence],
  },
  min: {
    output: {
      inlineDynamicImports: true,
      format: 'umd',
      file: resolve(pkg.umd.replace(/(.\w+)$/, '.min$1')),
      name: 'mdtd',
    },
    plugins: [terser(), genLisence],
  },
  iife: {
    output: {
      inlineDynamicImports: true,
      format: 'iife',
      file: resolve(pkg.browser),
      name: 'mdtd',
    },
    plugins: [terser(), genLisence],
  },
};

// 从环境变量获取打包特征
const mergeConfig = jobs[process.env.FORMAT || 'esm'];

const config = mergeWith(baseConfig, mergeConfig, customizer);

module.exports = config;
