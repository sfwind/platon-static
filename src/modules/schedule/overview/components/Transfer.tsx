import * as React from 'react'

export default class Transfer extends React.Component {

  constructor() {
    super()
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const { history, key } = this.props.location.query
    if(history) {
      this.context.router.push({
        pathname: history,
        query: {
          key
        }
      })
    } else {
      this.context.router.goBack()
    }
  }

  render() {
    return (
      <div/>
    )
  }

}
