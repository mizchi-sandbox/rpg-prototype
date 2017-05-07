/* @flow */
export const LOG = 'result/LOG'

export type CommandResult = {
  type: typeof LOG,
  message: string
}
