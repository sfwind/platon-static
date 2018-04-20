/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：platon-static
 2. 文件功能：小目标应用题输入组件
 3. 作者： duanxianfeng@iquanwai.com
 4. 备注：
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

import * as React from 'react';
import Editor from '../../../../components/simditor/Editor';
import './ChallengeSubmit.less';

export default class ChallengeSubmit extends React.Component {

  constructor () {
    super();
    this.state = {};
  }

  componentWillMount () {
    document.body.addEventListener('mousewheel', this.lockWindow);
    document.body.addEventListener('touchmove', this.lockWindow);
  }

  componentWillUnmount () {
    document.body.removeEventListener('mousewheel', this.lockWindow);
    document.body.removeEventListener('touchmove', this.lockWindow);
  }

  lockWindow (e) {
    e.preventDefault();
  }

  async handleSubmitChallenge () {
    let node = this.refs.editor;
    if (node) {
      let value = node.getValue();
      const {
        submitCallback = () => {
        },
        hideCallback = () => {
        },
      } = this.props;
      // 上传小目标的内容
      submitCallback(value);
      hideCallback();
    }
  }

  render () {
    const {
      value,
      hideCallback = () => {
      },
    } = this.props;

    return (
      <div className="challenge-submit-component">
        <div className="editor-box">
          <Editor ref="editor"
                  className='editor'
                  moduleId="6"
                  toolbarFloat={false}
                  value={value}
                  placeholder={'有灵感时马上记录在这里吧'}/>
          <div className="bottom-tip">
            <div>更喜欢电脑上提交？</div>
            <div>登录 www.iquanwai.com/community</div>
          </div>
          <div className="footerbutton">
            <div className="submit"
                 onClick={() => this.handleSubmitChallenge()}>
              提交
            </div>
          </div>
        </div>
        <div className="mask"
             onClick={() => {
               hideCallback();
             }}></div>
      </div>
    );
  }

}
