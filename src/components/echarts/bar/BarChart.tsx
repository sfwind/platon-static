import * as React from 'react';
// 引入 echarts 主模块
import * as echart from 'echarts/lib/echarts.js';
// import * as echart from 'echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import { randomStr } from '../../../utils/helpers';
import _ from 'lodash';

export default class BarChart extends React.Component {

  constructor () {
    super();
    this.ref = randomStr(5);
    this.state = {
      option: {},
      data: {
        title: '测试图',
        series: [
          {
            legend: '测试图例一',
            detail: [
              {
                category: '1次',
                value: 10,
              },
              {
                category: '2次',
                value: 20,
              },
              {
                category: '3次',
                value: 30,
              },
            ],
          },
          {
            legend: '测试图例二',
            detail: [
              {
                category: '1次',
                value: 40,
              },
              {
                category: '2次',
                value: 50,
              },
              {
                category: '3次',
                value: 60,
              },
            ],
          },
        ],
      },
    };
  }

  componentDidMount () {
    this.draw();
  }

  draw () {
    const {
      option = {},
      data = {},
    } = this.state;

    option.title = _.merge(this.generateTitle(), option.title = {});
    option.legend = _.merge(this.generateLegend(), option.legend = {});
    option.xAxis = _.merge(this.generateXAxis(), option.xAxis = {});
    option.series = _.merge(this.generateSeries(), option.series = {});

    let node = this.refs[this.ref];
    let barChart = echart.init(node);
    let initialOption = {
      color: ['green', 'grey'],
      title: {
        text: '',
        textAlign: 'center',
        left: '50%',
      },
      legend: {
        data: [],
        bottom: 0,
        right: 0,
        textStyle: {
          color: '#999',
        },
      },
      grid: {
        top: '40px',
        left: '0',
        right: '0',
        bottom: '40px',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: [],
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          interval: 0,
        },
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, 0.1],
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        // min: 0,
        // max: 100000,
      },
      series: [
        {
          name: '',
          type: 'bar',
          data: [],
        },
      ],
    };
    let targetOption = _.merge(initialOption, option);
    barChart.setOption(targetOption);
  }

  /**
   * 生成自定义标题
   * @returns {{}}
   */
  generateTitle () {
    const { title } = this.state.data;
    let obj = {};
    obj.text = title;
    return obj;
  }

  /**
   * 生成自定义图例
   * @returns {{}}
   */
  generateLegend () {
    let obj = {};
    let targetLegendData = [];
    const { series = [] } = this.state.data;
    series.map((seriesItem, index) => {
      const { legend = '', detail = [] } = seriesItem;
      targetLegendData.push(legend);
    });
    obj.data = targetLegendData;
    return obj;
  }

  /**
   * 生成自定义 x 轴
   * @returns {{}}
   */
  generateXAxis () {
    let obj = {};
    let targetXAxisData = [];
    const { series = [] } = this.state.data;
    let seriesItem = series[0];
    const { legend = '', detail = [] } = seriesItem;
    detail.map((detailItem, index) => {
      targetXAxisData.push(detailItem.category);
    });
    obj.data = targetXAxisData;
    return obj;
  }

  /**
   * 生成自定义数据集
   * @returns {Array}
   */
  generateSeries () {
    let targetSeries = [];

    const { series = [] } = this.state.data;
    series.map((seriesItem, index) => {
      const { legend = '', detail = [] } = seriesItem;
      let singleSeries = {};
      singleSeries.name = legend;
      singleSeries.type = 'bar';
      singleSeries.data = [];
      detail.map((detailItem, index) => {
        singleSeries.data.push(detailItem.value);
      });
      targetSeries.push(singleSeries);
    });
    return targetSeries;
  }

  render () {
    return (
      <div ref={this.ref}
           style={{ width: '300px', height: '275px' }}></div>
    );
  }

}
