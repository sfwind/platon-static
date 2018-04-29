import * as React from 'react'
import './SelfInit.less'
import { FooterButton } from '../../../components/submitbutton/FooterButton'
import AssetImg from '../../../components/AssetImg'
import RenderInBody from '../../../components/RenderInBody'
import VerticalStep from '../../../components/stepview/VerticalStep'

interface SelfInitProps {
  handleStart: any,
  showQrCode?: any,
  qrCode?: any,
}

export class SelfInit extends React.Component<SelfInitProps, any> {

  constructor() {
    super()
    this.state = {
      list: [ 1, 2 ]
    }
  }

  render() {
    const { handleStart = () => {}, showQrCode, qrCode, closeCode = () => {} } = this.props
    const { list } = this.state;
    return (
      <div className="self-init-component">
        <h2 className="self-init-title">职业发展潜能测评</h2>
        <h4>测评简介</h4>
        <span className="self-init-context">
          职业发展潜能测评由华东师范大学教育教练<b>研究组</b>和<b>圈外同学</b>共同开发，通过4个维度、12个要素，帮助您全面评估职业能力与心理品质的现状，指导个人发展策略和计划。
        </span>
        <AssetImg url='https://static.iqycamp.com/images/fragment/survey_self_pic_0428.png' width='70%'
                  style={{ display: 'block', margin: '0 auto', padding: '2rem 0 5rem' }}/>
        <h4>测评须知</h4>
        <span className="self-init-context should-know">
        答案没有好坏、对错之分，为确保我们能够为你提供准确的发展建议，请提供最符合自己客观情况的回答。
        </span>
        <VerticalStep stepArray={[
          { title: '自评', text: '这是一份专业的能力测评，填写大约需要10分钟', active: true },
          { title: '他评', text: '为了让测评结果更准确，邀请至少三人为你进行他评，提高准确性' },
          { title: '获取报告', text: '根据自评和他评结果，生成完整分析报告' }

        ]}/>
        <div style={{ width: '100%', height: '4.5rem' }}/>
        <FooterButton wrapperClassName='primary' btnArray={[ {
          click: () => handleStart(), text: '立即开始测评'
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
