import React, { Component } from 'react';
import { connect } from 'react-redux';

@connect(state => state)
export default class SurveyReport extends Component<any, any> {
  constructor() {
    super();
    this.state = {}
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="survey-report">

      </div>
    )
  }
}
