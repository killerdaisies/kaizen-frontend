// show.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: '',
    longitude: '',
    markers: [{
      id: 1,
      latitude: '',
      longitude: '',
      name: ''
    }],
  },

  viewParticipants: function (e) {
    let participants = e.target.dataset.participants
    wx.navigateTo({
      url: `../index/index?query=${category}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let page = this;
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
        wx.hideToast();
      }
    });
    console.log("page",page)
    // console.log(12, options.query)
    // this.setData(app.globalData)
  },

  onShareAppMessage: function () {
    console.log('share')
    return {
      title: 'Event Invite',
      path: `/pages/invited/invited?id=${event.id}`,
    }
  },

  viewList: function () {
    wx.navigateTo({
      url: '/pages/list/list',
    })
  },

  // listenerBtnGetLocation: function () {
  //   wx.getLocation({
  //     type: 'wgs84',
  //     success: function(res) {
  //       console.log("location", res)
  //       var latitude = res.latitude
  //       var longitude = res.longitude
  //       wx.openLocation({
  //         latitude: latitude,
  //         longitude: longitude,
  //         scale: 28
  //       })
  //     }
  //   })
  // },

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

  }
})
