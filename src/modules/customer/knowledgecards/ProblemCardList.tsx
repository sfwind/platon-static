import * as React from 'react'
import './ProblemCardList.less'
import { changeTitle } from '../../../utils/helpers'
import { mark } from '../../../utils/request'

export default class ProblemCardList extends React.Component {

  constructor () {
    super()
  }

  componentWillMount () {
    mark('打点', '个人中心', '知识卡列表')
    changeTitle('知识卡')
  }

  render () {

    return (
      <div className="problem-card-list-container">
        <div className="card-section">
          <div className="card-abbreviation">如何读一本书</div>
          <div className="card-count">知识卡 8 张</div>
        </div>
        <div className="card-section">
          <div className="card-abbreviation">如何读一本书</div>
          <div className="card-count">知识卡 8 张</div>
        </div>
      </div>
    )
  }

}
