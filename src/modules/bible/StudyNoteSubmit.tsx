import * as React from 'react'
import { connect } from 'react-redux'
import { startLoad, endLoad, alertMsg } from 'redux/actions'
import "./StudyNoteSubmit.less"
import _ from "lodash"
import { mark } from 'utils/request'
import { loadTags, loadNote, submitNote, loadNoteData } from "./async";
import RiseCell from "../../components/RiseCell"
import axios from 'axios';

const catalogList = [
  { id: 1, value: "书籍" },
  { id: 2, value: "课程" },
  { id: 3, value: "视频" },
  { id: 4, value: "音频" },
  { id: 5, value: "培训/讲座/工作坊" },
  { id: 6, value: "项目经验" },

]

@connect(state => state)
export default class StudyNoteSubmit extends React.Component<any,any> {
  constructor(props) {
    super(props);
    this.state = {
      studyNote: {
        source: null,
        catalogId: 1,
        name: null,
        page: null,
        url: null,
        note: null,
        minute: null,
        tagIds: [],
      }
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const { location, dispatch } = this.props;
    dispatch(startLoad());
    if(location.query.noteId) {
      loadNoteData(location.query.noteId).then(axios.spread((noteRes, tagRes) => {
        // Both requests are now complete
        dispatch(endLoad());
        if(noteRes.code === 200 && tagRes.code === 200) {
          let userTags = _.get(noteRes, 'msg.tags', []);
          let tags = _.map(tagRes.msg, (item) => {
            if(_.find(userTags, { id: item.id })) {
              item.chosen = true;
            } else {
              item.chosen = false;
            }
            return item;
          });
          this.setState({ studyNote: noteRes.msg, tags: tags })
        }
      }))
    } else {
      loadTags().then(res => {
        dispatch(endLoad());
        if(res.code === 200) {
          let tags = _.map(res.msg, (item) => {
            item.chosen = false;
            return item;
          });
          this.setState({ tags: tags })
        }
      }).catch(ex => {
        dispatch(endLoad());
        dispatch(endLoad());
      })
    }

  }

  clickTag(click_tag) {
    const { tags } = this.state
    tags.forEach((tag) => {
      if(tag.id === click_tag.id) {
        tag.chosen = !click_tag.chosen
      }
    })
    this.setState({ tags })
  }

  handleChooseCatalog(catalog) {
    let studyNote = _.merge({}, this.state.studyNote, { catalogId: _.parseInt(catalog.id) });
    this.setState({ studyNote });
  }

  handleChangeName(value) {
    let studyNote = _.merge({}, this.state.studyNote, { name: value });
    this.setState({ studyNote });
  }

  handleChangePage(page) {
    const { dispatch } = this.props;
    if(!isNaN(page)) {
      if(page.indexOf('.') != -1) {
        dispatch(alertMsg("只能输入整数"));
      } else {
        let studyNote = _.merge({}, this.state.studyNote, { page: page });
        this.setState({ studyNote });
      }
    } else {
      dispatch(alertMsg("只能输入整数"));
    }
  }

  handleChangeUrl(url) {
    let studyNote = _.merge({}, this.state.studyNote, { url: url });
    this.setState({ studyNote });
  }

  handleChangeTime(time) {
    let studyNote = _.merge({}, this.state.studyNote, { minute: time });
    this.setState({ studyNote });
  }

  handleChangeNote(value) {
    let studyNote = _.merge({}, this.state.studyNote, { note: value });
    this.setState({ studyNote });
  }

  handleChangeSource(value) {
    let studyNote = _.merge({}, this.state.studyNote, { source: value });
    this.setState({ studyNote });
  }

  handleClickSave() {
    const { dispatch } = this.props;
    const { tags } = this.state;
    const { url, page, minute, note, name, catalogId, source } = this.state.studyNote;
    if(!catalogId) {
      dispatch(alertMsg("请选择分类"));
      return;
    }
    if(!name) {
      dispatch(alertMsg("请输入名称"))
      return;
    }

    if(!source && catalogId !== 1) {
      if(catalogId !== 6) {
        dispatch(alertMsg('来源不能为空'));
      } else {
        dispatch(alertMsg('组织不能为空'))
      }
      return;
    }

    let chooseCount = 0
    let newTag = [];
    tags.forEach((tag) => {
      if(tag.chosen) {
        chooseCount++;
        newTag.push(tag.id);
      }
    })
    if(chooseCount == 0) {
      dispatch(alertMsg('请选择标签'))
      return
    }
    dispatch(startLoad());
    let studyNote = _.merge({}, this.state.studyNote, { tagIds: newTag });
    console.log(studyNote);
    submitNote(studyNote).then(res => {
      dispatch(endLoad());
      this.context.router.push('/rise/static/note/report');
    }).catch(ex => {
      dispatch(endLoad());
      dispatch(alertMsg(ex));
    })
  }

  render() {
    const { catalogId, url, page, minute, name, note, source } = this.state.studyNote;
    const { tags } = this.state;
    let catalog = _.find(catalogList, { id: catalogId }, {});
    const renderTags = (catalog) => {
      return tags.map((tag, index) => {
        if(tag.catalog === catalog) {
          return (
            <div className={`tag-button ${tag.chosen? 'chosen': ''}`} onClick={()=>this.clickTag(tag)}>
              {tag.name}
            </div>
          )
        }
      })
    }

    const renderTagGroup = () => {
      if(tags) {
        return (
          <div className="tag-card">
            <div className="tag-catalog">能力类</div>
            <div className="tag-detail">
              {renderTags(1)}
            </div>
            <div className="tag-card-hr"/>
            <div className="tag-catalog">知识类</div>
            <div className="tag-detail">
              {renderTags(2)}
            </div>
          </div>
        )
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
                  dropGroup={{level:1,data:[catalogList],userData:[catalog],onChoose:(item)=>this.handleChooseCatalog(item)}}/>
        <RiseCell title="名称" type="input" placeholder="必填" value={name}
                  onChange={(value)=>{this.handleChangeName(value)}}/>
        {catalogId !== 1 ?<RiseCell title={catalogId!==6?'来源':'组织'} type="input" placeholder="必填" value={source}
                                    onChange={(value)=>{this.handleChangeSource(value)}}/>: null}
        {catalogId === 1 ?<RiseCell title="页数" type="input" placeholder="（选填）" unit="页" value={page}
                                    onChange={(item)=>this.handleChangePage(item)}/>: null}
        {catalogId !== 1 ? <RiseCell title="链接" type="input" placeholder="（选填）请粘贴网址" value={url}
                                     onChange={(item)=>this.handleChangeUrl(item)}/>: null}
        {catalogId === 3 || catalogId === 4 || catalogId === 5 ?
          <RiseCell title={catalogId===5?'培训时长':'时长'} type="input" placeholder="（选填）" unit={"分钟"} value={minute}
                    onChange={(item) => this.handleChangeTime(item)}/>: null}
        <div className="tag-group">
          <div className="tag-group-tips">标签</div>
          {renderTagGroup()}
        </div>
        <div className="study-note-editor">
          <div className="study-note-editor-tip">
            学习心得
          </div>
          <div className="note-editor-wrapper">
            <textarea ref="studyNoteEditor" defaultValue={note} placeholder="在这里写下你的学习心得吧"
                      onChange={(e)=>this.handleChangeNote(e.currentTarget.value)}/>
          </div>
        </div>
        <div className="note-footer-area">
          <div className="note-footer-btn" onClick={()=>this.handleClickSave()}>
            保存
          </div>
          <div className="note-footer-max">
          </div>
        </div>

      </div>
    )
  }
}
