import * as React from 'react'
import { connect } from 'react-redux'
import { startLoad, endLoad, alertMsg } from 'redux/actions'
import './Report.less'
import AssetImg from '../../components/AssetImg'
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts')
// 引入柱状图
require('echarts/lib/chart/bar')

@connect(state => state)
export default class Report extends React.Component<any, any> {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      data: {}
    }
  }

  componentWillMount() {

  }

  componentDidMount() {
    // 基于准备好的dom，初始化echarts实例

    let myChart = echarts.init(document.getElementById('echart-report'));
    // 绘制图表
    myChart.setOption({
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
        data: [ {
          value: '职业发展',
          textStyle: {
            fontSize: 15,
            color: '#333'
          }
        }, {
          value: '逻辑思考',
          textStyle: {
            fontSize: 15,
            color: '#333'
          }
        }, {
          value: '沟通表达',
          textStyle: {
            fontSize: 15,
            color: '#333'
          }
        }, {
          value: '互联网产品',
          textStyle: {
            fontSize: 15,
            color: '#333'
          }
        }, {
          value: '互联网运营',
          textStyle: {
            fontSize: 15,
            color: '#333'
          }
        } ],
        axisTick: { show: false },
        splitLine: { show: false }
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
          data: [ 15, 12, 8, 2, 1 ]
        }
      ]
    });
  }

  render() {
    const { data } = this.state
    const { riseId, totalWords, qrCode } = data

    return (
      <div className="learn-point-container">
        <div className="card-person">
          <div className="person">
            <div className="avatar"><AssetImg url={window.ENV.headImage} size={60}/></div>
            <div className="nickname">{window.ENV.userName}</div>
          </div>
        </div>
        <div className="card-point">
          <div className="card-title">{window.ENV.userName}在圈外商学院今日阅读</div>
          <div className="read-word-count">{totalWords}字</div>
          <div className="card-hr"></div>
          <div className="report-title">内容覆盖</div>
          <div id="echart-report" className="echart-report"></div>
        </div>
        <div className="share-button">分享</div>
      </div>
    )
  }
}
