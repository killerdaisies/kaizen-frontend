//app.js
const app = getApp()
const AV = require('./utils/av-weapp-min.js')
const config = require('./key')
// Initialization of the app
AV.init({
  appId: config.appId,
  appKey: config.appSecret,
});

App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    console.log('processing to login')
    let self = this;
    self.login()

  },
  login: function() {
    wx.login({
      success: res => {
        console.log(233, res)
        wx.request({
          url: self.globalData.apiHost + '/login',
          method: 'POST',
          data: {
            code: res.code
          },
          success: (res) => {
            console.log(2333, res)
            self.globalData.userId = res.data.userId
            self.globalData.userInfo = res.data.userInfo

          }
        })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    // apiHost: 'http://localhost:3000/api/v1'
<<<<<<< Updated upstream
    // apiHost: 'https://kaizen-frontend.herokuapp.com/api/v1'
    apiHost: 'http://kaizen.wogengapp.cn/api/v1'
=======
    apiHost: 'https://kaizen-frontend.herokuapp.com/api/v1'
    // apiHost: 'http://kaizen.wogengapp.cn/api/v1'
>>>>>>> Stashed changes
  }
})
