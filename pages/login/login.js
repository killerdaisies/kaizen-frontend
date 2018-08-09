// pages/login/login.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  getUserInfo: function (e) {
    console.log(22, app)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo
    });

    var nickName = app.globalData.userInfo.nickName;
    var avatarUrl = app.globalData.userInfo.avatarUrl;
    var city = e.detail.userInfo.province;
    var id = app.globalData.userId;
    console.log(1,id)

    let user = {
      "id": id,
      "wechat_name": nickName,
      "city": city,
      "avatar_url": avatarUrl
    }

    var users = app.globalData.users
    console.log(11,app.globalData.userInfo)
    wx.request({
      url: 'https://kaizen-frontend.herokuapp.com/api/v1/users',
      method: 'POST',
      data: user,
      success() {
        console.log("he");
        wx.reLaunch({
          url: '/pages/landing/landing',
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
