import * as React from 'react'
import './ProblemItem.less'

export default class ProblemItem extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { problem } = this.props
    if(!problem) return null

    return (
      <div className="problem-item-component"
           onClick={() => this.props.clickHandler(problem)}>
        <div className="pic">
          <div className={`problem-item-backcolor catalog${problem.catalogId}`}/>
          <div className={`problem-item-backimg catalog${problem.catalogId}`}/>
          <div className="problem-item-subCatalog">{problem.abbreviation}</div>
          {/*<div className="complete-person">*/}
            {/*<div className="icon-person"/>*/}
            {/*<span className="completed-person-count">&nbsp;{problem.chosenPersonCount}</span>*/}
          {/*</div>*/}
        </div>
        <div className="desc">
          <div className="problem-title">{problem.name}</div>
          <div className="problem-view">点击查看</div>
        </div>
      </div>
    )

  }
}
