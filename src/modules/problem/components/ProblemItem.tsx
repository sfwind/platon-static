import * as React from 'react';
import './ProblemItem.less';
import { merge } from 'lodash';

export default class ProblemItem extends React.Component<any,any>{
  constructor(props){
    super(props);
    this.state = {}

    this.picWidth = (this.props.width?this.props.width:window.innerWidth)*0.4 - 25;
    this.picHeight = 80 / 130 * this.picWidth;
    this.bigFontSize = 13 / 375 * (this.props.width?this.props.width:window.innerWidth);
    this.smallFontSize = 12 / 375 * (this.props.width?this.props.width:window.innerWidth);
    console.log(props.rootClass);
  }

  render(){


    let rootStyle = merge({},this.props.rootStyle);

    const {problem} = this.props;
    const renderCatalog = ()=>{
      if(problem.subCatalog){
        return `${problem.catalog } - ${problem.subCatalog}`;
      } else {
        return problem.catalog;
      }
    }
    return (
      <div className={`problem-item ${this.props.rootClass?this.props.rootClass:''}`} style={rootStyle} onClick={()=>this.props.clickHandler(problem)}>
        <div className="pic"
             style={{width:`${this.picWidth}px`,height:`${this.picHeight}px`,backgroundImage:`url(${problem.pic})`}}>
        </div>
        <div className="desc" style={{width:`${(this.props.width?this.props.width:window.innerWidth) - this.picWidth - 35}px`,height:`${this.picHeight}px`}}>
          <p className="title" style={{width:`${(this.props.width?this.props.width:window.innerWidth) - this.picWidth - 35}px`}}>{problem.name}</p>
          <p className="catalog sub-font">分类：{renderCatalog()}</p>
          <p className="author sub-font">讲师：{problem.author}</p>
          <p className="score sub-font">难度系数：{problem.difficulty}/5.0</p>
        </div>
      </div>
    )
  }
}
