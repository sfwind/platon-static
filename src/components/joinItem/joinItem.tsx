/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：platon-static
 2. 文件功能：   加入圈外 条目组件
 3. 作者： liyang@iquanwai.com
 4. 备注：
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import * as React from 'react'
import './joinItem.less'
import  commonFun from '../../utils/commonFun'
export default class JoinItem extends React.Component {
  constructor() {
    super();
  }
  handleOrder(asstWechat,itemType,itemUrl){
    if (itemType ===1 ){
      commonFun.sendBigData({ module: '打点', function: '加入商学院', action: '点击预约' }); // 事件埋点
      this.props.handerOrder(asstWechat)
    }else {
      commonFun.sendBigData({ module: '打点', function: '加入商学院', action: '点击立即报名' }); // 事件埋点
      window.location.href = itemUrl
    }
  }
  render(){
    const { item } = this.props;
    return (
      <div className="join" onClick={()=>{this.handleOrder(item.asstWechat,item.type,item.url)}}>
        <div className="join-item" style={{background: `url(${item.pic}) no-repeat`,backgroundSize: `100% 100%` }}>
          <div className={item.memberTypeId === 3 ? "description core":(item.memberTypeId === 5 ? 'description':'description business')}>
            {item.month && <p className="join-date"><span className="date">{item.month}月入学</span></p>}
            <p className="type-name"><span className="type">{item.type === 1 ? '抢先预约':"立即报名"}></span></p>
            <p className="price-all">
              {item.type === 2 && <span className='delt'>￥{item.initPrice}</span>}
              {item.type === 4 && <span className="number">还剩<span className='num-count'>{item.remainNumber}</span>名额<span className="sale-price"><small>￥</small>{item.price}</span></span>}
              {item.type === 2 && <span className="discount">早鸟价<span><small>￥</small>{item.price}</span></span>}
              {item.type === 1 && <span className="price">￥{item.price}</span>}
              {item.type === 3 && <span className="price-big"><small>￥</small>{item.price}</span>}
            </p>
          </div>
        </div>
      </div>
    )}
}
