// show.js
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
    console.log("KKK",options)
    wx.request({
      url: `http://localhost:3000/api/v1/events/${options.id}`,
      method: 'GET',
      // success(res) {
      //   console.log(222, res.data.events[0]);
      //   const events = res.data.events;
      //   page.setData({
      //     events: events
      //   });
      success(res) {
        const event = res.data;
        console.log(res.data)
        page.setData(
          event
        );
        wx.hideToast();
      }
    });
    // console.log(12, options.query)
    // this.setData(app.globalData)
  },

  onShareAppMessage: function () {
    console.log('share')
    wx.showShareMenu({
     withShareTicket: true
    })
  },

  listenerBtnGetLocation: function () {
    wx.getLocation({
      type: 'wgs84',
        success: function(res) {
          var latitude = res.latitude
          var longitude = res.longitude
          wx.openLocation({
           latitude: latitude,
           longitude: longitude,
           scale: 28
          })
        }
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
