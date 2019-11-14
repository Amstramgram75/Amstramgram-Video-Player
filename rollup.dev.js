import babel from 'rollup-plugin-babel'
import postcss from 'postcss'
import cssnano from 'cssnano'
import sass from 'rollup-plugin-sass'

const path = require('path');
const name = path.basename(__dirname)
const pjson = require('./package.json');
const version = pjson.version
const banner = `/*
amstramgramVideoPlayer.js
@licence : MIT
@author : Amstramgram
@version : ${version}
@url : https://github.com/Amstramgram75/Amstramgram-Video-Player
*/`

export default [
  {
    input: `app/js/${name}.js`,
    output: {
      format: 'iife',
      dir: 'demo/js/',
      name:  name[0].toUpperCase() + name.slice(1),
      banner: banner
    },
    plugins: [
      babel(),
      sass({
        output: `demo/css/${name}.css`
      }),
      sass({
        output: `demo/css/${name}.min.css`,
        processor: css => postcss([cssnano])
          .process(css)
          .then(result => result.css)
      }),    

    ]  
  }
]
