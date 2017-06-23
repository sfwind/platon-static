import * as React from "react"
import "./DialogBottomBtn.less"

// 问题概要 底部组件
interface DialogBottomProps {
  leftContent?: string;
  leftContentFunc?: object;
  btn1Content?: string;
  btn1ContentFunc?: object;
  btn1DisableValue?: string;
  btn2Content?: string;
  btn2ContentFunc?: object;
  btn2DisableValue?: string
}
interface DialogBottomStates {
  changeLeftContent: string;
  changeBtn1Content: string;
  changeBtn2Content: string;
}
export default class DialogBottomBtn extends React.Component<DialogBottomProps, DialogBottomStates> {

  constructor() {
    super()
    this.state = { changeLeftContent: '', changeBtn1Content: '', changeBtn2Content: '' }
  }

  componentWillMount() {
    if(this.props.leftContent) {
      this.setState({ changeLeftContent: this.props.leftContent })
    }
    if(this.props.btn1Content) {
      this.setState({ changeBtn1Content: this.props.btn1Content })
    }
    if(this.props.btn2Content) {
      this.setState({ changeBtn2Content: this.props.btn2Content })
    }
  }

  componentWillReceiveProps(newProps) {
    console.log(newProps.btn1Content)
    if(newProps.btn1Content !== this.state.changeBtn1Content) {
      this.setState({ changeBtn1Content: newProps.btn1Content })
    }
    if(newProps.btn2Content !== this.state.changeBtn2Content) {
      this.setState({ changeBtn2Content: newProps.btn2Content })
    }
  }

  render() {
    const {
      leftContent, leftContentFunc = () => {
      },
      btn1DisableValue = '', btn1Content, btn1ContentFunc = () => {
      },
      btn2DisableValue = '', btn2Content, btn2ContentFunc = () => {
      }
    } = this.props;
    const { changeLeftContent, changeBtn1Content, changeBtn2Content } = this.state;

    const renderLeftContent = () => {
      if(!leftContent) return
      const changeLeftContentFunc = () => {
        let funcReturnContent = leftContentFunc()
        this.setState({ changeLeftContent: funcReturnContent ? funcReturnContent : leftContent })
      }
      return (
        <div className="dialog-bottom-desc"
             onClick={() => changeLeftContentFunc()}>
          {changeLeftContent}
        </div>
      )
    }

    const renderBtn1Kit = () => {
      const changeBtn1ContentFunc = () => {
        let funcReturnContent = btn1ContentFunc()
        this.setState({ changeBtn1Content: funcReturnContent ? funcReturnContent : btn1Content })
      }
      if(btn1Content) {
        return (
          <div className={`btn1-right-content ${changeBtn1Content === btn1DisableValue ? 'disable' : ''}`}
               onClick={() => changeBtn1ContentFunc()}>
            {changeBtn1Content}
          </div>
        )
      }
    }

    const renderBtn2Kit = () => {
      const changeBtn2ContentFunc = () => {
        let funcReturnContent = btn2ContentFunc()
        console.log('方法返回的 btn2 的内容', funcReturnContent)
        this.setState({ changeBtn2Content: funcReturnContent ? funcReturnContent : btn2Content })
      }

      if(btn2Content) {
        return (
          <div className={`btn2-right-content ${changeBtn2Content === btn2DisableValue ? 'disable' : ''}`}
               onClick={() => changeBtn2ContentFunc()}>
            {changeBtn2Content}
          </div>
        )
      }
    }

    return (
      <div className="dialog-bottom-btn">
        {renderLeftContent()}
        <div className="dialog-bottom-btn-area">
          {renderBtn1Kit()}
          {renderBtn2Kit()}
        </div>
      </div>
    )
  }
}
