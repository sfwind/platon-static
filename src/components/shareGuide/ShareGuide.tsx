/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：platon-static
 2. 文件功能：
 3. 作者：duanxianfeng@iquanwai.com
 4. 备注：
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import * as React from 'react';
import './ShareGuide.less';

export default class ShareGuide extends React.Component {

  constructor () {
    super();
  }

  render () {
    return (
      <div className="share-tip-component">
        <img className="tip-pic"
             src="//static.iqycamp.com/images/share_pic1.png?imageslim"/>
      </div>
    );
  }

}
