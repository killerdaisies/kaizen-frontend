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
    console.log(options, 182774)
    let page = this;
    wx.request({
      // data: {
      //   id: "",
      //   address:"",
      //   start_time:"",
      //   end_time:"",
      // }
      // url: "https://easy-mock.com/mock/5b69043a87dadc0640e32b03/kaizen-fake-api/kaizenevents/${options.id}",
      url: "https://easy-mock.com/mock/5b69043a87dadc0640e32b03/kaizen-fake-api/events-id",
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

  onShareAppMessage: function () {
    console.log('share')
    wx.showShareMenu({
     withShareTicket: true
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
