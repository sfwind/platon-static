import * as React from 'react'
import { openCourse } from './async'


export default class OpenCourse extends React.Component<any,any>{


  componentWillMount(){
    const{location} = this.props
    const {problemId} = location.query
    openCourse(problemId).then(res=>{
      if(res.code===200){
        window.location.href="http://www.confucius.mobi/rise/static/course/schedule/plan"
      }
    })
  }


  render(){
    return(
      <div>

      </div>
    )
  }
}
