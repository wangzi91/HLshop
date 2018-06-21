// pages/msdel/msdel.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xsmscon: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  goasc: function(e) {

    var colId = "price"
    // 降序
    // var desc = function (x, y) {
    //   return (x[colId] < y[colId]) ? 1 : -1
    // }
    //升序排序函数  
    var asc = function(x, y) {
      return (x[colId] > y[colId]) ? 1 : -1
    }
    var arr2 = this.data.xsmscon;

    arr2.sort(asc); //升序排序  
    this.setData({
      xsmscon: arr2
    })
    console.log(arr2)
    // arr2.sort(desc); //降序排序  
  },
  godesc: function() {
    var colId = "price"
    var desc = function(x, y) {
      return (x[colId] < y[colId]) ? 1 : -1
    }
    var arr2 = this.data.xsmscon;
    arr2.sort(desc);
    this.setData({
      xsmscon: arr2
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var xsms = wx.getStorageSync("miaosha")
    console.log(xsms)
    this.setData({
      xsmscon: xsms
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})