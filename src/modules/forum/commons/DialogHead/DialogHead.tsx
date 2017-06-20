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
export default class DialogHead extends React.Component<DialogHeadProps, any> {

  constructor() {
    super()
  }

  render() {
    const {
      leftImgUrl, user, time, rightImgUrl, rightContent, rightContentFunc = () => {}
    } = this.props

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
      if(renderRight) {
        return (
          <div className="dialog-right">
            <div><AssetImg url={rightImgUrl} width={30} height={20}/></div>
            <div onClick={() => rightContentFunc()} className="dialog-right-content">{rightContent}</div>
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
