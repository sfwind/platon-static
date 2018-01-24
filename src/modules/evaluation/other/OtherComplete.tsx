import * as React from 'react'
import './OtherComplete.less'
import AssetImg from '../../../components/AssetImg'
import { FooterButton } from '../../../components/submitbutton/FooterButton'
import { closeWindow } from '../../helpers/JsConfig'

interface OtherCompleteProps {
  handleComplete: any
}

export class OtherComplete extends React.Component<OtherCompleteProps, any> {

  constructor() {
    super()
  }

  render() {
    const { handleComplete = () => {}, upName } = this.props

    return (
      <div className="other-complete-component">
        <div className="content">
          <div className="complete-tips">
            感谢你对{upName}的支持！<br/>
            如果你有兴趣参加该测评，请扫码预约名额
          </div>
          <div className='tips-qrcode-box'>
            <AssetImg className='tips-qrCode'
                      url='https://static.iqycamp.com/images/fragment/self_evaluation.jpeg?imageslim'/>
          </div>
        </div>
        <FooterButton btnArray={[ {
          text: '关闭',
          click: () => closeWindow()
        } ]}/>
      </div>
    )
  }

}
