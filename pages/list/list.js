// pages/list/list.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let page = this;
    let event_id = options.id;
    let userInfo = app.globalData.userInfo
    let currentUserId = app.globalData.userId
    console.log(currentUserId)

    page.setData({
      currentUserId: currentUserId,
      userInfo: userInfo,
      event_id: event_id
    });
    console.log("hello", options)

    wx.request({

      url: app.globalData.apiHost + `/events/${options.id}`,
      method: 'GET',
      success(res) {
        console.log(11, res.data)
        const event = res.data;
        page.setData(
          event
        );

        page.setData({
          hasBooked: event.booked_users.map(u => u.id).includes(currentUserId)
        });

        wx.hideToast();
      }
    });
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