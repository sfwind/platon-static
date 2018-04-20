/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：platon-static
 2. 文件功能：
 3. 作者： duanxianfeng@iquanwai.com
 4. 备注：
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

import * as React from 'react';
import DiscussTopBar from '../../components/DiscussTopBar/DiscussTopBar';
import PersonalDiscussDistrict from '../../components/PersonalDiscussDisctrict/PersonalDiscussDistrict';

export default class ChallengeDiscussDistrict extends React.Component {

  constructor () {
    super();
    this.state = {};
  }

  componentWillMount () {
    const {
      data,
    } = this.props;
  }

  componentWillReceiveProps (nextProps) {
    if (JSON.stringify(nextProps) !== JSON.stringify(this.props)) {
      this.props = nextProps;
    }
  }

  render () {
    const {
      data,
    } = this.props;
    const {
      discuss,
    } = data;

    return (
      <div className="challenge-discuss-distirct-component">
        <DiscussTopBar leftLabel={'我的目标'}/>
        <PersonalDiscussDistrict discuss={discuss}/>
      </div>
    );
  }

}
