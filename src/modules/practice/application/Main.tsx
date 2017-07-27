import * as React from "react";
import { connect } from "react-redux";
import "./Main.less";
import {
  loadApplicationPractice, vote, loadOtherList, loadKnowledgeIntro,
  openApplication, getOpenStatus, submitApplicationPractice, CommentType, ArticleViewModule, autoSaveApplicationDraft,
  autoUpdateApplicationDraft, loadOtherListBatch
} from "./async";
import { startLoad, endLoad, alertMsg, set } from "../../../redux/actions";
import AssetImg from "../../../components/AssetImg";
import _ from "lodash";
import Work from "../components/NewWork"
import PullElement from 'pull-element'
import { merge, findIndex, remove, isEmpty, isBoolean, isUndefined } from "lodash";
import Tutorial from "../../../components/Tutorial"
import Editor from "../../../components/editor/Editor";
import { mark } from "../../../utils/request"
import { scroll } from "../../../utils/helpers"

let timer;

const APPLICATION_AUTO_SAVING = 'rise_application_autosaving';

@connect(state => state)
export class Main extends React.Component <any, any> {
  constructor() {
    super()
    this.state = {
      data: {},
      knowledge: {},
      submitId: 0,
      page: 1,
      otherList: [],
      otherHighlightList: [],
      integrated: true,
      showOthers: false,
      editorValue: '',
      edit: true,
      draftId: -1,
      draft: '',
      showDraftToast: false,
      loading: false,
    };
    this.pullElement = null;
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  componentDidUpdate() {
    if(!this.pullElement) {
      // 有内容并且米有pullElement
      const { dispatch } = this.props;
      this.pullElement = new PullElement({
        target: '.container',
        scroller: '.container',
        damping: 3,
        detectScroll: true,
        detectScrollOnStart: true,

        onPullUp: (data) => {
          if(this.props.iNoBounce) {
            if(this.props.iNoBounce.isEnabled()) {
              this.props.iNoBounce.disable();
            }
          }
          this.setState({ loading: true })
        },
        onPullUpEnd: (data) => {
          loadOtherList(this.props.location.query.id, this.state.page + 1).then(res => {
            if(res.code === 200) {
              this.setState({ loading: false })
              if(res.msg && res.msg.list && res.msg.list.length !== 0) {
                remove(res.msg.list, (item) => {
                  return findIndex(this.state.otherList, item) !== -1;
                })
                this.setState({
                  otherList: this.state.otherList.concat(res.msg.list),
                  page: this.state.page + 1,
                  end: res.msg.end
                });
              } else {
                this.setState({ end: res.msg.end });
              }
            } else {
              dispatch(alertMsg(res.msg));
            }
          }).catch(ex => {
            dispatch(alertMsg(ex));
          });
          if(this.props.iNoBounce) {
            if(!this.props.iNoBounce.isEnabled()) {
              this.props.iNoBounce.enable();
            }
          }
        }
      });
      this.pullElement.init();
    }
    if(this.pullElement) {
      if(this.state.end) {
        this.pullElement.disable();
      } else {
        this.pullElement.enable();
      }
    }
  }

  componentWillUnmount() {
    this.pullElement ? this.pullElement.destroy() : null;
    clearInterval(timer);
  }

  componentWillMount() {
    mark({ module: "打点", function: "学习", action: "打开应用题页" });
    const { dispatch, location, otherApplicationPracticeSubmitId, applicationId } = this.props;
    const { integrated, id, planId } = location.query;
    this.setState({ integrated });

    dispatch(startLoad());
    loadApplicationPractice(id, planId).then(res => {
      const { code, msg } = res;
      if(code === 200) {
        if(res.msg.draftId) {
          this.setState({ draftId: res.msg.draftId })
        }
        let draft = msg.draft;
        let storageDraft = JSON.parse(window.localStorage.getItem(APPLICATION_AUTO_SAVING));
        //保存上次未自动保存的草稿
        if(storageDraft && id == storageDraft.id) {
          draft = storageDraft.content;
          if(!msg.draftId) {
            if(planId) {
              autoSaveApplicationDraft(planId, id).then(res => {
                if(res.code === 200) {
                  this.clearStorage();
                  this.setState({ draftId: res.msg });
                  autoUpdateApplicationDraft(res.msg, { draft });
                }
              })
            }
          } else {
            autoUpdateApplicationDraft(msg.draftId, { draft });
            this.clearStorage();
          }
        }
        this.setState({
          data: msg, submitId: msg.submitId, planId: msg.planId, draft: draft,
          editorValue: msg.content == null ? draft : msg.content
        });
        const isSubmitted = res.msg.content != null;
        //如果已经提交，则不启动自动保存
        if(!isSubmitted) {
          this.autoSaveApplicationDraft();
        }
        dispatch(endLoad());

        const { content } = msg;
        if(integrated == 'false') {
          loadKnowledgeIntro(msg.knowledgeId).then(res => {
            const { code, msg } = res;
            if(code === 200) {
              this.setState({ knowledge: msg })
            } else {
              dispatch(alertMsg(msg))
            }
          })
        }
        //看评论的请求，锚定到评论区
        if(content !== null) {
          if(isUndefined(otherApplicationPracticeSubmitId) || id != applicationId) {
            let node = this.refs.submitBar
            if(node) this.refs.submitBar.scrollTop = 0;
          }
          this.setState({ edit: false })
        }
      } else {
        dispatch(alertMsg(msg))
      }

      // 自动加载其它同学的作业
      if(otherApplicationPracticeSubmitId && id == applicationId) {
        this.others();
      }
    }).catch(ex => {
      dispatch(endLoad());
      dispatch(alertMsg(ex));
    });

    getOpenStatus().then(res => {
      if(res.code === 200) {
        this.setState({ openStatus: res.msg });
      }
    });
  }

  componentWillUnmount() {
    this.pullElement ? this.pullElement.destroy() : null;
    clearInterval(timer)
  }

  autoSave(value) {
    if(value && value !== this.state.data.content) {
      window.localStorage.setItem(APPLICATION_AUTO_SAVING,
        JSON.stringify({ id: this.props.location.query.id, content: value }));
    }
  }

  clearStorage() {
    window.localStorage.removeItem(APPLICATION_AUTO_SAVING);
  }

  // 定时保存方法
  autoSaveApplicationDraft() {
    timer = setInterval(() => {
      const draft = this.refs.editor.getValue();
      if(draft.trim().length > 0) {
        if(this.state.draftId === -1) {
          const planId = this.state.planId;
          const applicationId = this.props.location.query.id;
          if(planId) {
            autoSaveApplicationDraft(planId, applicationId).then(res => {
              this.clearStorage();
              this.setState({ draftId: res.msg });
              autoUpdateApplicationDraft(res.msg, { draft });
            })
          }
        } else {
          autoUpdateApplicationDraft(this.state.draftId, { draft });
          this.clearStorage();
        }
      }
    }, 10000);
  }

  onEdit() {
    this.setState({ edit: true })
  }

  goComment(submitId) {
    const { dispatch } = this.props;
    dispatch(set('otherApplicationPracticeSubmitId', submitId));
    dispatch(set('applicationId', this.props.location.query.id));
    dispatch(set('articlePage', this.state.page));
    this.context.router.push({
      pathname: "/rise/static/practice/application/comment",
      query: merge({ submitId: submitId }, this.props.location.query)
    })
  }

  voted(id, voteStatus, voteCount, isMine, seq) {
    if(!voteStatus) {
      if(isMine) {
        this.setState({ data: merge({}, this.state.data, { voteCount: voteCount + 1, voteStatus: true }) });
      } else {
        let newOtherList = merge([], this.state.otherList);
        _.set(newOtherList, `[${seq}].voteCount`, voteCount + 1)
        _.set(newOtherList, `[${seq}].voteStatus`, 1);
        this.setState({ otherList: newOtherList })
      }
      vote(id);
    } else {
    }
  }

  back() {
    const { location } = this.props
    this.context.router.push({ pathname: '/rise/static/learn', query: { series: location.query.series } })
  }

  tutorialEnd() {
    const { dispatch } = this.props
    const { openStatus } = this.state
    openApplication().then(res => {
      const { code, msg } = res
      if(code === 200) {
        this.setState({ openStatus: merge({}, openStatus, { openApplication: true }) })
      } else {
        dispatch(alertMsg(msg))
      }
    })
  }

  others() {
    const { dispatch, location, otherApplicationPracticeSubmitId, applicationId, articlePage } = this.props
    dispatch(startLoad());
    let page = 1;
    if(articlePage) {
      page = articlePage;
    }
    loadOtherListBatch(location.query.id, page).then(res => {
      dispatch(endLoad())
      if(res.code === 200) {
        this.setState({
          otherList: res.msg.list,
          page: 1, end: res.msg.end, showOthers: true
        }, () => {
          if(otherApplicationPracticeSubmitId && location.query.id == applicationId) {
            //锚定到上次看的练习
            scroll('#app-' + otherApplicationPracticeSubmitId, '.container');
          }

        });
      } else {
        dispatch(alertMsg(res.msg));
      }
    })
  }

  onSubmit() {
    const { dispatch, location } = this.props;
    const { data, planId } = this.state;
    const answer = this.refs.editor.getValue();
    const { complete, practicePlanId } = location.query;
    if(answer == null || answer.length === 0) {
      dispatch(alertMsg('请填写作业'));
      return
    }
    this.setState({ showDisable: true });
    submitApplicationPractice(planId, location.query.id, { answer }).then(res => {
      dispatch(endLoad());
      const { code, msg } = res;
      if(code === 200) {
        if(complete == 'false') {
          dispatch(set('completePracticePlanId', practicePlanId));
        }
        dispatch(startLoad());
        loadApplicationPractice(location.query.id, planId).then(res => {
          dispatch(endLoad())
          const { code, msg } = res;
          if(code === 200) {
            this.setState({
              data: msg,
              submitId: msg.submitId,
              planId: msg.planId,
              edit: false,
              editorValue: msg.content
            })
          }
          else dispatch(alertMsg(msg))
        }).catch(ex => {
          dispatch(endLoad());
          dispatch(alertMsg(ex))
        })
        this.setState({ showDisable: false })
      }

      else {
        dispatch(alertMsg(msg));
        this.setState({ showDisable: false })
      }
    }).catch(ex => {
      dispatch(endLoad());
      dispatch(alertMsg(ex));
      this.setState({ showDisable: false })
    })
  }

  render() {
    const { data, otherList, knowledge = {}, end, openStatus = {}, showOthers, edit, showDisable, integrated, loading } = this.state
    const { topic, description, content, voteCount, submitId, voteStatus, pic } = data

    const renderList = (list) => {
      if(list) {
        return list.map((item, seq) => {
          return (
            <div id={'app-' + item.submitId} className="application-article">
              <Work onVoted={() => this.voted(item.submitId, item.voteStatus, item.voteCount, false, seq)}  {...item}
                    goComment={() => this.goComment(item.submitId)} type={CommentType.Application}
                    articleModule={ArticleViewModule.Application}
              />
            </div>
          )
        })
      }
    }

    const renderTip = () => {
      if(!edit) {
        return (
          <div>
            <Work onVoted={() => this.voted(submitId, voteStatus, voteCount, true)} onEdit={() => this.onEdit()}
                  headImage={window.ENV.headImage} userName={window.ENV.userName} {...data}
                  type={CommentType.Application}
                  articleModule={ArticleViewModule.Application}
                  goComment={() => this.goComment(submitId)}/>
          </div>
        )
      }
    }

    const renderEnd = () => {
      if(showOthers) {
        if(loading) {
          return (
            <div style={{ textAlign: 'center', margin: '5px 0' }}>
              <AssetImg url="https://static.iqycamp.com/images/loading1.gif"/>
            </div>
          )
        }
        if(!end) {
          return (
            <div className="show-more">上拉加载更多消息</div>
          )
        } else {
          return (
            <div className="show-more">没有更多了</div>
          )
        }
      }
    }

    return (
      <div className="application">
        <Tutorial bgList={['https://static.iqycamp.com/images/fragment/rise_tutorial_yylx_0419.png?imageslim']}
                  show={isBoolean(openStatus.openApplication) && !openStatus.openApplication}
                  onShowEnd={() => this.tutorialEnd()}/>
        <div className={`container ${edit ? 'has-footer' : ''}`}>
          <div className="page-header">{topic}</div>
          <div className="intro-container">
            <div className="application-context">
              <div className="application-title">
                <AssetImg type="app" size={15}/><span>今日应用</span>
              </div>
              <div className="section2" dangerouslySetInnerHTML={{ __html: description }}/>
              {integrated == 'false' ?
                <div className="knowledge-link"
                     onClick={() => this.context.router.push(`/rise/static/practice/knowledge?id=${knowledge.id}`)}>
                  点击查看相关知识点</div> : null
              }
            </div>
          </div>
          <div ref="workContainer" className="work-container">
            <div ref="submitBar" className="submit-bar">{ content === null ?
              '刻意练习是内化知识的最佳途径！用10分钟思考并写下你的答案，开始学以致用吧~'
              : '我的作业'}</div>
            {renderTip()}

            {edit ?
              <div className="editor">
                <Editor
                  ref="editor"
                  moduleId={3}
                  onUploadError={(res) => {
                    this.props.dispatch(alertMsg(res.msg))
                  }}
                  uploadStart={() => {
                    this.props.dispatch(startLoad())
                  }}
                  uploadEnd={() => {
                    this.props.dispatch(endLoad())
                  }}
                  defaultValue={this.state.editorValue}
                  placeholder="有灵感时马上记录在这里吧，系统会自动为你保存。完成后点下方按钮提交，就有就会得到点赞和专业点评哦！"
                  autoSave={(value) => {
                    this.autoSave(value)
                  }}
                />
              </div> : null}
            {showOthers && !isEmpty(otherList) ? <div>
              <div className="submit-bar">{'同学的作业'}</div>
              {renderList(otherList)}</div> : null}
            {!showOthers ? <div className="show-others-tip" onClick={this.others.bind(this)}>同学的作业</div> : null}
            {renderEnd()}
          </div>
        </div>

        { showDisable ?
          <div className="button-footer disabled">提交中</div>
          :
          edit ?
            <div className="button-footer" onClick={this.onSubmit.bind(this)}>提交</div>
            :
            null
        }
      </div>
    )
  }
}
