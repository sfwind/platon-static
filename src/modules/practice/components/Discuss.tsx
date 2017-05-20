import * as React from "react";
import "./Discuss.less";
import {startLoad, endLoad, alertMsg} from "../../../redux/actions";

export default class Discuss extends React.Component <any, any> {
  constructor(props) {
    super()
    const {isReply,placeholder} = props
    this.state = {
      isReply: isReply,
      placeholder:placeholder,
      editDisable:false,
    }
  }

  onSubmit(){
    this.setState({editDisable:true})
    const { submit } = this.props
    submit()
  }

  render() {
    const { placeholder, editDisable} = this.state
    const { onChange, cancel } = this.props

    return (
        <div className="comment-dialog">
          <textarea placeholder={placeholder} onChange={(e)=>onChange(e.currentTarget.value)}>
          </textarea>
          <div className="comment-right-area">
            <div className="reply-tip" onClick={()=>cancel()}>取消评论</div>
            { editDisable ?
                <div className="comment-button disabled">评论中</div>
                :
                <div className="comment-button" onClick={this.onSubmit.bind(this)}>评论</div>
            }
          </div>
        </div>

    )
  }
}
