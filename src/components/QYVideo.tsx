import * as React from 'react';
import './QYVideo.less';
import { mark } from '../utils/request';
import { randomStr } from '../utils/helpers';

export default class QYVideo extends React.Component<any, any> {
  constructor () {
    super();
    this.state = {};
    this.player = null;
    this.playerId = randomStr(12);
  }

  componentDidMount () {
    console.log('did mount');
    const { fileId, videoPoster } = this.props;
    if (fileId) {
      // 初始化腾讯播放器
      this.player = TCPlayer(this.playerId, { // player-container-id 为播放器容器ID，必须与html中一致
        fileID: fileId, // 请传入需要播放的视频fileID 必须
        appID: '1256115011', // 请传入点播账号的appID 必须
        playsinline: true,
      });
    }
  }

  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    点击展开或者折叠文字稿
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  handleClickShowWords (showWords) {
    const { beforeShowWords, cantShowWords } = this.props;
    if (!showWords) {
      // 原来是关闭的，现在展开
      if (beforeShowWords) {
        beforeShowWords().then(res => {
          if (res.code === 200) {
            if (res.msg !== 'ok') {
              if (cantShowWords) {
                cantShowWords(res.msg);
              }
            } else {
              this.setState({ showWords: !showWords });
            }
          }
        });
      } else {
        this.setState({ showWords: !showWords });
      }
      mark({ module: '打点', function: '视频', action: '查看视频文稿', memo: this.props.url });
    } else {
      this.setState({ showWords: !showWords });
    }
  }

  render () {
    const { videoUrl, videoPoster, videoWords, fileId } = this.props;
    const { showWords } = this.state;
    return (
      <div className="video-container">
        {
          fileId ?
            <video id={this.playerId}
                   preload="auto"
                   poster={videoPoster}></video> :
            <video ref="video"
                   src={videoUrl}
                   poster={videoPoster}
                   controls="controls"
                   width="100%"
                   playsinline
                   webkit-playinline
                   x5-playinline></video>
        }
        {
          videoWords &&
          <div className={`video-words-container ${showWords ? 'show-all' : 'hide'}`}>
            <div className={`video-words`}
                 dangerouslySetInnerHTML={{ __html: videoWords }}/>
            <div className={`words-text-mask`}>
              <div className={`words-mask-tips`}
                   onClick={() => this.handleClickShowWords(showWords)}>
                <span className={`awb-tips ${showWords ? 'hide' : 'show'}`}>
                  {showWords ? '收起' : '查看视频文稿'}
                </span>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}


