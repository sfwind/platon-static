import * as React from 'react';

export default class ImageDemo extends React.Component {

  constructor () {
    super();
  }

  componentDidMount () {
    console.log('1111');
    let img = new Image();
    // img.src = 'http://wx.qlogo.cn/mmopen/Q3auHgzwzM7LhNUibskldcbw25iakOxD9tHCy2vicuUAFM1PpibN7XmUGH7WJXoWnZvg7ZrvSrqzpuEoCDyLIKicw1Tjls5ibePqk8yytYs5OUsQI/0';

    img.setAttribute('crossOrigin', 'Anonymous');

    document.body.appendChild(img);
    try {
      img.onload = () => {
        console.log('hello');
        var canvas = document.createElement('canvas');
        canvas.width = 100;
        canvas.height = 100;

        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        var dataURL;
        try {
          dataURL = canvas.toDataURL('image/png');
        } catch (e) {
          console.error(e);
        }
        console.log(dataURL);
      };
    } catch (e) {
      console.error(e);
    }
    // img.src = 'http://wx.qlogo.cn/mmopen/Q3auHgzwzM7LhNUibskldcbw25iakOxD9tHCy2vicuUAFM1PpibN7XmUGH7WJXoWnZvg7ZrvSrqzpuEoCDyLIKicw1Tjls5ibePqk8yytYs5OUsQI/0';
    img.src = 'https://wx.qlogo.cn/mmopen/wbKdib81ny6icYCkibXNWSU2cuokWFLR4uj2rP0eAGZYrfaVhLo48wBToH6Y1RvmGDBa7s4DMcvc70UexuHbkJDkicOX3EU19yQP/0';
  }

  render () {
    return (
      <div>
        <h1>hello world</h1>
      </div>
    );
  }

}
