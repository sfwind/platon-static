import * as React from "react";
import {connect} from "react-redux";
import "./Discuss.less";
import {startLoad, endLoad, alertMsg} from "../../../redux/actions";
import {deleteComment} from "../application/async"
import AssetImg from "../../../components/AssetImg";
import { Dialog } from "react-weui"
const { Alert } = Dialog

@connect(state => state)
export default class CommentShow extends React.Component <any, any> {
    constructor() {
        super()
        this.state = {
            show:false,
        }
    }

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    delete(){
        const { onDelete } = this.props
        this.setState({show:false})
        if(onDelete){
            onDelete()
        }
    }

    render() {
        const { show } = this.state
        const { comment } = this.props
        const {id, role, headPic, upTime, signature, content, upName, isMine} = comment

        const alertProps = {
            buttons:[
                {label:'再想想',onClick:()=>this.setState({show:false})},
                {label:'确定',onClick:()=>this.delete()}
            ],
        }

        return (
            <div className="comment-cell subject">
                <div className="comment-avatar"><img className="comment-avatar-img" src={headPic}/>
                </div>
                <div className="comment-area">
                    <div className="comment-head">
                        <div className="comment-name">
                            {upName}
                        </div>
                        {role==3||role==4?<div className="role"><img src='http://www.iqycamp.com/images/coach.png'/></div>:null}
                        {role==5||role==10?<div className="role"><img src='http://www.iqycamp.com/images/senior_coach.png'/></div>:null}
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
                                <AssetImg type="delete" height={15} width={15}/>
                                <div className="function-button" onClick={()=>this.setState({show:true})}>
                                    删除
                                </div>
                                <Alert { ...alertProps }
                                    show={show}>
                                    <div className="global-pre" dangerouslySetInnerHTML={{__html:`确认要删除评论吗？`}}/>
                                </Alert>
                            </div>
                        </div>    : null}
                </div>

            </div>
        )
    }
}
