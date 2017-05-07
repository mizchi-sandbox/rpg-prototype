/* @flow */
import React from 'react'

// Usage:
//   <div>
//     <KeyListner keyCode={13} handler={() => console.log('Enter')}/>
//   </div>
export default class GlobalKeyListner extends React.Component {
  props: {
    keyCode: string | number,
    handler: SyntheticEvent => void
  }
  _bound: any = null
  type = 'keydown'
  componentDidMount() {
    const keyCode = this.props.keyCode
    this._bound = (ev: SyntheticEvent) => {
      if (ev.keyCode === keyCode) {
        this.props.handler(ev)
      }
    }
    window.addEventListener(this.type, this._bound)
  }

  componentWillUnmount() {
    window.removeEventListener(this.type, this._bound)
    this._bound = null
  }
  render() {
    return null
  }
}
