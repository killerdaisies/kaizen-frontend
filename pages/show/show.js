// show.js
const app = getApp()
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
      // iconPath: '/image/location.png'
    }, {
      latitude: 23.099994,
      longitude: 113.304520,
      // iconPath: '/image/location.png'
    }]

  },

  onLoad: function (options) {
    let page = this;
    console.log("hello", options)
    wx.request({
      url: app.globalData.apiHost + `/events/${options.id}`,

      method: 'GET',
      // success(res) {
      //   console.log(222, res.data.events[0]);
      //   const events = res.data.events;
      //   page.setData({
      //     events: events
      //   });
      success(res) {
        console.log(11, res.data)

        const event = res.data;
        page.setData(
          event
        );
        wx.hideToast();
      }
    });
    console.log(12, options.query)
    this.setData(app.globalData)
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

  editEvent: function (e) {
    const data = e.currentTarget.dataset;
    console.log('schmacked')
    wx.navigateTo({
      // url: '/pages/editshow/editshow?id=' + res.data.id
      url: `/pages/edit/edit?id=${data.id}`
    });
  },

  deleteEvent: function (e) {
    const data = e.currentTarget.dataset;
    const id = data.id;
    console.log(id)

    wx.request ({
      url: app.globalData.apiHost + `/events/${id}`,
      method: 'DELETE',
        success() {
          wx.reLaunch({
            url: '/pages/landing/landing'
          });
        },
      });
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

  listenerBtnGetLocation: function () {
    wx.getLocation({
      type: 'wgs84',
        success: function(res) {
          const latitude = res.latitude
          const longitude = res.longitude
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

  }
})
