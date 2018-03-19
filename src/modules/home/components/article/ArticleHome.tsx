import * as React from 'react'
import './ArticleHome.less'
import AssetImg from '../../../../components/AssetImg'

export class ArticleHome extends React.Component {

  constructor () {
    super()
    this.state = {
      data: {},
    }
  }

  render () {
    const {
      title = '别在刷屏了，请停止...',
      desc = '您现在还没有优秀证书哦，继续努力加油吧。',
      thumbnail = 'https://wx.qlogo.cn/mmopen/siaKjia9aBPcJHOCEV6z4Ayic3SEaztBgIHFjfNZCFnvibW7bURBmYJIwUIpyice6aELS6zATiaepeeu1lMaggayc9Wpboj9nSZ5Nib/132',
    } = this.state.data

    return (
      <div className="article-home-component" data-thumbnail={''}>
        <div className="title">{title}</div>
        <div className="desc">{desc}</div>
        <AssetImg className="thumbnail" url={thumbnail}></AssetImg>
      </div>
    )
  }

}
