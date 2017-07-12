import * as React from "react"
import "./HeadArea.less"

// 当网页最上层导航
interface HeadAreaProps {
  content: string;
  btnContent?: string;
  btnFunc?: object;
}
export default class HeadArea extends React.Component<HeadAreaProps, any> {

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
