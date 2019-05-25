import React from 'react'
import ReactDOM from 'react-dom'

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {}

  render () {
    return <div/>
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)