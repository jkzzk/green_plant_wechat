var QQMapWX = require('../../common/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 查询地图地点输入框绑定参数
    area : '',
    // 返回结果数组
    searchAreaList : [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;

    qqmapsdk = new QQMapWX({
      key: '47WBZ-W466W-PIYRJ-OJCXI-OEFCF-HTBEY'
    });
  },
  /**
   * 搜索地点完成调用方法
   */  
  searchAreaOnMap : function() {
    let that = this;
    console.log(that.data.area);
    qqmapsdk.search({
      keyword : that.data.area,
      success : function(res) {
        console.log("res",res);
        that.setData({
          searchAreaList : res.data
        });
        // 高亮关键字,之后再加
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res){
        console.log(res);
      }      
    });
  },
  jumpToMapAndMark : function(event) {

    let lat = event.currentTarget.dataset.lat;
    let lng = event.currentTarget.dataset.lng;

    wx.redirectTo({
      url: '/pages/map/map?lat='+ lat +'&lng=' + lng
    })
  }
})