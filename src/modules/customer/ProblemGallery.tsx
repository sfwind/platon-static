import * as React from 'react'
import { connect } from 'react-redux'
import './ProblemGallery.less'
import { set, startLoad, endLoad, alertMsg } from 'redux/actions'
import { pget, ppost } from 'utils/request'
import { mark } from 'utils/request'
import { changeTitle } from 'utils/helpers'

@connect(state => state)
export default class ProblemGallery extends React.Component<any, any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    mark({ module: '打点', function: '个人中心', action: '打开我的小课页面' })
    changeTitle('我的课程')
    const { dispatch } = this.props
    dispatch(startLoad())
    pget('/rise/customer/plans').then(res => {
      dispatch(endLoad())
      if(res.code === 200) {
        this.setState(res.msg)
      } else {
        dispatch(alertMsg(res.msg))
      }
    }).catch(err => {
      dispatch(endLoad())
      dispatch(alertMsg(err + ''))
    })
  }

  goPlanView(item) {
    let query = { planId: item.planId }
    this.context.router.push({ pathname: '/rise/static/plan/study', query })
  }

  goCertificateView(item) {
    let query = { certificateNo: item.certificateNo }
    this.context.router.push({ pathname: '/rise/static/customer/certificate', query })
  }

  render() {
    const { runningPlans = [], donePlans = [], point, riseCertificates = [], problemCollections = [] } = this.state

    const renderGalleyList = (plans) => {
      plans = plans.filter(plan => plan.learnable === true)
      return (
        <div className="galley-module-content">
          {plans && plans.length > 0 ? plans.map((item, index) => {
            return (
              <div key={index} className="item" onClick={() => this.goPlanView(item)}>
                <div className="item-label">
                  {item.name}
                </div>
                <div className="item-content">
                  {item.point + ' 积分'}
                </div>
              </div>
            )
          }) : <div className="item">
            <div className="item-label-none">
              无
            </div>
          </div>}
        </div>
      )
    }

    const renderCertificateList = (certificates) => {
      return (
        <div className="galley-module-content">
          {certificates && certificates.length > 0 ? certificates.map((item, index) => {
            return (
              <div key={index} className="item" onClick={() => this.goCertificateView(item)}>
                <div className="item-label">
                  {item.type == 1 ? '【优秀班长】' + item.month + '月小课训练营' : ''}
                  {item.type == 2 ? '【优秀组长】' + item.month + '月小课训练营' : ''}
                  {item.type == 3 ? '【优秀学员】' + item.month + '月小课训练营' : ''}
                  {item.type == 4 ? '【优秀团队】' + item.month + '月小课训练营' : ''}
                  {item.type == 5 ? '【毕业证书】' + item.month + '月小课训练营' : ''}
                  {item.type == 6 ? '【优秀助教】' + item.month + '月小课训练营' : ''}
                </div>
                <div className="item-content">

                </div>
              </div>
            )
          }) : <div className="item">
            <div className="item-label-none">
              无
            </div>
          </div>}
        </div>
      )
    }

    const renderProblemCollection = () => {
      if(problemCollections.length === 0) {
        return (
          <div className="item">
            <div className="item-label-none">无</div>
          </div>
        )
      } else {
        return (
          problemCollections.map((problem, index) => (
            <div key={index} className="item"
                 onClick={() => this.context.router.push(`/rise/static/plan/view?id=${problem.id}&show=true`)}>
              <div className="item-label">
                {problem.problem}
              </div>
              <div className="item-content"/>
            </div>
          ))
        )
      }
    }

    return (
      <div className="problem-gallery">
        <div className="problem-galley-header" onClick={() => this.context.router.push({
          pathname: '/rise/static/customer/point/tip'
        })} style={{ marginBottom: '10px', borderBottom: 'none' }}>
          <div className="header-label" style={{ float: 'left' }}>
            总积分
          </div>
          <div className="header-content arrow" style={{ float: 'right', marginRight: '20px' }}>
            {point}{'积分'}
          </div>
        </div>

        <div className="problem-galley-container">
          <div className="galley-module">
            <div className="galley-module-header">
              <div className="label">
                训练营证书
              </div>
            </div>
            {renderCertificateList(riseCertificates)}
          </div>
          <div className="galley-module">
            <div className="galley-module-header">
              <div className="label">
                已收藏
              </div>
            </div>
            <div className="galley-module-content">
              {renderProblemCollection()}
            </div>
          </div>
          <div className="galley-module">
            <div className="galley-module-header">
              <div className="label">
                进行中
              </div>
            </div>
            {renderGalleyList(runningPlans)}
          </div>

          <div className="galley-module">
            <div className="galley-module-header">
              <div className="label">
                已完成
              </div>
            </div>
            {renderGalleyList(donePlans)}
          </div>
        </div>
        <div className="problem-galley-header arrow" style={{ marginTop: '10px' }}
             onClick={() => {window.location.href = 'https://mp.weixin.qq.com/s?__biz=MzA5ODI5NTI5OQ==&mid=504190178&idx=1&sn=35594e68561fdf8dba1c60e999d55f40&chksm=0b6a3f8e3c1db6980b23848107f0cee0b5d59f989482fa87d2d6ea1ab068e90634d43de15d73&key=80b8db78bc94a3bcd71dc7fb40620ac9b718a119e5b36b2b5132de618f333ce1e79d972474a8f07026266896d60e4e1d4ac00ef4f41762679ae92e29909ce2885d4c735e8a3b6bb05664e1cedf1350b1&ascene=0&uin=MjYxMjUxOTM4MA%3D%3D&devicetype=iMac+MacBookPro11%2C1+OSX+OSX+10.10.5+build(14F27)&version=12010310&nettype=WIFI&fontScale=100&pass_ticket=VivHZEgXTMlyJbl5N9QRM0qHDjBzca0QPbVY62deReFIzY9e90TBFdTaQBSg124W'}}>
          【圈外课程】介绍
        </div>
        <div className="padding-footer"/>
      </div>
    )
  }
}
