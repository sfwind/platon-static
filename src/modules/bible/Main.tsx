import * as React from 'react'
import { connect } from 'react-redux'
import { startLoad, endLoad, alertMsg } from 'redux/actions'
import { loadArticleCertainDate, loadArticle, disLike, like, firstOpen, openArticle, complete } from './async'
import './Main.less'
import PullSlideTip from '../../components/PullSlideTip'
import PullElement from 'pull-element'
import _ from "lodash"
import AssetImg from '../../components/AssetImg'
import { BibleToolBar } from './BibleToolBar'
import { mark } from 'utils/request'
var moment = require('moment')

const BROWSE_DATE = 'bible_browse_date'
const LAST_TIME = 'bible_last_browse_time'

@connect(state => state)
export default class Main extends React.Component<any, any> {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super()
    this.state = {
      page: 1,
      data: [],
      today: moment().format('YYYY-MM-DD'),
      end: false,
      openTip: false,
    }
    this.pullElement = null
    this.notFirstBtnML = (window.innerWidth - 50 - 24 - 80 * 2) / 3
  }

  componentWillMount() {
    mark({ module: '打点', function: '学札学习', action: '浏览文章' })
    const { dispatch } = this.props
    const { today } = this.state
    let last_time = window.localStorage.getItem(LAST_TIME)
    dispatch(startLoad())
    let browse_date = today
    if(last_time) {
      browse_date = window.localStorage.getItem(BROWSE_DATE)
    } else {
      this.saveBrowseDate(today)
    }

    this.saveNow()

    loadArticle(browse_date).then(res => {
      dispatch(endLoad())
      if(res.code === 200) {
        this.setState({ data: res.msg.list, end: res.msg.isDateEnd, openTip: res.msg.firstOpen })
      } else {
        dispatch(alertMsg(res.msg))
      }
    }).catch(e => {
      dispatch(endLoad())
      dispatch(alertMsg(e))
    })
  }

  componentDidUpdate() {
    const { dispatch } = this.props
    if(!this.pullElement) {
      this.pullElement = new PullElement({
        target: '.subscribe-article-container',
        scroller: '.subscribe-article-container',
        // trigger: '.pull-slide-tips',
        damping: 4,
        detectScroll: true,
        detectScrollOnStart: true,
        onPullUp: (data) => {
          if(this.props.iNoBounce) {
            if(this.props.iNoBounce.isEnabled()) {
              this.props.iNoBounce.disable()
            }
          }
        },
        onPullUpEnd: () => {
          let browse_date = window.localStorage.getItem(BROWSE_DATE)
          let lastDay = moment(browse_date).add(-1, 'days').format('YYYY-MM-DD')
          loadArticleCertainDate(lastDay).then(res => {
            const { data } = this.state
            if(res.code === 200) {
              this.saveBrowseDate(lastDay)
              let temp = [].concat(data).concat(res.msg.list);
              this.setState({ data: temp, end: res.msg.isDateEnd })
            } else {
              dispatch(alertMsg(res.msg))
            }
          }).catch(e => {
            dispatch(endLoad())
            dispatch(alertMsg(e))
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
  }

  saveNow() {
    window.localStorage.setItem(LAST_TIME, this.state.today)
  }

  saveBrowseDate(browseDate) {
    window.localStorage.setItem(BROWSE_DATE, browseDate)
  }

  complete(articleId, index, dateIdx) {
    const { data } = this.state
    const { articleList } = data[ dateIdx ]
    complete(articleId);
    _.set(articleList[ index ], 'showOpsButtons', false)
    _.set(data[ dateIdx ], 'articleList', articleList)
    this.setState({ data })
  }

  dislike(articleId, index, dateIdx) {
    const { data } = this.state
    const { articleList } = data[ dateIdx ]
    let dislike = articleList[ index ].disfavor
    if(dislike === 1) {
      dislike = 0
      like(articleId)
    } else {
      dislike = 1
      disLike(articleId)
    }
    _.set(articleList[ index ], 'disfavor', dislike)
    _.set(articleList[ index ], 'showOpsButtons', false)
    _.set(data[ dateIdx ], 'articleList', articleList)

    this.setState({ data })
  }

  open(article, index, dateIdx) {
    const { dispatch } = this.props
    const { data } = this.state
    const { articleList } = data[ dateIdx ]
    _.set(articleList[ index ], 'acknowledged', true)
    if(!article.showOpsButtons) {
      // 没有显示操作按钮
      if(article.disfavor === 0 && !article.pointStatus) {
        // 并非不喜欢 && 没有加过分
        _.set(articleList[ index ], 'showOpsButtons', true)
      }
    }
    _.set(data[ dateIdx ], 'articleList', articleList)
    this.setState({ data })

    openArticle(article.id).then(res => {
      if(res.code === 200) {
        window.location.href = article.url
      } else {
        dispatch(alertMsg(res.msg))
      }
    }).catch(e => {
      dispatch(alertMsg(e))
    })
  }

  readTip() {
    const { dispatch } = this.props
    this.setState({ openTip: false })
    firstOpen()
  }

  render() {
    const { data, end, openTip } = this.state
    const renderDailyArticles = () => {
      if(data.length !== 0) {
        return (
          data.map((day, index) => {
            const { articleList = [], date } = day
            return (
              <div key={index}>
                <div className="article-date">{date}</div>
                <div className="article">{renderArticles(articleList, index)}</div>
              </div>
            )
          })
        )
      }
    }

    const renderArticles = (list, dateIdx) => {
      if(list.length !== 0) {
        return (
          list.map((article, index) => {
            return (
              <div className="article-item" key={index}>
                <div className="article-body" onClick={()=>this.open(article, index, dateIdx)}>
                  <div className={`title ${article.acknowledged? 'read': ''}`}>{article.title}</div>
                  <div className={`source ${article.acknowledged? 'read': ''}`}>来源：{article.source}</div>
                </div>
                <div className='article-bottom'>
                  <span className="tag-line">
                    {renderTag(article.tagName)}
                  </span>
                  {article.showOpsButtons ?<div className="ops-area">
                    <div className="ops-tips">
                      是否加入学习记录?
                    </div>
                    <div className="ops-button-area">
                      <div className="ops-button blue first"
                           onClick={()=>{ this.complete(article.id, index, dateIdx) }}>
                        是，已认真学习
                      </div>
                      <div className={`ops-button not-first ${article.disfavor === 0? '': 'disfavor'}`}
                           style={{marginLeft:`${this.notFirstBtnML}px`}}
                           onClick={()=>this.dislike(article.id, index, dateIdx)}>
                        否，随便看了看
                      </div>
                    </div>
                  </div>: null}
                </div>
              </div>
            )
          })
        )
      }
    }

    const renderTag = (tags) => {
      return tags.map((tag, idx) => {
        return <div className="tag-span" key={idx}>{'#' + tag}</div>
      })
    }

    const renderTip = () => {
      return (
        <div className="tip-card">
          <div className="tip-head"><AssetImg url="https://static.iqycamp.com/images/note_tip_head.png" width={'100%'}/>
          </div>
          {openTip ?
            <NoteTip fold={()=>this.readTip()}/>
            :
            <div className="tip-read-bottom" onClick={()=>this.setState({openTip:true})}>
              <div className="detail-word">详情</div>
              <AssetImg type="unfold" width={13}/>
            </div>}
        </div>
      )
    }

    return (
      <div className="subscribe-article-container">
        {renderTip()}
        {renderDailyArticles()}

        <PullSlideTip isEnd={end}/>
        <BibleToolBar />
      </div>
    )
  }
}

class NoteTip extends React.Component<any, any> {
  constructor(props) {
    super()
    this.state = {
      list: [
        { "word": "你好！欢迎使用学札。在这里，你会找到适合自己的学习内容，并追踪和评估自己的学习情况。", "buttonWord": "如何使用呢?" },
        { "word": "每天，我们会为你推荐学习类的优质内容，并跟踪你的阅读和学习情况。点击右下方按钮“札”，可以随时查看当天学习到的知识点。", "buttonWord": "如何获得我感兴趣的内容?" },
        { "word": "如果你不喜欢某一篇文章，请点击文章下方的“不感兴趣”按钮，反馈越多，我们的推送就越精准！", "buttonWord": "知道了" },
      ],
      index: 0,
    }
  }

  click() {
    const { index } = this.state
    if(index === 2) {
      if(this.props.fold) {
        this.setState({ index: 0 })
        this.props.fold()
      }
    } else {
      this.setState({ index: index + 1 })
    }
  }

  render() {
    const { list, index } = this.state
    const { word, buttonWord } = list[ index ]

    return (
      <div className="tip-body">
        <div className="tip-word">{word}</div>
        <div className="tip-button" onClick={()=>this.click()}>{buttonWord}</div>
        <div className="tip-feedback" onClick={
          ()=>window.location.href = 'https://www.iquanwai.com/survey/wjx?activity=16466490'}>意见反馈
        </div>
      </div>
    )

  }
}
