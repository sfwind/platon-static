import * as React from 'react'
import { connect } from 'react-redux'
import { startLoad, endLoad, alertMsg } from 'redux/actions'
import { loadScore, loadUserScore } from './async'
import { configShare } from '../helpers/JsConfig'
import { mark } from 'utils/request'
import './Report.less'
import AssetImg from '../../components/AssetImg'
import { BibleToolBar } from './BibleToolBar'
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts')
// 引入柱状图
require('echarts/lib/chart/bar')
var moment = require('moment')

@connect(state => state)
export default class Report extends React.Component<any, any> {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      guest: null,
      totalWords: 0,
      showTip: false,
      nickName: '',
      totalScore: 0,
    }
  }

  componentWillMount() {
    mark({module: '打点', function: '学札报告', action: '查看学渣报告'})
  }

  componentDidMount() {
    const { dispatch, location } = this.props
    const { riseId, date } = location.query
    // 访客访问
    dispatch(startLoad())
    if(riseId) {
      loadUserScore(riseId, date).then(res => {
        if(res.code === 200) {
          dispatch(endLoad())
          this.setState({
            totalWords: res.msg.totalWords, qrCode: res.msg.qrCode,
            guest: true, totalScore: res.msg.totalScore, nickName: res.msg.nickName
          })
          this.configWXShare(res.msg.totalScore, res.msg.riseId)
          this.renderChart(res.msg)
        } else {
          dispatch(endLoad())
          dispatch(alertMsg(res.msg))
        }
      }).catch(e => {
        dispatch(endLoad())
        dispatch(alertMsg(e))
      })
    } else {
      // 用户访问
      loadScore().then(res => {
        if(res.code === 200) {
          dispatch(endLoad())
          this.setState({ totalWords: res.msg.totalWords, totalScore: res.msg.totalScore,
            nickName: res.msg.nickName, guest: false })
          this.configWXShare(res.msg.totalScore, res.msg.riseId)
          this.renderChart(res.msg)
        } else {
          dispatch(endLoad())
          dispatch(alertMsg(res.msg))
        }
      }).catch(e => {
        dispatch(endLoad())
        dispatch(alertMsg(e))
      })
    }

  }

  renderChart(msg) {
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.getElementById('echart-report'))
    const { compareGroup = [] } = msg
    let yAxisData = []
    let seriesData = []

    compareGroup.map((data, index) => {
      const { tagName, todayPoint } = data
      yAxisData.push({
        textStyle: {
          fontSize: 14,
          color: '#333'
        }, value: tagName
      })
      seriesData.push(todayPoint)
    })

    // 绘制图表
    myChart.setOption({
      title: {},
      grid: {
        height: 200,
        top: 20,
        right: '20%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        show: false
      },
      yAxis: {
        type: 'category',
        data: yAxisData,
        axisTick: { show: false },
        splitLine: { show: false },
        inverse: true,
        axisLine: {
          lineStyle: {
            color: '#999',
          }
        }
      },
      series: [
        {
          name: '今天',
          type: 'bar',
          barWidth: 10,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [ {
                offset: 0,
                color: '#4e93f3'
              }, {
                offset: 1,
                color: '#51d0f0'
              } ])
            }
          },
          label: {
            normal: {
              show: true,
              position: 'right',
              formatter: '{c}米',
              color: '#51d0f0',
              fontSize: 12,
            }
          },
          barGap: 0,
          data: seriesData
        }
      ]
    });
  }

  configWXShare(point, riseId) {
    const shareDate = moment().format('YYYY-MM-DD').replace(/-/g, '')
    configShare(`有效管理知识，告别信息焦虑。今天在学札，认知高度又提升了${point}米`,
      `https://${window.location.hostname}/rise/static/guest/note/report?riseId=${riseId}&date=${shareDate}`,
      'https://static.iqycamp.com/images/note_report_share3.jpg?imageslim',
      '学札是一个多平台学习管理工具，通过跟踪和分析你的每一次学习记录，让学习更有目的，提升有迹可循，和信息焦虑说拜拜~')
  }

  share(){
    mark({module: '打点', function: '学札报告', action: '点击分享'})
    this.setState({showTip:false})
  }

  render() {
    const { totalWords, qrCode, guest, showTip, totalScore, nickName } = this.state

    const renderQrCode = () => {
      return (
        <div className="qrcode-container">
          <div className="qrcode-hr"></div>
          <div className="quanwai-brand">
            <div className="qrcode">
              <AssetImg url={qrCode} size={102}></AssetImg>
            </div>
            <div className="brand-pic">
              <AssetImg url='https://static.iqycamp.com/images/note_report_brand2.png' height={88}></AssetImg>
              <div className="logo">
                <AssetImg url='https://static.iqycamp.com/images/note_report_logo.png' width={56} height={10}></AssetImg>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="learn-point-container">
        <div className="personal-icon" onClick={()=>this.context.router.push('/rise/static/note/customer')}>
          <AssetImg type="personal" size={26}/>
        </div>
        <div className="card-point">
          <div className="card-title">{nickName + ' '}今天在学札</div>
          <div className="read-word-container">
            <div className="read-word left">
              <div className="read-word-head">阅读优质内容</div>
              <div className="read-word-count"><span>{totalWords}</span>字</div>
            </div>
            <div className="read-word right">
              <div className="read-word-head">提升认知高度</div>
              <div className="read-word-count"><span>{totalScore}</span>米</div>
            </div>
          </div>

          <div className="card-hr"></div>
          <div className="report-title">今日认知升级榜</div>
          <div id="echart-report" className="echart-report"></div>
          {guest == false ? <div className="report-bottom">五位之后暂不显示在榜单中</div> : null}
          {guest == false ? <div className="share-button" onClick={()=>this.setState({showTip:true})}>分享</div> : null}
          {guest == true ? renderQrCode() : null }
        </div>
        {guest == false ? <BibleToolBar /> : null}
        {showTip ?
          <div className="share-tip" onClick={()=>this.share()}>
            <div className="tip-pic">
              <AssetImg url="https://static.iqycamp.com/images/share_pic1.png" width={247}/>
            </div>
          </div>
          : null
        }
      </div>
    )
  }
}
