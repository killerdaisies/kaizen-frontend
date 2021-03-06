// pages/login/login.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  getUserInfo: function (e) {
    console.log(22, e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo
    });

    const nickName = app.globalData.userInfo.nickName;
    const avatarUrl = app.globalData.userInfo.avatarUrl;
    const city = e.detail.userInfo.province;
    const id = app.globalData.userId;
    console.log(1,id)

    let user = {
      "id": id,
      "wechat_name": nickName,
      "city": city,
      "avatar_url": avatarUrl
    }

    const users = app.globalData.users
    console.log(11,app.globalData.userInfo)
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
