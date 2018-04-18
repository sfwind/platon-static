/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：platon-static
 2. 文件名称： 上传图片函数 需要压缩
 3. 作者： liyang@iquanwai.com
 4. 说明：
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define('simple-uploader', ["jquery","simple-module"], function ($, SimpleModule) {
      return (root['uploader'] = factory($, SimpleModule));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("jquery"),require("simple-module"));
  } else {
    root.simple = root.simple || {};
    root.simple['uploader'] = factory(jQuery,SimpleModule);
  }
}(this, function ($, SimpleModule) {

  var Uploader, uploader,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Uploader = (function(superClass) {
    extend(Uploader, superClass);

    function Uploader() {
      return Uploader.__super__.constructor.apply(this, arguments);
    }

    Uploader.count = 0;

    Uploader.prototype.opts = {
      url: '',
      params: null,
      fileKey: 'upload_file',
      connectionCount: 3
    };

    Uploader.prototype._init = function() {
      this.files = [];
      this.queue = [];
      this.id = ++Uploader.count;
      this.on('uploadcomplete', (function(_this) {
        return function(e, file) {
          _this.files.splice($.inArray(file, _this.files), 1);
          if (_this.queue.length > 0 && _this.files.length < _this.opts.connectionCount) {
            return _this.upload(_this.queue.shift());
          } else if (_this.files.length === 0) {
            return _this.uploading = false;
          }
        };
      })(this));
      return $(window).on('beforeunload.uploader-' + this.id, (function(_this) {
        return function(e) {
          if (!_this.uploading) {
            return;
          }
          e.originalEvent.returnValue = _this._t('leaveConfirm');
          return _this._t('leaveConfirm');
        };
      })(this));
    };

    Uploader.prototype.generateId = (function() {
      var id;
      id = 0;
      return function() {
        return id += 1;
      };
    })();

    Uploader.prototype.upload = function(file, opts) {
      var f, i, key, len;
      if (opts == null) {
        opts = {};
      }
      if (file == null) {
        return;
      }
      if ($.isArray(file) || file instanceof FileList) {
        for (i = 0, len = file.length; i < len; i++) {
          f = file[i];
          this.upload(f, opts);
        }
      } else if ($(file).is('input:file')) {
        key = $(file).attr('name');
        if (key) {
          opts.fileKey = key;
        }
        this.upload($.makeArray($(file)[0].files), opts);
      } else if (!file.id || !file.obj) {
        file = this.getFile(file);
      }
      if (!(file && file.obj)) {
        return;
      }
      $.extend(file, opts);
      if (this.files.length >= this.opts.connectionCount) {
        this.queue.push(file);
        return;
      }
      if (this.triggerHandler('beforeupload', [file]) === false) {
        return;
      }
      this.files.push(file);
      this._xhrUpload(file);
      return this.uploading = true;
    };

    Uploader.prototype.getFile = function(fileObj) {
      var name, ref, ref1;
      if (fileObj instanceof window.File || fileObj instanceof window.Blob) {
        name = (ref = fileObj.fileName) != null ? ref : fileObj.name;
      } else {
        return null;
      }
      return {
        id: this.generateId(),
        url: this.opts.url,
        params: this.opts.params,
        fileKey: this.opts.fileKey,
        name: name,
        size: (ref1 = fileObj.fileSize) != null ? ref1 : fileObj.size,
        ext: name ? name.split('.').pop().toLowerCase() : '',
        obj: fileObj
      };
    };

    Uploader.prototype._xhrUpload = function(file) {
      var formData, k, ref, v;
      formData = new FormData();
      if (file.obj.size/1024  > 1025){   // 判断是不是大于1m
        var thatSelf = this;
        var ready=new FileReader();
        /*开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.*/
        ready.readAsDataURL(file.obj);
        ready.onload = function(){
          var re = this.result;
          thatSelf.canvasDataURL(re,{},function (base64) {
            /* console.log("base64"+base64);*/
            var bl = thatSelf.convertBase64UrlToBlob(base64);
            formData.append(file.fileKey, bl,"file_"+Date.parse(new Date())+".jpg");
            formData.append("original_filename", file.name);
            if (file.params) {
              ref = file.params;
              for (k in ref) {
                v = ref[k];
                formData.append(k, v);
              }
            }
            return file.xhr = $.ajax({
              url: file.url,
              data: formData,
              processData: false,
              contentType: false,
              type: 'POST',
              headers: {
                'X-File-Name': encodeURIComponent(file.name)
              },
              xhr: function() {
                var req;
                req = $.ajaxSettings.xhr();
                if (req) {
                  req.upload.onprogress = (function(_this) {
                    console.log(_this);
                    return function(e) {
                      return _this.progress(e);
                    };
                  })(this);
                }
                return req;
              },
              progress: (function(_this) {
                return function(e) {
                  if (!e.lengthComputable) {
                    return;
                  }
                  return _this.trigger('uploadprogress', [file, e.loaded, e.total]);
                };
              })(thatSelf),
              error: (function(_this) {
                return function(xhr, status, err) {
                  return _this.trigger('uploaderror', [file, xhr, status]);
                };
              })(thatSelf),
              success: (function(_this) {
                return function(result) {
                  _this.trigger('uploadprogress', [file, file.size, file.size]);
                  _this.trigger('uploadsuccess', [file, result]);
                  return $(document).trigger('uploadsuccess', [file, result, _this]);
                };
              })(thatSelf),
              complete: (function(_this) {
                return function(xhr, status) {
                  return _this.trigger('uploadcomplete', [file, xhr.responseText]);
                };
              })(thatSelf)
            });
          })
        }
      }else {
        formData.append(file.fileKey, file.obj);
        formData.append("original_filename", file.name);
        if (file.params) {
          ref = file.params;
          for (k in ref) {
            v = ref[k];
            formData.append(k, v);
          }
        }
        return file.xhr = $.ajax({
          url: file.url,
          data: formData,
          processData: false,
          contentType: false,
          type: 'POST',
          headers: {
            'X-File-Name': encodeURIComponent(file.name)
          },
          xhr: function() {
            var req;
            req = $.ajaxSettings.xhr();
            if (req) {
              req.upload.onprogress = (function(_this) {
                return function(e) {
                  return _this.progress(e);
                };
              })(this);
            }
            return req;
          },
          progress: (function(_this) {
            return function(e) {
              if (!e.lengthComputable) {
                return;
              }
              return _this.trigger('uploadprogress', [file, e.loaded, e.total]);
            };
          })(this),
          error: (function(_this) {
            return function(xhr, status, err) {
              return _this.trigger('uploaderror', [file, xhr, status]);
            };
          })(this),
          success: (function(_this) {
            return function(result) {
              _this.trigger('uploadprogress', [file, file.size, file.size]);
              _this.trigger('uploadsuccess', [file, result]);
              return $(document).trigger('uploadsuccess', [file, result, _this]);
            };
          })(this),
          complete: (function(_this) {
            return function(xhr, status) {
              return _this.trigger('uploadcomplete', [file, xhr.responseText]);
            };
          })(this)
        });
      }
    };

    Uploader.prototype.cancel = function(file) {
      var f, i, len, ref;
      if (!file.id) {
        ref = this.files;
        for (i = 0, len = ref.length; i < len; i++) {
          f = ref[i];
          if (f.id === file * 1) {
            file = f;
            break;
          }
        }
      }
      this.trigger('uploadcancel', [file]);
      if (file.xhr) {
        file.xhr.abort();
      }
      return file.xhr = null;
    };

    Uploader.prototype.readImageFile = function(fileObj, callback) {
      var fileReader, img;
      if (!$.isFunction(callback)) {
        return;
      }
      img = new Image();
      img.onload = function() {
        return callback(img);
      };
      img.onerror = function() {
        return callback();
      };
      if (window.FileReader && FileReader.prototype.readAsDataURL && /^image/.test(fileObj.type)) {
        fileReader = new FileReader();
        fileReader.onload = function(e) {
          return img.src = e.target.result;
        };
        return fileReader.readAsDataURL(fileObj);
      } else {
        return callback();
      }
    };

    Uploader.prototype.destroy = function() {
      var file, i, len, ref;
      this.queue.length = 0;
      ref = this.files;
      for (i = 0, len = ref.length; i < len; i++) {
        file = ref[i];
        this.cancel(file);
      }
      $(window).off('.uploader-' + this.id);
      return $(document).off('.uploader-' + this.id);
    };

    Uploader.i18n = {
      'zh-CN': {
        leaveConfirm: '正在上传文件，如果离开上传会自动取消'
      }
    };

    Uploader.locale = 'zh-CN';
    Uploader.prototype.canvasDataURL =function (path, obj, callback) {
      var img = new Image();
      img.src = path;
      img.onload = function(){
        var that = this;
        // 默认按比例压缩
        var w = that.width,
          h = that.height,
          scale = w / h;
        w = obj.width || w;
        h = obj.height || (w / scale);
        var quality = 0.2;  // 默认图片质量为0.7
        //生成canvas
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        // 创建属性节点
        var anw = document.createAttribute("width");
        anw.nodeValue = w;
        var anh = document.createAttribute("height");
        anh.nodeValue = h;
        canvas.setAttributeNode(anw);
        canvas.setAttributeNode(anh);
        ctx.drawImage(that, 0, 0, w, h);
        // 图像质量
        if(obj.quality && obj.quality <= 1 && obj.quality > 0){
          quality = obj.quality;
        }
        // quality值越小，所绘制出的图像越模糊
        var base64 = canvas.toDataURL('image/jpeg', quality);
        // 回调函数返回base64的值
        callback(base64);
      }
    };
    Uploader.prototype.convertBase64UrlToBlob=function(urlData){
      var arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while(n--){
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], {type:mime});
    };

    return Uploader;

  })(SimpleModule);

  uploader = function(opts) {
    return new Uploader(opts);
  };

  return uploader;

}));
