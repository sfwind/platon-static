import * as React from 'react'
import { connect } from 'react-redux'
import './Main.less'
import {
  loadApplicationPractice, vote, loadOtherList, loadKnowledgeIntro,
  openApplication, getOpenStatus, submitApplicationPractice, CommentType, ArticleViewModule, autoSaveApplicationDraft,
  loadOtherListBatch, isRiseMember, loadApplicationCompletedCount
} from './async'
import { startLoad, endLoad, alertMsg, set } from '../../../redux/actions'
import AssetImg from '../../../components/AssetImg'
import _ from 'lodash'
import Work from '../components/NewWork'
import PullElement from 'pull-element'
import { merge, findIndex, remove, isEmpty, isBoolean, isUndefined } from 'lodash'
import Tutorial from '../../../components/Tutorial'
import Editor from '../../../components/simditor/Editor'
import { mark } from '../../../utils/request'
import { scroll, unScrollToBorder } from '../../../utils/helpers'
import { preview } from '../../helpers/JsConfig'
import RenderInBody from '../../../components/RenderInBody'
import MiniRefreshTools from 'minirefresh';

let timer

const APPLICATION_AUTO_SAVING = 'rise_application_autosaving'

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
      isRiseMember: 2,
      loading: false,
      showCompletedBox: false,
      completdApplicationCnt: 1000,
      autoPushDraftFlag: null,
    }
    this.pullElement = null
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    mark({ module: '打点', function: '学习', action: '打开应用题页' })
    const { dispatch, location, otherApplicationPracticeSubmitId, applicationId } = this.props
    const { integrated, id, planId } = location.query
    this.setState({ integrated })
    dispatch(startLoad())
    loadApplicationPractice(id, planId).then(res => {
      const { code, msg } = res
      if(code === 200) {
        dispatch(endLoad())
        let storageDraft = JSON.parse(window.localStorage.getItem(APPLICATION_AUTO_SAVING))
        // localStorage里存的是这个小课的缓存
        if(storageDraft && id == storageDraft.id) {
          // 手动设置强制覆盖，或者msg是同步模式都需要清理localStorage
          if(res.msg.overrideLocalStorage || msg.isSynchronized) {
            this.setState({
              edit: !msg.isSynchronized,
              editorValue: msg.isSynchronized ? msg.content : msg.draft,
              isSynchronized: msg.isSynchronized
            })
            this.clearStorage();
          } else {
            // 非同步的，展示localStorage,除非localStorage里没有内容
            let draft = storageDraft.content ? storageDraft.content : msg.draft;
            this.setState({
              edit: !msg.isSynchronized,
              editorValue: draft,
              isSynchronized: msg.isSynchronized
            })
          }
        } else {
          // 没有localStorage
          this.setState({
            edit: !msg.isSynchronized,
            editorValue: msg.isSynchronized ? msg.content : msg.draft,
            isSynchronized: msg.isSynchronized
          })
        }

        // 更新其余数据
        this.setState({
          data: msg,
          submitId: msg.submitId,
          planId: msg.planId,
          applicationScore: res.msg.applicationScore,
          autoPushDraftFlag: !msg.isSynchronized
        })

        const { content } = msg
        if(integrated == 'false') {
          loadKnowledgeIntro(msg.knowledgeId).then(res => {
            const { code, msg } = res
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
            if(node) this.refs.submitBar.scrollTop = 0
          }
        }
      } else {
        dispatch(alertMsg(msg))
      }
      // 自动加载其它同学的作业
      if(otherApplicationPracticeSubmitId && id == applicationId) {
        this.others()
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
    isRiseMember().then(res => {
      if(res.code === 200) {
        this.setState({ isRiseMember: res.msg })
      } else {
        dispatch(alertMsg(res.msg))
      }
    })
    getOpenStatus().then(res => {
      if(res.code === 200) {
        this.setState({ openStatus: res.msg })
      }
    })
    loadApplicationCompletedCount(planId).then(res => {
      if(res.code === 200) {
        this.setState({ completdApplicationCnt: res.msg })
      }
    })
  }

  componentDidUpdate() {
    const { showOthers, otherList } = this.state;
    if(!this.pullElement && showOthers && !isEmpty(otherList)) {
      // 有内容并且米有pullElement
      const { dispatch } = this.props
      this.pullElement = new PullElement({
        target: '#react-app',
        scroller: 'body',
        trigger: '.app-work-list',
        damping: 3,
        detectScroll: false,
        detectScrollOnStart: true,

        onPullUp: (data) => {
          if(this.props.iNoBounce) {
            if(this.props.iNoBounce.isEnabled()) {
              this.props.iNoBounce.disable()
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
                  return findIndex(this.state.otherList, item) !== -1
                })
                this.setState({
                  otherList: this.state.otherList.concat(res.msg.list),
                  page: this.state.page + 1,
                  end: res.msg.end
                })
              } else {
                this.setState({ end: res.msg.end })
              }
            } else {
              dispatch(alertMsg(res.msg))
            }
          }).catch(ex => {
            dispatch(alertMsg(ex))
          })
          if(this.props.iNoBounce) {
            if(!this.props.iNoBounce.isEnabled()) {
              this.props.iNoBounce.enable()
            }
          }
        }
      })
      this.pullElement.init()
    }
    if(this.pullElement) {
      if(this.state.end) {
        this.pullElement.disable()
      } else {
        this.pullElement.enable()
      }
    }

    // 根据当前的编辑状态，决定是否开启自动保存功能
    if(this.state.edit) {
      this.autoSaveApplicationDraftTimer()
    } else {
      clearInterval(timer)
    }
  }

  componentWillUnmount() {
    this.pullElement ? this.pullElement.destroy() : null
    clearInterval(timer)
  }

  autoSave() {
    if(this.refs.editor) {
      let value = this.refs.editor.getValue()
      let storageDraft = JSON.parse(window.localStorage.getItem(APPLICATION_AUTO_SAVING))
      if(storageDraft) {
        if(this.props.location.query.id === storageDraft.id) {
          window.localStorage.setItem(APPLICATION_AUTO_SAVING, JSON.stringify({
            id: this.props.location.query.id, content: value
          }))
        } else {
          this.clearStorage()
        }
      } else {
        window.localStorage.setItem(APPLICATION_AUTO_SAVING, JSON.stringify({
          id: this.props.location.query.id, content: value
        }))
      }
    }
  }

  clearStorage() {
    window.localStorage.removeItem(APPLICATION_AUTO_SAVING)
  }

  // 定时保存方法
  autoSaveApplicationDraftTimer() {
    clearInterval(timer)
    timer = setInterval(() => {
      const planId = this.state.planId
      const applicationId = this.props.location.query.id
      if(this.refs.editor) {
        const draft = this.refs.editor.getValue()
        if(draft.trim().length > 0) {
          if(this.state.autoPushDraftFlag) {
            autoSaveApplicationDraft(planId, applicationId, draft).then(res => {
              if(res.code === 200) {
                this.clearStorage()
              }
            })
            this.setState({ autoPushDraftFlag: false });
          }
        }
      }
    }, 10000)
  }

  onEdit() {
    this.setState({ edit: true })
  }

  goComment(submitId) {
    const { dispatch } = this.props
    dispatch(set('otherApplicationPracticeSubmitId', submitId))
    dispatch(set('applicationId', this.props.location.query.id))
    dispatch(set('articlePage', this.state.page))
    this.context.router.push({
      pathname: '/rise/static/practice/application/comment',
      query: merge({ submitId: submitId }, this.props.location.query)
    })
  }

  voted(id, voteStatus, voteCount, isMine, seq) {
    if(!voteStatus) {
      if(isMine) {
        this.setState({ data: merge({}, this.state.data, { voteCount: voteCount + 1, voteStatus: true }) })
      } else {
        let newOtherList = merge([], this.state.otherList)
        _.set(newOtherList, `[${seq}].voteCount`, voteCount + 1)
        _.set(newOtherList, `[${seq}].voteStatus`, 1)
        this.setState({ otherList: newOtherList })
      }
      vote(id)
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
    dispatch(startLoad())
    let page = 1
    if(articlePage) {
      page = articlePage
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
            scroll('#app-' + otherApplicationPracticeSubmitId, '.container')
          }
        })
      } else {
        dispatch(alertMsg(res.msg))
      }
    })
  }

  onSubmit() {
    const { dispatch, location } = this.props
    const { data, planId, completdApplicationCnt } = this.state
    const answer = this.refs.editor.getValue()
    const { complete, practicePlanId } = location.query
    if(answer == null || answer.length === 0) {
      dispatch(alertMsg('请填写作业'))
      return
    }
    this.setState({ showDisable: true })
    submitApplicationPractice(planId, location.query.id, { answer }).then(res => {
      this.clearStorage()
      dispatch(endLoad())
      const { code, msg } = res
      if(code === 200) {
        if(code.msg !== 0) {
          this.setState({ completdApplicationCnt: res.msg, showCompletedBox: true }, () => {
            window.scrollTo(0, 0);
          })
        }
        if(complete == 'false') {
          dispatch(set('completePracticePlanId', practicePlanId))
        }
        dispatch(startLoad())
        loadApplicationPractice(location.query.id, planId).then(res => {
          dispatch(endLoad())
          const { code, msg } = res
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
          dispatch(endLoad())
          dispatch(alertMsg(ex))
        })
        this.setState({ showDisable: false })
      } else {
        dispatch(alertMsg(msg))
        this.setState({ showDisable: false })
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
      this.setState({ showDisable: false })
    })
  }

  handleChangeValue(value) {
    const { autoPushDraftFlag } = this.state;
    if(_.isBoolean(autoPushDraftFlag)) {
      // 非null(取到数据了) 并且没有打开保存draft的flag
      if(!autoPushDraftFlag) {
        this.setState({ autoPushDraftFlag: true });
      }
    }
  }

  render() {
    const {
      data, otherList, knowledge = {}, end, openStatus = {}, showOthers, edit, showDisable,
      showCompletedBox, completdApplicationCnt, integrated, loading, isRiseMember, applicationScore
    } = this.state
    const { topic, description, content, voteCount, submitId, voteStatus, pic } = data
    const renderList = (list) => {
      if(list) {
        return list.map((item, seq) => {
          return (
            <div id={'app-' + item.submitId} className="application-article">
              <Work onVoted={() => this.voted(item.submitId, item.voteStatus, item.voteCount, false, seq)}  {...item}
                    goComment={() => this.goComment(item.submitId)} type={CommentType.Application}
                    articleModule={ArticleViewModule.Application}/>
            </div>
          )
        })
      }
    }

    const renderTip = () => {
      if(edit) {
        return (
          <div className="no-comment">
            <div className="content">
              <div className="text">更喜欢电脑上提交?</div>
              <div className="text">登录www.iquanwai.com/community</div>
            </div>
          </div>
        )
      } else {
        return (
          <div>
            <Work {...data}
                  onVoted={() => this.voted(submitId, voteStatus, voteCount, true)}
                  onEdit={() => this.onEdit()}
                  headImage={window.ENV.headImage}
                  userName={window.ENV.userName}
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
            <div style={{ textAlign: 'center', margin: '5px 0 60px' }}>
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

    // 渲染应用练习完成弹框
    const renderCompleteBox = () => {
      if(!showCompletedBox || completdApplicationCnt === 0) return
      return (
        <div>
          <div className="weui_mask" style={{ height: window.innerHeight, width: window.innerWidth }}/>
          <div className="complete-box">
            <div className="complete-tip-content">好棒！你完成了1个应用练习，+{applicationScore}积分。</div>
          </div>
        </div>
      )
    }

    return (
      <div className="application">
        <Tutorial bgList={[ 'https://static.iqycamp.com/images/fragment/rise_tutorial_yylx_0419.png?imageslim' ]}
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
              {
                pic ?
                  <div className="app-image">
                    <AssetImg url={pic} width={'80%'} style={{ margin: '0 auto' }}
                              onClick={() => {preview(pic, [ pic ])}}/>
                  </div> :
                  null
              }
              {
                integrated == 'false' ?
                  <div className="knowledge-link"
                       onClick={() => this.context.router.push(`/rise/static/practice/knowledge?id=${knowledge.id}`)}>
                    点击查看相关知识点
                  </div> : null
              }
            </div>
          </div>
          <div ref="workContainer" className="work-container">
            <div ref="submitBar" className="submit-bar">
              {
                content === null ?
                  <div className="award_application">
                    刻意练习是内化知识的最佳途径！用10分钟思考并写下你的答案，开始学以致用吧~
                  </div> :
                  '我的作业'
              }
            </div>
            {renderTip()}
            {
              edit ?
                <div className="editor">
                  <Editor
                    ref="editor"
                    moduleId={3}
                    value={this.state.editorValue}
                    placeholder="有灵感时马上记录在这里吧，系统会自动为你保存。完成后点下方按钮提交，就会得到点赞和专业点评哦！"
                    autoSave={() => {
                      this.autoSave()
                    }}
                    onChange={(value) => this.handleChangeValue(value)}
                  />
                </div> :
                null
            }
            {
              showOthers ?
                <div>
                  <div className="submit-bar">{'同学的作业'}</div>
                  <div className="app-work-list">
                    {renderList(otherList)}
                    {renderEnd()}
                  </div>
                </div> :
                null
            }
            {!showOthers ? <div className="show-others-tip" onClick={this.others.bind(this)}>
              同学的作业</div> : null}
          </div>
        </div>

        <RenderInBody>
          {showDisable ?
            <div className="button-footer disabled">提交中</div> :
            edit ?
              <div className="button-footer" onClick={this.onSubmit.bind(this)}>提交</div> :
              <div/>}
        </RenderInBody>
        <div onClick={() => this.setState({ showCompletedBox: false, completdApplicationCnt: 0 })}>
          {renderCompleteBox()}
        </div>
      </div>
    )
  }
}
