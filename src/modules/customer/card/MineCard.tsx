import * as React from 'react'
import { connect } from 'react-redux'
import { set, startLoad, endLoad, alertMsg } from '../../../redux/actions'
import { changeTitle } from '../../../utils/helpers'
import { mark } from '../../../utils/request'
import './MineCard.less'
import { loadUnreceivedPrizes } from './async'
import _ from "lodash"
import { MarkBlock } from '../../../components/markblock/MarkBlock'
import AssetImg from '../../../components/AssetImg'

@connect(state => state)
export default class MineCard extends React.Component<any, any> {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      showTips: false,
    }
  }

  async componentWillMount() {
    changeTitle('学习礼品卡')
    const { dispatch } = this.props
    mark({ view: true, function: '我的礼品卡', action: '礼品卡列表页', module: '打点' })
    dispatch(startLoad())
    let res = await loadUnreceivedPrizes()
    dispatch(endLoad())
    if(res.code === 200) {
      this.setState({
        data: res.msg
      })
    }
  }

  gotoIntroduction(url, id, expired) {
    const { dispatch } = this.props
    if(expired) {
      dispatch(alertMsg('您的礼品卡已过期'))
      return
    }
    if(url != null) {
      this.context.router.push(`${url}?cardId=${id}`)
    } else {
      dispatch(alertMsg('您的礼品卡已被领取'))
    }

  }

  renderCardInfo() {
    const { data } = this.state
    return (
      <div className="card-tab-body">
        <div className="card-list">
          {!_.isEmpty(data) && data.map((item, idx) => {
            return (
              <div key={idx} className="card-item">
                <div className="card-container">
                  <MarkBlock className="body-container"
                             onClick={() => this.gotoIntroduction(item.url, item.prizeCardNo, item.expired)}
                             func="礼品卡" action="点击礼品卡" module="打点"
                  >
                    <AssetImg url={`${item.background}`} width={'100%'}/>
                    <div className="congratulations">{item.description}</div>
                    {!item.expired && <div className="send-to-friend">有效期：{item.expiredDate}前</div>}
                  </MarkBlock>
                  <div className="card-bottom"></div>
                </div>
              </div>
            )
          })
          }

          {data && _.isEmpty(data) &&
          <div className="empty-container">
            <AssetImg type="no_prize_card" width={139} marginLeft={(window.innerWidth - 139) / 2} height={111}/>
          </div>
          }
        </div>
      </div>
    )
  }

  render() {

    const renderHeader = () => {
      return (
        <div className="header-container">
          <div className="header-body">我的礼品卡</div>
        </div>
      )
    }

    return (
      <div className="mine-card-container">
        {renderHeader()}
        {this.renderCardInfo()}
      </div>
    )
  }
}
