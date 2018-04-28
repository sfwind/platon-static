/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：platon-static
 2. 文件功能：  ArticleList  文章列表页
 3. 作者： liyang@iquanwai.com
 4. 备注：
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import * as React from 'react'
import './articleList.less'
import ArticleItem from '../../../components/articleItem/articleItem' //文章组件
import Layout from '../../../components/layout/layout' //弹框罩层
import apiDataFilter from  '../../../utils/apiDataFilter'; // api组件
import commonFun from '../../../utils/commonFun'  // 公共方法函数

export default class ArticleList extends React.Component<any, any> {

  constructor() {
    super();
    this.state = {
      articlesFlows: [],
      layoutDescription : ''//弹框语言说明
    }
  }

  componentWillMount() {
    commonFun.sendBigData({ module: '打点', function: '着陆二级页', action: '打开文章列表页' }); // 页面埋点
    let self =this;
    apiDataFilter.request({
      apiPath: "home.articlesList",
       successCallback(data) {
        self.setState({
          articlesFlows:data.msg
        })
      },
      otherCallback(data) {
        self.setState({layoutDescription:data.msg})
      }
    })
  }

  render() {
    const {articlesFlows} = this.state;
    return (
      <div className="article-all">
        {articlesFlows && articlesFlows.map((item,index)=><ArticleItem articles={item} key={index}></ArticleItem>)}
        <Layout description={this.state.layoutDescription}></Layout>
      </div>
    )
  }
}


