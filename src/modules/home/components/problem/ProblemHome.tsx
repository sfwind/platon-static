import * as React from 'react'
import './ProblemHome.less'
import AssetImg from '../../../../components/AssetImg'
import { orderProblem } from '../../async'
import { mark } from '../../../../utils/request'

interface ProblemHomeProps {
  data: any,
  subscribeFunc: any
}

export class ProblemHome extends React.Component<ProblemHomeProps, any> {

  constructor () {
    super()
    this.state = {}
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  componentWillMount () {
    this.setState({
      data: this.props.data,
      subscribeFunc: this.props.subscribeFunc,
    })
  }

  componentWillReceiveProps (nextProps) {
    if (JSON.stringify(nextProps) !== JSON.stringify(this.props)) {
      this.setState({
        data: nextProps.data,
        subscribeFunc: nextProps.subscribeFunc,
      })
    }
  }

  handleClickOrderProblem () {
    const { data = {}, subscribeFunc = () => {} } = this.state
    const { problemId = 1, abbreviation = '' } = data
    mark({ module: '打点', function: '查看详情', action: problemId, memo: abbreviation })
    this.context.router.push(`/rise/static/home/problem?id=${problemId}`)
  }

  render () {
    const { data = {}, subscribeFunc = () => {} } = this.state
    const {
      problemId = 1,
      abbreviation = '',
      name = '',
      hot = true,
      thumbnail = '',
    } = data

    return (
      <div className="problem-home-component">
        <span className="abbreviation">{abbreviation}</span>
        <span className="problem">{name}</span>
        {hot && <div className="hot">21 天爆款课程</div>}
        <div className="order" onClick={() => this.handleClickOrderProblem()}>查看详情</div>
        <AssetImg className="thumbnail" url={thumbnail}></AssetImg>
      </div>
    )
  }

}
