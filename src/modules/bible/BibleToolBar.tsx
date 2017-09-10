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
import "./BibleToolbar.less"

import { startLoad, endLoad, alertMsg, set } from "redux/actions";
var FastClick = require('fastclick');

const tabItems = {
  learn: {
    key: 0,
    bar: {
      icon: 'https://static.iqycamp.com/images/note_active.png?imageslim',
      activeIcon: 'https://static.iqycamp.com/images/note_active.png?imageslim',
    },
  },
  activity: {
    key: 1,
    bar: {
      icon: 'https://static.iqycamp.com/images/xue_inactive.png?imageslim',
      activeIcon: 'https://static.iqycamp.com/images/xue_active.png?imageslim',
      label: '学'
    }
  },
  explore: {
    key: 2,
    bar: {
      icon: 'https://static.iqycamp.com/images/zha_inactive.png?imageslim',
      activeIcon: 'https://static.iqycamp.com/images/zha_active.png?imageslim',
      label: '札'
    }
  }

}

/**
 * 修改方式：
 * 1.在tabs里增加／删除导航项
 * 2.修改check url的部分
 * 3.增加handleChangeTab，增加点击事件
 * 导航项最少三个，最多五个
 */
@connect(state => state)
export class BibleToolBar extends React.Component<any,any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    let tabs = [];
    tabs.push(tabItems.activity);
    tabs.push(tabItems.learn);
    tabs.push(tabItems.explore);

    this.state = {
      tabs: tabs
    };
    // check url
    const { dispatch } = this.props;
    let tabIndex = 1;
    if(window.location.pathname === '/rise/static/note/list') {
      tabIndex = 1;
    } else if(window.location.pathname === '/rise/static/note/report') {
      tabIndex = 2;
    }
    dispatch(set('bibleTabIndex', tabIndex))
  }

  componentDidMount() {
    FastClick.attach(document.querySelector('#tool_bar'));
  }

  handleChangeTab(tabIndex) {
    const { dispatch } = this.props;
    if(tabIndex !== 0) {
      dispatch(set('bibleTabIndex', tabIndex))
    }

    if(tabIndex === 0) {
      dispatch(alertMsg('正在开发中，敬请期待'))
    } else if(tabIndex === 1) {
      this.context.router.push('/rise/static/note/list');
    } else if(tabIndex === 2) {
      this.context.router.push('/rise/static/note/report');
    }
  }

  render() {
    const { bibleTabIndex = 0 } = this.props;

    const renderIcon = (item, idx) => {
      const { bar } = item;
      return (
        <img className={`${(this.state.tabs.length===3 && idx === 1)?'bigger_center':''}`}
             src={bibleTabIndex == item.key?bar.activeIcon:bar.icon}/>
      );
    }

    return (
      this.props.hidden ? null :
        <div className="bible-toolbar">
          <TabBar ref="toolBar" id={"tool_bar"}>
            {this.state.tabs.map((item, idx) => {
              const { bar } = item;
              return <TabBarItem
                className={`tab_bar_count_${this.state.tabs.length}`}
                active={bibleTabIndex == item.key}
                onClick={()=>this.handleChangeTab(item.key)}
                icon={<div className={`${(idx === 1)?'bible_center_icon':''}`}>{renderIcon(item,idx)}</div>}
                label={bar.label}
              />

            })}
          </TabBar>
        </div>
    )
  }
}
