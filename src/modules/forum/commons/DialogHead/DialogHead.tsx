import * as React from "react"
import AssetImg from "../../../../components/AssetImg";
import "./DialogHead.less"

// 问题概要 头部组件
interface DialogHeadProps {
  leftImgUrl: string;
  user: string;
  time: string;
  rightImgUrl?: string;
  rightContent?: string;
  rightContentFunc?: object;
  // 当右侧值为下面值是，显示为灰色
  disableContentValue?: string;
}
interface DialogHeadStates {
  changeRightContent: string;
}
export default class DialogHead extends React.Component<DialogHeadProps, DialogHeadStates> {

  constructor() {
    super()
    this.state = { changeRightContent: '' }
  }

  componentWillMount() {
    if(this.props.rightContent) {
      this.setState({ changeRightContent: this.props.rightContent })
    }
  }

  componentWillReceiveProps(newProps) {
    if(newProps.rightContent && newProps.rightContent != this.state.changeRightContent) {
      this.setState({changeRightContent: newProps.rightContent})
    }
  }

  render() {
    const {
      leftImgUrl, user, time, rightImgUrl, rightContent, rightContentFunc = () => {}, disableContentValue = ''
    } = this.props
    const { changeRightContent } = this.state

    const renderQuestionLeft = () => {
      return (
        <div className="dialog-left">
          <div className="dialog-left-headpic"><AssetImg url={leftImgUrl} width={32} height={32.5}/></div>
          <div className="dialog-left-content">
            <span className="dialog-name">{user}</span>
            <span className="dialog-time">{time}</span>
          </div>
        </div>
      )
    }

    const renderQuestionRight = () => {
      const renderRight = rightImgUrl || rightContent;
      const changeRightContentFunc = () => {
        let funcReturnContent = rightContentFunc()
        this.setState({ changeRightContent: funcReturnContent ? funcReturnContent : rightContent })
      }

      if(renderRight) {
        return (
          <div className="dialog-right">
            <div className={`dialog-right-content ${changeRightContent === disableContentValue ? 'disable' : ''}`}
                 onClick={() => changeRightContentFunc()}>
              {changeRightContent}
            </div>
          </div>
        )
      }
    }

    return (
      <div className="dialog-head">
        {renderQuestionLeft()}
        {renderQuestionRight()}
      </div>
    )
  }

}
