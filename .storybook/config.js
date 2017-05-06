/* @flow */
/* eslint-disable */
import { configure } from '@kadira/storybook'

configure(() => {
  require('../src/client/components/atoms/__stories/SkillIcon.stories.js')
  require('../src/client/components/organisms/__stories/BattleScene.stories.js')
}, module)
