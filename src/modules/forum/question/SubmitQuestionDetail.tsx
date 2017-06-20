import * as React from "react";
import {connect} from "react-redux";
import { HeadArea } from "../commons/ForumComponent";
import {submitQuestion} from "./async"
import {startLoad, endLoad, alertMsg, set} from "../../../redux/actions";
import "./SubmitQuestionDetail.less"

@connect(state => state)
export default class SubmitQuestionDetail extends React.Component<any, any> {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    constructor() {
        super();
        this.state = {
            selectedTagList:[],
            index:1,
            end:true,
            title:'',
            detail:'',
        }
    }

    componentDidMount(){
        const {selectedTagList} = this.props;
        this.setState({selectedTagList});
    }

    submit(){
        const {title, detail, selectedTagList} = this.state;
        let tagIds = [];
        const {dispatch} = this.props;
        if(!title){
            dispatch(alertMsg('请填写问题标题'));
            return;
        }
        if(!detail){
            dispatch(alertMsg('请填写问题描述'));
            return;
        }

        if(selectedTagList){
            selectedTagList.forEach(selectedTag=>{
                tagIds.push(selectedTag.id);
            });
        }

        dispatch(startLoad());
        submitQuestion({topic:title, description:detail, tagIds}).then(res=>{
            dispatch(endLoad());
            if(res.code === 200){
                this.context.router.push('/forum/question');
            }else{
                dispatch(alertMsg(res.msg));
            }
          }
        ).catch(ex => {
            dispatch(endLoad());
            dispatch(alertMsg(ex));
        });
    }

    render() {
        const {data = [], selectedTagList = []} = this.state;

        const renderTagList = () => {
            return (
                <div className="tag-list">
                    {selectedTagList.map((tag, index)=>{
                        return (
                            <div className="tag" key={index}>
                                {tag.name}
                            </div>
                        )
                    })}
                </div>
            )
        }


        return (
            <div className="question-detail-container">
                <HeadArea content="二、完善问题描述" btnContent="提交" btnFunc={() => this.submit()}/>
                <div className="question-page">
                    {renderTagList()}
                    <div>
                        <textarea className="question-title" placeholder="写下问题的标题吧，清晰的标题能够吸引更多的人来回答问题（20字以内）"
                                  onChange={(e)=>this.setState({title:e.currentTarget.value})}/>
                    </div>
                    <div>
                        <textarea className="question-detail" placeholder="写下问题的详细背景，帮助他人更好地分析和解答你的问题（xxx字以内）。"
                                  onChange={(e)=>this.setState({detail:e.currentTarget.value})}/>
                    </div>
                </div>
            </div>
        )

    }

}
