import * as React from 'react'
import './FooterButton.less'
/*----------------------------------------------------------------------------------------------------------------------
  1. 项目名称：Platon-static
  2. 文件功能：底部按钮
  3. 作者： zhenzikang@iquanwai.com
  4. 备注：src->components->submitbutton->FooterButtons.tsx
 ---------------------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------------------------------------------------------------------------
  click:点击回调
  text:按钮文本
  className:样式，新增样式写到 FooterButton.less
  wrapperClassName:wrapper样式
-------------------------------------------------------------------------------------------------------------------*/
interface SubmitButtonProps {
  btnArray: {
    click: any,
    text: string,
    className?: string,
    wrapperClassName?: string,
  }
}

interface SubmitButtonState {

}

export class FooterButton extends React.Component<SubmitButtonProps, SubmitButtonState> {

  constructor() {
    super()
  }

  buttonClick(button = {}) {
    const {
      click, module, func, action, memo
    } = button;
    if(!!module && !!action) {
      let param = {
        module: module,
        function: func,
        action: action,
        memo: memo
      }
      mark(param);
    }
    click()
  }

  render() {
    const { wrapperClassName, btnArray = [] } = this.props
    if(btnArray.length === 1) {
      const { text, className = '' } = btnArray[ 0 ]
      return (
        <div className={`ft-button-wrapper button-footer ${wrapperClassName}`}>
          <div className={`submit-btn ${className}`} onClick={() => this.buttonClick(btnArray[ 0 ])}>{text}</div>
        </div>
      )
    } else {
      return (
        <div className={`ft-button-wrapper button-footer two-buttons ${wrapperClassName}`}>
          {
            btnArray.map((btn, idx) => {
              const { text, className = '' } = btn
              return (
                <div className={`button ${className}`} key={idx} onClick={() => this.buttonClick(btn)}>
                  {text}
                </div>
              )
            })
          }
        </div>
      )
    }
  }

}
