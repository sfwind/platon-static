import * as React from 'react'
import { connect } from 'react-redux'
import './Main.less'
import { loadWarmUpAnalysisNew, discuss, deleteComment, loadWarmUpDiscuss, loadPriorityWarmUpAnalysis, loadPrioritySingleWarmUpAnalysis } from './async'
import { startLoad, endLoad, alertMsg } from '../../../redux/actions'
import AssetImg from '../../../components/AssetImg'
import Discuss from '../components/Discuss'
import _ from 'lodash'
import DiscussShow from '../components/DiscussShow'
import SubDiscussShow from '../components/SubDiscussShow'
import { scroll } from '../../../utils/helpers'
import RenderInBody from '../../../components/RenderInBody'
import WarmUpDiscussDistrict from './components/WarmUpDistrict/WarmUpDiscussDistrict'

const sequenceMap = {
  0: 'A',
  1: 'B',
  2: 'C',
  3: 'D',
  4: 'E',
  5: 'F',
  6: 'G',
}

@connect(state => state)
export default class AnalysisNew extends React.Component <any, any> {
  constructor () {
    super()
    this.state = {
      data: {},
      showDiscuss: false,
      repliedId: 0,
      warmupPracticeId: 0,
      integrated: false,
      placeholder: '解答同学的提问（限1000字）',
      isReply: false,
      content: '',
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  async componentWillMount (props) {
    const { dispatch, location } = props || this.props
    const { warmupPracticeId, integrated } = location.query
    this.setState({ integrated })
    let warmUpDetail = await loadWarmUpAnalysisNew(warmupPracticeId)
    this.setState({
      data: warmUpDetail.msg,
      warmupPracticeId: warmupPracticeId,
    })
    let discuss = await loadPrioritySingleWarmUpAnalysis(warmupPracticeId)
    this.setState({
      warmupDiscussDistrict: discuss.msg,
    })
  }

  reload () {
    const { dispatch } = this.props
    let { data, warmupPracticeId } = this.state

    loadWarmUpAnalysisNew(warmupPracticeId).then(res => {
      const { code, msg } = res
      _.set(data, 'discussList', msg.discussList)
      this.setState({
        showDiscuss: false, data, content: '', placeholder: '解答同学的提问（限1000字）', repliedId: 0, isReply: false,
      })
      scroll('.discuss', '.container')
    })
  }

  back () {
    this.context.router.push({ pathname: '/rise/static/message/center' })
  }

  reply (item) {
    this.setState({
      showDiscuss: true, isReply: true,
      placeholder: '回复 ' + item.name + ':', content: '',
      repliedId: item.id, referenceId: item.warmupPracticeId,
    })
  }

  onDelete (discussId) {
    const { data } = this.state
    const { dispatch } = this.props
    const { discussList = [] } = data
    deleteComment(discussId).then(res => {
      const { id } = data
      loadWarmUpDiscuss(id, 1).then(res => {
        dispatch(endLoad())
        const { code, msg } = res
        if (code === 200) {
          _.set(data, 'discussList', msg)
          this.setState({ showDiscuss: false, data })
        }
        else dispatch(alertMsg(msg))
      }).catch(ex => {
        dispatch(endLoad())
        dispatch(alertMsg(ex))
      })
    })
  }

  onChange (value) {
    this.setState({ content: value })
  }

  cancel () {
    this.setState({ placeholder: '解答同学的提问（限1000字）', isReply: false, showDiscuss: false, repliedId: 0 })
  }

  onSubmit () {
    const { dispatch } = this.props
    const { warmupPracticeId, repliedId, content } = this.state
    if (content.length == 0) {
      dispatch(alertMsg('请填写评论'))
      return
    }

    let discussBody = { comment: content, referenceId: warmupPracticeId }
    if (repliedId) {
      _.merge(discussBody, { repliedId: repliedId })
    }

    discuss(discussBody).then(res => {
      const { code, msg } = res
      if (code === 200) {
        this.reload()
      }
      else {
        dispatch(alertMsg(msg))
      }
    }).catch(ex => {
      dispatch(alertMsg(ex))
    })
  }

  render () {
    const { data, selected, showDiscuss, isReply, integrated, placeholder, warmupDiscussDistrict } = this.state
    const { knowledge } = data

    const questionRender = (practice) => {
      const { id, question, pic, choiceList = [], discussList = [] } = practice
      return (
        <div>
          <div className="intro-container">
            {
              pic &&
              <div className="context-img">
                <AssetImg url={pic}/>
              </div>
            }
            <div className="question">
              <div dangerouslySetInnerHTML={{ __html: question }}/>
            </div>
            <div className="choice-list">
              {choiceList.map((choice, idx) => choiceRender(choice, idx))}
            </div>
            <div className="answer-display">
              <div className="chosen"
                   style={{ marginBottom: 15 }}>
                已选答案：{choiceList.map((choice, idx) => myAnswerRender(choice, idx))}
              </div>
              <div className="right">
                正确答案：{choiceList.map((choice, idx) => rightAnswerRender(choice, idx))}
              </div>
            </div>
          </div>
          <div className="analysis">
            <div className="analysis-icon">解析</div>
            <div className="analysis-context"
                 dangerouslySetInnerHTML={{ __html: practice ? practice.analysis : '' }}/>
            {integrated == 'false' &&
            <div className="knowledge-link"
                 onClick={() => this.refs.sectionProgress.goSeriesPage(SectionProgressStep.KNOWLEDGE, dispatch)}>
              点击查看相关知识点 </div>
            }
          </div>
          <WarmUpDiscussDistrict data={warmupDiscussDistrict}
                                 clickFunc={() => {
                                   this.context.router.push({
                                     pathname: '/rise/static/practice/submit/comment',
                                     query: {
                                       referenceId: practice.id,
                                       type: 2,
                                     },
                                   })
                                 }}/>
        </div>
      )
    }

    const discussRender = (comment, idx) => {
      const { warmupPracticeDiscussList } = comment
      return (
        <div>
          <DiscussShow discuss={comment}
                       showLength={50}
                       reply={() => this.reply(comment)}
                       onDelete={this.onDelete.bind(this, comment.id)}/>
          {!_.isEmpty(warmupPracticeDiscussList) ?
            <div>
              <div className="discuss-triangle"></div>
              {warmupPracticeDiscussList.map((discuss, idx) => subDiscussRender(discuss, idx))}
              <div className="discuss-padding"></div>
            </div>
            : null}
        </div>
      )
    }

    const subDiscussRender = (discuss, idx) => {
      return (
        <SubDiscussShow discuss={discuss}
                        showLength={50}
                        reply={() => this.reply(discuss)}
                        onDelete={this.onDelete.bind(this, discuss.id)}/>
      )
    }

    const choiceRender = (choice, idx) => {
      const { id, subject } = choice
      return (
        <div key={idx}
             className={`choice${choice.selected ? ' selected' : ''}${choice.isRight ? ' right' : ''}`}>
          <span className={`index${choice.selected ? ' selected' : ''}`}/>
          <span className={`text${choice.isRight ? ' right' : ''}`}>{sequenceMap[idx]}&nbsp;&nbsp;{subject}</span>
        </div>
      )
    }

    const rightAnswerRender = (choice, idx) => {
      return (choice.isRight ? sequenceMap[idx] + ' ' : '')
    }

    const myAnswerRender = (choice, idx) => {
      return (choice.selected ? sequenceMap[idx] + ' ' : '')
    }

    return (
      <div>
        <div className="warm-up-container has-footer">
          {knowledge ? <div className="page-header">{knowledge.knowledge}</div> : null}
          {questionRender(data)}
          {showDiscuss ? <div className="padding-comment-dialog"/> : null}
        </div>
        <RenderInBody>
          <div>
            {showDiscuss ? null : <div className="button-footer"
                                       onClick={this.back.bind(this)}>关闭</div>}

            {showDiscuss ? <Discuss isReply={isReply}
                                    placeholder={placeholder}
                                    limit={1000}
                                    submit={() => this.onSubmit()}
                                    onChange={(v) => this.onChange(v)}
                                    cancel={() => this.cancel()}/> :
              <div className="write-discuss"
                   onClick={() => this.setState({ showDiscuss: true })}>
                <AssetImg url="https://static.iqycamp.com/images/discuss.png"
                          width={45}
                          height={45}/>
              </div>}
          </div>
        </RenderInBody>
      </div>
    )
  }
}
