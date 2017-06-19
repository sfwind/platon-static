import * as React from "react"
import "./ViewComponents.less"

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

interface QuestionHeadProps {
  leftImgUrl: string;
  quesUser: string;
  quesTime: string;
  rightImgUrl?: string;
  rightContent?: string;
  rightContentFunc?: object;
}
export class QuestionHead extends React.Component<QuestionHeadProps, any> {

}
