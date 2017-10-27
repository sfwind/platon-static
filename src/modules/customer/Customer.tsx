import * as React from 'react'
import { connect } from 'react-redux'
import { ToolBar } from '../base/ToolBar'
import RenderInBody from '../../components/RenderInBody'

@connect(state => state)
export class Customer extends React.Component<any, any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super()
    this.state = {
      tabIndex: 4,
      hiddenTab: false
    }
    this.triggerTab = this.triggerTab.bind(this)
  }

  triggerTab() {
    this.setState({ hiddenTab: !this.state.hiddenTab })
  }

  render() {

    const childrenWithProps = React.Children.map(this.props.children, (child, index) =>
      React.cloneElement(child, {
        triggerTab: () => this.triggerTab(),
        showTab: () => this.setState({ hiddenTab: false }),
        hiddenTab: () => this.setState({ hiddenTab: true })
      })
    )

    return (
      <div>
        {childrenWithProps}
        {this.state.hiddenTab ? null : <ToolBar/>}
        <div style={{ width: '100%', height: '1px' }}/>
      </div>
    )
  }
}
