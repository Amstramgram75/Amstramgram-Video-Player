import babel from 'rollup-plugin-babel';
import sass from 'rollup-plugin-sass';
const path = require('path');
const name = path.basename(__dirname);


export default {
  input: `app/js/${name}.js`,
  output: {
    format: 'iife',
    file: `dev/js/${name}.js`,
    name: name[0].toUpperCase() + name.slice(1)
  },
  plugins: [
    sass({output: `dev/css/${name}.css`}),    
      babel()	
  ]
};