import * as React from "react";
import "./Submit.less";
import { merge,findIndex,set } from "lodash";
import {startLoad, endLoad, alertMsg} from "../../../redux/actions";
import {connect} from "react-redux";
import { loadLabels,loadSubjectDesc,submitSubject,loadSubject } from "./async";
import { startLoad, endLoad, alertMsg } from "../../../redux/actions";
import SubmitBox from "../components/SubmitBox"


@connect(state=>state)
export class Submit extends React.Component <any, any> {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    constructor() {
        super()

        this.state = {
            editDisable:false,
        }
        this.labelMargin = (window.innerWidth-2) * 0.1 / 6;
    }

    componentWillMount(){
        const {dispatch,location} = this.props
        dispatch(startLoad())

        const submitId = location.query.submitId

        if(submitId){
            loadSubject(location.query.submitId).then(res=>{
                let {code, msg} = res;
                if(code === 200){
                    this.setState({
                        desc:msg.desc,
                        defaultContent: msg.content,
                        defaultLabels: msg.labelList,
                        defaultTitle: msg.title,
                    });
                    loadLabels(location.query.id).then(res=>{
                        dispatch(endLoad())
                        let {code,msg} = res;
                        if(code===200){
                            this.setState({labels:msg});
                        } else {
                            dispatch(alertMsg("获取标签失败"));
                        }
                    }).catch(ex => {
                        dispatch(endLoad())
                        dispatch(alertMsg(ex))
                    })
                } else {
                    dispatch(alertMsg("获取描述失败"));
                }
            }).catch(ex => {
                dispatch(endLoad())
                dispatch(alertMsg(ex))
            })
        }else{
            loadSubjectDesc(location.query.id).then(res=>{
                let {code, msg} = res;
                if(code === 200){
                    this.setState({desc:msg});
                    loadLabels(location.query.id).then(res=>{
                        dispatch(endLoad())
                        let {code,msg} = res;
                        if(code===200){
                            this.setState({labels:msg});
                        } else {
                            dispatch(alertMsg("获取标签失败"));
                        }
                    }).catch(ex => {
                        dispatch(endLoad())
                        dispatch(alertMsg(ex))
                    })
                } else {
                    dispatch(alertMsg("获取描述失败"));
                }
            }).catch(ex => {
                dispatch(endLoad())
                dispatch(alertMsg(ex))
            })
        }


    }

    clickLabel(selected,seq){
        this.setState({labels:set(merge([],this.state.labels),`[${seq}].selected`,!selected)})
    }

    onSubmit(content, title, labels){
        const { dispatch, location} = this.props
        if(content == null || content.length === 0){
            dispatch(alertMsg('还没有输入正文'))
            return
        }
        if(title == null || title.length === 0){
            dispatch(alertMsg('还没有输入标题'))
            return
        }
        this.setState({editDisable: true})
        submitSubject(location.query.id,title, content,null, labels).then(res => {
            dispatch(endLoad())
            const { code, msg } = res
            if (code === 200) {
                this.context.router.push({pathname: '/rise/static/practice/subject', query: this.props.location.query})
            }
            else {
                dispatch(alertMsg(msg))
                this.setState({editDisable: false})
            }
        }).catch(ex => {
            dispatch(endLoad())
            dispatch(alertMsg(ex))
            this.setState({editDisable: false})
        })
    }

    render() {
        return (
            <SubmitBox moduleId={4} height={this.commentHeight} placeholder={"发表你的精彩见解吧"} editDisable={this.state.editDisable}
                       onSubmit={(content,title,labels)=>this.onSubmit(content,title,labels)} desc={this.state.desc}
                       defaultTitle={this.state.defaultTitle} defaultContent={this.state.defaultContent}
                       defaultLabels={this.state.defaultLabels} labels={this.state.labels} titleEnable={true} />
        )
    }
}
