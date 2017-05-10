import * as React from "react";
import {connect} from "react-redux";
import {startLoad, endLoad, alertMsg} from "../../../redux/actions";
import AssetImg from "../../../components/AssetImg";
import {deleteComment} from "../warmup/async"
import { Dialog } from "react-weui"
const { Alert } = Dialog

@connect(state => state)
export default class DiscussShow extends React.Component <any, any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super()
    this.state = {
      del:false,
      show:false,
    }
  }

  onDelete(){
    const { dispatch,discuss } = this.props
    const { id } = discuss
    deleteComment(id).then(res => {
      if(res.code === 200){
        this.setState({del:true})
      }else{
        dispatch(alertMsg(res.msg))
      }
    })
  }

  render() {
    const { discuss, reply } = this.props
    const {del, show} = this.state
    const { id, name, avatar,discussTime,priority,comment,repliedComment,repliedName,
        warmupPracticeId,role,signature,isMine,repliedDel } = discuss

    const alertProps = {
      buttons:[
        {label:'再想想',onClick:()=>this.setState({show:false})},
        {label:'确定',onClick:()=>this.onDelete()}
      ],
    }

    return (
        del ? null:
        <div key={id} className="comment-cell">
          <div className="comment-avatar"><img className="comment-avatar-img" src={avatar} /></div>
          <div className="comment-area">
            <div className="comment-head">
              <div className="comment-name">
                {name}
              </div>
              {role==3||role==4?<div className="role"><img src='http://www.iqycamp.com/images/coach.png'/></div>:null}
              {role==5?<div className="role"><img src='http://www.iqycamp.com/images/senior_coach.png'/></div>:null}
              {role==6||role==8?<div className="role"><img src='http://www.iqycamp.com/images/first_coach.png'/></div>:null}
              {role==7?<div className="role"><img src='http://www.iqycamp.com/images/vip.png'/></div>:null}
              <div className="comment-time">{discussTime}</div>
              {priority === 1 ?
                  <div className="right">
                    <AssetImg type="excellent_answer" height={31} width={32} marginTop={-10} marginRight={-10}/>
                  </div> : null
              }
            </div>
            <div className="signature">{signature}</div>
            <div className="comment-content">{comment}</div>
            {repliedComment && repliedDel==0 ?
                <div className="comment-replied-content">{'回复 '}{repliedName}:{repliedComment}</div> : null}
            <div className="function-area">
              <div className="function-div" onClick={()=>{reply(warmupPracticeId, id)}}>
                <AssetImg type="reply" height={12} width={15}/>
                <div className="function-button">
                  回复
                </div>
              </div>

              {isMine ?
                  <div className="function-div" >
                      <AssetImg type="delete" height={15} width={15}/>
                      <div className="function-button" onClick={()=>this.setState({show:true})}>
                        删除
                      </div>
                    <Alert { ...alertProps }
                        show={show}>
                      <div className="global-pre" dangerouslySetInnerHTML={{__html:`确认要删除评论吗？`}}/>
                    </Alert>
                  </div>      : null}
            </div>
          </div>
        </div>
    )
  }
}
