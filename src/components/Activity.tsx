import * as React from "react";
import { connect } from "react-redux";
import "./Activity.less";
import AssetImg from "./AssetImg";
import { Toast, Dialog } from "react-weui"
const { Alert } = Dialog

@connect(state => state)
export default class Activity extends React.Component<any, any> {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      url: this.props.url,
      message: '',
      pic: '',
      show: true,
    }
  }

  componentWillMount() {
    const { message } = this.props
    const reg = new RegExp('^http|https')
    if(message) {
      if(reg.test(message)) {
        this.setState({ pic: message })
      } else {
        this.setState({ message })
      }
    }
  }

  activityPage() {
    const { url } = this.state
    const reg = new RegExp('^http|https')
    this.setState({ show: false })
    if(url) {
      if(reg.test(url)) {
        window.location.href = url
      } else {
        this.context.router.push(url)
      }
    } else {
      this.setState({ show: false })
    }

  }

  render() {
    const { pic, show, message } = this.state

    const alert = {
        buttons: [
          {
            label: '关闭',
            onClick: ()=>this.setState({show:false})
          }
        ]
    }

    return (
      show ?
        <div className="activity-modal">
          { pic ?
            <div>
              <div className="close" onClick={() => this.setState({ show: false })}>
                <AssetImg type='white_close_btn' size={36}/>
              </div>
              <div className="activity-pic" onClick={() => this.activityPage()}>
                <AssetImg url={pic} width={'100%'}/>
              </div>
            </div>  : null}
          { message ?
            <Alert { ...alert }
              show={true}>
              <div className="global-pre" dangerouslySetInnerHTML={{__html:message}}/>
            </Alert>: null}
        </div> : null
    )
  }
}
