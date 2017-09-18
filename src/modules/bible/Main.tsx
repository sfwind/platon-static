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
import { scroll } from 'utils/helpers'
var moment = require('moment')

// 上次浏览的日期
const BROWSE_DATE = 'bible_browse_date'
// 上次浏览时间
const LAST_TIME = 'bible_last_browse_time'
// 上次浏览文章id
const LAST_BROWSE_ID = 'bible_last_browse_article'

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
    if(this.compareWithNow(last_time) == 0) {
      browse_date = window.localStorage.getItem(BROWSE_DATE)
    } else {
      this.saveBrowseDate(today)
    }

    this.saveNow()

    loadArticle(browse_date).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if(code === 200) {
        if(!msg.editTag) {
          //首次进入先选标签
          this.context.router.push('/rise/static/note/tag')
        } else {
          this.setState({ data: msg.list, end: msg.isDateEnd, openTip: msg.firstOpen }, () => {
            let articleId = window.localStorage.getItem(LAST_BROWSE_ID)
            window.localStorage.removeItem(LAST_BROWSE_ID)
            scroll('#acticle-item-' + articleId, '.subscribe-article-container')
          })
        }
      } else {
        dispatch(alertMsg(msg))
      }
    }).catch(e => {
      dispatch(endLoad())
      dispatch(alertMsg(e))
    })
  }

  compareWithNow(last_time) {
    let diff = moment(last_time).diff(moment(), 'days')
    return diff
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

    window.localStorage.setItem(LAST_BROWSE_ID, article.id)
    openArticle(article.id).then(res => {
      if(res.code === 200) {
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
              <div className="article-item" key={index} id={'acticle-item-'+article.id}>
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
        { "word": "你好，欢迎使用学札。在这里，你可以追踪自己的学习记录，让每天的收获可视化。", "buttonWord": "如何使用呢？" },
        { "word": "你可以点击下方加号，增加自己的课程、音频、讲座和书籍等学习记录。也可以阅读下方推荐的优质内容，并在学习完成后点击按钮确认。", "buttonWord": "如何查看我的学习分析呢？" },
        { "word": "点击右下方按钮“札”，可以随时查到当天学习收获。在该页面的右上角，也可以修改自己的学习主题，让推送更精准。", "buttonWord": "知道了" },
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
