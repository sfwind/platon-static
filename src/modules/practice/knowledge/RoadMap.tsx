import * as React from "react";
import { connect } from "react-redux";
import { loadRoadMap } from "./async";
import { startLoad, endLoad, alertMsg } from "../../../redux/actions";
import "./RoadMap.less";
import _ from 'lodash'

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
        msg.map((chapter, idx)=>{
          let chosen = false
          for(let i=0;i<chapter.sections.length;i++){
            let section = chapter.sections[i]
            if(section.series == series){
              _.merge(section, {chosen:true})
              chosen = true
            }else{
              _.merge(section, {chosen:false})
            }
          }
          chosen?_.merge(chapter, {chosen:true}):_.merge(chapter, {chosen:false})
        })
        this.setState({ data: msg})
      }
      else dispatch(alertMsg(msg))
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
    getOpenStatus().then(res=>{
      if(res.code===200){
        this.setState({openStatus:res.msg});
      }
    })
  }

  onSubmit() {
    this.context.router.push({ pathname: '/rise/static/practice/knowledge', query: this.props.location.query })
  }


  render() {
    const { data,openStatus={} } = this.state

    const renderRoadMap = (chapter, idx) => {
      const {sections} = chapter
        return (
            <div key={idx}>
              <div className={chapter.chosen?'chosen-chapter':'not-chosen-chapter'}>{'第'+chapter.chapter+'章 '}{chapter.name}</div>
              {sections?sections.map((section, idx) => renderSection(section, idx, chapter.chapter)):null}
            </div>
        )
    }

    const renderSection = (section, idx, chapter) => {
      return (
          <div key={idx}>
            <div className={section.chosen?'chosen-section':'not-chosen-section'}>{chapter}{'.'}{section.section+'节 '}{section.name}</div>
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
          <div className="button-footer" onClick={this.onSubmit.bind(this)}>{'查看内容'}</div>
        </div>
    )
  }
}
