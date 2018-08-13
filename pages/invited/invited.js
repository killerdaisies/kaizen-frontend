// pages/invited/invited.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 23.099994,
    longitude: 113.324520,
    markers: [{
      id: 1,
      latitude: 23.099994,
      longitude: 113.324520,
      name: 'T.I.T 创意园'
    }],
    covers: [{
      latitude: 23.099994,
      longitude: 113.344520,
      iconPath: '/image/location.png'
    }, {
      latitude: 23.099994,
      longitude: 113.304520,
      iconPath: '/image/location.png'
    }]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options, 182774)
    let page = this;
    wx.request({
      url: app.globalData.apiHost + `/events`,
      method: 'GET',
      // success(res) {
      //   console.log(222, res.data.events[0]);
      //   const events = res.data.events;
      //   page.setData({
      //     events: events
      //   });
      success(res) {
        const item = res.data;
        console.log(res.data)
        page.setData(
          item
        );
        wx.hideToast();
      }
    });
    // console.log(12, options.query)
    // this.setData(app.globalData)
  },

  accept: function(){
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo
    });

    var nickName = app.globalData.userInfo.nickName;
    var avatarUrl = app.globalData.userInfo.avatarUrl;
    var city = e.detail.userInfo.province;
    var id = app.globalData.userId;
    console.log(1, id)

    let user = {
      "id": id,
      "wechat_name": nickName,
      "city": city,
      "avatar_url": avatarUrl
    }

    var users = app.globalData.users
    console.log(11, app.globalData.userInfo)
    wx.request({
      url: app.globalData.apiHost + `/users`,
      method: 'POST',
      data: user,
      success() {
        console.log("he");
        wx.reLaunch({
          url: '/pages/landing/landing',
        });
      }
    });
    
    wx.request({
      url: app.globalData.apiHost + `/events`,
      method: 'GET',
      // success(res) {
      //   console.log(222, res.data.events[0]);
      //   const events = res.data.events;
      //   page.setData({
      //     events: events
      //   });
      success(res) {
        const item = res.data;
        console.log(res.data)
        page.setData(
          item
        );
        wx.hideToast();
      }
    });
  },

  reject: function(){
    wx.showToast({
      title: 'Event Rejected',
      icon: 'success',
      duration: 3000
    });
    wx.reLaunch({
      url: 'pages/landing/landing',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
