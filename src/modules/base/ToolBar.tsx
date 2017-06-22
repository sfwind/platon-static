import * as React from "react";
import { connect } from "react-redux"
import {
  Tab,
  TabBody,
  TabBar,
  TabBarItem,
  TabBarIcon,
  TabBarLabel,
  Article
} from 'react-weui';

import {startLoad, endLoad, alertMsg,set} from "redux/actions";

import {loadOldCount} from '../message/async'

/**
 * 修改方式：
 * 1.在tabs里增加／删除导航项
 * 2.修改check url的部分
 * 3.增加handleChangeTab，增加点击事件
 * 导航项最少三个，最多五个
 */
@connect(state=>state)
export class ToolBar extends React.Component<any,any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    let tabs = [
      {
        key: 0,
        bar: {
          icon: 'https://static.iqycamp.com/images/tabbar_book.png?imageSlim',
          activeIcon: 'https://static.iqycamp.com/images/tabbar_book_active.png?imageSlim',
          label: '学习',
        },
      }, {
        key: 1,
        bar: {
          icon: 'https://static.iqycamp.com/images/tabbar_team_study.png?imageSlim',
          activeIcon: 'https://static.iqycamp.com/images/tabbar_team_study_active.png?imageSlim',
          label: '活动'
        }
      }, {
        key: 2,
        bar: {
          icon: 'https://static.iqycamp.com/images/tabbar_explore.png?imageSlim',
          activeIcon: 'https://static.iqycamp.com/images/tabbar_explore_active.png?imageSlim',
          label: '发现'
        }
      }, {
        key: 3,
        bar: {
          icon: 'https://static.iqycamp.com/images/tabbar_mine.png?imageSlim',
          activeIcon: 'https://static.iqycamp.com/images/tabbar_mine_active.png?imageSlim',
          label: '我的'
        }
      },
    ];
    if(window.ENV.showForum){
      tabs.push({
        key: 4,
        bar: {
          icon: 'https://static.iqycamp.com/images/tabbar_mine.png?imageSlim',
          activeIcon: 'https://static.iqycamp.com/images/tabbar_mine_active.png?imageSlim',
          label: '论坛'
        }
      })
    }

    this.state = {
      tabs:tabs
    };
    // check url
    const { dispatch } = this.props;
    let tabIndex = 0;
    if(window.location.pathname === '/rise/static/plan/main' ||
        window.location.pathname === '/rise/static/learn'){
      tabIndex = 0;
    } else if(window.location.pathname === '/rise/static/event/wall'){
      tabIndex = 1;
    } else if(window.location.pathname === '/rise/static/problem/explore'){
      tabIndex = 2;
    } else if(window.location.pathname.indexOf('/rise/static/customer')!=-1 ||
        window.location.pathname.indexOf('/rise/static/message')!=-1){
      //消息中心和个人中心
      tabIndex = 3;
    } else if(window.location.pathname.indexOf('/forum/') != -1){
      tabIndex = 4;
    }
    dispatch(set('tabIndex',tabIndex))
    const { noticeMsgCount } = this.props;
    // if(!isNumber(noticeMsgCount)){
      loadOldCount().then(res=>{
        if(res.code === 200){
          dispatch(set('noticeMsgCount',res.msg));
        }
      })
    // }
  }

  handleChangeTab(tabIndex){
    const {dispatch} = this.props;
    dispatch(set('tabIndex',tabIndex))
    if(tabIndex === 0){
      this.context.router.push('/rise/static/learn');
    } else if(tabIndex === 1){
      this.context.router.push('/rise/static/event/wall');
    } else if(tabIndex === 2) {
      this.context.router.push({
        pathname:'/rise/static/problem/explore',
      })
    } else if(tabIndex === 3){
      this.context.router.push("/rise/static/customer/personal");
    } else if(tabIndex === 4){
      this.context.router.push("/forum/question");
    }
  }

  render() {
    const {tabIndex = 0,noticeMsgCount} = this.props;
    return (
      this.props.hidden?null:<TabBar>
        {this.state.tabs.map((item, key) => {
          const {bar} = item;

          if(item.key === 3){
            return (
              <TabBarItem
                className={`tab_bar_count_${this.state.tabs.length}`}
                active={tabIndex == item.key}
                onClick={()=>this.handleChangeTab(item.key)}
              >
                <TabBarIcon>
                    <img src={tabIndex == item.key?bar.activeIcon:bar.icon}/>
                    {noticeMsgCount?<span>{noticeMsgCount>99?99:noticeMsgCount}</span>:null}
                </TabBarIcon>
                <TabBarLabel>
                  {bar.label}
                </TabBarLabel>

              </TabBarItem>
            )
          } else {
            return <TabBarItem
              className={`tab_bar_count_${this.state.tabs.length}`}
              active={tabIndex == item.key}
              onClick={()=>this.handleChangeTab(item.key)}
              icon={<img src={tabIndex == item.key?bar.activeIcon:bar.icon}/>}
              label={bar.label}
            />
          }


        })}
      </TabBar>
    )
  }
}
