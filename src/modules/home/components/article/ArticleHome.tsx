import * as React from 'react'
import './ArticleHome.less'
import AssetImg from '../../../../components/AssetImg'

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

  render () {
    const {
      title = '',
      description = '',
      thumbnail = '',
    } = this.props.data

    return (
      <div className="article-home-component" data-thumbnail={''}>
        <div className="title">{title.length > 12 ? title.substr(0, 12) + '...' : title}</div>
        <div className="desc">{description.length > 20 ? description.substr(0, 20) + '...' : description}</div>
        <AssetImg className="thumbnail" url={thumbnail}></AssetImg>
      </div>
    )
  }

}
