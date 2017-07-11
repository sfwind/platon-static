import * as React from "react";
import {connect} from "react-redux";
import {answer, loadWarmUpAnalysis, getOpenStatus, openConsolidation} from "./async";
import { remove, set, merge,get,findIndex,isBoolean,isString } from "lodash";
import { startLoad, endLoad, alertMsg } from "../../../redux/actions";
import {Main} from "./Main";
import {Analysis} from "./Analysis";


@connect(state=>state)
export default class Warumup extends React.Component<any,any> {
  constructor() {
    super();
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }



  componentWillMount() {
    const {dispatch, location} = this.props
    const {practicePlanId, integrated} = location.query
    this.setState({integrated})
    dispatch(startLoad())
    loadWarmUpAnalysis(practicePlanId).then(res => {
      dispatch(endLoad())
      const {code, msg} = res
      if (code === 200) {
        const {practice} = msg;
        if (practice) {
          let idx = findIndex(practice, (item) => {
            const {choiceList} = item;
            if (choiceList) {
              return choiceList.filter(choice => choice.selected).length > 0;
            } else {
              return false;
            }
          })
          if (idx !== -1) {
            // this.context.router.push({
            //   pathname: '/rise/static/practice/warmup/analysis',
            //   query: location.query,
            // })
            this.setState({page:"analysis",res:res});
          } else {
            this.setState({list: msg, practiceCount: msg.practice.length,page:"warmup",res:res})
          }
        }
      }
      else dispatch(alertMsg(msg))
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  render() {
    const { page,res} = this.state;
    const { location,dispatch } = this.props;

    const renderPage = ()=>{
      let pageView = null;
      if(isString(page) && page === "analysis"){
        pageView = <Analysis res={res} location={location} router={this.context.router} dispatch={dispatch}/>;
      } else if(isString(page) && page === "warmup"){
        pageView = <Main res={res} location={location} router={this.context.router} dispatch={dispatch}/>
      }
      return pageView;
    }


    return  renderPage()
  }


}
