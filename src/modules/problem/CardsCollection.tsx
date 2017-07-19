import * as React from 'react'
import './CardsCollection.less'
import AssetImg from "../../components/AssetImg";
import { convertSvgToPng, loadEssenceCard, loadProblemCards } from "./async";
import escape = require("lodash/escape");
import unescape = require("lodash/unescape");

// 小课卡包
interface CardsCollectionStates {
  problem: string;
  cards: object;
  showCard: boolean;
  essenceCard: string;
}
export default class CardsCollection extends React.Component<any, CardsCollectionStates> {

  constructor() {
    super()
    this.state = {
      showCard: false,
      testImg: '',
      problem: '',
      cards: []
    }
  }

  componentWillMount() {
    loadProblemCards(7002).then(res => {
      const { code, msg } = res
      if(code === 200) {
        this.setState({ problem: msg.problem, cards: msg.cards })
      } else {
        console.error(msg)
      }
    }).catch(e => {
      console.error(e)
    })
  }

  handleClickCard() {
    const { showCard } = this.state
    this.setState({ showCard: !showCard })
    if(!showCard) {
      loadEssenceCard().then(res => {
        console.log(res)
        if(res.code === 200) {
          this.setState({ essenceCard: res.msg })
        }
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
                <Card img={card.essenceImgBase} chapterNo={card.chapterNo} key={index}
                      chaper={card.chapter} completed={card.completed}
                      onClick={() => {
                        this.setState({
                          showCard: true,
                          essenceCard: card.essenceImgBase
                        })}}/>
              )
            })

          }
        </div>
      )
    }

    const renderCardView = () => {
      if(!showCard) return null
      return (
        <div className={`card-essence`}>
          <img className={`${showCard ? 'img-transition' : ''}`} src={essenceCard}/>
        </div>
      )
    }

    return (
      <div className="cards-container">
        <div className={`cards-page ${showCard ? 'blur' : ''}`}>
          <div className="cards-header">{problem}</div>
          <div className="cards-call" style={{ height: 0.366 * window.innerWidth }}/>
          {renderCards()}
        </div>
        {renderCardView()}
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
    console.log(this.props)
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
                  <AssetImg url={require('../../../assets/img/card-lock.png')} width={20} height={26}/> :
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

