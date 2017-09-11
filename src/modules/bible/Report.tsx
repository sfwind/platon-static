import * as React from 'react'
import { connect } from 'react-redux'
import { startLoad, endLoad, alertMsg } from 'redux/actions'
import { loadScore, loadUserScore } from './async'
import { configShare } from '../helpers/JsConfig'
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
      guest: false,
      totalWords: 0,
      showTip: false,
    }
  }

  componentWillMount() {

  }

  componentDidMount() {
    const { dispatch, location } = this.props
    const { riseId, date } = location.query
    // 访客访问
    if(riseId) {
      loadUserScore(riseId, date).then(res => {
        if(res.code === 200) {
          this.setState({ totalWords: res.msg.totalWords, qrCode: res.msg.qrCode, guest: true })
          this.configWXShare(res.msg.totalScore, res.msg.riseId)
          this.renderChart(res.msg)
        } else {
          dispatch(alertMsg(res.msg))
        }
      }).catch(e => {
        dispatch(alertMsg(e))
      })
    } else {
      // 用户访问
      loadScore().then(res => {
        if(res.code === 200) {
          this.setState({ totalWords: res.msg.totalWords })
          this.configWXShare(res.msg.totalScore, res.msg.riseId)
          this.renderChart(res.msg)
        } else {
          dispatch(alertMsg(res.msg))
        }
      }).catch(e => {
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
              formatter: '{c}分',
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

  configWXShare(point, riseId){
    const shareDate = moment().format('YYYY-MM-DD').replace(/-/g, '')
    configShare(`有效管理知识，赶走信息焦虑。今天在学札又提升了${point}米认知高度`,
      `https://${window.location.hostname}/rise/static/guest/note/report?riseId=${riseId}&date=${shareDate}`,
      'https://static.iqycamp.com/images/note_report_share.jpeg?imageslim',
      '有效学习，需要心中有数；跟踪你的学习内容，每一天都能构建自己的知识体系')
  }

  render() {
    const { totalWords, qrCode, guest, showTip } = this.state

    const renderQrCode = () => {
      return (
        <div className="qrcode-container">
          <div className="qrcode-hr"></div>
          <div className="quanwai-brand">
            <div className="qrcode">
              <AssetImg url={qrCode} size={102}></AssetImg>
            </div>
            <div className="brand-text">
              <div className="brand-text1">圈外同学</div>
              <div className="brand-text1">你的职场商学院</div>
              <div className="brand-text2">我们只用顶级公司培养人才的方式培养你</div>
              <div className="brand-text3">长按识别二维码关注</div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="learn-point-container">
        <div className="card-point">
          <div className="card-title">{window.ENV.userName}在圈外商学院今日阅读</div>
          <div className="read-word-count">{totalWords}字</div>
          <div className="card-hr"></div>
          <div className="report-title">内容覆盖</div>
          <div id="echart-report" className="echart-report"></div>
          {guest ?
            renderQrCode() :
            <div className="share-button" onClick={()=>this.setState({showTip:true})}>分享</div>
          }

        </div>
        {guest ? null : <BibleToolBar />}
        {showTip ?
          <div className="share-tip" onClick={()=>this.setState({showTip:false})}>
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
