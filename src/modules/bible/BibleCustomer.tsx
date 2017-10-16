import * as React from 'react';
import './BibleCustomer.less';
import RiseCell from "../../components/RiseCell";
import { connect } from 'react-redux';
import { loadNoteList } from './async';
import { startLoad, endLoad, alertMsg } from 'redux/actions'
import { BibleToolBar } from './BibleToolBar'
import PullSlideTip from '../../components/PullSlideTip'
import PullElement from 'pull-element'
import { mark } from 'utils/request'

@connect(state => state)
export default class BibleCustomer extends React.Component<any,any> {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      end: true,
    }
    this.pullElement = null
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(startLoad());
    mark({ module: '打点', function: '学札报告', action: '进入扎中心' })
    loadNoteList(1).then(res => {
      dispatch(endLoad());
      if(res.code === 200) {
        this.setState({ noteList: res.msg.list, end: res.msg.end });
      } else {
        dispatch(alertMsg(res.msg));
      }
    }).catch(ex => {
      dispatch(endLoad());
      dispatch(alertMsg(ex));
    })
  }

  componentDidUpdate() {
    const { dispatch } = this.props
    if(!this.pullElement) {
      this.pullElement = new PullElement({
        target: '.problem-galley-container',
        scroller: '.problem-galley-container',
        // trigger: '.pull-slide-tips',
        damping: 4,
        detectScroll: true,
        detectScrollOnStart: true,
        onPullUp: (data) => {
          if(this.props.iNoBounce) {
            if(this.props.iNoBounce.isEnabled()) {
              this.props.iNoBounce.disable()
            }
          }
        },
        onPullUpEnd: () => {
          dispatch(startLoad());
          const { page, noteList } = this.state;
          loadNoteList(page + 1).then(res => {
            dispatch(endLoad());
            if(res.code === 200) {
              let list = [].concat(noteList).concat(res.msg.list);
              this.setState({ noteList: list, end: res.msg.end, page: page + 1 });
            } else {
              dispatch(alertMsg(res.msg));
            }
          }).catch(ex => {
            dispatch(endLoad());
            dispatch(alertMsg(ex));
          })

          if(this.props.iNoBounce) {
            if(!this.props.iNoBounce.isEnabled()) {
              this.props.iNoBounce.enable()
            }
          }
        }
      });
      this.pullElement.init()
    }
    if(this.pullElement) {
      if(this.state.end) {
        this.pullElement.disable()
      } else {
        this.pullElement.enable()
      }
    }
  }

  goNoteEdit(item) {
    this.context.router.push({
      pathname: '/rise/static/note/study/submit',
      query: {
        noteId: item.id
      }
    })
  }

  render() {
    const { noteList, end } = this.state;
    const renderStudyNotes = () => {
      if(noteList) {
        return (
          noteList && noteList.length > 0 ? noteList.map((item, index) => {
            return (
              <div key={index} className="item" onClick={() => this.goNoteEdit(item)}>
                <div className="item-label">
                  {item.name}
                </div>
                <div className="item-content">
                </div>
              </div>
            )
          }) : <div className="item">
            <div className="item-label" style={{ color: '#999999' }}>
              无
            </div>
          </div>
        )
      } else {
        return null;
      }
    }
    return (
      <div className="bible-customer">
        <div className="problem-galley-container">
          <div className="galley-module" onClick={()=>this.context.router.push('/rise/static/note/tag')}>
            <div className="galley-module-header arrow">
              <div className="label">
                我的学习主题
              </div>
            </div>
            <div className="galley-module-content">
            </div>
          </div>
          <div className="galley-module">
            <div className="galley-module-header">
              <div className="label">
                我录入的学习记录
              </div>
            </div>
            <div className="galley-module-content">
              {renderStudyNotes()}
            </div>
          </div>
          <PullSlideTip isEnd={end}/>
        </div>
        <div className="padding-footer"/>
        <BibleToolBar/>
      </div>
    )
  }
}
