import * as React from 'react'
import './CardsCollection.less'
import { connect } from 'react-redux'
import { startLoad, endLoad, alertMsg } from "redux/actions";
import AssetImg from "../../components/AssetImg";
import { loadCardData, loadEssenceCard, loadProblemCards } from "./async";

// 小课卡包
interface CardsCollectionStates {
  problemId: number;
  problem: string;
  cards: object;
  showCard: boolean;
  essenceCard: string;
  essenceCardMap: object;
}
@connect(state => state)
export default class CardsCollection extends React.Component<any, CardsCollectionStates> {

  constructor() {
    super()
    this.state = {
      showCard: false,
      essenceCard: 'https://static.iqycamp.com/images/imgLoading.png?imageslim',
      problemId: 0,
      problem: '',
      cards: [],
      essenceCardMap: new Map()
    }
  }

  componentWillMount() {
    const { planId } = this.props.location.query
    const { dispatch } = this.props
    dispatch(startLoad())
    loadCardData(planId).then(res => {
      console.log(res)
      dispatch(endLoad())
      const { code, msg } = res
      if(code === 200) {
        this.setState({ problemId: msg.problemId, problem: msg.problem, cards: msg.cards })
      } else {
        dispatch(alertMsg(msg))
      }
    }).catch(e => {
      dispatch(endLoad())
      dispatch(alertMsg(e))
    })
  }

  handleClickLoadCard(problemId, chapterId, completed) {
    const { dispatch } = this.props
    if(!completed) {
      dispatch(alertMsg('快完成这一章学习<br/>解锁神秘知识卡吧'))
      return
    }
    const { essenceCardMap } = this.state
    let tempCard = essenceCardMap.get(chapterId)
    if(tempCard) {
      this.setState({ showCard: true, essenceCard: tempCard })
    } else {
      dispatch(startLoad())
      loadEssenceCard(problemId, chapterId).then(res => {
        dispatch(endLoad())
        console.log(res)
        if(res.code === 200) {
          essenceCardMap.set(chapterId, res.msg)
          this.setState({ showCard: true, essenceCard: res.msg, essenceCardMap: essenceCardMap })
        } else {
          dispatch(alertMsg(res.msg))
        }
      }).catch(e => {
        dispatch(endLoad())
        dispatch(alertMsg(e))
      })
    }
  }

  render() {
    const { showCard, essenceCard, problemId, problem, cards } = this.state

    const renderCards = () => {
      return (
        <div className="cards-box">
          {
            cards.map((card, index) => {
              return (
                <Card img={card.thumbnail} lockImg={card.thumbnailLock} chapterNo={card.chapterNo} key={index}
                      chaper={card.chapter} completed={card.completed}
                      onClick={() => this.handleClickLoadCard(card.problemId, card.chapterId, card.completed)}/>
              )
            })

          }
        </div>
      )
    }

    const renderCardView = () => {
      let imgHeight = window.innerHeight
      let imgWidth = 750 * window.innerHeight / 1334
      let imgLeft = (window.innerWidth - imgWidth) / 2
      let startTime;
      let endTime;
      return (
        <div className={`card-essence`}
             onTouchStart={() => {
               startTime = new Date();
             }}
             onTouchEnd={() => {
               endTime = new Date();
               if(endTime.getTime() - startTime.getTime() < 500) {
                 this.setState({ showCard: false })
               }
             }}
        >
          <img className={`${showCard ? 'img-transition' : ''}`} src={essenceCard}
               style={{ height: imgHeight, width: imgWidth, left: imgLeft }}/>
        </div>
      )
    }

    const renderShadow = () => {
      if(showCard) {
        return (
          <div className="card-container-shadow" style={{ width: window.innerWidth, height: window.innerHeight }}/>
        )
      }
    }

    return (
      <div className="cards-container">
        <div className={`cards-page ${showCard ? 'blur' : ''}`}>
          <div className="cards-header">{problem}</div>
          {
            // TODO 限免活动取消，记得删除这行代码
            problemId === 9 ?
              <div className="cards-call" style={{ height: 0.366 * window.innerWidth }}/> :
              null
          }
          {renderCards()}
        </div>
        {renderCardView()}
        {renderShadow()}
      </div>
    )
  }

}

interface CardProps {
  img: string;
  lockImg: string;
  chapterNo: string;
  chaper: string;
  completed: boolean;
}
class Card extends React.Component<CardProps, any> {
  render() {
    const { img, lockImg, chapterNo, chaper, completed } = this.props
    // 卡片盒子高度
    const boxSize = (window.innerWidth - 6 * 15) / 3
    return (
      <div className="card" {...this.props}>
        <div className="card-top">
          <div className={`card-img ${completed ? '' : 'lock'}`} style={{ height: boxSize, width: boxSize }}>
            <AssetImg url={completed ? img : lockImg} width={boxSize}/>
          </div>
          <div className={`card-chapter ${completed ? '' : 'lock'}`}>{chapterNo}</div>
        </div>
        <div className={`card-bottom ${completed ? '' : 'lock'}`} style={{ width: boxSize }}>{chaper}</div>
      </div>
    )
  }
}

