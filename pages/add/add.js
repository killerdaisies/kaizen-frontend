// pages/add/add.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    startDate: '',
    endDate: ''
  },

  saveTap: function() {
    let startDate = this.data.startDate
    let endDate = this.data.endDate

    wx.showModal({
      content: 'Confirm event?',
      confirmText: "Confirm",
      cancelText: "No",
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: 'Some-API',
            method: 'POST',
            data: {
              start_date: startDate,
              end_date: endDate
            }
          });
          // wx.reLaunch({
          //   url: '/pages/profile/profile'
          // });
        } else {
          console.log("Staying on page")
        }
      }
    })
  },
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
    console.log(23, e)
    this.setData({
      loading: !this.data.loading
    });

    var description = e.detail.value.description
    var address = e.detail.value.address;
    var capacity = e.detail.value.capacity;

    var items = app.globalData.items

    let item = {
      "description": description,
      "address": address,
      "capacity": capacity,
      "user_id": 37
    }

    wx.request({
      url: `Some-API`,
      method: 'POST',
      data: item,

      success: function(res) {
        // set data on index page and show
        console.log("he");
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
