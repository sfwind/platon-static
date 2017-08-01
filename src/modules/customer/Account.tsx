import * as React from 'react'
import { connect } from 'react-redux'
import { set, startLoad, endLoad, alertMsg } from 'redux/actions'
import { pget, ppost, mark } from 'utils/request'
import { changeTitle } from 'utils/helpers'
import './Account.less'

@connect(state => state)
export default class Rise extends React.Component<any, any> {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      data: {}
    }
  }

  componentWillMount() {
    mark({ module: '打点', function: '个人中心', action: '打开我的账户页面' })
    changeTitle('我的账户')
    const { dispatch } = this.props
    dispatch(startLoad())
    pget('/rise/customer/account').then(res => {
      console.log('res', res)
      dispatch(endLoad())
      if(res.code === 200) {
        this.setState({ data: res.msg })
      } else {
        dispatch(alertMsg(res.msg))
      }
    }).catch(err => {
      dispatch(endLoad())
      dispatch(alertMsg(err + ''))
    })
  }

  render() {
    const { data } = this.state
    const { riseId, memberType, mobile, isRiseMember, coupons = [] } = data

    const renderCoupons = () => {
      if(coupons.length !== 0) {
        let domArr = []
        domArr.push(<div className="item ">奖学金/优惠券</div>)
        domArr.push(
          coupons.map((coupon, index) => {
            let jxjSrc = 'https://static.iqycamp.com/images/fragment/person_coupon_jxj.png'
            let yhqSrc = 'https://static.iqycamp.com/images/fragment/person_coupon_yhq.png'
            console.log(coupon.description.indexOf('奖学金'))
            let imgSrc = (coupon.description && coupon.description.indexOf('奖学金')) >= 0 ? jxjSrc : yhqSrc
            return (
              <div className="item">
                <img src={imgSrc} alt={coupon.description}
                     style={{ float: 'left' }}/>
                <div className='label'>{coupon.description} ￥{coupon.amount} 元</div>
                <div className='content-no-cut'>{coupon.expiredDateString}到期</div>
              </div>
            )
          })
        )
        return domArr
      }
    }

    return (
      <div className="account">

        <div className="item">
          <div className="label">圈外 ID</div>
          <div className="content-no-cut">{riseId}</div>
        </div>
        <div className="item" onClick={() => {this.context.router.push('/rise/static/customer/member')}}>
          <div className="label">圈外会员</div>
          <div className="content">
            {isRiseMember ? '' : '点击加入'}&nbsp;&nbsp;{memberType}
          </div>
        </div>

        <div className="item item-margin"
             style={{ margin: '25px 0' }}
             onClick={() => this.context.router.push('/rise/static/customer/mobile/check')}>
          <div className="label">
            {mobile ? '修改手机号' : '手机号'}
          </div>
          <div className='content'>
            {mobile ? <span>{mobile}</span> : <span style={{ color: '#ccc' }}>去绑定手机号&nbsp;&nbsp;</span>}
          </div>
        </div>

        { renderCoupons() }
      </div>
    )
  }
}
