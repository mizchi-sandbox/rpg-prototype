/* @flow */
/* eslint-disable */
import { configure } from '@storybook/react'

configure(() => {
  require('../src/client/components/atoms/__stories/SkillIcon.stories.js')
  require('../src/client/components/organisms/__stories/BattleScene.stories.js')
}, module)
