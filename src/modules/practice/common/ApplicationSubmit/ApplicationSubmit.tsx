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
    console.log(res)
    this.setState({
      value: res.msg.content,
    })
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
          autoSaveApplicationDraft(planId, id, draft).then(res => {
            if (res.code === 200) {
              this.clearStorage()
            }
          })
        }
      }
    }, 10000)
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
                placeholder="有灵感时马上记录在这里吧，系统会自动为你保存。完成后点上方按钮提交，就会得到点赞和专业点评哦！"/>
      </div>
    )
  }

}
