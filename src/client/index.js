/* eslint-disable */
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './components/App'

export default async () => {
  if (process.env.NODE_ENV === 'production') {
    ReactDOM.render(
      <App/>,
      document.querySelector('main')
    )
  } else {
    const render = async () => {
      const { default: App } = (await import('./components/App'))
      ReactDOM.render(
        <AppContainer>
          <App/>
        </AppContainer>,
        document.querySelector('main')
      )
    }
    render()
    if (module.hot) {
      // eslint-disable-next-line
      module.hot.accept('./components/App', render)
    }
  }
}

// if (process.env.NODE_ENV === 'production') {
//   ReactDOM.render(<Provider store={store}><App/></Provider>, root)
// } else {
//   const render = async () => {
//     const { default: App } = (await import('./components/App'))
//     ReactDOM.render(
//       <AppContainer>
//         <Provider store={store}>
//           <App/>
//         </Provider>
//       </AppContainer>,
//       root
//     )
//   }
//   render()
//   if (module.hot) module.hot.accept('./components/App', render)
// }
