import * as React from "react";
import {connect} from "react-redux";
import "./Discuss.less";
import {startLoad, endLoad, alertMsg} from "../../../redux/actions";
import {deleteComment} from "../application/async"
import AssetImg from "../../../components/AssetImg";

@connect(state => state)
export default class CommentShow extends React.Component <any, any> {
    constructor(props) {
        super()
        this.state = {
            del:false
        }
    }

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    onDelete(id){
        const { dispatch } = this.props
        deleteComment(id).then(res => {
            if(res.code === 200){
                dispatch(alertMsg('删除成功'))
                this.setState({del:true})
            }else{
                dispatch(alertMsg(res.msg))
            }
        })
    }

    render() {
        const { del } = this.state
        const { comment } = this.props
        const {id, role, headPic, upTime, signature, content, upName, isMine} = comment
        return (
            del? null:
            <div className="comment-cell subject">
                <div className="comment-avatar"><img className="comment-avatar-img" src={headPic}/>
                </div>
                <div className="comment-area">
                    <div className="comment-head">
                        <div className="comment-name">
                            {upName}
                        </div>
                        {role==3||role==4?<div className="role"><img src='http://www.iqycamp.com/images/coach.png'/></div>:null}
                        {role==5?<div className="role"><img src='http://www.iqycamp.com/images/senior_coach.png'/></div>:null}
                        {role==6||role==8?<div className="role"><img src='http://www.iqycamp.com/images/first_coach.png'/></div>:null}
                        {role==7?<div className="role"><img src='http://www.iqycamp.com/images/vip.png'/></div>:null}
                        <div className="comment-time">{upTime}</div>
                    </div>
                    <div className="signature">{signature}</div>
                    <div className="comment-content">
                        <pre>{content}</pre>
                    </div>
                    {isMine ?
                        <div className="function-area">
                            <div className="function-div" >
                                <AssetImg type="reply" height={12} width={15}/>
                                <div className="function-button" onClick={this.onDelete.bind(this, id)}>
                                    删除
                                </div>
                            </div>
                        </div>    : null}
                </div>

            </div>
        )
    }
}
