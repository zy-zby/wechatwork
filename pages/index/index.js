// 引用百度地图微信小程序JSAPI模块 
var bmap = require('../../libs/bmap-wx.min.js');
Page({
  data: {
    weatherData: [{
      date:'',
      weather:'',
      temperature:'',
      wind:'',
      dayPictureUrl:'',
      nightPictureUrl:'',
    }],
    bannerarr:[],
  },
  onLoad: function () {
    // banner
    var array = this.data.bannerarr
    for (let i = 1; i < 3; i++) {
      array.push("../../image/banner" + i + ".jpg")
    }
    this.setData({ bannerarr: array });
    var that = this;
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: '8GGYELBscbcjRQmaq2d76jAPiVuXqg1z'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      var weatherData = data.originalData.results[0].weather_data[0];
      weatherData = {
        date: data.originalData.date,
        temperature: weatherData.temperature,
        weather: weatherData.weather,
        wind: weatherData.wind,
        dayPictureUrl: weatherData.dayPictureUrl,
        nightPictureUrl: weatherData.nightPictureUrl
      }
      that.setData({
        weatherData:weatherData
      });
    }
    // 发起weather请求 
    BMap.weather({
      fail: fail,
      success: success
    });
  },
  fooddetail: function () {
    wx.navigateTo({
      url: '../fooddetails/fooddetails'
    })
  },
})