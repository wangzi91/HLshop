// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartItems:[],
    choosecon:[],
    curNav: 1,
    curIndex: 0,
    storages:"",
    colors:"",
    HomeIndex: 0 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  gobuy:function(){
    if (this.data.colors == "" || this.data.storages == "") {
      wx.showToast({
        title: "请填写商品属性！",
        duration: 1200,
        icon: "none"
      })
      return false
    }
    wx.navigateTo({
      url: '../pay/pay',
    })
    var attr = {
      color: this.data.colors,
      storge: this.data.storages
    }
  
    wx.setStorageSync("attr", attr)
  },
  addcart: function (e) {
    if (this.data.colors == "" || this.data.storages == ""){
      wx.showToast({
        title: "请填写商品属性！",
        duration: 1200,
        icon:"none"
      })
      return false
      
    }
    var that = this
    var cartItems = wx.getStorageSync("cartItems") || []
    // var exist = cartItems.find(function (el) {
    //   return el.id == that.data.cartItems.id
    // })
    // if (exist) {
    //   exist.value = parseInt(exist.value) + 1
    // } else {
    //   cartItems.push({
    //     id: this.data.cartItems.id,
    //     title: this.data.cartItems.title,
    //     image: this.data.cartItems.image,
    //     price: this.data.cartItems.price,
    //     value: this.data.cartItems.value,
    //     selected: true,
    //     color:this.data.colors,
    //     storge: this.data.storages
    //   })
    // }
    cartItems.push({
      id: this.data.cartItems.id,
      title: this.data.cartItems.title,
      image: this.data.cartItems.image,
      price: this.data.cartItems.price,
      value: this.data.cartItems.value,
      selected: true,
      color: this.data.colors,
      storge: this.data.storages
    })



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
  switchRightTab: function (e) {
    var id = e.currentTarget.dataset.index,
      index = parseInt(e.target.dataset.index);
    var color = this.data.cartItems.classify[id].cate_name
    console.log(color)
    this.setData({
      curnav: id,
      curIndex: index,
      colors: color
    })
  },
  switchDownTab: function (e) {

    var cartItems = this.data.cartItems   //获取购物车列表  
    var index = e.currentTarget.dataset.index
    var storage = this.data.cartItems.classify[this.data.curIndex].children[index].name
    console.log(storage)
    var price = this.data.cartItems.classify[this.data.curIndex].children[index].price
    console.log(price)
    cartItems.price = price
    this.setData({
      curnav1: index,
      cartItems: cartItems,
      storages:storage,
     
    })
    wx.setStorageSync("newcate", cartItems)
  },
  boxtwo: function (e) {
    var index = parseInt(e.currentTarget.dataset.index)
    this.setData({
      HomeIndex: index
    })
  },
  
})