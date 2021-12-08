import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { terser } from "rollup-plugin-terser";
import cleaner from 'rollup-plugin-cleaner';
import typescript from '@rollup/plugin-typescript';
import cleanup from 'rollup-plugin-cleanup';

import serve from './src/compiler/rollup-plugin-serve';
import handlebars from './src/compiler/rollup-plugin-handlebars';

const mode = process.env.NODE_ENV || 'development';
const dev = mode === 'development';

export default [{
  input: 'src/main.ts',
  output: {
    dir: 'dist',
    format: 'cjs',
    sourcemap: dev,
    manualChunks: {
      app: ['./src/app.ts']
    },
    chunkFileNames: '[name].js'
  },
  plugins: [
    cleaner({
      targets: [
        './dist'
      ]
    }), 
    commonjs(),
    json(),
    handlebars(),
    nodeResolve(),    
    typescript({
      sourceMap: dev
    }),
    !dev && terser(),       
    cleanup({
      extensions: ['js', 'ts'],
      comments: 'none'
    }),
    dev && serve()
  ]
}];
