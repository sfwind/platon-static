/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：platon-static
 2. 文件功能：  livesItem 大咖直播的组件
 3. 作者： liyang@iquanwai.com
 4. 备注：
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import * as React from 'react'
import './livesItem.less'
import commonFun from '../../utils/commonFun'  // 公共方法函数

export default class LivesItem extends React.Component {
  constructor() {
    super();
    this.state={
      timeNum:0,
      livesItem:{}
    }
  }
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };
  componentWillMount() {
    this.setState({livesItem: this.props.livesItem});
      if (this.props.livesItem.status === 1 && this.props.livesItem.startTimeStr){
         let startTimeStr = this.props.livesItem.startTime;
         let startTimeLong = parseInt(startTimeStr)/1000;
         let todayLong = parseInt(new Date().getTime()/1000);
         let rangeTime = startTimeLong - todayLong ;
         let self =this;

        if ( rangeTime > 86400){
          this.setState({
            timeNum:rangeTime
          })
        }else {
          this.setState({
            timeNum:rangeTime
          },()=>{
            self.timeSetInterval = setInterval(() => {
              let timeNum  = self.state.timeNum-1;
              self.setState({ timeNum:timeNum })
            }, 1000)
          })
        }
      }
  }
  componentWillUnmount() {
    clearInterval( this.timeSetInterval)
  }
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
点击判断是否是会员 然后进行弹框 或者会员跳转
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  handleClick (visibility, linkUrl, name,livesItemStatus,id) {
    commonFun.sendBigData({ module: '打点', function: '着陆页', action: '点击直播' }); // 事件埋点
    if (livesItemStatus === 1){
      this.context.router.push(`/rise/static/home/live/order?liveId=${id}`)
    }else {
      if (visibility) {
        if (linkUrl) {
          window.location.href = linkUrl
        } else {
          this.props.handleMess('恭喜你已预约成功！\n直播当天，我们会通过圈外同学服务号提醒你参加直播~');
          commonFun.sendBigData({ module: '打点', function: '着陆页', action: '点击预约', memo: name }); // 事件埋点
        }
      } else {
        this.props.handleMess('此直播间只对会员开放');
      }
    }

  }
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
进行事件处理 86400
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  formatTime(timeNum){
    let remainSecond = parseInt(timeNum);// 秒
    let remainMinute = 0;// 分
    let remainHour = 0;// 小时
    let remainDay=0;  // 天
    if( remainSecond < 86400 ){
      if(remainSecond > 60) {
        remainMinute = parseInt(remainSecond / 60);
        remainSecond = parseInt(remainSecond % 60);
        if(remainMinute > 60) {
          remainHour = parseInt(remainMinute / 60);
          remainMinute = parseInt(remainMinute % 60);
        }
      }
      if(remainSecond <= 0) {
        remainSecond = 0;
      }
      return { remainHour, remainMinute, remainSecond };
    }else {
      if(remainSecond > 60) {
        remainMinute = parseInt(remainSecond / 60);
        remainSecond = parseInt(remainSecond % 60);
        if(remainMinute > 60) {
          remainHour = parseInt(remainMinute / 60);
          remainMinute = parseInt(remainMinute % 60);
          if (remainHour > 24){
            remainDay = parseInt(remainHour / 24);
            remainHour = parseInt(remainMinute % 24);
          }
        }
      }
      if(remainSecond <= 0) {
        remainSecond = 0;
      }
      return {remainDay,remainHour, remainMinute, remainSecond}
    }
  }
  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 改变时间显示格式
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  formatDateString(timeNum) {
    let dateInfo = this.formatTime(timeNum);
    if (dateInfo.remainDay){
      return `${dateInfo.remainDay}天${dateInfo.remainHour}时${dateInfo.remainMinute}分后开启`
    }else {
      return `${dateInfo.remainHour}时${dateInfo.remainMinute}分${dateInfo.remainSecond}秒后开启`
    }
  }
  render(){
    const { livesItem } = this.state;
    return (
      <div className="lives-item" onClick={()=>{this.handleClick(livesItem.visibility,livesItem.linkUrl,livesItem.name,livesItem.status,livesItem.id)}}
           style={{background: `url(${livesItem.thumbnail}) no-repeat`,backgroundSize: `100% 217px` }}>
         <div className="dscr">
           <h2 className="title">{livesItem.name}</h2>
           <h3 className="name">{livesItem.speaker}</h3>
           <p className="speakerDesc">{livesItem.speakerDesc}</p>
           {livesItem.status === 1 && <p className="appointment">{this.state.timeNum ? this.formatDateString(this.state.timeNum) : ''}</p>}
           {livesItem.status === 2 &&<p className="playing">直播中：{livesItem.startTimeStr}</p>}
           {livesItem.status === 3 &&<p className="play-time">直播时间：{livesItem.startTimeStr}</p>}
           {livesItem.status === 1 &&<span className="button"><i className="iconfont icon-order"></i> 直播预约</span>}
           {livesItem.status === 2 &&<span className="button"><i className="iconfont icon-playing"></i>  直播中</span>}
           {livesItem.status === 3 &&<span className="button"><i className="iconfont icon-replay"></i> 回放</span>}
         </div>
      </div>
    )}
}
