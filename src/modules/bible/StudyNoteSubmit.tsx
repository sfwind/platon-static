import * as React from 'react'
import { connect } from 'react-redux'
import { startLoad, endLoad, alertMsg } from 'redux/actions'
import "./StudyNoteSubmit.less"
import _ from "lodash"
import AssetImg from '../../components/AssetImg'
import { BibleToolBar } from './BibleToolBar'
import { mark } from 'utils/request'
import { Cells, Cell, CellBody, CellFooter } from "react-weui";
import DropDownList from  "../customer/components/DropDownList";

const catalogList = [
  { id: 1, value: "书籍" },
  { id: 2, value: "文章" },
  { id: 3, value: "视频" },
  { id: 3, value: "新闻" }
]
export default class StudyNoteSubmit extends React.Component<any,any> {
  constructor(props) {
    super(props);
    this.state = {
      catalog: {},
    }
  }

  onChoose(item) {
    this.setState({ catalog: item });
  }

  render() {
    const { catalog } = this.state;
    const renderTags = () => {
      if(catalog) {
        return null;
      } else {
        return null;
      }
    }
    return (
      <div className="study-note-submit">
        <div className="note-header">
          添加你的学习记录
        </div>
        <RiseCell title="分类" type="drop" placeholder="必填"
                  dropGroup={{level:1,data:[catalogList],userData:[catalog],onChoose:(item)=>this.onChoose(item)}}/>
        <RiseCell title="名称" type="input" placeholder="必填" onChoose={(item)=>this.onChoose(item)}/>
        <RiseCell title="页数" type="input" placeholder="（选填）页" onChoose={(item)=>this.onChoose(item)}/>
        <RiseCell title="链接" type="input" placeholder="（选填）请粘贴网址" onChoose={(item)=>this.onChoose(item)}/>
        <RiseCell title="时长" type="input" placeholder="（选填）" unit={"分钟"} onChoose={(item)=>this.onChoose(item)}/>
        <div className="tag-group">
          <div className="tag-group-tips">标签</div>
          {renderTags()}
        </div>
        <div className="study-note-editor">
          <textarea ref="studyNoteEditor" placeholder="在这里写下你的学习心得吧"/>
        </div>
        <div className="note-footer-area">
          <div className="footer-btn">
            保存
          </div>
        </div>

      </div>
    )
  }
}

interface CellProps {
  title: string,
  type: string,
  placeholder?: string,
  unit?: string,
  access?: boolean,
  dropGroup?: {
    level: number,
    data: [{id: number,value: string}],
    userData: [{id: number,value: string}],
    onChoose: any,
  },
}
class RiseCell extends React.Component<CellProps,any> {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { type, title, placeholder, dropGroup, unit, access } = this.props;
    const renderBody = () => {
      switch(type) {
        case 'input': {
          return (
            <input id="target" placeholder={`${placeholder}`} type="text"/>
          )
        }
        case 'drop': {
          let level = dropGroup.level;
          let data = dropGroup.data;
          let userData = dropGroup.userData;
          console.log(dropGroup)
          return <DropDownList level={level} data={data} placeholder={placeholder}
                               userData={userData  && userData.length>0 && userData[0].id?userData:null}
                               onChoice={(one,two)=>this.props.dropGroup.onChoose(one,two)}/>
        }
      }
    }
    return (
      <Cell className={`rise-cell ${access?'access':type==='drop'?'access':''}`}>
        <CellBody className="rise-cell-body">
          {title}
        </CellBody>
        <CellFooter className="rise-cell-footer">
          {renderBody()}&nbsp;{unit}
        </CellFooter>
      </Cell>
    )
  }
}
