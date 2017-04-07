import * as React from "react";
import { connect } from "react-redux";
import { loadRoadMap } from "./async";
import { startLoad, endLoad, alertMsg } from "../../../redux/actions";
import "./RoadMap.less";

@connect(state => state)
export class RoadMap extends React.Component <any, any> {
  constructor() {
    super()
    this.state = {
      data: null
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const { dispatch,location } = this.props
    const {series} = location.query
    dispatch(startLoad())
    loadRoadMap().then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if (code === 200) {
        this.setState({ data: msg, series})
      }
      else dispatch(alertMsg(msg))
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  onSubmit() {
    this.context.router.push({ pathname: '/rise/static/practice/knowledge', query: this.props.location.query })
  }


  render() {
    const { data, series } = this.state

    const renderRoadMap = (roadMap, idx) => {
        return (
            <div key={idx}>
              <div className={series==roadMap.series?'chosen':'not-chosen'}>[第{roadMap.series}组]{'  '}{roadMap.intro}</div>
            </div>
        )
    }

    return (
        <div>
          <div className="container has-footer">
            <div className="page-header">{'课程表'}</div>
            <div className="context" style={{marginTop:15, marginBottom:15}}>Hi，欢迎回来！本节的训练主题为：</div>
            {data?data.map((roadMap, idx) => renderRoadMap(roadMap, idx)):null}
          </div>
          <div className="button-footer" onClick={this.onSubmit.bind(this)}>{'查看知识点'}</div>
        </div>
    )
  }
}
