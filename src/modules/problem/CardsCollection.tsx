import * as React from 'react'
import './CardsCollection.less'
import AssetImg from "../../components/AssetImg";

// 小课卡包
export default class CardsCollection extends React.Component {

  constructor() {
    super()
    this.state = {
      showCard: false
    }
  }

  componentWillMount() {

  }

  render() {

    const { showCard } = this.state

    const renderCardView = (imgBase64) => {
      return (
        <CardView showCard={showCard} imgBase64={imgBase64}/>
      )
    }

    return (
      <div className="cards-container">
        <div className="cards-page">
          <div className="cards-header">我的卡包</div>
          <div className="cards-box">
            <Card lock={false} img={''} chapter={0} knowledge={'以梦为马'}
                  onClick={() => this.setState({ showCard: true })}/>
            <Card lock={false} img={''} chapter={1} knowledge={'以梦为马'}
                  onClick={() => console.log(2222)}/>
            <Card lock={true} img={''} chapter={2} knowledge={'以梦为马'}/>
          </div>
        </div>
        {renderCardView("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAA0CAYAAADmI0o+AAAAAXNSR0IArs4c6QAABJtJREFUWAntmVlrFEEQx7PxNt7B+0DF+3hRVPCIggfoo3j7AXzwA4mvgogifgAVwftCH7zQBAUVb/EWNWri7x+6ltqZ2c3M7JgFsaDSNdV1/Ke7urenU2rKSd3d3VNwnQtPhVvhIbDoG/wOfgo/KJVKajNTKYsHYGS/GG6Dx6b0fYvdOfgWILtT+jSlBgao0QTdCk9LGzxip5E7ATiNZq+UChigZhBpFzw4EvE9zx3wS/hz6BtGOwGeDY8JOmu+IxwF3CNTVGt7BQaomTjvhfu7IK+RT5JAoKoSvrPo3ASPd0a/kQ/j+9DpYmJNYARWUe+DBznPM8jnCdzldFVFYjTTuQre4Iw6kQ8SQ/WXSHJKpBBwG50GSoV7nGBn04JSYNnC5xGPwvYyA5G3hxyIcaoKDNOl8CTncooEt91zJhHfezicdE6qw2XuuUJMBMab9MOqzVk+JPBF95xLJMZlHNud8xpy+dotdyUCo1crakTZqvJNnTqXeBov28+GI89NilIN2EJn3M6bajsohIj1ikAPXLAFTi6L1YBp3zK6a0KBrY/pc5VTxIAx5/rN0xAbPTGhwNbHbCFnSzR2DBgGvrZUCx+iTgU8fySGNlqjkSZYmwRMe4xRJzVhe4/p6m6JqRfWJmvkc/bokoB5na0eC1Bk61849gvkQRSZtO5Y/4FlHcL/I/bPjFh/dl1Np443A8Jb+dNmM/2JPxlZRyDBXicYownkMfkXwvMSih0I/kfbDBrZ3tdoJR47GomK3HN0SIuuTI2p7cTl8f1LQH0ek5WqOXp6PFDk2SvLy1BS47Dfbz7R0TJ9w1sB80PYcEAGIAosdi4ywz5o/Tmw4utauf3ekhoL9aFRHwqr/RrOW6n9g2FF7mjxa3NLTQDSPcVaeBEsYKJv6O/QngWg3Wf0dPTy56fvFzC/PXzynbVkkutebA9sgMxc3wz6kF2EzRHAPbaOXtovvl81lnmvIuEo/HTREgXlYwvgHmx1fZWZolOZNsAGDJVYpBfTV/otPUC62FsNq950bbURPgZnoszAGAElW+Cy6Drqknt+hY2mZXPQzed5CDa6Ak1NeTZYXYbYClLBXkvIdh3dj6BXjokJNjVVeYDZtZQCa2uIrWR0+mb86jJ7H6euLuYB5reAkUyTtowKQqdFoQVi5H1MV7PNA0wXLFYvKvAtACnHCfIW9KbTvesLOBNlLn6mqYvkV8myLmTSIbMVnTZVrVBttr6mroWpRZ2eMgMLoS/QzoF1JBdpQYijpJE6F1WmebbhTmNbtmEEtBoPwbVunh/JJtiWfdMKeUdMl76qs0NMoW4ftamOhVVzb+Db9LfT5iYBU3FqFYm0eWYiAHTgIK6XfO7vmkp//zW93uh1+PvcHwTMv+1ypsZGr44c2VzJqd/dFc6rQ8Buwna714KsE0GfgQu5dpPXNmrdm91QsTbRuZ6mTXIgFbYAP4M7g67oZgABJ8NLYTupKMcF6vaUAdPI7YTnqaeBpJWsw2VXDzABYdQETiO3Epbcl6TpuwLr30KS459uAGxFvwSeBevLJXZxi64I+kkQ3V5rk74JoLc+6B9bvCfok+oW3gAAAABJRU5ErkJggg==")}
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

class CardView extends React.Component<{ showCard, imgBase64 }, {}> {
  constructor() {
    super()
    this.state = {
      showCard: false,
      imgBase64: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps !== this.props) {
      this.props = nextProps
      this.setState({
        showCard: nextProps.showCard,
        imgBase64: nextProps.imgBase64
      })
    }
  }

  render() {
    const { showCard, imgBase64 } = this.state

    return (
      showCard ?
        <div className="card-view">
          <div className="card-view-img">
            <img className="front" src={imgBase64}/>
          </div>
        </div> :
        null
    )
  }
}

