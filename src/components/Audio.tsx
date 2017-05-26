import * as React from "react";
import "./Audio.less";
import Slider from "react-rangeslider";
import AssetImg from "./AssetImg";

let timer;
let duration_load_timer;

export default class Audio extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      duration: 0,
      currentSecond: 0,
      cntSecond: 0,
      playing: false,
    }
  }

  onReady(e) {
    this.setState({duration: e.target.duration})
  }

  onEnd() {
    this.setState({currentSecond: this.state.duration, playing: false})
    clearInterval(timer)
  }

  start() {
    let self = this
    // 首次点击播放按钮
    if(this.state.duration === 0) {
      duration_load_timer = setInterval(() => {
        if(self.state.duration) {
          clearInterval(duration_load_timer)
          return
        }
        self.refs.sound.play()
        self.refs.sound.pause()
        if(self.refs.sound.duration) {
          self.setState({duration: Math.ceil(self.refs.sound.duration)})
          self.play()
        }
      }, 500)
    }
    // 暂停后重新播放
    if(!this.state.playing && this.state.duration !== 0) {
      this.play()
    }
  }

  play() {
    const self = this
    if(timer) {
      clearInterval(timer)
    }
    this.setState({playing: true}, () => {
      self.refs.sound.play()
      timer = setInterval(() => {
        if(this.state.currentSecond < this.state.duration) {
          self.setState({currentSecond: self.state.currentSecond + 1})
        } else {
          this.setState({playing: false})
          clearInterval(timer)
        }
      }, 1000)
    })
  }


  pause() {
    this.setState({playing: false})
    clearInterval(timer)
    this.refs.sound.pause()
  }

  stop() {
    clearInterval(timer)
    this.refs.sound.pause()
    this.refs.sound.load()
    this.setState({playing: false, currentSecond: 0})
  }

  //手动更改时间
  onProgressChange(value) {
    if(value >= this.state.duration) {
      this.setState({currentSecond: this.state.duration + 1}, () => {
        this.pause()
      })
      return
    }
    clearInterval(timer)
    this.setState({playing: true, currentSecond: value}, () => {
      this.refs.sound.currentTime = value
      this.play()
    })
  }

  render() {
    const {url} = this.props
    const {currentSecond, playing, duration} = this.state
    return (
      <div className="audio">
        <div className="audio-container">
          { playing ?
            <div className="audio-btn" onClick={this.pause.bind(this)}>
              <AssetImg url="https://www.iqycamp.com/images/audio_pause.png" size={20}/>
            </div> :
            <div className="audio-btn" onClick={this.start.bind(this)}>
              <AssetImg url="https://www.iqycamp.com/images/audio_play.png" size={20}/>
            </div>
          }
          <div className="audio-progress">
            <Slider min={0} max={duration - 1} value={currentSecond} onChange={this.onProgressChange.bind(this)}
                    withBars={true}/>
          </div>
          <div className="audio-duration">
            {intToTime(currentSecond)} / {intToTime(duration)}
          </div>
          <audio ref="sound" src={url}
                 preload="auto"
                 onCanPlay={this.onReady.bind(this)}
                 onEnded={this.onEnd.bind(this)}
          />
        </div>
      </div>
    )
  }
}

function intToTime(val) {
  return new Date(val * 1000).toISOString().substr(14, 5)
}
