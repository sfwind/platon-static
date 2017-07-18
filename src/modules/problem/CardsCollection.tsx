import * as React from 'react'
import './CardsCollection.less'
import AssetImg from "../../components/AssetImg";
import { convertSvgToPng, loadEssenceCard } from "./async";
import escape = require("lodash/escape");
import unescape = require("lodash/unescape");

// 小课卡包
interface CardsCollectionStates {
  showCard: boolean;
  essenceCard: string;
}
export default class CardsCollection extends React.Component<any, CardsCollectionStates> {

  constructor() {
    super()
    this.state = {
      showCard: false,
      testImg: ''
    }
  }

  componentWillMount() {

  }

  handleClickCard() {
    console.log('111')
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

  handleClickGetSvg() {
    let node = `<div>
                  Hello
                  <img src="https://static.iqycamp.com/images/fragment/free_limit_call_1.png?imageslim"></img>
                </div>`

    // let node = document.getElementById("canvas-container").outerHTML
    // console.log(node.outerHTML)
    let svgBase64 = this.generateSvgData(node, 300, 200)
    console.log(svgBase64)
    svgBase64 = svgBase64.replace("data:image/svg+xml;base64,", "")
    console.log(svgBase64)
    convertSvgToPng(svgBase64).then(res => {
      console.log('请求完成', res)
      if(res.code === 200) {
        this.setState({ testImg: res.msg })
      }
    })
  }

  generateSvgData(outerHTML, width, height) {
    let svgData = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
                    <foreignObject width="100%" height="100%">
                      <div xmlns="http://www.w3.org/1999/xhtml">
                        ${outerHTML}
                      </div>
                    </foreignObject>
                  </svg>`;
    // let base64Url = "data:image/svg+xml;base64," + window.btoa(unescape(svgData))
    let base64Url = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iMTAwcHgiIGhlaWdodD0iMTAwcHgiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAxMDAgMTAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxwYXRoIGQ9Ik03MS42MzMsMi4yOEgyOC4zNjdjLTQuMjEyLDAtNy42MzUsMy40MjMtNy42MzUsNy42MzV2ODAuMTY4YzAsNC4yMTIsMy40MjMsNy42MzYsNy42MzUsNy42MzZoNDMuMjY2DQoJCWM0LjIxMywwLDcuNjM1LTMuNDI0LDcuNjM1LTcuNjM2VjkuOTE2Qzc5LjI2OCw1LjcwMyw3NS44NDYsMi4yOCw3MS42MzMsMi4yOHogTTQzLjAwMSw5LjI1NGMwLTEuMDQzLDAuODQxLTEuODg0LDEuODg0LTEuODg0DQoJCWgxMC4yM2MxLjA0NCwwLDEuODg0LDAuODQxLDEuODg0LDEuODg0djAuMDVjMCwxLjA0My0wLjg0LDEuODg0LTEuODg0LDEuODg0aC0xMC4yM2MtMS4wNDMsMC0xLjg4NC0wLjg0LTEuODg0LTEuODg0VjkuMjU0eg0KCQkgTTUwLDk0Ljg1NWMtMi4yNzcsMC00LjEzNi0xLjg1Ny00LjEzNi00LjEzNmMwLTIuMjc3LDEuODU4LTQuMTM2LDQuMTM2LTQuMTM2YzIuMjc4LDAsNC4xMzYsMS44NTgsNC4xMzYsNC4xMzYNCgkJQzU0LjEzNiw5Mi45OTgsNTIuMjc4LDk0Ljg1NSw1MCw5NC44NTV6IE03Mi45MDUsODIuNDQ5YzAsMC42OTktMC41NzIsMS4yNzItMS4yNzIsMS4yNzJIMjguMzY3Yy0wLjcsMC0xLjI3Mi0wLjU3My0xLjI3Mi0xLjI3Mg0KCQlWMTcuNTUxYzAtMC43LDAuNTcyLTEuMjcyLDEuMjcyLTEuMjcyaDQzLjI2NmMwLjcsMCwxLjI3MiwwLjU3MywxLjI3MiwxLjI3MlY4Mi40NDl6Ii8+DQoJPHBhdGggZD0iTTY2LjU1Niw3NC44MTNoLTMzLjExYy0wLjY5NiwwLTEuMjYxLDAuNTY0LTEuMjYxLDEuMjYxdjAuMDI0YzAsMC42OTYsMC41NjQsMS4yNjEsMS4yNjEsMS4yNjFoMzMuMTENCgkJYzAuNjk1LDAsMS4yNi0wLjU2NCwxLjI2LTEuMjYxdi0wLjAyNEM2Ny44MTUsNzUuMzc4LDY3LjI1MSw3NC44MTMsNjYuNTU2LDc0LjgxM3oiLz4NCgk8cGF0aCBkPSJNNjYuNTU2LDY3LjE3OWgtMzMuMTFjLTAuNjk2LDAtMS4yNjEsMC41NjQtMS4yNjEsMS4yNnYwLjAyNGMwLDAuNjk2LDAuNTY0LDEuMjYsMS4yNjEsMS4yNmgzMy4xMQ0KCQljMC42OTUsMCwxLjI2LTAuNTY0LDEuMjYtMS4yNnYtMC4wMjRDNjcuODE1LDY3Ljc0Myw2Ny4yNTEsNjcuMTc5LDY2LjU1Niw2Ny4xNzl6Ii8+DQoJPHBhdGggZD0iTTUwLjg0LDQ2LjIzMmMtMi45MjcsMC01LjE4LTIuMTk1LTUuMTgtMi4xOTVsLTIuMDQ4LDIuODRjMCwwLDIuMDc4LDIuMzEsNS44NTMsMi43NXYyLjY5MmgyLjUxNnYtMi42OTINCgkJYzMuNTY5LTAuNDY5LDUuNjQ4LTMuMDEzLDUuNjQ4LTUuOTk5YzAtNi41NTUtOS44Ni01Ljk0LTkuODYtOS40MjJjMC0xLjQ2NSwxLjM3NC0yLjQ4OCwzLjEzLTIuNDg4DQoJCWMyLjYwNCwwLDQuNTk0LDEuODE1LDQuNTk0LDEuODE1bDEuNjM5LTMuMDc0YzAsMC0xLjc1NS0xLjg0NC01LjE1LTIuMTM1di0yLjY5MmgtMi41MTZ2Mi43NTENCgkJYy0zLjI0OCwwLjUyNi01LjUwMiwyLjg2Ni01LjUwMiw1Ljg4YzAsNi4yOTEsOS44OSw1Ljk0LDkuODksOS40NTJDNTMuODUzLDQ1LjQxNSw1Mi40MTgsNDYuMjMyLDUwLjg0LDQ2LjIzMnoiLz4NCgk8cGF0aCBkPSJNNjYuNTU2LDU5LjU0M2gtMzMuMTFjLTAuNjk2LDAtMS4yNjEsMC41NjQtMS4yNjEsMS4yNnYwLjAyNWMwLDAuNjk2LDAuNTY0LDEuMjYsMS4yNjEsMS4yNmgzMy4xMQ0KCQljMC42OTUsMCwxLjI2LTAuNTY0LDEuMjYtMS4yNnYtMC4wMjVDNjcuODE1LDYwLjEwOCw2Ny4yNTEsNTkuNTQzLDY2LjU1Niw1OS41NDN6Ii8+DQo8L2c+DQo8L3N2Zz4NCg=="
    console.log(base64Url)
    return base64Url
  }

  changeSvgToPng(svgBase64) {

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
        {
          this.state.testImg != '' ?
            <div id="canvas-container">
              <img src={this.state.testImg} alt=""/>
            </div> :
            null
        }
        <div className={`cards-page ${showCard ? 'blur' : ''}`}>
          <div className="cards-header">找到本质问题，减少无效努力</div>
          <div className="cards-call" style={{ height: 0.366 * window.innerWidth }}/>
          <div className="cards-box">
            <Card lock={false} img={''} chapter={0} knowledge={'以梦为马'} id="card1"
                  onClick={this.handleClickCard.bind(this)}/>
            <Card lock={false} img={''} chapter={1} knowledge={'以梦为马'}
                  onClick={this.handleClickGetSvg.bind(this)}/>
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

