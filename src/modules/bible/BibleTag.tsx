import * as React from "react";
import { connect } from "react-redux"
import "./BibleTag.less"
import { changeTag, loadTags } from './async'
import { startLoad, endLoad, alertMsg, set } from "redux/actions"

@connect(state => state)
export default class BibleTag extends React.Component<any,any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super()
    this.state = {
      tags: []
    }
  }

  componentWillMount() {
    const { dispatch } = this.props
    dispatch(startLoad())
    loadTags().then(res => {
      dispatch(endLoad())
      if(res.code === 200) {
        this.setState({ tags: res.msg })
      } else {
        dispatch(alertMsg(res.msg))
      }
    }).catch(e => {
      dispatch(endLoad())
      dispatch(alertMsg(e))
    })
  }

  clickTag(click_tag) {
    const { tags } = this.state
    console.log(click_tag)
    tags.forEach((tag) => {
      if(tag.id === click_tag.id) {
        tag.chosen = !click_tag.chosen
      }
    })
    this.setState({ tags })
  }

  submitTag() {
    const { dispatch } = this.props
    const { tags } = this.state
    changeTag(tags).then(res => {
      if(res.code !== 200) {
        dispatch(alertMsg(res.msg))
      } else {
        dispatch(alertMsg('提交成功'))
      }
    }).catch(e => {
      dispatch(alertMsg(e))
    })
  }

  render() {
    const { tags = [] } = this.state

    const renderTags = (catalog) => {
      return tags.map((tag, index) => {
        if(tag.catalog === catalog) {
          return (
            <div className={`tag-button ${tag.chosen? 'chosen': ''}`} onClick={()=>this.clickTag(tag)}>
              {tag.name}
            </div>
          )
        }
      })
    }

    return (
      <div className="bible-tag-container">
        <div className="bible-tag-title">
          你想学习哪些内容呢？
        </div>
        <div className="tag-card">
          <div className="tag-catalog">能力类</div>
          <div className="tag-detail">
            {renderTags(1)}
          </div>
          <div className="tag-card-hr"/>
          <div className="tag-catalog">知识类</div>
          <div className="tag-detail">
            {renderTags(2)}
          </div>
        </div>
        <div className="submit" onClick={()=>this.submitTag()}>确认</div>
      </div>
    )
  }
}
