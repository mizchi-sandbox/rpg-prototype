/* @flow */
import React from 'react'
import SkillBar from './SkillBar'
import type { Battler, BattlerSkill } from 'domain/battle'

export default function AllyBattlersDisplay({
  allies,
  onAllyAndSkillSelect,
  isSkillInQueue
}: {
  allies: Battler[],
  onAllyAndSkillSelect: Battler => BattlerSkill => void,
  isSkillInQueue: BattlerSkill => boolean
}) {
  return (
    <div>
      {allies.map((ally, index) => (
        <div
          key={index}
          style={{
            display: 'flex'
          }}
        >
          <div style={{ width: '80px' }}>
            <div>{ally.displayName}</div>
            <div style={{ width: '100px' }}>
              <span>{ally.life.val}</span>
              /
              <span>{ally.life.max}</span>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <SkillBar
              skills={ally.skills}
              onSkillSelect={onAllyAndSkillSelect(ally)}
              isSkillInQueue={isSkillInQueue}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
