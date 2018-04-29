/*----------------------------------------------------------------------------------------------------------------------
  1. 项目名称：PLATON-STATIC
  2. 文件功能：竖向步骤图
  3. 作者： zhenzikang@iquanwai.com
  4. 备注：src -> components -> stepview -> VerticalStep.tsx
 ---------------------------------------------------------------------------------------------------------------------*/
import React from 'react';
import './VerticalStep.less';
import { createTextSpan } from 'typescript'

/*--------------------------------------------------------------------------------------------------------------------
  steps:数组
    title:步骤标题
    text:步骤文本
    active:是否亮起
-------------------------------------------------------------------------------------------------------------------*/
export default class VerticalStep extends React.Component<any, any> {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { list = [] } = this.props;
    return (
      <div className="vertical-step-component">
        <span>{JSON.stringify(list)}</span>
        <div className="step-list">
          <div className="step-item">
            <div className="step-num">1</div>
            <div className="step-content">
              <div className="step-title">自评</div>
              <div className="step-text">这是一份专业的能力测评，填写大约需要10分钟</div>
            </div>
          </div>
          <div className="step-item">
            <div className="step-num">2</div>
            <div className="step-content">
              <div className="step-title">自评</div>
              <div className="step-text">这是一份专业的能力测评，填写大约需要10分钟</div>
            </div>
          </div>
          <div className="step-item">
            <div className="step-num">3</div>
            <div className="step-content">
              <div className="step-title">自评</div>
              <div className="step-text">这是一份专业的能力测评，填写大约需要10分钟</div>
            </div>
          </div>
          <div className="step-line"/>
        </div>
      </div>
    )
  }
}
