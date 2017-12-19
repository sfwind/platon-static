import * as React from 'react'
import { connect } from 'react-redux'
import { set, startLoad, endLoad, alertMsg } from 'redux/actions'
import { changeTitle } from 'utils/helpers'
import './MimeCard.less'
import { loadUnusedPrizes } from './async'
import routes from '../../routes'

@connect(state => state)
export default class MimeCard extends React.Component<any, any> {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      showTips: false,
      data: []
    }
  }

  componentWillMount() {
    changeTitle('学习礼品卡')
    const { dispatch } = this.props
    dispatch
    {
      startLoad()
    }
    loadUnusedPrizes().then(res => {
      dispatch(endLoad())
      if(res.code === 200) {
        this.setState({
          data: res.msg
        })
      }
    })

  }

  gotoIntroduction(id) {
    this.context.router.push(`/rise/static/card/introduction?cardId=${id}`)
  }

  renderCardInfo() {
    const { data } = this.state
    return (
      <div className="card-tab-body">
        <ul className="card-list">
          {data ? data.map((item, idx) => {
            return (
              <li key={idx} className="card-item">
                <div className="card_container">
                  <div className="body_container">
                    <div className="card_pic">
                      {item.shared ? <div>待领取</div> : null}
                    </div>

                    <div className="congratulations">{item.description}</div>
                    <div className="send_to_friend" onClick={() => this.gotoIntroduction(item.id)}>奖励一张礼品卡，点击赠送给好友吧！
                    </div>
                  </div>
                  <div className="card_bottom"></div>
                </div>
              </li>
            )
          }) : null}
        </ul>
        {/*<div className="show-more">没有更多了</div>*/}
      </div>
    )
  }

  render() {

    const renderHeader = () => {
      return (
        <div className="header_container">
          <div className="header_body">我的礼品卡</div>
        </div>
      )
    }

    return (
      <div className="mime_card_container">
        {renderHeader()}
        {this.renderCardInfo()}
      </div>
    )
  }
}
