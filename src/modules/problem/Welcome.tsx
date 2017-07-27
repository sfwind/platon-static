import * as React from 'react'
import './Welcome.less'
import { mark, welcome } from "./async";
import { connect } from 'react-redux'
import { startLoad, endLoad, alertMsg } from 'redux/actions'

@connect(state => state)
export default class Welcome extends React.Component<any, any> {

  constructor() {
    super()
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    mark({ module: "打点", function: "付费相关", action: "打开", memo: "欢迎页" });
    const { dispatch } = this.props
    dispatch(startLoad())
    welcome().then(res => {
      dispatch(endLoad())
      if(res.code === 200) {
        if(res.code === 200 && res.msg) {
          this.context.router.push("/rise/static/problem/explore")
        }
      } else {
        dispatch(alertMsg(res.msg))
      }
    }).catch(e => {
      dispatch(alertMsg(e))
    })
  }

  handleClickGoTrailPage() {
    mark({ module: "打点", function: "付费相关", action: "点击试用版", memo: "欢迎页" }).then(() => {
      this.context.router.push('/rise/static/plan/view?id=9')
    })
  }

  handleClickGoExplorePage() {
    mark({ module: "打点", function: "正式版本点击", action: "进入发现页面", memo: "欢迎页" }).then(() => {
      this.context.router.push(`/rise/static/problem/explore`)
    }).catch(() => {
      this.context.router.push(`/rise/static/problem/explore`)
    })
  }

  handleClickGoPayPage() {
    mark({ module: "打点", function: "付费相关", action: "点击成为RISER", memo: "欢迎页" }).then(() => {
      window.location.href = `https://${window.location.hostname}/pay/pay`
    }).catch(() => {
      window.location.href = `https://${window.location.hostname}/pay/pay`
    })
  }

  render() {
    return (
      <div className="welcome-container"
           style={{ minHeight: (window.innerWidth / 375) * 667 - 50 }}>
        <div className="welcome-page">
          <div className="welcome-botton">
            <div className="button-left" onClick={() => this.handleClickGoTrailPage()}>限时免费</div>
            <div className="button-right" onClick={() => this.handleClickGoExplorePage()}>所有小课</div>
          </div>
        </div>
      </div>
    )
  }

}
