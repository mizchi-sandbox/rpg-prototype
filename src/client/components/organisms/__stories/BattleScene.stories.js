/* @flow */
import React from 'react'
import { action, storiesOf } from '@kadira/storybook'
import BattleScene from '../BattleScene'
import { createBattleSession } from 'domain/battle/BattleSession'

storiesOf('BattleScene', module)
  .add('Loading', () => {
    return (
      <BattleScene
        log={[]}
        runner={{
          battleState: null,
          inputQueue: [],
          loading: true,
          paused: false,
          skillSelectCursor: null,
          battleCommandResult: null
        }}
        dispatch={() => {
          action('clicked')
        }}
      />
    )
  })
  .add('Show', () => {
    return (
      <BattleScene
        log={[]}
        runner={{
          battleState: createBattleSession(),
          inputQueue: [],
          loading: false,
          paused: true,
          skillSelectCursor: null,
          battleCommandResult: null
        }}
        dispatch={() => {
          action('clicked')
        }}
      />
    )
  })
