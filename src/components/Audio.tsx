/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：platon-static
 2. 文件功能： 语音播放组件
 3. 作者： liyang@iquanwai.com
 4. 备注： <Audio url={audio} 音频URL
          words={audioWords}  说明文章
          iosAudoPlay={this.state.iosAudoPlay}  ios触发自动标识
           sourceFlag={"audioPlay"}  来源标识
            playFlag={this.state.audioPlay}   是否自动播放标识
            getPlayEnd={this.getPlayStation.bind(this)}/>   推给父组件的来源标识
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import * as React from "react";
import "./Audio.less";
import Slider from "react-rangeslider";
import AssetImg from "./AssetImg";
import { mark } from '../utils/request'

let timer;
let duration_load_timer;

enum Device {
  IPHONE = 1,
  ANDROID,
  OTHER
}

interface AudioProps {
  url: string,
  words?: string,
  beforeShowWords?: any,
  cantShowWords?: any,
}

export default class Audio extends React.Component<AudioProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      duration: 0,
      currentSecond: 0,
      cntSecond: 0,
      device: "",
      playing: false,
      pause: false,
      loading: false,
      start: false,
      showWords: false,
      autoPlayFlag:''
    }
  }

  componentWillMount() {
    if(window.navigator.userAgent.indexOf("Android") > 0) {
      this.setState({ device: Device.ANDROID })
    } else if(window.navigator.userAgent.indexOf("iPhone") > 0 || window.navigator.userAgent.indexOf("iPad") > 0) {
      this.setState({ device: Device.IPHONE })
    } else {
      this.setState({ device: Device.OTHER })
    }
  }

  componentDidMount() {
    const { device } = this.state;
    if(device == Device.ANDROID) {
      try {
        //华为某些机型不支持https的语音
        this.refs.sound.src = this.refs.sound.src.replace('https', 'http');
        this.refs.sound.load()
      } catch(e) {
        alert(e)
      }
    }
  }

  componentWillUnmount() {
    clearInterval(timer);
    clearInterval(duration_load_timer);
  }
  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  props传值发生改变触发函数
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  componentWillReceiveProps(nextProps){
    if(nextProps.playFlag){
      if (nextProps.playFlag == 'true' ){
       if (this.state.device == Device.IPHONE){
         this.start()
       } else {
        /* console.log(this.refs.sound.autoplay);
         this.refs.sound.autoplay = true;
         this.refs.sound.load();*/
         this.refs.sound.play();
       }
      }else {
        this.state.device == Device.IPHONE ?  this.pause(): this.refs.sound.pause();
      }
    }
    if (nextProps.iosAudoPlay){
       if (nextProps.iosAudoPlay == 'true'){
         this.refs.sound.play();
         this.refs.sound.pause();
       }
    }
  }
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
安卓结束播放运行函数
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  androidEndPlay() {
    if(this.props.sourceFlag){
      this.props.getPlayEnd(this.props.sourceFlag)
    }
  }
  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ios结束播放运行函数
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  onEnd() {
    this.setState({ currentSecond: this.state.duration, playing: false });
    clearInterval(timer);
    if (this.props.sourceFlag){
      this.props.getPlayEnd(this.props.sourceFlag)
    }
  }
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
ios音频开始播放点击事件
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  start() {
    let self = this;
    // 首次点击播放按钮
    this.setState({ playing: true, start: true });
    mark({ module: "打点", function: "语音", action: '播放语音', memo: this.props.url });
    // 首次加载
    if(this.state.duration === 0 && !this.state.start) {
      // 加载音频
      this.setState({ loading: true });
      self.refs.sound.load();
      duration_load_timer = setInterval(() => {
        if(self.state.duration) {
          clearInterval(duration_load_timer);
          return
        }
        //【IOS bug解决方法】先播放，再暂停，获取控件duration
        self.refs.sound.play();
        self.refs.sound.pause();
        if(self.refs.sound.duration) {
          self.setState({ duration: Math.floor(self.refs.sound.duration), loading: false });
          self.play();
        }
      }, 500)
    } else {
      // 重头开始播放
      if(Math.floor(this.state.currentSecond) === this.state.duration) {
        this.setState({ currentSecond: 0 })
      }
      this.play()
    }
  }

  play() {
    const self = this;
    if(timer) {
      clearInterval(timer)
    }
    this.setState({ playing: true, pause: false }, () => {
      self.refs.sound.play();
      timer = setInterval(() => {
        if(this.state.currentSecond < this.state.duration) {
          //设置已播放时长
          self.setState({ currentSecond: self.refs.sound.currentTime })
        } else {
          clearInterval(timer);
          this.setState({ playing: false })
        }
      }, 1000)
    })
  }

  pause() {
    this.setState({ playing: false, pause: true });
    clearInterval(timer);
    this.refs.sound.pause()
  }

  //手动更改时间
  onProgressChange(value) {
    //如果没有加载完成，不允许拖动
    if(this.state.duration === 0) {
      return
    }
    clearInterval(timer);
    this.setState({ playing: true, currentSecond: value }, () => {
      this.refs.sound.currentTime = value;
      this.play()
    })
  }
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
使用原生audio标签  android
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

  renderOrigin(url) {
    return (
      <audio ref="sound"  onPlaying={() => {
        mark({ module: "打点", function: "语音", action: '播放语音', memo: this.props.url })
      }} src={url} controls="controls"  onEnded={this.androidEndPlay.bind(this)}/>
    )
  }
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
使用定制化audio组件  ios
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  renderCustomize(url) {
    const { currentSecond, playing, duration, loading, showWords } = this.state;
    return (
      <div className="audio">
        <div className="audio-container">
          {loading ?
            <div className="audio-btn" onClick={this.pause.bind(this)}>
              <AssetImg url="https://static.iqycamp.com/images/audio_loading.gif" size={20}/>
            </div>
            : playing ?
              <div className="audio-btn" onClick={this.pause.bind(this)}>
                <AssetImg url="https://static.iqycamp.com/images/audio_pause.png" size={20}/>
              </div> :
              <div className="audio-btn" onClick={this.start.bind(this)}>
                <AssetImg url="https://static.iqycamp.com/images/audio_play.png" size={20}/>
              </div>
          }
          <div className="audio-progress">
            <Slider min={0} max={duration} value={currentSecond} onChange={this.onProgressChange.bind(this)}
                    withBars={true}/>
          </div>
          <div className="audio-duration">
            {intToTime(currentSecond)} / {intToTime(duration)}
          </div>
          <audio ref="sound" src={url} onEnded={this.onEnd.bind(this)}
          />
        </div>
      </div>
    )
  }

  handleClickShowWords(showWords) {
    const { beforeShowWords, cantShowWords } = this.props;
    if(!showWords) {
      // 原来是关闭的，现在展开
      if(beforeShowWords) {
        beforeShowWords().then(res => {
          if(res.code === 200) {
            if(res.msg !== 'ok'){
              if(cantShowWords){
                cantShowWords(res.msg);
              }
            } else {
              this.setState({ showWords: !showWords });
            }
          }
        })
      } else {
        this.setState({ showWords: !showWords });
      }
      mark({ module: "打点", function: "语音", action: '查看语音文稿', memo: this.props.url })
    } else {
      this.setState({ showWords: !showWords });
    }
  }

  renderWordsComponent(showWords, words) {
    return (
      <div className={`audio-words-container ${showWords ? 'show-all' : 'hide'}`}>
        <div className={`audio-words`} dangerouslySetInnerHTML={{ __html: words }}/>
        <div className={`words-text-mask`}>
          <div className={`words-mask-tips`} onClick={() => this.handleClickShowWords(showWords)}>
            <span className={`${showWords ? 'hide' : 'show'}`}>
              {showWords ? '收起' : '查看语音文稿'}
            </span>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { url } = this.props;
    const { words } = this.props;
    const { showWords, device } = this.state;
    let renderList = '';
    let wordsComponent = null;
    if(words) {
      // 有文字，显示文字提示
      wordsComponent = this.renderWordsComponent(showWords, words);
    }
    // 区分平台显示不同的音频组件
    if(device === Device.ANDROID) {
      renderList = this.renderOrigin(url);
    } else {
      renderList = this.renderCustomize(url);
    }

    // 语音文字
  /*  if(wordsComponent) {
      renderList.push(wordsComponent);
    }*/
    return (
      <div className="audio-wrapper">
        {renderList}
        {wordsComponent}
      </div>
    );
  }
}

function intToTime(val) {
  return new Date(val * 1000).toISOString().substr(14, 5)
}
