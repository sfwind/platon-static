/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：platon-static
 2. 文件功能：无匹配路由对应页面，自动跳转到首页
 3. 作者：duanxianfeng@iquanwai.com
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import * as React from 'react'

export default class PageNotFound extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  constructor () {
    super()
  }

  componentDidMount () {
    this.context.router.push('/rise/static/home')
  }

  render () {
    return (
      <div></div>
    )
  }

}
