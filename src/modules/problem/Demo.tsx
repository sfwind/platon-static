import * as React from "react";
import Editor from "../../components/editor/Editor"

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
