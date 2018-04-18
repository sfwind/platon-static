import * as React from 'react'
import './ApplicationSubmit.less'
import Editor from '../../../../components/simditor/Editor'
import requestProxy from '../../../../components/requestproxy/requestProxy'
import { autoSaveApplicationDraft, loadApplicationPractice, submitApplicationPractice } from '../../application/async'

const APPLICATION_AUTO_SAVING = 'rise_application_autosaving'

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

  componentWillMount () {
    document.body.addEventListener('mousewheel', this.lockWindow)
    document.body.addEventListener('touchmove', this.lockWindow)
  }

  lockWindow (e) {
    e.preventDefault()
  }

  async componentDidMount () {
    const { id, planId } = this.props
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
    document.body.removeEventListener('mousewheel', this.lockWindow)
    document.body.removeEventListener('touchmove', this.lockWindow)
  }

  autoSaveApplicationDraft () {
    clearInterval(this.autoSaveTimer)
    const { id, planId } = this.props
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
          id: this.props, content: value,
        }))
      }
    }
  }

  clearStorage () {
    window.localStorage.removeItem(APPLICATION_AUTO_SAVING)
  }

  async handleSubmitApplicationSubmit () {
    const {
      hideCallback = () => {
      },
      submitCallback = () => {
      },
    } = this.props
    const value = this.refs.editor.getValue()
    if (!value || value.length === 0) {
      requestProxy.alertMessage('请填写作业')
      return
    } else {
      const { id, planId } = this.props
      let res = await submitApplicationPractice(planId, id, { answer: value })
      if (res.code === 200) {
        this.clearStorage()
        hideCallback()
        submitCallback()
      }
    }
  }

  render () {
    const {
      id,
      planId,
      hideCallback = () => {
      },
      submitCallback = () => {
      },
    } = this.props
    const { value } = this.state

    return (
      <div className="application-submit-component">
        <div className="editor-box">
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
          <div className="footerbutton">
            <div className="temp-save"
                 onClick={() => {
                   hideCallback()
                   autoSaveApplicationDraft(planId, id, this.refs.editor.getValue())
                 }}>保存并返回
            </div>
            <div className="submit"
                 onClick={() => this.handleSubmitApplicationSubmit()}>提交
            </div>
          </div>
        </div>
        <div className="mask"></div>
      </div>
    )
  }

}
