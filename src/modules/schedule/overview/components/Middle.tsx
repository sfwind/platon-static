import * as React from 'react'

export default class Middle extends React.Component {

  constructor() {
    super()
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    console.log('middle', this.props)
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
