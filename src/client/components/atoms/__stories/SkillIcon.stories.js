/* @flow */
import uuid from 'uuid'
import React from 'react'
import { action, storiesOf } from '@storybook/react'
import SkillIcon from '../SkillIcon'
import { loadSkillData } from 'domain/master'

storiesOf('SkillIcon', module)
  .add('0/15', () => {
    const mockSkill = {
      data: loadSkillData('$power-attack'),
      id: uuid(),
      cooldown: { val: 0, max: 15 },
      lv: 1
    }

    return (
      <SkillIcon
        focused={false}
        skill={mockSkill}
        onClick={action('clicked')}
        inQueue={false}
      />
    )
  })
  .add('5/15', () => {
    const mockSkill = {
      data: loadSkillData('$power-attack'),
      id: uuid(),
      cooldown: { val: 5, max: 15 },
      lv: 1
    }

    return (
      <SkillIcon
        focused={false}
        skill={mockSkill}
        onClick={action('clicked')}
        inQueue={false}
      />
    )
  })
  .add('10/15', () => {
    const mockSkill = {
      data: loadSkillData('$power-attack'),
      id: uuid(),
      cooldown: { val: 9, max: 15 },
      lv: 1
    }

    return (
      <SkillIcon
        focused={false}
        skill={mockSkill}
        onClick={action('clicked')}
        inQueue={false}
      />
    )
  })
  .add('15/15', () => {
    const mockSkill = {
      data: loadSkillData('$power-attack'),
      id: uuid(),
      cooldown: { val: 15, max: 15 },
      lv: 1
    }

    return (
      <SkillIcon
        skill={mockSkill}
        focused={false}
        onClick={action('clicked')}
        inQueue={false}
      />
    )
  })
  .add('15/15 inQueue', () => {
    const mockSkill = {
      data: loadSkillData('$power-attack'),
      id: uuid(),
      cooldown: { val: 15, max: 15 },
      lv: 1
    }

    return (
      <SkillIcon
        skill={mockSkill}
        onClick={action('clicked')}
        inQueue={true}
        focused={false}
      />
    )
  })
  .add('15/15 onFocus', () => {
    const mockSkill = {
      data: loadSkillData('$power-attack'),
      id: uuid(),
      cooldown: { val: 15, max: 15 },
      lv: 1
    }

    return (
      <SkillIcon
        skill={mockSkill}
        onClick={action('clicked')}
        inQueue={true}
        focused={true}
      />
    )
  })
