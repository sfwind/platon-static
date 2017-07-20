import * as React from 'react'
import './CardsCollection.less'
import { connect } from 'react-redux'
import { startLoad, endLoad, alertMsg } from "redux/actions";
import AssetImg from "../../components/AssetImg";
import { loadCardData, loadEssenceCard, loadProblemCards } from "./async";

// 小课卡包
interface CardsCollectionStates {
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
      problem: {},
      cards: [],
      essenceCardMap: new Map()
    }
  }

  componentWillMount() {
    const { planId } = this.props.location.query
    const { dispatch } = this.props
    dispatch(startLoad())
    loadCardData(planId).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if(code === 200) {
        this.setState({ problem: msg.problem, cards: msg.cards })
      } else {
        dispatch(alertMsg(msg))
      }
    }).catch(e => {
      dispatch(endLoad())
      dispatch(alertMsg(e))
    })
  }

  handleClickLoadCard(problemId, chapterId, completed) {
    if(!completed) {
      console.log('未解锁')
      return
    }
    const { dispatch } = this.props
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
    const { showCard, essenceCard, problem, cards } = this.state

    const renderCards = () => {
      return (
        <div className="cards-box">
          {
            cards.map((card, index) => {
              return (
                <Card img={card.thumbnail} chapterNo={card.chapterNo} key={index}
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
          <div className="cards-call" style={{ height: 0.366 * window.innerWidth }}/>
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
  chapterNo: string;
  chaper: string;
  completed: boolean;
}
class Card extends React.Component<CardProps, any> {
  render() {
    const { img, chapterNo, chaper, completed } = this.props
    // 卡片盒子高度
    const boxSize = (window.innerWidth - 6 * 15) / 3
    return (
      <div className="card" {...this.props}>
        <div className="card-top">
          <div className={`card-img ${completed ? '' : 'lock'}`} style={{ height: boxSize, width: boxSize }}>
            {
              completed ?
                <AssetImg url={img} width={boxSize}/> :
                <div className="lock-img">
                  <AssetImg url={require('../../../assets/img/card-lock.png')} width={20} height={26}/>
                </div>
            }
          </div>
          <div className={`card-chapter ${completed ? '' : 'lock'}`}>{chapterNo}</div>
        </div>
        <div className={`card-bottom ${completed ? '' : 'lock'}`} style={{ width: boxSize }}>{chaper}</div>
      </div>
    )
  }
}

