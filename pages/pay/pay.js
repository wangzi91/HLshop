// pages/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartItems: [],
    id: "",
    title: "",
    image: "",
    price: "",
    value: "",
    total:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.fid)
    console.log(options.ftitle)
    console.log(options.fimg)
    console.log(options.fprice)
    console.log(options.fvalue)

    this.setData({
      id: options.fid,
      title: options.ftitle,
      image: options.fimg,
      price: options.fprice,
      value: options.fvalue,
    })

  },
  add: function (e) {
    var value = this.data.value  //获取购物车里面的value值

    value++

    this.setData({
      value: value
    });
    this.getsumTotal();
  },

  //减
  reduce: function (e) {
    var value = this.data.value  //获取购物车里面的value值

    if (value == 1) {
      value--
      this.data.value.value = 1
    } else {
      value--
      this.data.value = value;
    }
    this.setData({
      value: value
    });
    this.getsumTotal();
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
     
    // console.log(wx.getStorageSync("pay"))
    // this.setData({
    //   // cartList: false,
    //   cartItems: cartItems,
    //   // showcart:false
    // })
    // console.log(cartItems)
    this.getsumTotal();
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
  
  },
  getsumTotal: function () {
    var sum = this.data.value * this.data.price
  
    //更新数据
    this.setData({
      total: sum
    })
  },
})