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
      pause:false,
      loading:false,
    }
  }

  onEnd() {
    this.setState({currentSecond: this.state.duration, playing: false})
    clearInterval(timer)
  }

  start() {
    let self = this
    // 首次点击播放按钮
    this.setState({playing:true})
    // 首次加载
    if(this.state.duration === 0) {
      // 加载音频
      this.setState({loading:true})
      self.refs.sound.load()
      duration_load_timer = setInterval(() => {
        if(self.state.duration) {
          clearInterval(duration_load_timer)
          return
        }
        //【IOS bug解决方法】先播放，再暂停，获取控件duration
        self.refs.sound.play()
        self.refs.sound.pause()
        if(self.refs.sound.duration) {
          self.setState({duration: Math.floor(self.refs.sound.duration), loading:false})
          self.play()
        }
      }, 500)
    }else{
      // 暂停后重新播放
      if(this.state.pause) {
        this.play()
        this.setState({pause:false})
      }
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
          //设置已播放时长
          self.setState({currentSecond: self.refs.sound.currentTime})
        } else {
          this.setState({playing: false})
          clearInterval(timer)
        }
      }, 100)
    })
  }


  pause() {
    this.setState({playing: false, pause:true})
    clearInterval(timer)
    this.refs.sound.pause()
  }

  //手动更改时间
  onProgressChange(value) {
    //如果没有加载完成，不允许拖动
    if(this.state.duration === 0){
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
    const {currentSecond, playing, duration, loading} = this.state
    return (
      <div className="audio">
        <div className="audio-container">
          { loading ?
              <div className="audio-btn" onClick={this.pause.bind(this)}>
                <AssetImg url="https://www.iqycamp.com/images/audio_loading.gif" size={20}/>
              </div>
          : playing ?
            <div className="audio-btn" onClick={this.pause.bind(this)}>
              <AssetImg url="https://www.iqycamp.com/images/audio_pause.png" size={20}/>
            </div> :
            <div className="audio-btn" onClick={this.start.bind(this)}>
              <AssetImg url="https://www.iqycamp.com/images/audio_play.png" size={20}/>
            </div>
          }
          <div className="audio-progress">
            <Slider min={0} max={duration} value={currentSecond} onChange={this.onProgressChange.bind(this)}
                    withBars={true}/>
          </div>
          <div className="audio-duration">
            {intToTime(currentSecond)} / {intToTime(duration)}
          </div>
          <audio ref="sound" src={url}
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
