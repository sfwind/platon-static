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

import { isFunction } from "lodash";

import IconStudy from '../../../../assets/img/tabbar_book.png';
import IconExplore from '../../../../assets/img/tabbar_explore.png';
import IconMine from '../../../../assets/img/tabbar_mine.png';
import IconActivity from '../../../../assets/img/tabbar_team_study.png';

import IconStudyActive from '../../../../assets/img/tabbar_book_active.png';
import IconExploreActive from '../../../../assets/img/tabbar_explore_active.png';
import IconMineActive from '../../../../assets/img/tabbar_mine_active.png';
import IconActivityActive from '../../../../assets/img/tabbar_team_study_active.png';


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
            icon: IconStudy,
            activeIcon: IconStudyActive,
            label: '学习',
          },
        }, {
          key: 1,
          bar: {
            icon: IconActivity,
            activeIcon: IconActivityActive,
            label: '活动'
          }
        }, {
          key: 2,
          bar: {
            icon: IconExplore,
            activeIcon: IconExploreActive,
            label: '发现'
          }
        }, {
          key: 3,
          bar: {
            icon: IconMine,
            activeIcon: IconMineActive,
            label: '我的'
          }
        },
      ]
    };
  }


  render() {
    return (
      <TabBar>
        {this.state.tabs.map((item, key) => {
          const {bar} = item;
          return <TabBarItem
            active={this.props.index == item.key}
            onClick={e=>{isFunction(this.props.tabClick)?this.props.tabClick(item.key):null}}
            icon={<img src={this.props.index == item.key?bar.activeIcon:bar.icon}/>}
            label={bar.label}
          />;
        })}
      </TabBar>
    )
  }
}
