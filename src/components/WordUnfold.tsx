import * as React from "react"
import "./WordUnfold.less";

interface WordUnfoldProps {
  words:string,
  onUnfold: any,
}

export default class WordUnfold extends React.Component<WordUnfoldProps,any>{
  constructor(props){
    super(props);
    this.state = {
      collapse:false
    };
  }

  render(){
    const {collapse} = this.state
    const {words, onUnfold} = this.props
    return (
      <div className="word-unfold-container" onClick={()=>onUnfold()}>
        <div className={`text ${collapse ? 'collapse' : ''}`}>
           {words}
        </div>
      </div>
    )
  }
}
