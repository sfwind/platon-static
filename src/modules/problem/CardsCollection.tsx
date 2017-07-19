import * as React from 'react'
import './CardsCollection.less'
import { connect } from 'react-redux'
import { startLoad, endLoad, alertMsg } from "redux/actions";
import AssetImg from "../../components/AssetImg";
import { convertSvgToPng, loadEssenceCard, loadProblemCards } from "./async";

// 小课卡包
interface CardsCollectionStates {
  problem: string;
  cards: object;
  showCard: boolean;
  essenceCard: string;
}
@connect(state => state)
export default class CardsCollection extends React.Component<any, CardsCollectionStates> {

  constructor() {
    super()
    this.state = {
      showCard: false,
      essenceCard: '',
      problem: '',
      cards: []
    }
  }

  componentWillMount() {
    const { planId } = this.props.location.query
    const { dispatch } = this.props
    dispatch(startLoad())
    loadProblemCards(planId).then(res => {
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
                        })
                      }}/>
              )
            })

          }
        </div>
      )
    }

    const renderCardView = () => {
      return (
        <div className={`card-essence`} onClick={() => this.setState({ showCard: false })}>
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

