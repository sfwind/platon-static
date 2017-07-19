import * as React from 'react'
import './CardsCollection.less'
import AssetImg from "../../components/AssetImg";
import { loadEssenceCard } from "./async";

// 小课卡包
interface CardsCollectionStates {
  showCard: boolean;
  essenceCard: string;
}
export default class CardsCollection extends React.Component<any, CardsCollectionStates> {

  constructor() {
    super()
    this.state = {
      showCard: false
    }
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
    const { showCard, essenceCard } = this.state

    const renderCardView = () => {
      return (
        <div className={`card-essence`}>
          <img className={`${showCard ? 'img-transition' : ''}`} src={essenceCard}/>
        </div>
      )
    }

    return (
      <div className="cards-container">
        <div className={`cards-page ${showCard ? 'blur' : ''}`}>
          <div className="cards-header">找到本质问题，减少无效努力</div>
          <div className="cards-box">
            <Card lock={false} img={''} chapter={0} knowledge={'以梦为马'}
                  id="card1"
                  onClick={this.handleClickCard.bind(this)}/>
            <Card lock={false} img={''} chapter={1} knowledge={'以梦为马'}
                  onClick={() => console.log(2222)}/>
            <Card lock={true} img={''} chapter={2} knowledge={'以梦为马'}/>
          </div>
        </div>
        {renderCardView()}
      </div>
    )
  }

}

interface CardProps {
  img: string;
  chapter: string;
  knowledge: string;
  lock: boolean;
}
const numberCharacter = {
  0: '一',
  1: '二',
  2: '三',
  3: '四',
  4: '五',
  5: '六',
  6: '七',
  7: '八',
  8: '九',
  9: '十'
}
class Card extends React.Component<CardProps, any> {
  render() {
    const { img, chapter, knowledge, lock } = this.props
    // 卡片盒子高度
    const boxSize = (window.innerWidth - 6 * 15) / 3
    return (
      <div className="card" {...this.props}>
        <div className="card-top">
          <div className={`card-img ${lock ? 'lock' : ''}`} style={{ height: boxSize, width: boxSize }}>
            {
              lock
                ? <div className="lock-img">
                <AssetImg url={require('../../../assets/img/card-lock.png')} width={20} height={26}/>
              </div>
                : <AssetImg url={img} size={boxSize}/>
            }
          </div>
          <div className={`card-chapter ${lock ? 'lock' : ''}`}>第{numberCharacter[chapter]}章</div>
        </div>
        <div className={`card-bottom ${lock ? 'lock' : ''}`} style={{ width: boxSize }}>{knowledge}</div>
      </div>
    )
  }
}

