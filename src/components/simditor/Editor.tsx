/**
 * Created by shen on 2017/3/18.
 */
import React from 'react';
import "./Editor.less"
var $ = require('jquery');
var Simditor = require('./simditor');
import * as _ from "lodash";

interface EditorProps {
  value?: string,
  placeholder?: string,
  moduleId: string,
  defaultImage?: string
}

export default class Editor extends React.Component<EditorProps,any> {

  constructor(props) {
    super(props);
    this.state = {
      editor: undefined
    }
  }

  dataURLtoBlob(dataURL) {
    var q, arrayBuffer, bb, blobArray, byteString, hasArrayBufferViewSupport, hasBlobConstructor, i, intArray,
      k, mimeString, ref, supportBlob;
    hasBlobConstructor = window.Blob && (function() {
        var e;
        try {
          return Boolean(new Blob());
        } catch(_error) {
          e = _error;
          return false;
        }
      })();
    hasArrayBufferViewSupport = hasBlobConstructor && window.Uint8Array && (function() {
        var e;
        try {
          return new Blob([ new Uint8Array(100) ]).size === 100;
        } catch(_error) {
          e = _error;
          return false;
        }
      })();
    BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
    supportBlob = hasBlobConstructor || BlobBuilder;
    if(!(supportBlob && window.atob && window.ArrayBuffer && window.Uint8Array)) {
      return false;
    }
    if(dataURL.split(',')[ 0 ].indexOf('base64') >= 0) {
      byteString = atob(dataURL.split(',')[ 1 ]);
    } else {
      byteString = decodeURIComponent(dataURL.split(',')[ 1 ]);
    }
    arrayBuffer = new ArrayBuffer(byteString.length);
    intArray = new Uint8Array(arrayBuffer);
    for(i = k = 0, ref = byteString.length; 0 <= ref ? k <= ref : k >= ref; i = 0 <= ref ? ++k : --k) {
      intArray[ i ] = byteString.charCodeAt(i);
    }
    mimeString = dataURL.split(',')[ 0 ].split(':')[ 1 ].split(';')[ 0 ];
    if(hasBlobConstructor) {
      blobArray = hasArrayBufferViewSupport ? intArray : arrayBuffer;
      return new Blob([ blobArray ], {
        type: mimeString
      });
    }
    bb = new BlobBuilder();
    bb.append(arrayBuffer);
    return bb.getBlob(mimeString);
  };

  componentDidMount() {
    let editor = new Simditor({
      textarea: document.querySelector(`#${this.props.id ? this.props.id : "editor"}`),
      toolbar: [ 'image' ],
      upload: {
        url: '/file/image/upload/' + this.props.moduleId || 2,
        fileKey: 'file'
      },
      pasteImage: false,
      imageButton: 'upload',
      defaultImage: this.props.defaultImage || "https://static.iqycamp.com/images/imgLoading.png?imageslim", //'//p0.meituan.net/dprainbow/958829a6a26fc858e17c7594d38233187415.png'
      toolbarFloat: false
    });

    editor.on('valuechanged', (e) => {
      // draft != submit
      this.handleValueChanged();
    })
    editor.on('pasting', (e, $content) => {
      // 图片处理
      let images = $content.find('img');
      images.each((key, item) => {
        let $img = $(item);
        if(/^data:image/.test($img.attr('src'))) {
          // 读取图片数据
          var blob = this.dataURLtoBlob($img.attr('src'));
          // 显示默认图
          $img.attr('src', "https://static.iqycamp.com/images/imgLoading.png?imageslim");
          // 定义FormData
          let data = new FormData();
          data.append('file', blob);
          // 上传
          $.ajax({
            url: '/file/image/upload/2',
            type: 'post',
            data: data,
            dataType: 'json',
            processData: false,
            contentType: false,
            cache: false,
          }).then(function(res) {
            if(res.code === 200) {
              // 上传成功
              $img.attr('src', res.msg.picUrl);
            }
          }, function(error) {
            console.error(error);
          })
        }
      });

      // style处理
      $content.find('*').each((key, item) => {
        let $p = $(item);
        if(!$p.is('img')) {
          $p.removeAttr('style');
        }
      })

      $content.each((key, item) => {
        let $p = $(item);
        if(!$p.is('img')) {
          $p.removeAttr('style');
        }
      })
    });

    if(this.props.value && this.props.value.length > 0) {
      editor.setValue(this.props.value)
      this.calcValue(this.props.value)
    }
    this.setState({ editor: editor }, () => {
      // 这里初始化好了，查看是否显示maxLength
      this.calcValue();
    });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.value && !this.props.value) {
      this.state.editor.setValue(nextProps.value)
      this.calcValue(nextProps.value)
    }
  }

  componentWillUnmount() {
    if(this.props.onChange) {
      this.props.onChange(this.getValue());
    }
  }

  getValue() {
    return this.state.editor.getValue()
  }

  handleValueChanged() {
    if(this.state.editor) {
      this.calcValue(this.getValue());
      //自动保存
      if(this.props.autoSave) {
        this.props.autoSave()
      }
      if(_.isFunction(this.props.onChange)) {
        this.props.onChange(this.getValue());
      }
    }
  }

  calcValue(value) {
    if(!value) {
      if(this.state.editor) {
        value = this.state.editor.getValue()
      } else {
        console.log("editor is undefined");
      }
    }
    value = value.replace(/<[^>]+>/g, '')
    this.setState({ length: value.length }, () => {
      const { editor, length } = this.state;
      const { maxLength } = this.props;
      if(maxLength && editor) {
        let text = $('.simditor-toolbar ul .text-length');
        if(text.length >= 1) {
          text.text(`${length}/${maxLength}`)
        } else {
          $(`<span class="text-length">${length}/${maxLength}</span>`).appendTo('.simditor-toolbar ul');
        }
      }
    })
  }

  render() {
    return (
      <textarea id={this.props.id ? this.props.id : 'editor'}
                placeholder={this.props.placeholder}>
      </textarea>
    );
  }
}

