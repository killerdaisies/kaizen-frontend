// pages/edit/edit.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    start_date: '',
    end_date: '',
    start_time: '',
    end_time: '',
    latitude: '',
    longitude: '',
    address:''
  },

  chooseLocation: function () {
    let self = this;
    wx.chooseLocation({
      success: function (res) {
        self.setData(
          {latitude: res.latitude}
        )
        self.setData (
          {longitude: res.longitude},
        )
        self.setData(
          {address: res.address}
        )
        console.log(11, self.data)
      }
    })
  },

  editEvent: function () {
    wx.navigateTo({
      // url: '/pages/editshow/editshow?id=' + res.data.id
      url: '/pages/edit/edit'
    });
  },
  // saveTap: function() {
  //   let startDate = this.data.startDate;
  //   let end_date = this.data.end_date;

  //   console.log(23,this)

  //   wx.showModal({
  //     content: 'Confirm event?',
  //     confirmText: "Confirm",
  //     cancelText: "No",
  //     success: function (res) {
  //       console.log(0,res)
  //       if (res.confirm) {
  //         wx.reLaunch({
  //           url: '/pages/show/show'
  //         });
  //       } else {
  //         console.log("Staying on page")
  //       }
  //     }
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */

  bindDateChange1: function(event) {
    console.log("bindDateChange1: ", event.detail.value)
    this.setData({
      start_date: event.detail.value
    })
  },

  bindDateChange2: function (event) {
    console.log("bindDateChange2: ", event.detail.value)
    this.setData({
      end_date: event.detail.value
    })
    console.log(this.data)
  },

  bindTimeChange1: function (event) {
    console.log("bindTimeChange1: ", event.detail.value)
    this.setData({
      start_time: event.detail.value
    })
    console.log(this.data)
  },

  bindTimeChange2: function (event) {
    console.log("bindTimeChange2: ", event.detail.value)
    this.setData({
      end_time: event.detail.value
    })
    console.log(this.data)
  },

  pickImage: function () {
    wx.chooseImage({
      success: function (res) {
        console.log(res);
      }
    })
  },

  uploadPromise: function (tempFilePath) {
    return new Promise((resolve, reject) => {
      new AV.File('file-name', {
        blob: {
          uri: tempFilePath,
        },
      }).save()
        .then(file => resolve(file.url()))
        .catch(e => reject(e));
    })
  },

  bindSubmit: function (e) {
    console.log(23, this)
    console.log("e", e)
    console.log("app",app)
    this.setData({
      loading: !this.data.loading
    });

    let description = e.detail.value.description
    let address = this.data.address;
    let capacity = e.detail.value.capacity;
    let start_date = this.data.start_date;
    let end_date = this.data.end_date;
    let start_time = this.data.start_time;
    let end_time = this.data.end_time;
    let id = app.globalData.userId;
    let latitude = this.data.latitude;
    let longitude = this.data.longitude;
    let event_id = this.data.id;

    let event = { 
      "event": {
        "description": description,
        "address": address,
        "capacity": capacity,
        "start_time": start_time,
        "end_time": end_time,
        "start_date": start_date,
        "end_date": end_date,
        "user_id": id,
        "latitude": latitude,
        "longitude": longitude,
      }
    };

    console.log("event",event)

    let self = this;
    wx.request({
      url: app.globalData.apiHost + `/events/${event_id}`,
      method: 'PUT',
      data: event,
      success: function(res) {
        console.log("he", res);
        wx.navigateTo({
          url: '/pages/landing/landing'
        });
      }
    });
  },

  // joinEventUponCreation: function (eventId) {
  //   let id = app.globalData.userId;
  //   console.log("ed", eventId)
  //   console.log("id", id)
  //   wx.request({
  //     url: app.globalData.apiHost + `users/${app.globalData.userId}/bookings`,
  //     method: 'POST',
  //     data: {
  //       "user_id": id,
  //       "event_id": eventId
  //     },
  //     success: function (res) {
  //       // set data on index page and show
  //       console.log("hee");
  //       // wx.navigateTo({
  //       //   url: '/pages/editshow/editshow?id=' + res.data.id
  //       // });
  //     }
  //   });
  // },
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
