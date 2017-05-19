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

import { isFunction,isNumber } from "lodash";

let IconExplore = 'https://www.iqycamp.com/images/tabbar_explore.png';
let IconExploreActive = 'https://www.iqycamp.com/images/tabbar_explore_active.png';

import {startLoad, endLoad, alertMsg,set} from "redux/actions";

import {loadOldCount} from '../message/async'

@connect(state=>state)
export class ToolBar extends React.Component<any,any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    this.state = {
      tabs: [
        {
          key: 0,
          bar: {
            icon: 'https://www.iqycamp.com/images/tabbar_book.png',
            activeIcon: 'https://www.iqycamp.com/images/tabbar_book_active.png',
            label: '学习',
          },
        }, {
          key: 1,
          bar: {
            icon: 'https://www.iqycamp.com/images/tabbar_team_study.png',
            activeIcon: 'https://www.iqycamp.com/images/tabbar_team_study_active.png',
            label: '活动'
          }
        }, {
          key: 3,
          bar: {
            icon: 'https://www.iqycamp.com/images/tabbar_mine.png',
            activeIcon: 'https://www.iqycamp.com/images/tabbar_mine_active.png',
            label: '我的'
          }
        },
      ]
    };
    // check url
    const { dispatch } = this.props;
    let tabIndex = 0;
    if(window.location.pathname === '/rise/static/plan/main' ||
        window.location.pathname === '/rise/static/learn'){
      tabIndex = 0;
    } else if(window.location.pathname === '/rise/static/event/wall'){
      tabIndex = 1;
    } else if(window.location.pathname.indexOf('/rise/static/customer')!=-1 ||
        window.location.pathname.indexOf('/rise/static/message')!=-1){
      //消息中心和个人中心
      tabIndex = 3;
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

  changeTab(tabIndex){
    const {dispatch} = this.props;
    dispatch(set('tabIndex',tabIndex))
    if(tabIndex === 0){
      this.context.router.push('/rise/static/learn');
    } else if(tabIndex === 1){
      this.context.router.push('/rise/static/event/wall');
    } else if(tabIndex === 2) {
      console.log('go explore ignore')
    } else if(tabIndex === 3){
      this.context.router.push("/rise/static/customer/personal");
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
                active={tabIndex == item.key}
                onClick={()=>this.changeTab(item.key)}
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
              active={tabIndex == item.key}
              onClick={()=>this.changeTab(item.key)}
              icon={<img src={tabIndex == item.key?bar.activeIcon:bar.icon}/>}
              label={bar.label}
            />
          }


        })}
      </TabBar>
    )
  }
}
