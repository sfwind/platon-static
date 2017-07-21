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
      console.log(res)
      dispatch(endLoad())
      if(res.code === 200) {
        // TODO 记得取消注释
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
      // TODO 配置限免小课跳转，后期删除
      this.context.router.push('/rise/static/problem/view?id=9')
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
           style={{ minHeight: (window.innerWidth / 375) * 667 - 50}}>
        <div className="welcome-page">
          <div className="welcome-botton">
            <div style={{margin: "0 auto"}} onClick={() => this.handleClickGoPayPage()}>正式版本</div>
          </div>
        </div>
      </div>
    )
  }

}
