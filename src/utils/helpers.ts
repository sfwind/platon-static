import * as _ from "lodash"
// import UA from "ua-device"

export function isPending(state, key): boolean {
	return _.get(state, '$view.$pending') ? _.get(state, '$view.$pending')[key] : false
}

// export function isIOS() {
// 	return _.get(new UA(navigator.userAgent), 'os.name') === 'iOS'
// }

export function changeTitle(title){
	document.title = title;
	const iframe = document.createElement('iframe');
	iframe.style.cssText = 'display: none; width: 0; height: 0;';
	iframe.src = 'https://www.iqycamp.com/images/logo.png';
	//iframe.src = require('./img/text_delete.png');
	const listener = () => {
		setTimeout(() => {
			iframe.removeEventListener('load', listener);
			setTimeout(() => {
				document.body.removeChild(iframe);
			}, 0);
		}, 0);
	};
	iframe.addEventListener('load', listener);
	document.body.appendChild(iframe);
}


var chnUnitChar = ["","十","百","千"];
var chnUnitSection = ["","万","亿","万亿","亿亿"];
var chnNumChar = ["零","一","二","三","四","五","六","七","八","九"];

function SectionToChinese(section){
  var strIns = '', chnStr = '';
  var unitPos = 0;
  var zero = true;
  while(section > 0){
    var v = section % 10;
    if(v === 0){
      if(!zero){
        zero = true;
        chnStr = chnNumChar[v] + chnStr;
      }
    }else{
      zero = false;
      strIns = chnNumChar[v];
      strIns += chnUnitChar[unitPos];
      chnStr = strIns + chnStr;
    }
    unitPos++;
    section = Math.floor(section / 10);
  }
  return chnStr;
}

export function NumberToChinese(num){
  var unitPos = 0;
  var strIns = '', chnStr = '';
  var needZero = false;

  if(num === 0){
    return chnNumChar[0];
  }

  while(num > 0){
    var section = num % 10000;
    if(needZero){
      chnStr = chnNumChar[0] + chnStr;
    }
    strIns = SectionToChinese(section);
    strIns += (section !== 0) ? chnUnitSection[unitPos] : chnUnitSection[0];
    chnStr = strIns + chnStr;
    needZero = (section < 1000) && (section > 0);
    num = Math.floor(num / 10000);
    unitPos++;
  }

  return chnStr;
}
