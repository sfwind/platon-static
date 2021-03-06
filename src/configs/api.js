/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. 项目名称：platon-static
2. 文件名：src -> configs -> api.js
3. 作者：liyang@iquanwai.com
4. 备注：由于很多应用只是把数据接口当做model层，而不是直接接触数据库，本文件提供数据接口配置
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
export default {
    "timeout": 60 * 1000 ,  //超时请求时间，单位：毫秒
    "successStatusCode" : 200 ,
    "prefix" : {
        "dev" : "" ,
        "test" : "/" ,
        "sim" : "" ,
        "prod" : ""
    } ,
    "suffix": { //后缀代表接口去掉prefix的部分，这里可以是无限级的树状结构，根据自己的需要
      "common": {
        "bigData": "rise/b/mark",// 大数据的埋点
      },
      "home": {
        "load": "rise/landing/load", // 获取着陆页所有信息
        "activitiesList":"rise/landing/load/activities" ,  // 活动列表
        "livesList":"rise/landing/load/lives" ,   //大咖直播列表
        "articlesList": "rise/landing/load/articles" , // 文章列表接口
      }
    }
} ;
