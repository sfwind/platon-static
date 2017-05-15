import * as React from 'react';
import { connect } from 'react-redux';
import { ToolBar } from '../base/ToolBar'

export class Explore extends React.Component<any,any>{
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
    return (
      <div className="explore-container">



        <ToolBar/>
      </div>
    )
  }
}
