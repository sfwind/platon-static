import * as React from 'react'
import './ProblemItem.less'

export default class ProblemItem extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {}

    this.picWidth = (this.props.width ? this.props.width : window.innerWidth) * 0.4 - 25
    this.picHeight = 80 / 130 * this.picWidth
    this.bigFontSize = 13 / 375 * (this.props.width ? this.props.width : window.innerWidth)
    this.smallFontSize = 12 / 375 * (this.props.width ? this.props.width : window.innerWidth)
  }

  render() {
    const { problem } = this.props
    if(!problem) return null

    return (
      <div className={`problem-item ${this.props.rootClass ? this.props.rootClass : ''}`}
           onClick={() => this.props.clickHandler(problem)}>
        <div className="pic">
          <div className={`problem-item-backcolor catalog${problem.catalogId}`}/>
          <div className={`problem-item-backimg catalog${problem.catalogId}`}/>
          <div className="problem-item-subCatalog">{problem.subCatalog}</div>
          <div className="complete-person">
            <div className="icon-person"/>
            <span className="completed-person-count">&nbsp;{problem.chosenPersonCount}</span>
          </div>
        </div>
        <div className="desc">
          <div className="problem-title">{problem.name}</div>
          <div className="problem-view">点击查看</div>
        </div>
      </div>
    )

  }
}
