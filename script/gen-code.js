/* eslint-disable */
require('require-yaml')
const path = require('path')
const fs = require('fs')
const tv4 = require('tv4')
const { convertSchema, schemaToFlow } = require('json-schema-to-flow-type')

let codeStr = [
  '/* @flow */',
  '/* eslint-disable */'
]
const all = {}
;[
  'consume-item',
  'job',
  'material',
  'race',
  'skill',
  'monster',
  'dungeon',
  'troop'
].forEach(t => {
  const data = require(path.resolve(__dirname, `../masterdata/data/${t}-data`))
  const schema = require(path.resolve(__dirname, `../masterdata/schema/${t}-schema`))
  for (const i of data) {
    const r = tv4.validateResult(i, schema)
    if (!r.valid) {
      console.log(t, r.error.toString())
      throw r.error
    }
  }

  // data

  all[t] = data

  // flow
  const schemaForGen = Object.assign({}, { id: t }, schema)

  const code = schemaToFlow(convertSchema(schemaForGen))
  codeStr.push(code)
})

fs.writeFileSync(
  path.resolve(__dirname, '../src/gen/types.js'),
  codeStr.join('\n')
)
console.log('> gen/types.js')

fs.writeFileSync(
  path.resolve(__dirname, '../src/gen/data.js'),
  '/* eslint-disable */\nmodule.exports =' + JSON.stringify(all)
)
console.log('> gen/data.js')
