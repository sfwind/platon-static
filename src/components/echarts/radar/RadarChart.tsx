import * as React from 'react';
// 引入 echarts 主模块
import * as echart from 'echarts/lib/echarts.js';
// import * as echart from 'echarts';
import 'echarts/lib/chart/radar';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import { randomStr } from '../../../utils/helpers';
import _ from 'lodash';

export default class RadarChart extends React.Component {

  constructor () {
    super();
    this.ref = randomStr(5);
    this.state = {
      option: {},
      data: {
        title: '',
        series: [
          {
            legend: '个人能力',
            detail: [
              {
                category: '领导力',
                value: 10,
                max: 100,
              },
              {
                category: '沟通力',
                value: 20,
                max: 100,
              },
              {
                category: '执行力',
                value: 40,
                max: 100,
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
    option.radar = _.merge(this.generateRadar(), option.radar = {});
    option.series = _.merge(this.generateSeries(), option.series = {});

    let node = this.refs[this.ref];
    let radarChart = echart.init(node);
    let initialOption = {
      color: ['#55cbcb'],
      title: {
        text: '',
      },
      tooltip: {},
      legend: {
        data: [],
      },
      radar: {
        shape: 'circle',
        name: {
          textStyle: {
            color: '#666',
          },
        },
        indicator: [
          { name: '', max: 100 },
        ],
        splitArea: {
          show: false,
        },
      },
      series: [
        {
          type: 'radar',
          areaStyle: {
            color: '#55cbcb',
            opacity: 0.4,
          },
          data: [
            {
              value: [],
              name: '',
            },
          ],
        }],
    };

    let targetOption = _.merge(initialOption, option);
    radarChart.setOption(targetOption);
  }

  generateTitle () {
    let obj = {};

    const { title } = this.state.data;
    obj.text = title;
    return obj;
  }

  generateLegend () {
  }

  generateRadar () {
    let obj = {};

    let targetIndicatorArr = [];
    const { series } = this.state.data;
    let seriesItem = series[0];
    seriesItem.detail.map((detailItem, index) => {
      let indicator = {};
      indicator.name = detailItem.category;
      indicator.max = detailItem.max || 100;
      targetIndicatorArr.push(indicator);
    });
    obj.indicator = targetIndicatorArr;
    return obj;
  }

  generateSeries () {
    let targetSeries = [];
    const { series = [] } = this.state.data;
    series.map((seriesItem, index) => {
      const { legend = '', detail = [] } = seriesItem;
      let singleSeriesItem = {};
      singleSeriesItem.data = [];
      let tempObj = {};
      tempObj.name = legend;
      tempObj.value = [];
      detail.map((detailItem, index) => {
        tempObj.value.push(detailItem.value);
      });
      singleSeriesItem.data.push(tempObj);
      targetSeries.push(singleSeriesItem);
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
