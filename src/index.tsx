import React from 'react'
import ReactDOM from 'react-dom'
import { GlobalStyle } from './global-style'
import { Calendar } from './components/shared/calendar'

console.info(`⚛️ ${React.version}`)

const App = () => (
  <>
    <GlobalStyle />
    <Calendar />
  </>
)

ReactDOM.render(<App />, document.getElementById('root'))

module.hot && module.hot.accept()
