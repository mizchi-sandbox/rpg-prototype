/* @flow */
import { updateIn } from '../utils/arrayUtils'

export type Resource = {
  resourceId: string,
  resourceName: string,
  amount: number
}

export function addResource(resources: Resource[], res: Resource): Resource[] {
  const existedResource = resources.find(r => r.resourceId === res.resourceId)

  if (existedResource) {
    return updateIn(
      resources,
      r => r.resourceId === res.resourceId,
      r => Object.assign({ ...r, amount: r.amount + res.amount })
    )
  } else {
    return resources.concat([res])
  }
}

export function mergeResources(a: Resource[], b: Resource[]): Resource[] {
  return b.reduce((acc, res) => addResource(acc, res), a)
}
