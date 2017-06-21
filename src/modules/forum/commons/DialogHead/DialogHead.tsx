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

  render() {
    const {
      leftImgUrl, user, time, rightImgUrl, rightContent, rightContentFunc = () => {
      }
    } = this.props
    const { changeRightContent } = this.state

    const renderQuestionLeft = () => {
      return (
        <div className="dialog-left">
          <div><AssetImg url={leftImgUrl} width={30} height={20}/></div>
          <div>{user}</div>
          <div>{time}</div>
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
            <div><AssetImg url={rightImgUrl} width={30} height={20}/></div>
            <div className="dialog-right-content"
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
