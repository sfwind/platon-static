import * as React from 'react'
import { connect } from 'react-redux'
import { startLoad, endLoad, alertMsg } from '../../../redux/actions'
import AssetImg from '../../../components/AssetImg'
import { loadProblemExtension } from '../../problem/async'
import './ProblemExtension.less'
import { FooterButton } from '../../../components/submitbutton/FooterButton'

@connect(state => state)
export default class ProblemExtension extends React.Component<any, any> {

  constructor() {
    super()
    this.state = {
      data: {}
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const { dispatch } = this.props
    const { problemId } = this.props.location.query
    dispatch(startLoad())
    loadProblemExtension(problemId).then(res => {
      dispatch(endLoad())
      if(res.code === 200) {
        this.setState({ data: res.msg, extension: res.msg.extension })
      } else {
        dispatch(alertMsg('当前课程暂无延伸学习相关内容'))
      }
    }).catch(e => {
      dispatch(endLoad())
      dispatch(alertMsg(e))
    })
  }

  render() {
    const { data } = this.state
    const { extension, onlineActivities = [], offlineActivities = [] } = data
    const { problemId, series, planId } = this.props.location.query

    let activities = onlineActivities.concat(offlineActivities)

    const renderActivities = () => {
      if(activities.length > 0) {
        return (
          <div className="extension-activity">
            <ExtensionHead
              icon={{ uri: 'https://static.iqycamp.com/images/problem/extension_icon_bag.png', width: 21, height: 20 }}
              content={`学习活动`}/>
            {
              activities.map((item, index) =>
                <ActivityContentBox sequence={index + 1}
                                    description={item.description}
                                    password={item.password}
                                    uri={item.uri} key={index}/>
              )
            }
          </div>
        )
      }
    }

    return (
      <div className="problem-extension-container">
        <div className="extension-read">
          <ExtensionHead
            icon={{ uri: 'https://static.iqycamp.com/images/problem/extension_icon_book.png', width: 21, height: 20 }}
            content={`延伸阅读`}/>
          <div className="extension-read-content" dangerouslySetInnerHTML={{ __html: extension }}/>
        </div>
        {renderActivities()}
        {/*<div className="extension-share">*/}
          {/*<ExtensionHead*/}
            {/*icon={{ uri: 'https://static.iqycamp.com/images/problem/extension_icon_star.png', width: 27, height: 20 }}*/}
            {/*content={`课程分享`}/>*/}
          {/*<div className="extension-share-content">深度好文&nbsp;遇见大咖&nbsp;分享心得</div>*/}
          {/*<div className="extension-share-view"*/}
               {/*onClick={() => this.context.router.push({*/}
                 {/*pathname: '/rise/static/practice/subject',*/}
                 {/*query: { id: problemId, series }*/}
               {/*})}>*/}
            {/*进入*/}
          {/*</div>*/}
        {/*</div>*/}
        <FooterButton btnArray={[{
                  click: () => this.context.router.push({pathname:'/rise/static/plan/study', query:{planId}}),
                  text: '返回'}]}/>
      </div>
    )
  }

}

// 分类上 icon 和文字
class ExtensionHead extends React.Component<{icon: {uri: string; width: number; height: number}; content: string}, any> {
  render() {
    const { icon, content } = this.props
    const { uri, width, height } = icon
    return (
      <div className="extension-head-title">{content}</div>
    )
  }
}

class ActivityContentBox extends React.Component<{description: string, uri: string, password?: string}, any> {
  render() {
    const { sequence, description, uri, password } = this.props
    return (
      <div className="content-box">
        <div className="content">{sequence + '. ' + description}</div>
        {password && <div className="password">直播间密码:{password}</div>}
        <div className="activity-type"># 线{password ? '上' : '下'}活动</div>
        <div className="view" onClick={() => window.location.href = uri}>点击查看</div>
      </div>
    )
  }
}
