// show.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // latitude: '',
    // longitude: '',
    // markers: [{
    //   id: 1,
    //   latitude: '',
    //   longitude: '',
    //   name: ''
    // }],
  },

  onLoad: function (options) {

    let page = this;
    let event_id = options.id;
    let userInfo = app.globalData.userInfo
    let currentUserId = app.globalData.userId
    console.log(currentUserId)
    console.log("event_id", event_id)

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
    console.log("page",page)
    // console.log(12, options.query)
    // this.setData(app.globalData)
  },


  getUserInfo: function (e) {
    let page = this

    let id = app.globalData.userId

    let userInfo = e.detail.userInfo

    this.setData(userInfo);
    app.globalData.userInfo = userInfo

    const nickName = userInfo.nickName;
    const avatarUrl = userInfo.avatarUrl;

    wx.request({
      url: app.globalData.apiHost + `\/users\/${id}`,
      method: 'PUT',
      data: {
        id: id,
        wechat_name: nickName,
        avatar_url: avatarUrl
      },
      success: (res) => {
        wx.redirectTo({
          url: '/pages/show/show?id=' + page.data.event_id,
        })
      }
    });
  },
  navigateTo: function(e) {
    console.log("e", e)
    console.log("j", e.currentTarget.dataset.address)
    console.log("q", e.currentTarget.latitude)
    let address = e.currentTarget.dataset.address
    let latitude = e.currentTarget.dataset.latitude
    let longitude = e.currentTarget.dataset.longitude
    wx.getLocation({
      type: 'gcj02', //Returns latitudes and longitudes that can be used for wx.openLocation
      success: function (res) {
        // var latitude = res.latitude
        // var longitude = res.longitude
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 28,
          address: address
        })
      }
    })

  },

  viewParticipants: function (e) {
    const event_path = this.data.event_id
    // console.log("data id", e)
    wx.navigateTo({
      url: `../list/list?id=${event_path}`,
    });
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

   accept: function(e) {
    // app.globalData.userInfo = e.detail.userInfo
    // this.setData({
    //   userInfo: app.globalData.userInfo
    // });
    let page = this;
    let id = app.globalData.userId;
    const users = app.globalData.users;
    let event_id = this.data.event_id

    console.log(1, id)

    let booking = {
      "user_id": id,
      "event_id": event_id
    }

    console.log("word", booking)
    console.log(11, app.globalData.userInfo)

    wx.request({
      url: app.globalData.apiHost + `/bookings`,
      method: 'POST',
      data: booking,
      success(res) {
        console.log(res);
        // wx.reLaunch({
        //   url: '../landing/landing',
        // });
      }
    });

    let attendees = []
    attendees.push(id)
    wx.request({
      url: app.globalData.apiHost + `/events/${event_id}`,
      method: 'PUT',
      data: {attendee: attendees},
      success(res) {
        console.log(res);
        wx.reLaunch({
          url: '../landing/landing',
        });
      }
    })
  },

  reject: function () {
    wx.showToast({
      title: 'Event Rejected',
      icon: 'success',
      duration: 3000
    });
    wx.reLaunch({
      url: '../landing/landing',
    })
  },

  onShareAppMessage: function (e) {
    // const data = e.currentTarget.dataset;
    // const id = data.id;
    // return {
    //   title: 'Event Invite',
    //   path: `/pages/invited/invited?id=${event.id}`,
    // },
     wx.showShareMenu({
     withShareTicket: true
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
