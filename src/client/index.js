/* eslint-disable */
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './containers/AppContainer'
import { Provider } from 'react-redux'
import store from './store/index'

export default async () => {
  if (process.env.NODE_ENV === 'production') {
    ReactDOM.render(
      <Provider store={store}><App /></Provider>,
      document.querySelector('main')
    )
  } else {
    const render = async () => {
      const { default: App } = await import('./containers/AppContainer')
      ReactDOM.render(
        <Provider store={store}>
          <AppContainer>
            <App />
          </AppContainer>
        </Provider>,
        document.querySelector('main')
      )
    }
    render()
    if (module.hot) {
      const { default: store } = await import('./store')
      const { default: nextRootReducer } = await import('./reducers')
      store.replaceReducer(nextRootReducer)
      module.hot.accept('./components/App', render)
    }
  }
}
