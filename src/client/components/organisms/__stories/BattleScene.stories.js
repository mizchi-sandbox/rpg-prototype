/* @flow */
import React from 'react'
import { action, storiesOf } from '@storybook/react'
import BattleScene from '../BattleScene'
import { createBattleSession } from 'domain/battle/BattleSession'

storiesOf('BattleScene', module)
  .add('Loading', () => {
    return (
      <BattleScene
        log={[]}
        runner={{
          battleSession: null,
          inputQueue: [],
          loading: true,
          paused: false,
          skillSelectCursor: null,
          battleSessionResult: null
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
          battleSession: createBattleSession(),
          inputQueue: [],
          loading: false,
          paused: true,
          skillSelectCursor: null,
          battleSessionResult: null
        }}
        dispatch={() => {
          action('clicked')
        }}
      />
    )
  })
