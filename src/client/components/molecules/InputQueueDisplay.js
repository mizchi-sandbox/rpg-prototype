/* @flow */
import React from 'react'
import type { Input, BattleSession } from 'domain/battle'

export default function InputQueueDisplay({
  inputQueue,
  battleState
}: {
  inputQueue: Input[],
  battleState: BattleSession
}) {
  return (
    <div>
      {inputQueue.map((input, index) => {
        const actorToAction = battleState.battlers.find(
          b => b.id === input.battlerId
        )
        return (
          <div key={index}>
            {actorToAction && actorToAction.displayName}: Ready {input.skillId}
          </div>
        )
      })}
    </div>
  )
}
