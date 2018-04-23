import * as React from 'react'
import { connect } from 'react-redux'
import './SchoolFriend.less'
import { alertMsg } from 'reduxutil/actions'
import { loadAllElites } from './async'
import PullElement from 'pull-element';
import { isEmpty,remove} from 'lodash';
import WXHeadImg from '../components/WXHeadImg'

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：platon-static
 2. 文件功能： 校友录页面
 3. 作者： yangren@iquanwai.com
 4. 备注：
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

@connect(state => state)
export default class SchoolFriend extends React.Component<any, any> {

  constructor(props) {
    super(props)
    this.state = {
      elites: [],
      showOthers: true,
      end: null,
      page:1
    }
    this.pullElement = null;
  }

  async componentWillMount(){
    let res = await loadAllElites(1);
    this.setState({
      elites:res.msg
    })
  }

  componentDidUpdate () {
    const { showOthers, elites } = this.state;
    if (!this.pullElement && showOthers && !isEmpty(elites)) {
      this.pullElement = new PullElement({
        target: '#react-app',
        scroller: 'body',
        trigger: '.school-friend-list',
        damping: 3,
        detectScroll: false,
        detectScrollOnStart: true,

        onPullUp: (data) => {
          if (this.props.iNoBounce) {
            if (this.props.iNoBounce.isEnabled()) {
              this.props.iNoBounce.disable();
            }
          }
          this.setState({ loading: true });
        },
        onPullUpEnd: (data) => {
          loadAllElites(this.state.page + 1).then(res => {
            this.setState({ loading: false });
            if (res.msg && res.msg.length !== 0) {
              remove(res.msg.list, (item) => {
                return findIndex(this.state.elites, item) !== -1;
              });
              this.setState({
                elites: this.state.elites.concat(res.msg),
                page: this.state.page + 1,
                end: res.msg.end,
              });
            } else {
              this.setState({ end: res.msg.end });
            }
          });
          if (this.props.iNoBounce) {
            if (!this.props.iNoBounce.isEnabled()) {
              this.props.iNoBounce.enable();
            }
          }
        },
      });
      this.pullElement.init();
    }
    if (this.pullElement) {
      if (this.state.end) {
        this.pullElement.disable();
      } else {
        this.pullElement.enable();
      }
    }
  }



  render() {
    const { elites = []} = this.state
    const renderList = () => {
      return (
        <div className="school-friend-list">
          {elites && elites.map((item, index) => {
            return (
              <div className="school-friend-item">
                <div className="head-image-container">
                  <WXHeadImg src={item.headImgUrl}/>
                </div>
                <div className="nickname-container">
                  {item.nickName}
                </div>
                <div className="province-industry-container">
                  <img src="http://static.iqycamp.com/images/school-friend-icon.png"/>
                  {item.province} | {item.industry}
                </div>

                <div className="company-container">
                 {item.company}
                </div>

                <div className="member-container">
                  学号：{item.memberId}
                </div>
              </div>
            )
          })}
        </div>
      )
    }

    return (
      <div className="school-friend-container">
        {renderList()}
      </div>
    )
  }

}
