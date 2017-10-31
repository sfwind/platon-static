import * as React from 'react'
import './NickName.less'
import { ppost } from '../../../../utils/request'

export class NickName extends React.Component {

  constructor() {
    super()
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const { hiddenTab = () => {} } = this.props
    hiddenTab()
    this.setState({ nickName: this.props.location.query.nickName })
  }

  componentWillUnmount() {
    const { showTab = () => {} } = this.props
    showTab()
  }

  handleUpdateNickName() {
    ppost(`/rise/customer/profile/nickName/update?nickName=${this.refs.text.value}`).then(res => {
      if(res.code === 200) {
        window.ENV.userName = this.refs.text.value
        this.context.router.goBack()
      }
    })
  }

  render() {
    const { nickName = '' } = this.state

    return (
      <div className="nickname-modify-component">
        <div className="nickname-edit">
          <input className="text" type="text" ref="text" defaultValue={nickName} autoFocus={true}/>
        </div>

        <div className="nickname-submit">
          <span onClick={() => this.handleUpdateNickName()}>提交</span>
        </div>
      </div>
    )
  }

}
