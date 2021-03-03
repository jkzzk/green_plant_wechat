// index.js
Page({
  data : {

  },
  handleJoinUsClick : function(event) {
    wx.redirectTo({
      url: '/pages/map/map'
    })
  }
})
