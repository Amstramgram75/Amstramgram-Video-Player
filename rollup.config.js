import babel from 'rollup-plugin-babel'
import {terser} from 'rollup-plugin-terser'
import ignoreImport from 'rollup-plugin-ignore-import'
import copy from 'rollup-plugin-copy'
import postcss from 'postcss'
import postcssBanner from 'postcss-banner'
import cssnano from 'cssnano'
import sass from 'rollup-plugin-sass'

const path = require('path'),
      name = path.basename(__dirname),
      pjson = require('./package.json'),
      cssBanner =  `amstramgramVideoPlayer.js
@version : ${pjson.version}
@licence : ${pjson.license}
@author : ${pjson.author.name}
@url : ${pjson.homepage}`,
      banner = `/*
${cssBanner}
*/`,
      cssBannerMin = `amstramgramVideoPlayer.js--@version:${pjson.version}--@licence:${pjson.license}--@url:${pjson.homepage}`,
      bannerMin = `/*${cssBannerMin}*/`

export default [
  {
    input: `app/js/${name}.js`,
    output: {
      format: 'esm',
      dir: 'dist/esm/',
      banner: banner
    },
    plugins: [
      sass({
        output: `dist/css/${name}.css`,
        processor: css => postcss()
          .process(css)
          .then(result => result.css)
      }),
      copy({
        targets: [
          {src: 'app/css/*', dest: 'dist/css'},
          {src: 'app/css/*', dest: 'dist/src/css'},
        ]
      })
    ]  
  },
  {
    input: `app/js/${name}.js`,
    output: {
      format: 'esm',
      file: `dist/esm/${name}.min.js`,
      banner: bannerMin
    },
    plugins: [
      sass({
        output: `dist/css/${name}.min.css`,
        processor: css => postcss([cssnano, postcssBanner({banner: cssBannerMin})])
          .process(css)
          .then(result => result.css)
      }),    
      terser(),
    ]
  },
  {
    input: `app/js/${name}Polyfill.js`,
    output: {
      format: 'iife',
      file: `dist/esm/${name}Polyfill.js`,
      banner: banner
    },
  },
  {
    input: `app/js/${name}Polyfill.js`,
    output: {
      format: 'iife',
      file: `dist/esm/${name}Polyfill.min.js`,
      banner: bannerMin
    },
    plugins: [
      terser()
    ]
  },
  {
    input: `app/js/${name}.js`,
    output: {
      format: 'cjs',
      file: `dist/cjs/${name}.js`,
      banner: banner
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
      file: `dist/cjs/${name}.min.js`,
      banner: bannerMin
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
      name: name[0].toUpperCase() + name.slice(1),
      banner: banner
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
      name: name[0].toUpperCase() + name.slice(1),
      banner: bannerMin
    },
    plugins: [
      ignoreImport({
        extensions: ['.scss', '.css']
      }),
      babel(),
      terser(),
      copy({
        targets: [
          {src: 'dist/esm/*', dest: 'dist/src/js'},
          {src: `dist/esm/${name}Polyfill*`, dest: 'dist/cjs'},
          {src: `dist/esm/${name}Polyfill*`, dest: 'dist/iife'},
          {src: `dist/iife/*`, dest: 'docs/js'},
          {src: `dist/css/${name}*.css`, dest: 'docs/css'},
          {src: `README.md`, dest: 'dist/'}
        ]
      })
    ]
  },
]
