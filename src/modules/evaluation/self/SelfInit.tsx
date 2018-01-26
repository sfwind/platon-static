import * as React from 'react'
import './SelfInit.less'
import { FooterButton } from '../../../components/submitbutton/FooterButton'
import AssetImg from '../../../components/AssetImg'
import RenderInBody from '../../../components/RenderInBody'

interface SelfInitProps {
  handleStart: any,
  showQrCode?: any,
  qrCode?: any,
}

export class SelfInit extends React.Component<SelfInitProps, any> {

  constructor() {
    super()
  }

  render() {
    const { handleStart = () => {}, showQrCode, qrCode, closeCode = () => {} } = this.props

    return (
      <div className="self-init-component">
        <FooterButton btnArray={[ {
          click: () => handleStart(), text: '开始'
        } ]}/>
        {!!showQrCode ?
          <RenderInBody>
            <div className="qr_dialog">
              <div className="qr_dialog_mask" onClick={() => {
                closeCode();
              }}>
              </div>
              <div className="qr_dialog_content">
                <span>扫码后可进行测评哦</span>
                <div className="qr_code">
                  <AssetImg url={qrCode}/>
                </div>
              </div>
            </div>
          </RenderInBody> : null
        }
      </div>
    )
  }

}
