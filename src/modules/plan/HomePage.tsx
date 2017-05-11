import * as React from "react";
import {connect} from "react-redux";
import { Tab, TabBarItem, Article } from "react-weui";

@connect(state => state)
export class HomePage extends React.Component<any,any>{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="home-page">
        <Tab type="tabbar">
          <TabBarItem label="tab1">
            <h1>测试1</h1>
          </TabBarItem>
          <TabBarItem label="tab2">
            <h1>测试2</h1>
          </TabBarItem>
          <TabBarItem label="tab3">
            <h1>测试3</h1>
          </TabBarItem>
        </Tab>
      </div>
    )
  }
}
