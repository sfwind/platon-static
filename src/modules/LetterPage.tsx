import * as React from 'react'
import domtoimage from 'dom-to-image'
import { pget } from '../utils/request'
import './LetterPage.less'

export default class LetterPage extends React.Component {

  constructor() {
    super()
    this.state = {
      profiles: [],
      currentIndex: 0,
      currentProfile: {}
    }
  }

  componentWillMount() {
    pget(`/operation/letter/load`).then(res => {
      if(res.code === 200) {
        this.setState({ profiles: res.msg }, () => {
          this.getProfile()
        })
      }
    })
  }

  getProfile() {
    const { profiles, currentIndex } = this.state
    if(currentIndex == profiles.length) {
      alert('结束')
      return
    }

    let profile = profiles[currentIndex]
    this.setState({ currentProfile: profile, currentIndex: currentIndex + 1 }, () => {
      document.getElementById("print-node").click()
    })
  }

  savePng(currentProfile) {
    domtoimage.toJpeg(document.getElementById('print-node'), { quality: 0.95 }).then(dataUrl => {
      var link = document.createElement('a')
      link.download = currentProfile.id + '-' + currentProfile.nickname + '.jpg'
      link.href = dataUrl
      link.click()

      setTimeout(() => {
        // this.getProfile()
      }, 4000)
    })
  }

  render() {
    const { currentProfile } = this.state

    console.log(currentProfile)
    return (
      <div id='print-node' className="mailpage-container" onClick={() => this.savePng(currentProfile)}>
        <div className="print-nickname">{`亲爱的${currentProfile.nickname}，`}</div>
        <img className='mail-image' src="https://static.iqycamp.com/images/quanquan_letter_1.jpg?imageslim"/>
      </div>
    )
  }

}
