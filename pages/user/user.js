var app = getApp();

Page({
  data: {
    userInfo: {},
    mode: ['我的订单', '我的地址', '联系客服', '关于我们'],
    hidebut:true
  },
  onLoad: function () {
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
            }
          })
        }
      }
    })
  },
  bindGetUserInfo: function (e) {
    if (this.data.nickName != "" || this.data.image != "") {
      this.setData({
        hidebut: false
      })
    console.log(e.detail.userInfo)
    this.setData({
      nickName: e.detail.userInfo.nickName,
      image: e.detail.userInfo.avatarUrl,
    })

    }
  }
})