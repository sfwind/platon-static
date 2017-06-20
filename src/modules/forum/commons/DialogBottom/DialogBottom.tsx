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
export default class DialogBottom extends React.Component<DialogBottomProps, any> {

  constructor() {
    super()
  }

  render() {
    const {
      leftContent, leftContentFunc = () => {
      }, btn1ImgUrl, btn1Content, btn1ContentFunc = () => {
      },
      btn2ImgUrl, btn2Content, btn2ContentFunc = () => {
      }
    } = this.props

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
            <AssetImg url={btn1ImgUrl} size={20}/>
            <span onClick={() => btn1ContentFunc()}>{btn1Content}</span>
          </div>
        )
      }
    }

    const renderBtn2Kit = () => {
      const renderBtn2 = btn2ImgUrl || btn2Content
      if(renderBtn2) {
        return (
          <div className="dialog-bottom-btnarea-2">
            <AssetImg url={btn2ImgUrl} size={20}/>
            <span onClick={() => btn2ContentFunc()}>{btn2Content}</span>
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
