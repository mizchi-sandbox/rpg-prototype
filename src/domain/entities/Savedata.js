/* @flow */
import { savedataListForTest } from '../__mocks/savedataMock'
import type { Resource } from './Resource'

export type Savedata = {
  id: string,
  playerName: string,
  resources: Resource[],
  ownedShells: []
}

// TODO: Mocked
export function load(savedataId: string): Savedata {
  const save = savedataListForTest.find(s => s.id === savedataId)
  if (save) {
    return save
  } else {
    throw `${savedataId} is not savedata id`
  }
}

// TODO: Mocked
export function save(savedata: Savedata) {
  const index = savedataListForTest.findIndex(s => s.id === savedata.id)
  if (index > -1) {
    // eslint-disable-next-line
    savedataListForTest[index] = savedata
  }
}
