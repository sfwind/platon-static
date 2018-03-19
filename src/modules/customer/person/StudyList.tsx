import * as React from 'react'
import './StudyList.less'
import { changeTitle } from '../../../utils/helpers'
import { mark } from '../../../utils/request'
import { loadStudyReport } from '../async'
import { connect } from 'react-redux'
import { set, startLoad, endLoad, alertMsg } from 'reduxutil/actions'
import { MarkBlock } from '../../../components/markblock/MarkBlock'
import * as _ from 'lodash'

@connect(state => state)
export default class StudyList extends React.Component {

  constructor() {
    super()
    this.state = {}
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  async componentWillMount() {
    const { dispatch } = this.props
    mark({ module: '打点', function: '个人中心', action: '打开我的学习报告页面' })
    changeTitle('我的学习报告')
    let res = await loadStudyReport()
    if(res.code === 200) {
      this.setState({ data: res.msg.donePlans })
    } else {
      dispatch(alertMsg(res.msg))
    }
  }

  goStudyReport(planId, problemId) {
    this.context.router.push({
      pathname: '/rise/static/plan/report',
      query: { planId: planId, problemId: problemId }
    })
  }

  render() {
    const { data = [] } = this.state
    return (
      <div className="study-list-container">
        {_.isEmpty(data)?
          <div className="no-study-container">
            <img src="https://static.iqycamp.com/images/no-certificate.png" style={{ width: 100, height: 100 }}/>
            <div className="show-no-study">
              暂时没有形成的学习报告哦
            </div>
            <div className="show-info">
              速速去上课获取吧
            </div>
          </div>
          :
            data.map((plan, index) => {
            const { problem, point, name, planId, problemId } = plan
            return (
              <MarkBlock module={'打点'} function={'我的学习报告'} action={'查看我的学习报告'} memo={planId} className="card-section"
                         onClick={() => {this.goStudyReport(planId, problemId)}}>
                <div className="card-name">
                  {name.length > 10 ? name.substr(0, 10) + '...' : name}</div>
                <div className="card-abbreviation">{problem.abbreviation}</div>
                <div className="card-count">{point}分</div>
              </MarkBlock>
            )
          })
        }
      </div>
    )
  }

}
