import * as React from 'react'
import './StudyList.less'
import { changeTitle } from '../../../utils/helpers'
import { mark } from '../../../utils/request'
import { loadCardList, loadStudyReport } from '../async'
import { connect } from 'react-redux'
import { set, startLoad, endLoad, alertMsg } from 'reduxutil/actions'

@connect(state => state)
export default class StudyList extends React.Component {

  constructor () {
    super()
    this.state = {}
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  async componentWillMount () {
    const { dispatch } = this.props
    mark('打点', '个人中心', '进入我的学习报告')
    changeTitle('我的学习报告')
    let res = await loadStudyReport()
    if (res.code === 200) {
      this.setState({ data: res.msg.donePlans })
    } else {
      dispatch(alertMsg(res.msg))
    }
  }

  render () {
    const { data = [] } = this.state

    return (
      <div className="study-list-container">
        {
          data.map((plan, index) => {
            const { problem, point, name} = plan
            return (
              <div className="card-section">
                <div className="card-name">
                  {name.length > 10 ? name.substr(0, 10) + '...' : name}</div>
                <div className="card-abbreviation">{problem.abbreviation}</div>
                <div className="card-count">{point}分</div>
              </div>
            )
          })
        }
      </div>
    )
  }

}
