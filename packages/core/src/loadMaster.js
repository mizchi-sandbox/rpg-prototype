/* @flow */
import data from '../gen/data'

export default (name: string, id: string) => {
  return data[name].find(i => i.id === id)
}
