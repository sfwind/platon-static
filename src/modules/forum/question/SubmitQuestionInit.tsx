import * as React from "react";
import {connect} from "react-redux";
import { HeadArea, SimpleQuestion } from "../commons/ForumComponent";
import {loadQuestionByTag, loadTag} from "./async"
import PullElement from "pull-element";
import {startLoad, endLoad, alertMsg, set} from "../../../redux/actions";
import "./SubmitQuestionInit.less"
import _ from "lodash"

@connect(state => state)
export default class SubmitQuestionInit extends React.Component<any, any> {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    constructor() {
        super();
        this.state = {
            data:[],
            tagList:[],
            index:1,
            end:true,
        }
    }

    componentWillMount() {
        const {dispatch, location} = this.props;
        const {tagId} = location.query;
        dispatch(startLoad());
        loadTag().then(
            res => {
                dispatch(endLoad());
                if(res.code === 200) {
                    let tagList = res.msg;
                    const {selectedTagList} = this.props;
                    tagList.forEach(tag=>{
                        tag.selected = false;
                        if(selectedTagList){
                            selectedTagList.forEach(selected=>{
                                if(selected.id === tag.id){
                                    tag.selected = true;
                                }
                            })
                        }
                    });
                    this.setState({tagList});
                } else {
                    dispatch(alertMsg(res.msg));
                }
            }
        ).catch(ex => {
            dispatch(endLoad());
            dispatch(alertMsg(ex));
        })
    }

    componentDidUpdate(preProps,preState){
        const {dispatch, location} = this.props;
        const {data = []} = this.state
        if(data.length>0 && !this.pullElement){
            // 有内容并且米有pullElement
            const {dispatch} = this.props;
            this.pullElement = new PullElement({
                target:'.question-init-container',
                scroller:'.question-init-container',
                damping:4,
                // onPullUp: (data) => {
                //   if (data.translateY <= -40){
                //   } else {
                //     this.setState({opacity:(-data.translateY)/40});
                //   }
                // },
                detectScroll:true,
                detectScrollOnStart:true,
                onPullUpEnd:(data)=>{
                    loadQuestionByTag(this.state.index + 1).then(res=> {
                        const {code, msg} = res;
                        if (code === 200) {
                            if (msg && msg.list.length !== 0) {
                                _.remove(msg.list,(item)=>{
                                    return _.findIndex(this.state.data,item)!==-1
                                });
                                this.setState({data: this.state.data.concat(msg.list),
                                    index: this.state.index + 1, end: msg.end});
                                if(msg.end===true){
                                    this.pullElement.disable();
                                }
                            } else {
                                dispatch(alertMsg(msg));
                            }
                        } else {
                            dispatch(alertMsg(msg));
                        }
                    }).catch(ex => {
                        dispatch(alertMsg(ex));
                    });
                }
            })
            this.pullElement.init();
        }
    }

    onClick(tag){
        const {dispatch, location} = this.props;
        const {tagList} = this.state;
        //已选中则删除，反之则选中
        tagList.forEach((item)=>{
            if(item.id === tag.id){
                item.selected = !tag.selected;
            }
        });

        dispatch(startLoad());
        loadQuestionByTag(tag.id).then(res=>{
            dispatch(endLoad());
            const {code, msg} = res;
            if (code === 200) {
                this.setState({data: msg.list,
                    index: 1, end: msg.end});
                if(msg.end===true){
                    this.pullElement.disable();
                }
            } else {
                dispatch(alertMsg(msg));
            }
        }).catch(ex => {
            dispatch(endLoad());
            dispatch(alertMsg(ex));
        });

    }

    nextTask(){
        const {dispatch} = this.props;
        const {tagList} = this.state;
        let selectedTagList = [];
        tagList.forEach(item=>{
            if(item.selected){
                selectedTagList.push(item);
            }
        });
        if(_.isEmpty(selectedTagList)){
            dispatch(alertMsg('请先选择问题标签'));
            return;
        }
        dispatch(set('selectedTagList', selectedTagList));
        this.context.router.push('/forum/question/detail');
    }

    render() {
        const {data = [], tagList = []} = this.state;
        const {end} = data;

        const renderQuestionList = () => {
            return (
                <div className="ques-list">
                    {data.map((question, index)=>{
                        return (
                            <SimpleQuestion key={index} answer={question.answerCount} follow={question.followCount}
                                title={question.topic} onclickFunc={()=>console.log(1)}/>
                        )
                    })}
                </div>
            )
        }

        const renderTagList = () => {
            return (
                <div className="tag-list">
                    {tagList.map((tag, index)=>{
                        return (
                            <div className="tag" key={index} onClick={()=>this.onClick(tag)}>
                                {tag.name}
                            </div>
                        )
                    })}
                </div>
            )
        }

        const renderShowMore = () => {
            if (!_.isEmpty(data)){
                return (
                    end ? <div className="show-more">没有更多了</div> :
                        <div className="show-more">上拉加载更多问题</div>
                )
            }
        }

        return (
            <div className="question-init-container">
                <HeadArea content="一、选择问题标签" btnContent="下一步" btnFunc={() => this.nextTask()}/>
                <div className="question-page">
                    {renderTagList()}
                    {renderQuestionList()}
                    {renderShowMore()}
                </div>
            </div>
        )

    }

}