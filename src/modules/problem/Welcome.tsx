import * as React from 'react'
import './Welcome.less'
import { mark, welcome } from './async'
import { connect } from 'react-redux'
import { startLoad, endLoad, alertMsg } from 'redux/actions'
import AssetImg from '../../components/AssetImg'

@connect(state => state)
export default class Welcome extends React.Component<any, any> {

  constructor() {
    super()
    this.state = {
      showPage: false
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    mark({ module: '打点', function: '付费相关', action: '打开', memo: '欢迎页' })
    const { dispatch } = this.props
    dispatch(startLoad())
    welcome().then(res => {
      dispatch(endLoad())
      if(res.code === 200 && res.msg !== 0) {
          this.context.router.push('/rise/static/problem/explore')
      } else {
        this.setState({ showPage: true })
      }
    }).catch(e => {
      dispatch(alertMsg(e))
    })
  }

  handleClickGoTrailPage() {
    mark({ module: '打点', function: '付费相关', action: '点击试用版', memo: '欢迎页' }).then(() => {
      this.context.router.push('/rise/static/eva/start')
    })
  }

  handleClickGoExplorePage() {
    mark({ module: '打点', function: '正式版本点击', action: '进入发现页面', memo: '欢迎页' }).then(() => {
      this.context.router.push(`/rise/static/problem/explore`)
    }).catch(() => {
      this.context.router.push(`/rise/static/problem/explore`)
    })
  }

  handleClickGoPayPage() {
    mark({ module: '打点', function: '付费相关', action: '点击成为RISER', memo: '欢迎页' }).then(() => {
      window.location.href = `https://${window.location.hostname}/pay/pay`
    }).catch(() => {
      window.location.href = `https://${window.location.hostname}/pay/pay`
    })
  }

  render() {
    const { showPage } = this.state
    if(!showPage) {
      return <div/>
    } else {
      return (
        <div className="welcome-container" style={{ minHeight: (window.innerWidth / 375) * 667 - 50 }}>
          <div className="welcome-page">
            <div className="welcome-bottom">
              <div className="button-left button" onClick={() => this.handleClickGoTrailPage()}>免费测评</div>
              <div className="button-right button" onClick={() => this.handleClickGoExplorePage()}>所有小课</div>
            </div>
            <div className="bottom-rise-tip">
              <AssetImg url="https://static.iqycamp.com/images/fragment/problem_introduc_diamond_blue.jpg"/>
              <span onClick={() => {window.location.href = '/pay/pay'}}>直接成为精英版年费会员</span>
            </div>
          </div>
        </div>
      )
    }
  }

}
