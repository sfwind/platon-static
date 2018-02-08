import * as React from 'react'
import './Discuss.less'
import { startLoad, endLoad, alertMsg } from '../../../redux/actions'

export default class Discuss extends React.Component <any, any> {
  constructor(props) {
    super()
    const { isReply, placeholder } = props
    this.state = {
      isReply: isReply,
      placeholder: placeholder,
      editDisable: false,
      length: 0
    }
  }

  componentWillReceiveProps(newProps) {
    if(this.state.placeholder !== newProps.placeholder) {
      this.setState({ placeholder: newProps.placeholder })
    }
  }

  componentDidMount() {
    this.refs.input.focus()
    //解决ios键盘弹出挡住输入框的问题
    setTimeout(function() {
      document.body.scrollTop = document.body.scrollHeight
    }, 300)

  }

  onSubmit() {
    this.setState({ editDisable: true })
    const { submit } = this.props
    submit()
    setTimeout(() => {
      this.setState({ editDisable: false })
    }, 1000)
  }

  change(value) {
    const { onChange } = this.props
    this.setState({ length: value.length })
    onChange(value)
  }

  render() {
    const { placeholder, editDisable, length } = this.state
    const { cancel, limit } = this.props

    return (
      <div className="comment-dialog">
        <div className="textarea-div">
            <textarea ref="input" placeholder={placeholder} maxLength={limit}
                      onChange={(e) => this.change(e.currentTarget.value)}>
            </textarea>
        </div>

        <div className="comment-right-area">
          <div className="reply-tip" onClick={() => cancel()}>取消评论</div>
          {
            editDisable ?
              <div className="comment-button disabled">评论中</div> :
              <div className="comment-button" onClick={this.onSubmit.bind(this)}>评论</div>
          }
        </div>
        <div className="length-div">
          <div className="length-tip">
            {length} / {limit}
          </div>
        </div>
      </div>

    )
  }
}
