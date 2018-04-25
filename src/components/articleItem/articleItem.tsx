/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：platon-static
 2. 文件功能： articleItem 主页文章精选
 3. 作者： liyang@iquanwai.com
 4. 备注：
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import * as React from 'react'
import './articleItem.less'
export default class ArticleItem extends React.Component {
  constructor() {
    super();
  }

  render(){
    return (
      <div className="article-item">
        <div className="left-pic">
          <img src="https://static.iqycamp.com/images/share_link_icon.jpg?imageslim" alt="图片"/>
        </div>
        <div className="right-description">
          <h3>未来，你可能不属于任何公司</h3>
          <p>这是最好的时代，也是最坏的时代，你要怎么做，才能让它成为你的好时才能让它成为你的好时才能让它成为你的好时才能让它成为你的好时才能让它成为你的好时才能让它成为你的好时</p>
          <ul>
            <li>发展</li><li>发展</li><li>发展</li>
          </ul>
        </div>
      </div>
    )
  }
}
