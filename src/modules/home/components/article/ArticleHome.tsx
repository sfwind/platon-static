import * as React from 'react'
import './ArticleHome.less'
import AssetImg from '../../../../components/AssetImg'
import { splitContent } from '../../../../utils/helpers'
import { mark } from '../../../../utils/request'

interface ArticleHomeProps {
  data: any
}

export class ArticleHome extends React.Component<ArticleHomeProps, any> {

  constructor () {
    super()
    this.state = {
      data: {},
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  render () {
    const {
      title = '',
      description = '',
      thumbnail = '',
      linkUrl = '',
      linkParam = '',
    } = this.props.data

    return (
      <div className="article-home-component" onClick={() => {
        mark({ module: '打点', function: '着陆页', action: '点击文章' })
        window.location.href = linkUrl
      }}>
        <div className="title">{splitContent(title, 12)}</div>
        <div className="desc">{splitContent(description, 20)}</div>
        <AssetImg className="thumbnail" url={thumbnail}></AssetImg>
      </div>
    )
  }

}
