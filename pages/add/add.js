// pages/add/add.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    latitude: '',
    longitude: '',
    address: ''
  },

  chooseLocation: function () {
    let self = this;
    wx.chooseLocation({
      success: function (res) {
        self.setData(
          {latitude: res.latitude}, 
          {longitude: res.longitude}, 
          {address: res.address}
        )
        console.log(11, self.data)
      }
    })
  },
  // saveTap: function() {
  //   let startDate = this.data.startDate;
  //   let endDate = this.data.endDate;

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
      startDate: event.detail.value
    })
  },

  bindDateChange2: function (event) {
    console.log("bindDateChange2: ", event.detail.value)
    this.setData({
      endDate: event.detail.value
    })
    console.log(this.data)
  },

  bindTimeChange1: function (event) {
    console.log("bindTimeChange1: ", event.detail.value)
    this.setData({
      startTime: event.detail.value
    })
    console.log(this.data)
  },

  bindTimeChange2: function (event) {
    console.log("bindTimeChange2: ", event.detail.value)
    this.setData({
      endTime: event.detail.value
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
    let address = e.detail.value.address;
    let capacity = e.detail.value.capacity;
    let startDate = this.data.startDate;
    let endDate = this.data.endDate;
    let startTime = this.data.startTime;
    let endTime = this.data.endTime;
    let id = app.globalData.userId;
    let latitude = this.data.latitude;
    let longitude = this.data.longitude;

    let event = {
      "description": description,
      "address": address,
      "capacity": capacity,
      "start_time": startTime ,
      "end_time": endTime,
      "start_date": startDate,
      "end_date": endDate,
      "user_id": id,
      "latitude": latitude,
      "longitude": longitude
    };

    console.log("id",id)
    let self = this;
    wx.request({
      url: app.globalData.apiHost + `/events`,
      method: 'POST',
      data: event,
      success: function(res) {
        // set data on index page and show
        console.log("he", res);
        self.joinEventUponCreation(res.data.id)
        wx.navigateTo({
          // url: '/pages/editshow/editshow?id=' + res.data.id
          url: '/pages/landing/landing'
        });
      }
    });
  },

  joinEventUponCreation: function (eventId) {
    let id = app.globalData.userId;
    console.log("ed", eventId)
    console.log("id", id)
    wx.request({
      url: app.globalData.apiHost + `/bookings`,
      method: 'POST',
      data: {
        "user_id": id,
        "event_id": eventId
      },
      success: function (res) {
        // set data on index page and show
        console.log("hee");
        // wx.navigateTo({
        //   url: '/pages/editshow/editshow?id=' + res.data.id
        // });
      }
    });
  },
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
