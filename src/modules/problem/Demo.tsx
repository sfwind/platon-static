import * as React from "react";
import Editor from "../../components/Editor/Editor"

export default class Demo extends React.Component<any,any>{
  constructor(){
    super()
  }

  render(){
    return(
      <div>
        <Editor/>
      </div>
    )
  }
}
