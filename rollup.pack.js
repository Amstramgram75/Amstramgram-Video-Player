import babel from 'rollup-plugin-babel';
import sass from 'rollup-plugin-sass';
import copy from 'rollup-plugin-copy';
import ignoreImport from 'rollup-plugin-ignore-import';
import {terser} from 'rollup-plugin-terser';
import postcss from 'postcss';
import postcssBanner from 'postcss-banner';
import cssnano from 'cssnano';

const path = require('path'),
      name = path.basename(__dirname),
      editJsonFile = require("edit-json-file"),
      pjson = require('./package.json'),
      pjsonArray = ['version', 'description', 'keywords', 'author', 'homepage', 'repository', 'bugs', 'license'],
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

let file = editJsonFile(`./dist/package.json`);
pjsonArray.forEach(el=>{
  file.set(el, pjson[el])
})
file.save();
      
export default [
  {//ESM
    input: `app/js/${name}.js`,
    output: {
      format: 'esm',
      dir: 'dist/esm/',
      banner: banner
    },
    plugins: [
      sass({
        output: `dist/css/${name}.css`,
        processor: css => postcss([postcssBanner({banner: cssBanner})])
          .process(css)
          .then(result => result.css)
      }),
      sass({
        output: `dist/css/${name}.min.css`,
        processor: css => postcss([cssnano, postcssBanner({banner: cssBannerMin})])
          .process(css)
          .then(result => result.css)
      })
    ]  
  },
  {//ESSM minify
    input: `app/js/${name}.js`,
    output: {
      format: 'esm',
      file: `dist/esm/${name}.min.js`,
      banner: bannerMin
    },
    plugins: [
      ignoreImport({
        extensions: ['.scss', '.css']
      }),
      terser()
    ]
  },
  {//Polyfill
    input: `app/js/${name}Polyfill.js`,
    output: {
      format: 'iife',
      file: `dist/polyfill/${name}Polyfill.js`,
      banner: banner
    },
  },
  {//Polyfill minify
    input: `app/js/${name}Polyfill.js`,
    output: {
      format: 'iife',
      file: `dist/polyfill/${name}Polyfill.min.js`,
      banner: bannerMin
    },
    plugins: [
      terser()
    ]
  },
  {//IIFE
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
  {//IIFE minify
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
      terser()
    ]
  },
  {//CommonJS
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
  {//CommonJS minify
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
      terser(),
      copy({
        targets: [
          {src: 'app/*', dest: 'dist/src/'},//Fichiers source
          {src: ['dev/*', '!dev/js', '!dev/css'], dest: 'docs'},//Fichiers dev dans docs sauf js et css
          {src: ['dev/js/*', '!dev/js/amstramgramVideoPlayer*'], dest: 'docs/js'},//Fichiers js externes dans docs
          {src: ['dev/css/*', '!dev/css/amstramgramVideoPlayer*'], dest: 'docs/css'},//Fichiers css externes dans docs
          {src: [`dist/iife/${name}.min.js`, `dist/polyfill/${name}Polyfill.min.js`], dest: 'docs/js'},//js dans docs
          {src: `dist/css/${name}.min.css`, dest: 'docs/css/'},//css dans docs
          {src: `README.md`, dest: 'dist/'}//README.md dans dist
        ]
      })
    ]
  },
];