import * as React from "react";
import "./TextInput.less"

interface TextInputProps{
  label:String,
  value?:String,
  placeholder?:String,
  onChange:Function,
  inline?:Boolean
}

export default class TextInput extends React.Component<TextInputProps,any>{
  constructor(props){
    super(props);
    this.state = {showPlaceHolder:true};
  }

  getValue(e) {
    return e.currentTarget.value
  }

  onChange(e){
    this.props.onChange(e);
  }


  render(){

    return (
      <div className="text-input" style={{marginBottom:"10px",borderBottom:"none"}}>
        <div className="text-input-label">
          {this.props.label}
        </div>
        {this.props.children}
        {/*${this.props.inline?'inline':''}*/}
        <div className={`text-input-content ${this.props.children?'has-child':''} `} >
          <div className={this.props.value?"select-wrapper-has-no-cut":"select-wrapper"}>
            <input placeholder={`${this.state.showPlaceHolder?this.props.placeholder:''}`} type="text"
                   onChange={(e)=>this.onChange(e)} value={this.props.value} onFocus={()=>this.setState({showPlaceHolder:false})} onBlur={()=>{
                     this.setState({showPlaceHolder:true})
                   }}/>
          </div>
        </div>
      </div>
    )
  }
}
