/* eslint-disable */
require('require-yaml')
const cc = require('change-case')
const path = require('path')
const fs = require('fs')
const tv4 = require('tv4')
const { convertSchema, schemaToFlow } = require('json-schema-to-flow-type')

let code = `
/* @flow */
/* eslint-disable */
import data from './data'
`
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
  const schema = require(path.resolve(
    __dirname,
    `../masterdata/schema/${t}-schema`
  ))
  for (const i of data) {
    const r = tv4.validateResult(i, schema)
    if (!r.valid) {
      console.log(t, r.error.toString())
      throw r.error
    }
  }

  const pascalName = cc.pascalCase(t)
  // data
  all[t] = data

  // flow
  const schemaForGen = Object.assign({}, { id: pascalName + 'Data' }, schema)
  // type
  let flowCode = schemaToFlow(convertSchema(schemaForGen))

  // ids
  const ids = data.filter(i => i.id).map(i => `'${i.id}'`)
  // TODO: Validate relational ids
  code += `\n// === ${pascalName} ===\n`
  code += `export type ${pascalName}Id = ${ids.join(' | ')}\n`
  code += flowCode + '\n'
  code += `export function load${pascalName}Data(id: ${pascalName}Id): ${pascalName}Data  { return Object.freeze(data['${t}'].find(i => i.id === id)) }\n`
})

fs.writeFileSync(path.resolve(__dirname, '../src/domain/master/index.js'), code)
console.log('> src/domain/master/index.js')

fs.writeFileSync(
  path.resolve(__dirname, '../src/domain/master/data.js'),
  '/* eslint-disable */\nmodule.exports =' + JSON.stringify(all)
)
console.log('> src/domain/master/data.js')
