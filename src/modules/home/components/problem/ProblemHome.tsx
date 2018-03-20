import * as React from 'react'
import './ProblemHome.less'
import AssetImg from '../../../../components/AssetImg'

interface ProblemHomeProps {
  data: any
}

export class ProblemHome extends React.Component<ProblemHomeProps, any> {

  constructor () {
    super()
    this.state = {}
  }

  render () {
    const {
      problemId = 1,
      abbreviation = '',
      name = '',
      hot = true,
      thumbnail = '',
    } = this.props.data

    return (
      <div className="problem-home-component">
        <span className="abbreviation">{abbreviation}</span>
        <span className="problem">{name}</span>
        {hot && <div className="hot">21 天爆款课程</div>}
        <div className="order" onClick={() => alert('you click order')}>立即预约</div>
        <AssetImg className="thumbnail" url={thumbnail}></AssetImg>
      </div>
    )
  }

}
