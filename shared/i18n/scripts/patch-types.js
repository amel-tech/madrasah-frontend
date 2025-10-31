import fs from 'fs'

const content = fs.readFileSync('dist/index.d.ts', 'utf8')
const ref = '/// <reference path="./@types/index.d.ts" />\n'

fs.writeFileSync('dist/index.d.ts', ref + content)
