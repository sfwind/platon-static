import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startLoad, endLoad, alertMsg } from 'redux/actions'
import './CountDown.less';
import { loadCountDownInfo } from './async'
import AssetImg from '../../components/AssetImg'
import { preview } from '../helpers/JsConfig'
import { chooseAuditionCourse } from './async';
import { mark } from '../../utils/request'

let _ = require('lodash');

@connect(state => state)
export default class CountDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ones: '0',
      tens: '0',
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(startLoad());
    loadCountDownInfo().then(res => {
      dispatch(endLoad())
      if(res.code === 200) {
        const { days, hasSchedule, hasAudition } = res.msg;
        if(days <= 0) {
          if(hasSchedule) {
            this.context.router.push({ pathname: '/rise/static/plan/main' });
          } else {
            this.context.router.push({ pathname: '/rise/static/course/schedule/start' })
          }
          return;
        }

        let daysStr = days + '';
        let ones = '0';
        let tens = '0';
        // 小于等于0 按0算
        if(days > 0) {
          // 两位数
          if(daysStr.length > 1) {
            console.log(daysStr);
            ones = daysStr[ 1 ];
            tens = daysStr[ 0 ];
          } else {
            // 1位数
            ones = daysStr[ 0 ];
          }
        }
        this.setState({ days: days, ones: ones, tens: tens, hasAudition: hasAudition });
      } else {
        dispatch(alertMsg(res.msg));
      }
    }).catch(ex => {
      dispatch(endLoad())
    })
  }

  handleClickAudition() {
    // 开试听课
    const { dispatch } = this.props
    dispatch(startLoad())
    chooseAuditionCourse().then(res => {
      dispatch(endLoad())
      if(res.code === 200) {
        const { planId, goSuccess, errMsg, startTime, endTime } = res.msg
        if(errMsg) {
          mark({ module: '打点', function: '试听课', action: '无法开启试听课', memo: '倒计时页面' })
          dispatch(alertMsg(errMsg))
        } else {
          if(goSuccess) {
            mark({ module: '打点', function: '试听课', action: '开通试听课', memo: '倒计时页面' })
            window.location.href = `https://${window.location.hostname}/pay/static/audition/success`
          } else {
            mark({ module: '打点', function: '试听课', action: '进入试听课', memo: '倒计时页面' })
            this.context.router.push('/rise/static/plan/main');
          }
        }
      } else {
        dispatch(alertMsg(res.msg))
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  render() {
    const { ones, tens, hasAudition } = this.state;
    return (
      <div className="count-down">
        <div className="header">
          <div className="msg">距离商学院开学还有</div>
        </div>
        <div className="remainder">
          <div className="day">
            <div className="tens-place place">
              {tens}
            </div>
            <div className="ones-place place">
              {ones}
            </div>
            {
              hasAudition ? <div className="auditions" onClick={() => this.handleClickAudition()}>试听课</div> : null
            }
          </div>
        </div>
        <div className="footer">
          请置顶公众号<br/>
          以便及时收到开学典礼通知
          <div className="guide-tips">
            <div className="left" data-step='- 1 -'>
              <AssetImg url='https://static.iqycamp.com/images/count_down_left_tips.png?imageslim'/>
            </div>
            <div className="right" data-step='- 2 -'>
              <AssetImg url='https://static.iqycamp.com/images/count_down_right_tips.png?imageslim'/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
