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

  getUserInfo: function (e) {

    let id = app.globalData.userId

    let user = e.detail.userInfo
    user.id = id

    this.setData(user);
    app.globalData.userInfo = user

    const nickName = app.globalData.userInfo.nickName;
    const avatarUrl = app.globalData.userInfo.avatarUrl;

    wx.request({
      url: app.globalData.apiHost + `\/users\/${id}`,
      method: 'PUT',
      data: {
        id: id,
        wechat_name: nickName,
        avatar_url: avatarUrl
      },
      success: (res) => {
        app.globalData.userId = res.data.id
        wx.reLaunch({
          url: '/pages/invited/invited',
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options, 182774)
    let page = this;
    let event_id = options.event_id;
    let user = app.globalData.userInfo
    console.log(88,user)
    this.setData({
      user: user,
      event_id: event_id
    });

    // new request to take id
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

    console.log("event",event_id)

    // wx.request({
    //   url: app.globalData.apiHost + `/events`,
    //   method: 'GET',
    //   // success(res) {
    //   //   console.log(222, res.data.events[0]);
    //   //   const events = res.data.events;
    //   //   page.setData({
    //   //     events: events
    //   //   });
    //   success(res) {
    //     const item = res.data;
    //     console.log(res.data)
    //     page.setData(
    //       item
    //     );
    //     wx.hideToast();
    //   }
    // });
    // console.log(12, options.query)
    // this.setData(app.globalData)
  },

  onShareAppMessage: function () {
    console.log('share')
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
      "id": id,
      "event_id": event_id
    }

    console.log("word", booking)
    console.log(11, app.globalData.userInfo)

    wx.request({
      url: app.globalData.apiHost + `/users/${id}/bookings`,
      method: 'POST',
      data: booking,
      success(res) {
        console.log(res);
        // wx.reLaunch({
        //   url: '/pages/landing/landing',
        // });
      }
    });
  },

  //   wx.request({
  //     url: app.globalData.apiHost + `/events`,
  //     method: 'GET',
  //     // success(res) {
  //     //   console.log(222, res.data.events[0]);
  //     //   const events = res.data.events;
  //     //   page.setData({
  //     //     events: events
  //     //   });
  //     success(res) {
  //       const item = res.data;
  //       console.log(res.data)
  //       page.setData(
  //         item
  //       );
  //       wx.hideToast();
  //     }
  //   });

  reject: function () {
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
