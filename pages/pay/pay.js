// pages/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartItems:[],
    total:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.fid)
    // console.log(options.ftitle)
    // console.log(options.fimg)
    // console.log(options.fprice)
    // console.log(options.fvalue)

    // this.setData({
    //   id: options.fid,
    //   title: options.ftitle,
    //   image: options.fimg,
    //   price: options.fprice,
    //   value: options.fvalue,
    // })

  },
  add: function (e) {
    var cartItems = this.data.cartItems   //获取购物车列表
    var value = this.data.cartItems.value
    value++
    cartItems.value = value
    this.setData({
      cartItems: cartItems
    })
    this.getsumTotal();
  },

  //减
  reduce: function (e) {
    var cartItems = this.data.cartItems  //获取购物车列表
    var value = cartItems.value  //获取购物车里面的value值
    if (value == 1) {
      value--
      cartItems.value = 1
    } else {
      value--
      cartItems.value = value;
    }
    this.setData({
      cartItems: cartItems
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
     
     var pay = wx.getStorageSync("newcate")

    this.setData({
      // cartList: false,
      cartItems:pay,
      // showcart:false
    })
    console.log(this.data.cartItems)
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
   
    var sum = this.data.cartItems.value * this.data.cartItems.price
    console.log(sum)
    //更新数据
    this.setData({
      total: sum
    })
  },
})