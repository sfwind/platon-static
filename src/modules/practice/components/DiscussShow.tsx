import * as React from "react";
import {connect} from "react-redux";
import {startLoad, endLoad, alertMsg} from "../../../redux/actions";
import AssetImg from "../../../components/AssetImg";

@connect(state => state)
export default class DiscussShow extends React.Component <any, any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  render() {
    const { discuss, reply } = this.props
    const { id, name, avatar,discussTime,priority,comment,repliedComment,repliedName,warmupPracticeId } = discuss
    console.log(warmupPracticeId)
    return (
        <div key={id} className="comment-cell">
          <div className="comment-avatar"><img className="comment-avatar-img" src={avatar} /></div>
          <div className="comment-area">
            <div className="comment-head">
              <div className="comment-name">
                {name}
              </div>
              <div className="comment-time">{discussTime}</div>
              {priority === 1 ?
                  <div className="right">
                    <AssetImg type="excellent_answer" height={31} width={32} marginTop={-15}/>
                  </div> : null
              }
            </div>
            <div className="comment-content">{comment}</div>
            {repliedComment ?
                <div className="comment-replied-content">{'回复 '}{repliedName}:{repliedComment}</div> : null}
            <div className="function-area" onClick={()=>{reply(warmupPracticeId, id)}}>
              <div className="function-icon">
                <AssetImg type="reply" height={12} width={15}/>
              </div>
              <div className="function-button">
                回复
              </div>
            </div>
          </div>
        </div>
    )
  }
}
