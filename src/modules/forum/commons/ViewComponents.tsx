import * as React from "react"
import "./ViewComponents.less"
import AssetImg from "../../../components/AssetImg";

// 当网页最上层导航
interface HeadAreaProps {
  content: string;
  btnContent?: string;
  btnFunc?: object;
}
export class HeadArea extends React.Component<HeadAreaProps, any> {

  constructor() {
    super()
  }

  render() {
    const {
      content, btnContent = '', btnFunc = () => {
      }
    } = this.props;

    const renderHeadBtn = () => {
      if(btnContent !== '') {
        return <div className="head-btn" onClick={() => btnFunc()}>{btnContent}</div>
      }
    }

    return (
      <div className="head-area">
        <div className="head-content">{content}</div>
        {renderHeadBtn()}
      </div>
    )
  }

}


// 问题概要 上侧组件
interface QuestionHeadProps {
  leftImgUrl: string;
  quesUser: string;
  quesTime: string;
  rightImgUrl?: string;
  rightContent?: string;
  rightContentFunc?: object;
}
export class QuestionHead extends React.Component<QuestionHeadProps, any> {

  constructor() {
    super()
  }

  render() {
    const {
      leftImgUrl, quesUser, quesTime, rightImgUrl, rightContent, rightContentFunc = () => {
      }
    } = this.props

    const renderQuestionLeft = () => {
      return (
        <div className="question-left">
          <div><AssetImg url={leftImgUrl} width={30} height={20}/></div>
          <div>{quesUser}</div>
          <div>{quesTime}</div>
        </div>
      )
    }

    const renderQuestionRight = () => {
      const renderRight = rightImgUrl || rightContent || rightContentFunc;
      if(renderRight) {
        return (
          <div className="question-right">
            <div><AssetImg url={rightImgUrl} width={30} height={20}/></div>
            <div onClick={() => rightContentFunc()} className="question-right-content">{rightContent}</div>
          </div>
        )
      }
    }

    return (
      <div className="question-head">
        {renderQuestionLeft()}
        {renderQuestionRight()}
      </div>
    )
  }

}
