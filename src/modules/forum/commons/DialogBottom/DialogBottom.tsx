import * as React from "react"
import AssetImg from "../../../../components/AssetImg";
import "./DialogBottom.less"

// 问题概要 底部组件
interface DialogBottomProps {
  leftContent?: string;
  leftContentFunc?: object;
  btn1ImgUrl?: string;
  btn1Content?: string;
  btn1ContentFunc?: object;
  btn2ImgUrl?: string;
  btn2Content?: string;
  btn2ContentFunc?: object;
}
interface DialogBottomStates {
  changeBtn2Content: string;
}
export default class DialogBottom extends React.Component<DialogBottomProps, DialogBottomStates> {

  constructor() {
    super()
    this.state = { changeBtn2Content: '' }
  }

  componentWillMount() {
    if(this.props.btn2Content) {
      this.setState({ changeBtn2Content: this.props.btn2Content })
    }
  }

  render() {
    const {
      leftContent, leftContentFunc = () => {
      },
      btn1ImgUrl, btn1Content, btn1ContentFunc = () => {
      },
      btn2ImgUrl, btn2Content, btn2ContentFunc = () => {
      }
    } = this.props
    const { changeBtn2Content } = this.state

    const renderLeftContent = () => {
      return (
        <div className="dialog-bottom-desc"
             onClick={() => leftContentFunc()}>
          {leftContent}
        </div>
      )
    }

    const renderBtn1Kit = () => {
      const renderBtn1 = btn1ImgUrl || btn1Content
      if(renderBtn1) {
        return (
          <div className="dialog-bottom-btnarea-1">
            <div><AssetImg url={btn1ImgUrl} size={20}/></div>
            <div className="btn1-right-content" onClick={() => btn1ContentFunc()}>{btn1Content}</div>
          </div>
        )
      }
    }

    const renderBtn2Kit = () => {
      const renderBtn2 = btn2ImgUrl || btn2Content
      const changeBtn2ContentFunc = () => {
        let funcReturnContent = btn2ContentFunc()
        this.setState({ changeBtn2Content: funcReturnContent ? funcReturnContent : btn2Content })
      }

      if(renderBtn2) {
        return (
          <div className="dialog-bottom-btnarea-2">
            <div><AssetImg url={btn2ImgUrl} size={20}/></div>
            <div className="btn2-right-content"
                 onClick={() => changeBtn2ContentFunc()}>
              {changeBtn2Content}
            </div>
          </div>
        )
      }
    }

    return (
      <div className="dialog-bottom">
        {renderLeftContent()}
        {renderBtn1Kit()}
        {renderBtn2Kit()}
      </div>
    )
  }
}
