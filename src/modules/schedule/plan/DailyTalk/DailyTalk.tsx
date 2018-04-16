import * as React from 'react'
import { isLoadDailyTalk } from '../async'
import { loadDailyTalk } from '../../../daily/async'
import * as _ from 'lodash'

export default class DailyTalk extends React.Component {

  constructor () {
    super()
    this.state = {
      showImg: true,
      img: '',
    }
  }

  async componentDidMount () {
    const {
      switchToolbar = () => {
      },
    } = this.props

    let dailyTalk = await isLoadDailyTalk()
    let show = dailyTalk.msg
    this.setState({
      showImg: show,
      showPage: true,
    })
    if (show) {
      let image = await loadDailyTalk()
      this.setState({ img: image.msg }, () => {
        document.body.style.position = 'fixed'
      })
    } else {
      switchToolbar(true)
    }
  }

  componentWillUnmount () {
    document.body.style.position = 'inherit'
  }

  handleClickCloseTalk () {
    const {
      switchToolbar = () => {
      },
    } = this.props
    this.setState({ showImg: false })
    document.body.style.position = 'inherit'
    switchToolbar(true)
  }

  render () {
    const { showImg, img, } = this.state

    if (!showImg) {
      return <div></div>
    }

    return (
      <div>
        <div className="shadow-container"></div>
        <div className="daily_talk_backend">
          {
            !_.isEmpty(img) &&
            <div>
              <div className="daily_talk_container">
                <img className='close-img'
                     src='http://static.iqycamp.com/images/dailytalk/source/close-icon.png'
                     onClick={() => this.handleClickCloseTalk()}/>
                <img className="daily-talk-img"
                     src={img}/>
              </div>
              <div className="share-daily-talk"></div>
            </div>
          }
        </div>
      </div>
    )
  }

}
