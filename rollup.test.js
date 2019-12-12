import babel from 'rollup-plugin-babel';
import sass from 'rollup-plugin-sass';
const path = require('path');
const name = path.basename(__dirname);
const editJsonFile = require("edit-json-file");
const pjson = require('./package.json');
const pjsonArray = ['version', 'description', 'keywords', 'author', 'homepage', 'repository', 'bugs', 'license'];
 
let file = editJsonFile(`./dist/package.json`);
pjsonArray.forEach(el=>{
  file.set(el, pjson[el])
})
file.save();

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