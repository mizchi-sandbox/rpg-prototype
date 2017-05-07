/* @flow */
import React from 'react'
import type { Battler } from 'domain/battle'

export default function EnemyBattlersDisplay({
  enemies
}: {
  enemies: Battler[]
}) {
  return (
    <div>
      {enemies.map((enemy, index) => (
        <div style={{ display: 'inline-block', padding: '15px' }} key={index}>
          <img
            src={enemy.monsterData && enemy.monsterData.displayImage}
            style={{
              filter: enemy.life.val > 0 ? 'grayscale(0)' : 'grayscale(1)'
            }}
          />
          <div>
            <span>{enemy.name}</span>
            &nbsp;
            <span>{enemy.life.val}</span>
            /
            <span>{enemy.life.max}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
