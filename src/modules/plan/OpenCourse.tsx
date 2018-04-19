import * as React from 'react'

import { startLoad, endLoad, alertMsg } from '../../redux/actions'
import { openCoure } from './async'



export default class OpenCourse extends React.Component<any,any>{

  constructor(){
    super()
  }

  async componentWillMount(){
    const {location} = this.props
    const {problemId} =location.query
    let res = await  openCoure(problemId)

    if(res.code===200){
      window.location.href = "https://www.confucius.mobi/rise/static/course/schedule/plan";
    }
  }


  render(){
    return(
      <div>

      </div>
    )
  }

}
