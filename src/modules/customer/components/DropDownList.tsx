import * as React from "react"
import "./DropDownList.less"
import {pget} from "utils/request"
import * as _ from "lodash"
import IosSelect from "iosselect";

export default class DropDownList extends React.Component<any,any> {
  constructor(props) {
    super(props);
  }

  choice(){
    const {level,data,userData,onChoice} = this.props;
    console.log(data,userData);
    if(this.dataCheck(level,data,userData)){
      new IosSelect(
        level,
        data,
        this.init(level,data,userData,onChoice));
    } else {
      console.log("数据还未准备好");
    }
  }

  init(level,data,userData,callback){
    let options = {itemHeight:35,relation:[1,0,0,0],callback:callback};
    let defaultValue = _.merge([{},{},{},{},{}],userData);
    for(let i=0; i<level;i++){
      if(!defaultValue[i].id){
        defaultValue[i].id = data[i][0].id;
        defaultValue[i].value = data[i][0].value;
      } else {
        defaultValue[i].id = defaultValue[i].id+"";
      }
    }
    console.log("defaualt:",defaultValue);

    return _.merge(options,
      {
        oneLevelId:defaultValue[0].id,
        twoLevelId:defaultValue[1].id
      });
  }

  dataCheck(level,data){
    if(data && _.isArrayLike(data)){
      for(let i=0; i<level;i++){
        if(!data[i]){
          return false;
        }
      }
    } else {
      return false;
    }
    return true;
  }



  render() {
    const {level,data,userData,onChoice} = this.props;



    const renderValue = ()=>{
      let value="";
      for(let i=0; i<level;i++){
        if(!userData || !userData[i].id){
          value = "请选择";
          break;
        } else {
          value = value+userData[i].value+" ";
        }
      }

      return (
        <span>{value}</span>
      )
    }
    return (
      <div className="form-item item-line" onClick={()=>this.choice()}>
        <div className="pc-box">
          <span id="show_contact">{renderValue()}</span>
        </div>
      </div>
    )

  }
}
