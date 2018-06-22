// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curnav:"",
    // id:"",
    // title:"",
    // image:"",
    // price:"",
    // value:"",
    cartItems:[],
    // color:[]
    
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
  // // console.log(options.fid)
  // // console.log(options.ftitle)
  // // console.log(options.fimg)
  // // console.log(options.fprice)
  // // console.log(options.fvalue)
  // console.log(options.fcolor)

  // this.setData({
  //   id: options.fid,
  //   title: options.ftitle,
  //   image: options.fimg,
  //   price: options.fprice,
  //   value: options.fvalue,
  //   color: options.fcolor
  // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  // onReady: function () {
  
  // },
  // gopay:function(e){
  //   wx.navigateTo({
  //     url: '../pay/pay'
  //   })
  //   var cart = {
  //     id:this.data.id,
  //     title:this.data.title
  //   }
  //   wx.setStorage({
  //     key: "pay",
  //     data: cart
  //   })
    
  // },
  gobuy:function(){
    wx.navigateTo({
      url: '../pay/pay',
    })
  },


  addcart: function (e) {
    var that = this
    var cartItems = wx.getStorageSync("cartItems") || []
    var exist = cartItems.find(function (el) {
      return el.id == that.data.cartItems.id
    })
    if (exist) {
      exist.value = parseInt(exist.value) + 1
    } else {
      cartItems.push({
        id: this.data.cartItems.id,
        title: this.data.cartItems.title,
        image: this.data.cartItems.image,
        price: this.data.cartItems.price,
        value: this.data.cartItems.value,
        selected: true
      })
    }
    wx.showToast({
      title: "加入购物车成功！",
      duration: 1000
    })
    wx.setStorageSync("cartItems", cartItems)

  },
  add: function (e) {
    console.log(e)
    var cartItems = this.data.cartItems   //获取购物车列表
    var value = this.data.cartItems.value 
     value++
     console.log(value)
     cartItems.value = value
     this.setData({
       cartItems: cartItems
     })
    // this.getsumTotal()

     wx.setStorageSync("newcate", cartItems)  //存缓存
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
    // this.getsumTotal()
    wx.setStorageSync("newcate", cartItems)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var cartItems = wx.getStorageSync("newcate")
    
    this.setData({
      cartItems: cartItems
    })
     console.log(this.data.cartItems)
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
  ,
  clickatt:function(e){
    console.log(e)
    // var addprice = this.data.color.prices
    // console.log(addprice)
    this.setData({
      curnav:e.currentTarget.dataset.index
    })
  }
  
})