import * as React from "react";
import "./PullSlideTip.less";

interface PullSlideTipProps {
  isEnd: boolean
}
interface PullSlideTipState {

}
export default class PullSlideTip extends React.Component<PullSlideTipProps, PullSlideTipState> {

  constructor() {
    super()
    this.state = {}
  }

  render() {
    const { isEnd } = this.props
    const renderTips = () => {
      return (
        <div className="tips">{isEnd ? '没有更多了' : '上拉获取更多'}</div>
      )
    }
    return (
      <div className="pull-slide-tips">
        {renderTips()}
      </div>
    )
  }

}
