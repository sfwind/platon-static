import * as React from "react"
import "./Editor.less"
import $ from "jquery"
import init from "./artEditor.js"
import AssetImg from "../AssetImg"
import {isFunction} from "lodash";

const placeHolder = '<p style="color:#cccccc; ">离开页面前请提交，以免内容丢失。</p>';
export default class Editor extends React.Component<any,any>{
  constructor(props){
    super(props);
    init($);
    this.state={
      editor:null,
      length: 0,
    }
  }

  componentDidMount(){
    let editor = $('#content');
    editor.artEditor({
      imgTar: '#imageUpload',
      limitSize: 10,   // 兆
      showServer: true,
      uploadUrl: `/rise/file/editor/image/upload/${this.props.moduleId || 2}`,
      formInputId:'target',
      uploadField: 'file',
      placeholader: this.props.placeholder?`<p style="color:#cccccc; ">${this.props.placeholder}</p>`:placeHolder,
      validHtml: [],
      uploadStart:()=>{
        if(this.props.uploadStart){
          this.props.uploadStart();
        }
      },
      uploadSuccess: (res)=> {
        // 这里是处理返回数据业务逻辑的地方
        // `res`为服务器返回`status==200`的`response`
        // 如果这里`return <path>`将会以`<img src='path'>`的形式插入到页面
        // 如果发现`res`不符合业务逻辑
        // 比如后台告诉你这张图片不对劲
        // 麻烦返回 `false`
        // 当然如果`showServer==false`
        // 无所谓咯
        try {
          if(isFunction(this.props.uploadEnd)){
            this.props.uploadEnd();
          }
          if (res.code === 200) {
            if(res.msg.picUrl){
              return res.msg.picUrl;
            } else {
              if(isFunction(this.props.onUploadError)){
                this.props.onUploadError(res);
              }
              return false;
            }
          } else {
            if(isFunction(this.props.onUploadError)){
              this.props.onUploadError(res);
            }
            return false;
          }
        } catch (e){
          if(isFunction(this.props.onUploadError)){
            this.props.onUploadError(e);
          }
          return false
        }
      },
      uploadError: function(res) {
        //这里做上传失败的操作
        //也就是http返回码非200的时候
        if(isFunction(this.props.onUploadError)){
          this.props.onUploadError(res);
        }
        if(isFunction(this.props.uploadEnd)){
          this.props.uploadEnd();
        }
      }
    });
    if(this.props.defaultValue){
      editor.setValue(this.props.defaultValue);
    }
    this.setState({editor:editor});
  }

  getValue(){
    let value = this.state.editor.getValue();
    return value === placeHolder?'':value;
  }

  calcValue(){
    let value = this.state.editor.getValue();
    value = value.replace(/<[^>]+>/g,"");
    this.setState({length:value.length})
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.defaultValue && !this.props.defaultValue){
      this.state.editor.setValue(nextProps.defaultValue);
    }
  }

  render(){
    const {maxLength} = this.props;
    const {length} = this.state;
    return (
      <div className="publish-article-content">
        <input type="hidden" id="target" value=""/>
        <div ref="editor" className="article-content" id="content" onChange={()=>this.calcValue()}>
        </div>
        <div className="length-div">
        {maxLength?
            <div className="length-tip">
              {length} / {maxLength}
            </div>
            :null
        }
        </div>
        <div className="footer-btn">
          <div className="upload">
            <i className="upload-img"><AssetImg type="uploadImgIcon" width="25" height="20"/></i>上传图片
          </div>
          <input type="file" name="file" accept="image/*" style={{position:"absolute",left:0,top:0,marginTop:"5px",opacity:0,width:"100%",height:"100%"}} id="imageUpload" />
        </div>
      </div>
    )
  }
}
