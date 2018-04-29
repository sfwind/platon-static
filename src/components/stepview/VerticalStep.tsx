/*----------------------------------------------------------------------------------------------------------------------
  1. 项目名称：PLATON-STATIC
  2. 文件功能：竖向步骤图
  3. 作者： zhenzikang@iquanwai.com
  4. 备注：src -> components -> stepview -> VerticalStep.tsx
 ---------------------------------------------------------------------------------------------------------------------*/
import React from 'react';
import './VerticalStep.less';
import classNames from 'classnames';

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
    const { stepArray = [], className, ...others } = this.props;
    const cls = classNames('vertical-step-component', {
      [className]: className
    });

    return (
      <div className={cls}>
        <div className="step-list">
          {(!!stepArray) && stepArray.map((item, key) => {
            console.log(item, key);
            const { title, text, active } = item;
            const itemCls = classNames('step-item', { 'active': active });
            return (
              <div className={itemCls} key={key}>
                <div className="step-num">{key + 1}</div>
                <div className="step-content">
                  <div className="step-title">{title}</div>
                  <div className="step-text">{text}</div>
                </div>
              </div>
            )
          })}
          <div className="step-line"/>
        </div>
      </div>
    )
  }
}
