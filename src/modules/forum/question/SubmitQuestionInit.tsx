import * as React from "react";
import { connect } from "react-redux";
import { ForumButton } from "../commons/ForumComponent";
import { searchQuestion, getQuestion } from "../async"
import { mark } from "../../../utils/request"
import { splitText, removeHtmlTags, changeTitle } from "../../../utils/helpers"
import { startLoad, endLoad, alertMsg, set } from "../../../redux/actions";
import "./SubmitQuestionInit.less"
import _ from "lodash"
import PullSlideTip from '../../../components/PullSlideTip'

@connect(state => state)
export default class SubmitQuestionInit extends React.Component<any, any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super();
    this.state = {
      data: [],
      tagList: [],
      index: 1,
      end: true,
      selected:true,
      searchWord:'',
      searchData:[],
      length:0,
    };
    this.timer = null;
  }

  componentWillMount() {
    changeTitle('论坛')
    mark({module: "打点", function: "论坛", action: "打开提问标题页面"});
    const { dispatch, location,title } = this.props;
    const {questionId} = location.query;
    if(questionId){
      getQuestion(questionId).then(res=>{
        const {msg, code} = res;
        if(code === 200){
          this.setState({
            title: msg.topic, length: msg.topic.length
          });
        }else{
          dispatch(alertMsg(msg));
        }
      }).catch(e=>{
        dispatch(alertMsg(e));
      })
    }

    if(title){
      this.setState({
        title, length: title.length
      });
    }

    //解决android键盘遮挡，改变频幕高度问题
    this.timer = setInterval(()=>this.handleKeyboardUp(), 20);
  }

  componentWillUnmount(){
    if(this.timer){
      clearInterval(this.timer);
    }
  }

  nextTask() {
    const { dispatch,location } = this.props;
    const { title } = this.state;
    const {questionId} = location.query;
    if(!title){
      dispatch(alertMsg('请先写问题标题'))
      return
    }
    dispatch(set('title', title));
    //保证android的屏幕高度恢复后再跳转
    dispatch(startLoad())
    setTimeout(()=>{
      dispatch(endLoad())
      if(questionId){
        this.context.router.push({pathname:'/forum/static/question/detail', query:{questionId}});
      }else{
        this.context.router.push('/forum/static/question/detail');
      }
    }, 1000);

  }

  writeTitle(title) {
    const { dispatch } = this.props;
    const { searchWord } = this.state;
    if(searchWord === title && !! title){
      return;
    }

    if(!title){
      this.setState({data: [], page: 1, length:0, title: ''});
      return;
    }

    //不含字母时搜索
    let lastChar = title.charAt(title.length - 1);
    this.setState({ title, length: title.length });
    if(!/[A-Za-z]/.test(lastChar)) {
      searchQuestion(title, 1).then(res => {
        const {code, msg} = res;
        if (code === 200) {
          this.setState({data: msg.list, page: 1});
        } else {
          dispatch(alertMsg(msg));
        }
      }).catch(e => {
        dispatch(alertMsg(e));
      });
    }
  }

  handleKeyboardUp(){
    const {windowInnerHeight} = this.state;
    if(window.innerHeight > windowInnerHeight){
      this.render();
    }
    this.setState({windowInnerHeight:window.innerHeight});
  }

  handleClickGoAnswerPage(questionId) {
    const { dispatch } = this.props;
    const { title } = this.state;
    dispatch(set('title', title));
    //保证android的屏幕恢复后再跳转
    dispatch(startLoad());
    setTimeout(()=>{
      dispatch(endLoad());
      this.context.router.push({
        pathname: "/forum/static/answer",
        query: { questionId }
      })
    }, 1000);
  }

  render() {
    const { data = [], end, length, title } = this.state;

    const renderQuestionList = () => {
      if(!_.isEmpty(data)) {
        return (
            <div className="ques-list" style={{ minHeight: window.innerHeight - 96 - 57 }}>
              {
                data.map((questionItem, idx) => {
                  const {
                      id, topic
                  } = questionItem;
                  return (
                      <div className="simple-ques-desc" key={idx}>
                        <div className="simple-ques-title"
                             onClick={this.handleClickGoAnswerPage.bind(this, id)}>{splitText(removeHtmlTags(topic), 38)}</div>
                      </div>
                  )
                })
              }
            </div>
        )
      }
    }

    const renderButton = () => {
      return (
        <ForumButton content={'下一步'} clickFunc={() => this.nextTask()}/>
      )
    }

    return (
      <div className="question-init-container" style={{height: window.innerHeight + 1 }}>
        <div className={`question-page ${_.isEmpty(data)?'':'selected'}`}>
          <div className="page-title">
            写下问题标题
          </div>
          <div className="question-title">
            <textarea
                placeholder="写下问题的标题吧，清晰的标题能够吸引更多的人来回答问题（50字以内）"
                id="textarea" maxLength={50} defaultValue={title}
                onChange={(e)=>this.writeTitle(e.currentTarget.value)}
                />
            <div className="length-div">
              <div className="length-tip">
                {length} / 50
              </div>
            </div>
          </div>
          { _.isEmpty(data) ? null :
              <div className="question-divide">
                相关的问题
              </div>
          }
          {renderQuestionList()}
          {renderButton()}
        </div>
      </div>
    )

  }

}
