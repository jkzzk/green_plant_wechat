let app = getApp();
const chooseLocation = requirePlugin('chooseLocation');
const key = '47WBZ-W466W-PIYRJ-OJCXI-OEFCF-HTBEY';
const referer = '绿色地图'; //调用插件的app的名称
let g_lat = '';
let g_lng = '';
Page({
  data: {
    longitude: "115.89",
    latitude: "28.68",
    markers : [],
    scale : 15,
  },
  onLoad: function (options) {
    let that = this;

    let lat = options.lat;
    let lng = options.lng;

    if(lat == undefined && lng == undefined) {
      //定位当前位置
      wx.getLocation({
        type: 'gcj02',
        success: function (res) {
          let latitude = res.latitude
          let longitude = res.longitude
          g_lat = latitude;
          g_lng = longitude;
          that.setData({
            latitude: latitude,
            longitude: longitude
          })
        }
      })
    }else {
      let markers = [{
        id : 1,
        latitude : lat,
        longitude : lng,
        iconPath : '../../images/marker.png'
      }]

      g_lat = lat;
      g_lng = lng;

      that.setData({
        latitude: lat,
        longitude: lng,
        markers : markers,
        scale : 20
      });
    }
  },
  onShow () {
    let location = chooseLocation.getLocation();
    console.log("location",location);

    let that = this;

    if(location != null) {

      g_lat = location.latitude;
      g_lng = location.longitude;
  
      let markers = [{
        id : 1,
        latitude : g_lat,
        longitude : g_lng,
        iconPath : '../../images/marker.png',
        customCallout : {
          anchorY: 0,
          anchorX: 20,
          display : 'ALWAYS'
        }
      }]
  
      that.setData({
        latitude: g_lat,
        longitude: g_lng,
        markers : markers,
        scale : 20
      });

    }
  },
  onUnload () {
    chooseLocation.setLocation(null);
  },  
  mapSearchClick :function(event) {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },
  mapBackCenterClick :function() {
    let that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        let latitude = res.latitude
        let longitude = res.longitude
        that.setData({
          latitude: latitude,
          longitude: longitude,
          markers : [],
        })
      }
    })
  },
  mapChoosePotinClick :function() {

    let that = this;
    
    // 以该点为中心点，选点
    let location = JSON.stringify({
      latitude: g_lat,
      longitude: g_lng
    });
    
    wx.navigateTo({
      url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer + '&location=' + location
    });
  }
})


