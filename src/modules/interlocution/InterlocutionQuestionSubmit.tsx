import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startLoad, endLoad, alertMsg, set } from "../../redux/actions"
import { submitInterlocutionQuestion } from './async';
import * as _ from 'lodash';

const headerStyle = {
  fontSize: '1.7em',
  textAlign: 'center',
  color: '#666',
  padding: '15px 0'
}

const questionStyle = {
  width: `${window.innerWidth - 30}px`,
  marginLeft: '15px',
}

const lengthDiv = {
  marginRight: '10px',
  marginTop: '-25px',
}

const lengthTip = {
  color: '#999',
  fontSize: '11px',
  textAlign: 'right',
}

const footerStyle = {
  position: 'fixed',
  textAlign: 'center',
  width: '100%',
  bottom: 0,
  left: 0,
  zIndex: 1000,
  height: '49px',
  borderTop: '1px solid #ccc',
  backgroundColor: '#fff'
}

const btnStyle = {
  color: '#55cbcb',
  border: '1px solid #55cbcb',
  backgroundColor: '#fff',
  margin: '8px auto',
  fontSize: '1.6em',
  borderRadius: '4px',
  height: '30px',
  lineHeight: '30px',
  width: '150px',
}

const txtStyle = {
  borderRadius: '4px',
  height: '150px',
  width: `${window.innerWidth - 56}px`,
  display: 'inline-block',
  resize: 'none',
  border: '1px solid #ccc',
  fontSize: '16px',
  padding: '10px 12px',
  boxShadow: '0 0 0 transparent',
  webkitAppearance: 'none',
}

@connect(state => state)
export default class InterlocutionQuestionSubmit extends Component {
  constructor() {
    super();
    this.state = {
      length: 0,
      title: '',
      lengthLimit: 200,
      id: null,
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {

  }

  getQueryDate() {
    let interloctionDate = _.get(this.props, 'location,query.date');
    if(interloctionDate) {
      return Promise.resolve(interloctionDate);
    } else {

    }
  }

  writeTitle(title) {
    const { dispatch } = this.props;
    const { searchWord } = this.state;
    if(searchWord === title && !!title) {
      return;
    }

    if(!title) {
      return;
    }

    this.setState({ title, length: title.length });
  }

  handleClickSubmit() {
    const { dispatch, location } = this.props;
    const { title, id } = this.state;
    const { date } = location.query;
    console.log(date);
    if(title) {
      dispatch(startLoad());
      submitInterlocutionQuestion({
        topic: title, id: id, interlocutionDate: date
      }).then(res => {
        dispatch(endLoad());
        if(res.code === 200) {
          // 提交成功
          this.context.router.push({
            pathname: '/rise/static/inter/questions',
            query: { date: date },
          })
        } else {
          // 提交失败
          dispatch(alertMsg(res.msg));
        }

      }).catch(ex => {
        dispatch(endLoad());
        dispatch(alertMsg(ex));
      })
    } else {
      dispatch(alertMsg('请输入提问内容'))
    }
  }

  render() {
    const { title, length, lengthLimit } = this.state;
    return (
      <div>
        <div style={headerStyle}>
          圈圈问答提问
        </div>
        <div style={questionStyle}>
            <textarea
              style={txtStyle}
              placeholder="写下问题的标题吧，清晰的标题能够吸引更多的人来回答问题（50字以内）"
              id="textarea" maxLength={lengthLimit} defaultValue={title} value={title}
              onChange={(e) => this.writeTitle(e.currentTarget.value)}
            />
          <div style={lengthDiv}>
            <div style={lengthTip}>
              {length} / {lengthLimit}
            </div>
          </div>
        </div>
        <div style={footerStyle} onClick={() => this.handleClickSubmit()}>
          <div style={btnStyle}>
            提交
          </div>
        </div>
      </div>
    )
  }
}
