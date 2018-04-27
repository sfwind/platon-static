import * as React from 'react'
import './ProblemCardList.less'
import { changeTitle } from '../../../utils/helpers'
import { mark } from '../../../utils/request'
import { loadCardList } from '../async'
import { connect } from 'react-redux'
import { set, startLoad, endLoad, alertMsg } from 'reduxutil/actions'

@connect(state => state)
export default class ProblemCardList extends React.Component {

  constructor () {
    super()
    this.state = {}
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  async componentWillMount () {
    const { dispatch } = this.props
    mark({view: true,  module: '打点', function: '个人中心', action: '知识卡列表' })
    changeTitle('知识卡')
    let res = await loadCardList()
    if (res.code === 200) {
      this.setState({ data: res.msg })
    } else {
      dispatch(alertMsg(res.msg))
    }
  }

  render () {
    const { data = [] } = this.state

    return (
      <div className="problem-card-list-container">
        {
          data.map((card, index) => {
            const { abbreviation, completeCount, name, planId } = card
            return (
              completeCount > 0 &&
              <div className="card-section" onClick={() => {
                this.context.router.push(`/rise/static/problem/cards?planId=${planId}`)
              }}>
                <div className="card-name">
                  {name.length > 10 ? name.substr(0, 10) + '...' : name}</div>
                <div className="card-abbreviation">{abbreviation}</div>
                <div className="card-count">知识卡 {completeCount} 张</div>
              </div>
            )
          })
        }
      </div>
    )
  }

}
