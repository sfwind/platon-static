// import * as React from "react";
// import { connect } from "react-redux";
// import { loadRoadMap } from "./async";
// import { startLoad, endLoad, alertMsg } from "../../../redux/actions";
// import "./RoadMap.less";
// import _ from 'lodash'
//
// @connect(state => state)
// export class RoadMap extends React.Component <any, any> {
//   constructor() {
//     super()
//     this.state = {
//       data: null
//     }
//   }
//
//   static contextTypes = {
//     router: React.PropTypes.object.isRequired
//   }
//
//   componentWillMount() {
//     const { dispatch,location } = this.props
//     const {series} = location.query
//     dispatch(startLoad())
//     loadRoadMap().then(res => {
//       dispatch(endLoad())
//       const { code, msg } = res
//       if (code === 200) {
//         msg.map((chapter, idx)=>{
//           let chosen = false
//           for(let i=0;i<chapter.sections.length;i++){
//             let section = chapter.sections[i]
//             if(section.series == series){
//               _.merge(section, {chosen:true})
//               chosen = true
//             }else{
//               _.merge(section, {chosen:false})
//             }
//           }
//           chosen?_.merge(chapter, {chosen:true}):_.merge(chapter, {chosen:false})
//         })
//         this.setState({ data: msg})
//       }
//       else dispatch(alertMsg(msg))
//     }).catch(ex => {
//       dispatch(endLoad())
//       dispatch(alertMsg(ex))
//     })
//   }
//
//   onSubmit() {
//     this.context.router.push({ pathname: '/rise/static/practice/knowledge', query: this.props.location.query })
//   }
//
//
//   render() {
//     const { data,openStatus={} } = this.state
//
//     const renderRoadMap = (chapter, idx) => {
//       const {sections} = chapter
//         return (
//             <div key={idx}>
//               {chapter.chosen?
//                 <div className='chosen-chapter' onClick={this.onSubmit.bind(this)}>{'第'+chapter.chapter+'章 '}{chapter.name}</div>:
//                 <div className='not-chosen-chapter'>{'第'+chapter.chapter+'章 '}{chapter.name}</div>
//               }
//               {sections?sections.map((section, idx) => renderSection(section, idx, chapter.chapter)):null}
//             </div>
//         )
//     }
//
//     const renderSection = (section, idx, chapter) => {
//       return (
//           <div key={idx}>
//             {section.chosen?<div className='chosen-section' onClick={this.onSubmit.bind(this)}>{chapter}{'.'}{section.section+'节 '}{section.name}</div>:
//                 <div className='not-chosen-section'>{chapter}{'.'}{section.section+'节 '}{section.name}</div>}
//           </div>
//       )
//     }
//
//     return (
//         <div>
//           <div className="container has-footer">
//             <div className="page-header">{'学习大纲'}</div>
//             <div className="context" style={{marginTop:15, marginBottom:30}}>
//               以下黑字部分是本节的主题，点击查看相关知识吧
//               {data?data.map((roadMap, idx) => renderRoadMap(roadMap, idx)):null}
//             </div>
//
//           </div>
//           <div className="button-footer" onClick={this.onSubmit.bind(this)}>{'查看相关知识'}</div>
//         </div>
//     )
//   }
// }
