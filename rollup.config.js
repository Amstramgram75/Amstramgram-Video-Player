import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
import ignoreImport from 'rollup-plugin-ignore-import'
import copy from 'rollup-plugin-copy'
import postcss from 'postcss'
import cssnano from 'cssnano'
import sass from 'rollup-plugin-sass'

const path = require('path');
const name = path.basename(__dirname)

export default [
  {
    input: `app/js/${name}.js`,
    output: {
      format: 'esm',
      dir: 'dist/esm/'
    },
    plugins: [
      sass({
        output: `dist/css/${name}.css`
      }),
      copy({
        targets: [
          {src: 'app/css/*', dest: 'dist/css'},
          {src: 'app/css/*', dest: 'dist/src/css'},
          {src: 'app/js/*', dest: 'dist/src/js'},
          {src: `app/js/${name}Polyfill.min.js`, dest: 'dist/esm'},
          {src: `app/js/${name}Polyfill.min.js`, dest: 'dist/cjs'},
          {src: `app/js/${name}Polyfill.min.js`, dest: 'dist/iife'},
        ]
      })
    ]  
  },
  {
    input: `app/js/${name}.js`,
    output: {
      format: 'esm',
      file: `dist/esm/${name}.min.js`
    },
    plugins: [
      sass({
        output: `dist/css/${name}.min.css`,
        processor: css => postcss([cssnano])
          .process(css)
          .then(result => result.css)
      }),    
      terser()
    ]
  },
  {
    input: `app/js/${name}.js`,
    output: {
      format: 'cjs',
      file: `dist/cjs/${name}.js`
    },
    plugins: [
      ignoreImport({
        extensions: ['.scss', '.css']
      }),
      babel()
    ]
  },
  {
    input: `app/js/${name}.js`,
    output: {
      format: 'cjs',
      file: `dist/cjs/${name}.min.js`
    },
    plugins: [
      ignoreImport({
        extensions: ['.scss', '.css']
      }),
      babel(),
      terser()
    ]
  },
  {
    input: `app/js/${name}.js`,
    output: {
      format: 'iife',
      file: `dist/iife/${name}.js`,
      name: name
    },
    plugins: [
      ignoreImport({
        extensions: ['.scss', '.css']
      }),
      babel()
    ]
  },
  {
    input: `app/js/${name}.js`,
    output: {
      format: 'iife',
      file: `dist/iife/${name}.min.js`,
      name: name
    },
    plugins: [
      ignoreImport({
        extensions: ['.scss', '.css']
      }),
      babel(),
      terser(),
      copy({
        targets: [
          {src: `dist/iife/*`, dest: 'demo/js'},
          {src: `dist/css/${name}.min.css`, dest: 'demo/css'},
          {src: `dist/css/${name}.svg`, dest: 'demo/css'},
        ]
      })
    ]
  },
]
