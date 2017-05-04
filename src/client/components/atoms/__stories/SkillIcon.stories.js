/* @flow */
import React from 'react'
import { storiesOf, action } from '@kadira/storybook'

import SkillIcon from '../SkillIcon'

storiesOf('SkillIcon', module)
  .add('0/10', () => {
    const mockSkill = {
      data: {
        id: '$power-attack',
        displayName: 'hoge',
        type: 'auto',
        cooldownCount: 10
      },
      id: Symbol(),
      cooldown: { val: 0, max: 10 },
      lv: 1
    }

    return <SkillIcon skill={mockSkill} onClick={action('clicked')} />
  })
  .add('5/10', () => {
    const mockSkill = {
      data: {
        id: '$hoge',
        displayName: 'hoge',
        type: 'auto',
        cooldownCount: 10
      },
      id: Symbol(),
      cooldown: { val: 5, max: 10 },
      lv: 1
    }

    return <SkillIcon skill={mockSkill} onClick={action('clicked')} />
  })
  .add('10/10', () => {
    const mockSkill = {
      data: {
        id: '$hoge',
        displayName: 'hoge',
        type: 'auto',
        cooldownCount: 10
      },
      id: Symbol(),
      cooldown: { val: 10, max: 10 },
      lv: 1
    }

    return <SkillIcon skill={mockSkill} onClick={action('clicked')} />
  })
