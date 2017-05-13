/* @flow */
import uuid from 'uuid'
import type { AdventureSession } from '../AdventureSession'
import { resourcesMock0 } from './resourceMock'

export const adventureSessionMockMinimum: AdventureSession = {
  id: uuid(),
  resources: resourcesMock0,
  actors: [
    {
      id: '$minimum-example-player1',
      controllable: true,
      displayName: 'Player1',
      lifeValue: 100,
      acquiredSkills: [{ skillId: '$attack', lv: 1 }]
    }
  ]
}

export const adventureSessionMock0: AdventureSession = {
  id: uuid(),
  resources: resourcesMock0,
  actors: [
    {
      id: '$player1',
      controllable: true,
      displayName: 'Player1',
      lifeValue: 150,
      acquiredSkills: [
        { skillId: '$attack', lv: 1 },
        { skillId: '$power-attack', lv: 1 },
        { skillId: '$fire-wave', lv: 1 },
        { skillId: '$heal-self', lv: 1 }
      ]
    },
    {
      id: '$bot1',
      controllable: false,
      displayName: 'BOT1',
      lifeValue: 50,
      acquiredSkills: [
        { skillId: '$attack', lv: 1 },
        { skillId: '$heal-self', lv: 1 }
      ]
    }
  ]
}
