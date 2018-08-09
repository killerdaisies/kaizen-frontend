// pages/landing/landing.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  addTap: function (e) {
    wx.navigateTo({
      url: '/pages/add/add',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options, 182774)
    let page = this;
    wx.request({
      url:  'https://kaizen-frontend.herokuapp.com/api/v1/events',
      method: 'GET',
      success(res) {
        const events = res.data.events;
        page.setData({
          events: events
        });
        wx.hideToast();
      }
    });
    // console.log(12, options.query)
    // this.setData(app.globalData)
  },

  showItem(e) {
    const data = e.currentTarget.dataset;
    const event = data.event;
    console.log(event)
    wx.navigateTo({
      url: `../show/show?id=${event.id}`
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
