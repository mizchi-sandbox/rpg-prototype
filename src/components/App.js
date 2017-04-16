/* @flow */
import React from 'react'
import { Engine, World, Bodies, Render } from 'matter-js'
import range from 'lodash.range'

const GameLoop = (WrappedComponent) => {
  return class PhysicsWorld extends React.Component {
    state = {
      bodies: []
    }
    componentDidMount() {
      const engine = Engine.create()
      const ground = Bodies.rectangle(0, 470, 1000, 10, {
        isStatic: true,
        restitution: 1
      })

      World.add(engine.world, [ground])
      World.add(engine.world, range(700).map(i => {
        const circle = Bodies.circle(
          Math.random() * 640,
          Math.random() * 480,
          5,
          {
            restitution: 1
          }
        )
        return circle
      }))

      Engine.run(engine)
      const render = () => {
        requestAnimationFrame(render)
        this.setState({bodies: engine.world.bodies})
      }
      render()
    }
    render() {
      return <WrappedComponent {...this.state}/>
    }
  }
}

export default GameLoop((props) => {
  const {bodies} = props
  return <svg width={640} height={480}>
    {
      bodies
      .filter(body => body.label === 'Circle Body')
      .map((body, i) => <circle
        key={i}
        cx={body.position.x} cy={body.position.y}
        r={body.circleRadius}
        stroke="grey" strokeWidth={1}
        fill="wheat"
      />)
    }
  </svg>
})
