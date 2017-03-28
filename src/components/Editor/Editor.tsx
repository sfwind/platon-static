import * as React from "react"
import "./Editor.less"
import $ from "jquery"
import init from "./artEditor.js"
import AssetImg from "../AssetImg"

export default class Editor extends React.Component<any,any>{
  constructor(props){
    super(props);
    init($);
    this.state={
      editor:null
    }
  }

  componentDidMount(){
    let editor = $('#content');
    editor.artEditor({
      imgTar: '#imageUpload',
      limitSize: 5,   // 兆
      showServer: true,
      uploadUrl: '/rise/file/editor/image/upload/2',
      data: { },
      formInputId:'target',
      uploadField: 'file',
      placeholader: '<p>离开页面前请提交，以免内容丢失。</p>',
      validHtml: [],
      uploadSuccess: function(res) {
        // 这里是处理返回数据业务逻辑的地方
        // `res`为服务器返回`status==200`的`response`
        // 如果这里`return <path>`将会以`<img src='path'>`的形式插入到页面
        // 如果发现`res`不符合业务逻辑
        // 比如后台告诉你这张图片不对劲
        // 麻烦返回 `false`
        // 当然如果`showServer==false`
        // 无所谓咯
        console.log(res);
        return res.path;
      },
      uploadError: function(res) {
        //这里做上传失败的操作
        //也就是http返回码非200的时候
        console.log(res);
      }
    });
    this.setState({editor:editor});
  }

  getValue(){
    return this.state.editor.getValue();
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.defaultValue && !this.props.defaultValue){
      this.state.editor.setValue(nextProps.defaultValue);
    }
  }


  render(){
    return (
      <div className="publish-article-content">
        <input type="hidden" id="target" value=""/>
        <div ref="editor" className="article-content" id="content">
        </div>
        <div className="footer-btn">
          <div className="upload">
            <i className="upload-img"><AssetImg type="uploadImgIcon" width="25" height="20"/></i>上传图片
          </div>
          <input type="file" name="file" capture="camera" accept="image/jpg,image/jpeg,image/png" style={{position:"absolute",left:0,top:0,marginTop:"5px",opacity:0,width:"100%",height:"100%"}} id="imageUpload" />
        </div>
      </div>
    )
  }
}
