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
    }
  }

  componentWillReceiveProps(newProps){
    const {isReply} = this.state
    if(newProps.isReply!==isReply){
      this.setState({isReply:newProps.isReply,placeholder:newProps.placeholder})
    }
  }

  render() {
    const { isReply, placeholder } = this.state
    const { submit, onChange, cancel } = this.props
    return (
        <div className="comment-dialog">
          <textarea placeholder={placeholder} onChange={(e)=>onChange(e.currentTarget.value)}>
          </textarea>
          <div className="comment-right-area" style={{marginTop: `${isReply?0:28}`}}>
            {isReply? <div className="reply-tip" onClick={()=>cancel()}>取消回复</div>:null}
            <div className="comment-button" onClick={()=>submit()}>评论</div>
          </div>
        </div>

    )
  }
}
