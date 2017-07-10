import * as React from "react";
import { connect } from "react-redux";
import { ForumButton, PullSlideTip } from "../commons/ForumComponent";
import { loadQuestionByTag, searchQuestion, getQuestion } from "../async"
import { mark } from "../../../utils/request"
import { splitText, removeHtmlTags } from "../../../utils/helpers"
import PullElement from "pull-element";
import { startLoad, endLoad, alertMsg, set } from "../../../redux/actions";
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
      data: [],
      tagList: [],
      index: 1,
      end: true,
      selected:true,
      searchWord:'',
      searchData:[],
      length:0,
    };
    this.pullElement = null;
    this.timer = null;
  }

  componentWillMount() {
    mark({module: "打点", function: "论坛", action: "打开选择问题标签页面"});
    const { dispatch, location } = this.props;
    const {questionId} = location.query;
    if(questionId){
      getQuestion(questionId).then(res=>{
        const {msg, code} = res;
        if(code === 200){
          console.log(msg.topic);
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

    //解决android键盘遮挡，改变频幕高度问题
    this.timer = setInterval(()=>this.handleKeyboardUp(), 200);
  }

  componentDidUpdate(preProps, preState) {
    const { dispatch, location } = this.props;
    const { data = [] } = this.state;
    if(data.length > 0 && !this.pullElement) {
      // 有内容并且米有pullElement
      const { dispatch } = this.props;
      this.pullElement = new PullElement({
        target: '.question-init-container',
        scroller: '.question-init-container',
        damping: 4,
        onPullUp: (data) => {
          if(this.props.iNoBounce){
            if(this.props.iNoBounce.isEnabled()){
              this.props.iNoBounce.disable();
            }
          }
        },
        detectScroll: true,
        detectScrollOnStart: true,
        onPullUpEnd: (data) => {
          loadQuestionByTag(this.state.index + 1).then(res => {
            const { code, msg } = res;
            if(code === 200) {
              if(msg && msg.list.length !== 0) {
                _.remove(msg.list, (item) => {
                  return _.findIndex(this.state.data, item) !== -1
                });
                this.setState({
                  data: this.state.data.concat(msg.list),
                  index: this.state.index + 1, end: msg.end
                });
                if(msg.end === true) {
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
          if(this.props.iNoBounce){
            if(!this.props.iNoBounce.isEnabled()){
              this.props.iNoBounce.enable();
            }
          }
        }
      })
      this.pullElement.init();
    }
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
    dispatch(set('title', title));
    if(questionId){
      this.context.router.push({pathname:'/forum/static/question/detail', query:{questionId}});
    }else{
      this.context.router.push('/forum/static/question/detail');
    }

  }

  writeTitle(title) {
    const { dispatch } = this.props;
    const { searchWord } = this.state;
    if(searchWord === title){
      return;
    }
    //不含字母时搜索
    let lastChar = title.charAt(title.length - 1);
    this.setState({ title, length: title.length });
    if(!/[A-Za-z]/.test(lastChar)) {
      searchQuestion(title, 1).then(res => {
        const {code, msg} = res;
        if (code === 200) {
          this.setState({data: msg.list, page: 1})
        } else {
          dispatch(alertMsg(msg));
        }
      }).catch(e => {
        dispatch(alertMsg(e));
      });
    }
  }

  handleKeyboardUp(){
    const {windowInnerHeight, searchData=[]} = this.state;

    if(window.innerHeight > windowInnerHeight){
      this.setState({searchData});
    }
    this.setState({windowInnerHeight:window.innerHeight});
  }

  handleClickGoAnswerPage(questionId) {
    this.context.router.push({
      pathname: "/forum/static/answer",
      query: { questionId }
    })
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

    const renderShowMore = () => {
      if(!_.isEmpty(data)) {
        return (
          <PullSlideTip isEnd={end}/>
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
          {/*{renderShowMore()}*/}
          {renderButton()}
        </div>
      </div>
    )

  }

}
