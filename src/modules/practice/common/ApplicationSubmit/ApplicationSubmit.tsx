import * as React from 'react'
import './ApplicationSubmit.less'
import EditorTopBar from '../../components/EditorTopBar/EditorTopBar'
import Editor from '../../../../components/simditor/Editor'
import { connect } from 'react-redux'
import { autoSaveApplicationDraft, loadApplicationPractice, submitApplicationPractice } from '../../application/async'
import { set, startLoad, endLoad, alertMsg } from 'reduxutil/actions'

const APPLICATION_AUTO_SAVING = 'rise_application_autosaving'

@connect(state => state)
export default class ApplicationSubmit extends React.Component {

  autoSaveTimer = null

  constructor () {
    super()
    this.state = {
      value: '',
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  async componentDidMount () {
    const { id, planId } = this.props.location.query
    let res = await loadApplicationPractice(id, planId)
    let storageDraft = JSON.parse(window.localStorage.getItem(APPLICATION_AUTO_SAVING))
    if (storageDraft && storageDraft.id === id) {
      if (res.msg.overrideLocalStorage || res.msg.isSynchronized) {
        this.setState({
          value: res.msg.isSynchronized ? res.msg.content : res.msg.draft,
        }, () => {
          this.autoSaveApplicationDraft()
        })
      } else {
        this.setState({
          value: storageDraft.content,
        }, () => {
          this.autoSaveApplicationDraft()
        })
      }
    } else {
      this.setState({
        value: res.msg.isSynchronized ? res.msg.content : res.msg.draft,
      }, () => {
        this.autoSaveApplicationDraft()
      })
    }
  }

  componentWillUnmount () {
    clearInterval(this.autoSaveTimer)
  }

  autoSaveApplicationDraft () {
    clearInterval(this.autoSaveTimer)
    const { id, planId } = this.props.location.query
    this.autoSaveTimer = setInterval(() => {
      if (this.refs.editor) {
        let draft = this.refs.editor.getValue()
        if (draft.trim().length > 0) {
          autoSaveApplicationDraft(planId, id, draft)
        }
      }
    }, 10000)
  }

  autoSave () {
    if (this.refs.editor) {
      let value = this.refs.editor.getValue()
      if (value) {
        window.localStorage.setItem(APPLICATION_AUTO_SAVING, JSON.stringify({
          id: this.props.location.query.id, content: value,
        }))
      }
    }
  }

  clearStorage () {
    window.localStorage.removeItem(APPLICATION_AUTO_SAVING)
  }

  async handleSubmitApplicationSubmit () {
    const { dispatch } = this.props
    const value = this.refs.editor.getValue()
    if (!value || value.length === 0) {
      dispatch(alertMsg('请填写作业'))
    }
    const { id, planId } = this.props.location.query
    let res = await submitApplicationPractice(planId, id, { answer: value })
    if (res.code === 200) {
      this.clearStorage()
      this.context.router.goBack()
    }
  }

  render () {
    const { value } = this.state

    return (
      <div className="application-submit-container">
        <EditorTopBar leftLabel={'取消'}
                      leftOnClick={() => {
                        this.context.router.goBack()
                      }}
                      description={'我的作业'}
                      rightLabel={'提交'}
                      rightOnClick={() => this.handleSubmitApplicationSubmit()}/>
        <Editor ref="editor"
                className="editor"
                moduleId="6"
                toolbarFloat={false}
                value={value}
                autoSave={() => this.autoSave()}
                placeholder="有灵感时马上记录在这里吧，系统会自动为你保存。完成后点上方按钮提交，就会得到点赞和专业点评哦！"/>
        <div className="bottom-tip">
          <div>更喜欢电脑上提交？</div>
          <div>登录 www.iquanwai.com/community</div>
        </div>
      </div>
    )
  }

}
