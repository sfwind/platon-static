import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startLoad, endLoad, alertMsg, set } from "../../redux/actions"
import { submitInterlocutionQuestion } from './async';
import * as _ from 'lodash';
import "./InterlocutionQuanAnswer.less"
import { loadQuanAnswer } from "./async";

@connect(state => state)
export default class InterlocutionQuanAnswer extends Component {
  constructor() {
    super();
    this.state = {}
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const { location, dispatch } = this.props;
    const { date } = location.query;
    dispatch(startLoad());
    loadQuanAnswer(date).then(res => {
      dispatch(endLoad());
      console.log(res.msg);
      if(res.code === 200) {
        this.setState({ data: res.msg });
      } else {
        dispatch(alertMsg(res.msg));
      }
    }).catch(ex => {
      dispatch(endLoad());
    })
  }

  render() {
    const { data = {} } = this.state;
    const { answer = {} } = data;
    return (
      <div className="quan-answer">
        <div className="title">
          {data.topic}
        </div>
        <div className="info">
          <div className="border">原创</div>
          <span className="msg">{data.interlocutionDate}</span>
          <span className="msg">孙圈圈</span>
          <span className="msg">圈外孙圈圈</span>
        </div>
        <pre className="content" dangerouslySetInnerHTML={{ __html: answer.answer }}>

        </pre>
      </div>
    )
  }
}
