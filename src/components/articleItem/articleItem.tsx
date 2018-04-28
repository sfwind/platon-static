/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：platon-static
 2. 文件功能： articleItem 主页文章精选
 3. 作者： liyang@iquanwai.com
 4. 备注： articles  //文章精选条目
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import * as React from 'react'
import ReactDom from 'react-dom';
import './articleItem.less'
export default class ArticleItem extends React.Component {
  constructor() {
    super();
    this.state = {
      articles: {},
      titleHeight: 1 // title 高度的变量
    }
  }
  componentWillMount(){
    this.setState({
      articles: this.props.articles
    });
  }
  componentDidMount(){
    let titleHeight = getComputedStyle(this.refs.title,null).height.replace('px',''); // 去到title 的高度值
    this.setState({
      titleHeight: titleHeight
    });
  }
  render(){
    const { articles } = this.state;
    return (
      <div className="article-item" onClick={()=>{ window.location.href = articles.linkUrl }}>
        <div className="left-pic">
          <img src={articles.thumbnail} alt="图片"/>
        </div>
        <div className="right-description">
          <h3 ref='title' style={{ marginBottom: `${parseInt(this.state.titleHeight) >18 ? "0":"0.6rem"}`}}>{articles.title}</h3>
          <p>{articles.description.length > 28 ?  articles.description.slice(0,28)+"...":articles.description}</p>
          <ul>
            {articles.tags &&articles.tags.slice(0,2).map((item,index)=><li key={index}>{item}</li>)}
          </ul>
        </div>
      </div>
    )
  }
}
