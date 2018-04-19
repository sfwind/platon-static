import * as React from 'react'

export default class PageNotFound extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  constructor () {
    super()
  }

  componentDidMount () {
    this.context.router.push('/rise/static/home')
  }

  render () {
    return (
      <div></div>
    )
  }

}
