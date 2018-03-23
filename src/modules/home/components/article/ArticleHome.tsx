import * as React from 'react'
import './ArticleHome.less'
import AssetImg from '../../../../components/AssetImg'
import { splitContent } from '../../../../utils/helpers'

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
    console.log(this.props.data)
    const {
      title = '',
      description = '',
      thumbnail = '',
      linkParam = '',
    } = this.props.data

    return (
      <div className="article-home-component"
           onClick={() => this.context.router.push(`/rise/static/article?id=${linkParam}`)}>
        <div className="title">{splitContent(title, 12)}</div>
        <div className="desc">{splitContent(description, 20)}</div>
        <AssetImg className="thumbnail" url={thumbnail}></AssetImg>
      </div>
    )
  }

}
