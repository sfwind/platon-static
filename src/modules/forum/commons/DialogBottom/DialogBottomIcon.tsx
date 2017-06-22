import * as React from "react"
import AssetImg from "../../../../components/AssetImg";
import "./DialogBottomIcon.less"

// 问题概要 底部组件
interface DialogBottomProps {
  leftContent?: string;
  leftContentFunc?: object;
  btn1ImgUrl?: string;
  btn1Content?: number;
  btn1ContentFunc?: object;
  btn2ImgUrl?: string;
  btn2Content?: number;
  btn2ContentFunc?: object;
}
interface DialogBottomStates {
  changeLeftContent: string;
  changeBtn2ImgUrl: string;
  changeBtn2Content: number;
}
const comment = 'https://static.iqycamp.com/images/fragment/comment.png?imageslim'
const unvote = 'https://static.iqycamp.com/images/fragment/unvote.png?imageslim'
const voted = 'https://static.iqycamp.com/images/fragment/voted.png?imageslim'
export default class DialogBottomIcon extends React.Component<DialogBottomProps, DialogBottomStates> {

  constructor() {
    super()
    this.state = { changeLeftContent:'', changeBtn2ImgUrl: '', changeBtn2Content: 0}
  }

  componentWillMount() {
    if(this.props.btn2ImgUrl) {
      this.setState({
        changeLeftContent: this.props.leftContent,
        changeBtn2ImgUrl: this.props.btn2ImgUrl ,
        changeBtn2Content: this.props.btn2Content
      })
    }
  }

  render() {
    const {
      leftContent, leftContentFunc = () => {},
      btn1ImgUrl, btn1Content, btn1ContentFunc = () => {},
      btn2ImgUrl, btn2Content, btn2ContentFunc = () => {}
    } = this.props
    const { changeLeftContent, changeBtn2ImgUrl, changeBtn2Content} = this.state

    const renderLeftContent = () => {
      if(!leftContent) return
      const changeLeftContentFunc = () => {
        let funcReturnContent = leftContentFunc()
        this.setState({changeLeftContent: funcReturnContent ? funcReturnContent : leftContent})
      }
      return (
        <div className="dialog-bottom-desc"
             onClick={() => changeLeftContentFunc()}>
          {changeLeftContent}
        </div>
      )
    }

    const renderBtn1Kit = () => {
      const renderBtn1 = btn1ImgUrl || btn1Content
      if(renderBtn1) {
        return (
          <div className="dialog-bottom-btnarea-1">
            <div><AssetImg url={btn1ImgUrl} size={16}/></div>
            <div className="btn1-right-content" onClick={() => btn1ContentFunc()}>{btn1Content}</div>
          </div>
        )
      }
    }

    const renderBtn2Kit = () => {
      const renderBtn2 = btn2ImgUrl || btn2Content
      const changeBtn2ImgUrlFunc = () => {
        let funcReturnContent = btn2ContentFunc()
        this.setState({
          changeBtn2ImgUrl: funcReturnContent ? funcReturnContent : btn2ImgUrl,
          changeBtn2Content: funcReturnContent === voted ? this.state.changeBtn2Content + 1 : this.state.changeBtn2Content - 1
        })
      }

      if(renderBtn2) {
        return (
          <div className="dialog-bottom-btnarea-2">
            <div><AssetImg url={changeBtn2ImgUrl} size={16}/></div>
            <div className="btn2-right-content"
                 onClick={() => changeBtn2ImgUrlFunc()}>
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
