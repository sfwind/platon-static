import * as React from 'react'
import _ from "lodash"
import "./RiseCell.less";
import { Cells, Cell, CellBody, CellFooter } from "react-weui";
import DropDownList from  "../modules/customer/components/DropDownList";

interface CellProps {
  title: string,
  type: string,
  placeholder?: string,
  unit?: string,
  access?: boolean,
  onChange?: any,
  value?: any,
  dropGroup?: {
    level: number,
    data: [{id: number,value: string}],
    userData: [{id: number,value: string}],
    onChoose: any,
  },
}
export default class RiseCell extends React.Component<CellProps,any> {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { type, title, placeholder, dropGroup, unit, access, value } = this.props;
    const renderBody = () => {
      switch(type) {
        case 'input': {
          return (
            <input id="target" placeholder={`${placeholder}`} value={value}
                   onChange={(e)=>this.props.onChange(e.currentTarget.value)} type="text"/>
          )
        }
        case 'drop': {
          let level = dropGroup.level;
          let data = dropGroup.data;
          let userData = dropGroup.userData;
          return <DropDownList level={level} data={data} placeholder={placeholder}
                               userData={userData  && userData.length>0 && userData[0].id?userData:null}
                               onChoice={(one,two)=>this.props.dropGroup.onChoose(one,two)}/>
        }
      }
    }
    const hasValue = () => {
      switch(type) {
        case 'input':
          return value;
        case 'drop':
          return _.get(dropGroup, 'userData[0].id');
      }
    }
    return (
      <Cell className={`rise-cell ${access?'access':type==='drop'?'access':''}`}>
        <CellBody className="rise-cell-body">
          {title}
        </CellBody>
        <CellFooter className={`rise-cell-footer ${hasValue()?'has-value':''}`}>
          {renderBody()}&nbsp;{unit}
        </CellFooter>
      </Cell>
    )
  }
}
