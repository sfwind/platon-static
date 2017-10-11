import * as React from "react";
import { connect } from "react-redux";
import PullElement from 'pull-element';
import { ToolBarNoConnect } from "../../base/ToolBarNoConnect";
import { DialogHead } from "../commons/ForumComponent";
import { disFollow, follow, getAllQuestions, getQuestion, searchQuestion } from "../async";
import { mark } from "../../../utils/request"
import { splitText, removeHtmlTags, changeTitle, unScrollToBorder } from "../../../utils/helpers"
import { startLoad, endLoad, alertMsg, set } from "../../../redux/actions";
import _ from "lodash";
import QuestionAnswer from "./QuestionAnswer"
import FullScreenDialog from "../../../components/FullScreenDialog"
import "./Question.less";
import AssetImg from "../../../components/AssetImg";
import PullSlideTip from '../../../components/PullSlideTip'
import RenderInBody from '../../../components/RenderInBody'

interface QuestionStates {
  questions: object;
  // 分页获取 Question 列表分页数
  page: number;
  // 是否已是最后一页
  end: boolean;
  searching: boolean;
  init: boolean;
  questionId: number;
}

@connect(state => state)
export default class Question extends React.Component<any, QuestionStates> {

  constructor() {
    super()
    this.state = {
      questions: [],
      page: 1,
      end: false,
      showToast: false,
      content: "",
      searching: false,
      init: true,
      searchData: [],
      searchWord: '',
      windowInnerHeight: window.innerHeight,
      questionId: -1,
    }
    this.pullElement = null;
    this.timer = null;
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    changeTitle('论坛')
    mark({ module: "打点", function: "论坛", action: "打开问题列表页" })
    const { dispatch, location } = this.props;
    const { questionId } = location.query;
    let questions = [];
    dispatch(startLoad());
    if(questionId) {
      getQuestion(questionId).then(res => {
        if(res.code === 200) {
          questions.push(res.msg);
        } else {
          dispatch(alertMsg(res.msg));
        }
      }).catch(e => {
        dispatch(alertMsg(e));
      })
    }

    getAllQuestions().then(res => {
      dispatch(endLoad());
      const { code, msg } = res;
      if(code === 200) {
        if(questionId) {
          _.remove(res.msg.list, (item) => {
            return item.id == questionId;
          });
        }
        this.setState({ questions: questions.concat(msg.list) })
      } else {
        dispatch(alertMsg(res.msg));
      }
    }).catch(e => {
      dispatch(alertMsg(e));
      dispatch(endLoad());
    });

    //解决android键盘遮挡，改变屏幕高度问题
    this.timer = setInterval(() => this.handleKeyboardUp(), 200);

    dispatch(set('title', undefined));
  }

  componentDidMount() {
    // unScrollToBorder('.question-page');
  }

  componentDidUpdate() {
    const { dispatch, location } = this.props;
    if(!this.pullElement) {
      this.pullElement = new PullElement({
        target: '.question-page',
        scroller: '.question-page',
        // trigger: '.pull-slide-tips',
        damping: 4,
        detectScroll: true,
        detectScrollOnStart: false,
        onPullUp: (data) => {
          if(this.props.iNoBounce) {
            if(this.props.iNoBounce.isEnabled()) {
              this.props.iNoBounce.disable();
            }
          }
        },
        onPullUpEnd: () => {
          if(this.state.content) {
            searchQuestion(this.state.content, this.state.page + 1).then(res => {
              dispatch(endLoad());
              const { code, msg } = res;
              if(code === 200) {
                this.setState({
                  questions: this.state.questions.concat(msg.list),
                  page: this.state.page + 1
                })
              } else {
                dispatch(alertMsg(res.msg));
              }
            }).catch(e => {
              dispatch(alertMsg(e));
              dispatch(endLoad());
            });
          } else {
            getAllQuestions(this.state.page + 1).then(res => {
              const { code, msg } = res;
              const { questionId } = location.query;
              if(code === 200) {
                if(questionId) {
                  _.remove(res.msg.list, (item) => {
                    return item.id == questionId;
                  });
                }
                this.setState({
                  questions: this.state.questions.concat(msg.list),
                  page: this.state.page + 1,
                  end: msg.end
                })
              }
            }).catch(e => {
              dispatch(alertMsg(e));
              dispatch(endLoad());
            })
          }
          if(this.props.iNoBounce) {
            if(!this.props.iNoBounce.isEnabled()) {
              this.props.iNoBounce.enable();
            }
          }
        }
      })
      this.pullElement.init();
    }
    if(this.pullElement && this.state.end) {
      this.pullElement.destroy();
    }
  }

  componentWillUnmount() {
    if(this.timer) {
      clearInterval(this.timer);
    }
  }

  handleClickGoQuestionInitPage() {
    this.context.router.push("/forum/static/question/init")
  }

  handleClickFeedback() {
    mark({ module: "打点", function: "论坛", action: "点击意见反馈" });
    window.location.href = `https://${window.location.hostname}/survey/wjx?activity=15135162 `
  }

  handleClickGoAnswerPage(questionId) {
    this.setState({ questionId, show: true })
  }

  handleSearch(value) {
    const { dispatch } = this.props;
    const { searchWord } = this.state;
    if(searchWord === value) {
      return;
    }
    //不含字母时搜索
    let lastChar = value.charAt(value.length - 1);
    if(!/[A-Za-z]/.test(lastChar)) {
      dispatch(startLoad());
      searchQuestion(value, 1).then(res => {
        dispatch(endLoad());
        const { code, msg } = res;
        if(code === 200) {
          this.setState({ searchData: res.msg.list, content: value, page: 1, searchWord: value })
        } else {
          dispatch(alertMsg(res.msg));
        }
      }).catch(e => {
        dispatch(alertMsg(e));
        dispatch(endLoad());
      });
    }
  }

  handleCancel() {
    this.setState({ searching: false, init: true, searchData: [], searchWord: "" });
    this.refs.searchInput.value = '';
  }

  handleKeyboardUp() {
    const { windowInnerHeight, searchData = [] } = this.state;
    if(window.innerHeight > windowInnerHeight) {
      this.setState({ searchData, windowInnerHeight: window.innerHeight });
    }
    if(window.innerHeight < windowInnerHeight) {
      this.setState({ windowInnerHeight: window.innerHeight });
    }
  }

  closeDialog() {
    this.setState({ show: false })
  }

  render() {
    const { questions = [], init, searchData = [], show, questionId } = this.state;

    const renderSimpleQuestionList = () => {
      return (
        <div className="ques-list" style={{ minHeight: window.innerHeight - 26 - 27 - 35 }}>
          {
            searchData.map((questionItem, idx) => {
              const {
                id, topic
              } = questionItem
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

    // 保留，解决 setState 之后重复 render 的问题
    const renderQuestionList = () => {
      return (
        <div className="ques-list">
          {
            questions.map((questionItem, idx) => {
              const {
                addTimeStr, answerTips, authorHeadPic, authorUserName,
                description, id, topic
              } = questionItem

              // 如果是已关注，则显示已关注
              let tag = questionItem.follow
              let rightContent = tag ? '已关注' : '关注问题'
              const changeFollowStatus = () => {
                if(tag) {
                  // 已关注的情况，则调用取消关注接口
                  disFollow(id)
                } else {
                  // 未关注的情况，则调用关注接口
                  follow(id)
                }
                tag = !tag
                return tag ? '已关注' : '关注问题'
              }
              return (
                <div>
                  <div className="ques-desc" key={idx}>
                    <DialogHead
                      leftImgUrl={authorHeadPic} user={authorUserName} time={addTimeStr}
                      disableContentValue={`已关注`} rightContent={rightContent} rightContentFunc={changeFollowStatus}
                    />
                    <div className="ques-title"
                         onClick={this.handleClickGoAnswerPage.bind(this, id)}>{splitText(removeHtmlTags(topic), 38)}</div>
                    <div className="ques-content" onClick={this.handleClickGoAnswerPage.bind(this, id)}>
                      {splitText(removeHtmlTags(description), 20)}
                    </div>
                    <div className="ques-answer-persons" onClick={this.handleClickGoAnswerPage.bind(this, id)}>
                      {answerTips}
                    </div>
                  </div>
                  <GreyBanner height="10px"/>
                </div>
              )
            })
          }
        </div>
      )
    }

    // 特殊组件
    const renderOtherComponents = () => {
      return (
        <div>
          <div style={{ height: '50px' }} className="padding-footer"/>
          <RenderInBody>
            <ToolBarNoConnect noticeMsgCount={this.props.noticeMsgCount} tabIndex={this.props.tabIndex}
                              dispatch={this.props.dispatch} router={this.context.router}/>
          </RenderInBody>
        </div>
      )
    }

    return (
      <div className="question-container">
        <div className="question-feedback" onClick={() => this.handleClickFeedback()}><span>意见反馈&nbsp;&gt;</span></div>
        <div className={`question-page ${show ? '' : 'toolbar'}`}>
          <div className="search-nav">
            <div className="search">
              <input type="text" className="search-input" placeholder='去搜索' ref="searchInput"
                     onClick={() => this.setState({ init: false })}
                     onChange={(e) => this.handleSearch(e.currentTarget.value)}
                     onBlur={(e) => this.handleSearch(e.currentTarget.value)}/>
            </div>
          </div>
          {init ?
            <div className="ques-nav-btn" onClick={this.handleClickGoQuestionInitPage.bind(this)}>
              <AssetImg url="https://static.iqycamp.com/images/rise_icon_go_question.png" height={27}
                        style={{ verticalAlign: 'middle' }}/>
            </div> :
            <div className="ques-nav-btn" onClick={() => this.handleCancel()}>
              <div className="ques-btn">取消</div>
            </div>
          }
          {init ? <GreyBanner height="20px"/> : <GreyBanner height="35px" content={'相关问题'}/>}
          <div style={{ display: `${init ? '' : 'none'}` }}>
            {renderQuestionList()}
            <PullSlideTip isEnd={this.state.end}/>
          </div>
          <div style={{ backgroundColor: '#f5f5f5', display: `${init ? 'none' : ''}` }}>
            {renderSimpleQuestionList()}
          </div>

        </div>
        {show ?
          <FullScreenDialog close={() => this.closeDialog()} hash="#answer" level={1}>
            <QuestionAnswer questionId={questionId}/>
          </FullScreenDialog> :
          renderOtherComponents()}
      </div>
    )
  }

}

class GreyBanner extends React.Component<{ height: number, content?: string }, any> {
  constructor() {
    super()
  }

  render() {
    return (
      <div className="grey-banner"
           style={{ height: this.props.height, lineHeight: this.props.height, paddingLeft: 15 }}>
        {this.props.content}
      </div>
    )
  }
}
