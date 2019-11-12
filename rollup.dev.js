import babel from 'rollup-plugin-babel'
import ignoreImport from 'rollup-plugin-ignore-import'
import sass from 'rollup-plugin-sass'

const path = require('path');
const name = path.basename(__dirname)

export default [
  {
    input: `app/js/${name}.js`,
    output: {
      format: 'iife',
      dir: 'demo/js/',
      name: name
    },
    plugins: [
      ignoreImport({
        extensions: ['.scss', '.css']
      }),
      babel(),
      sass({
        output: `demo/css/${name}.css`
      })
    ]  
  }
]
