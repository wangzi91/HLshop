Page({
  data: {
    cartItems: [],
    startX: 0, //开始坐标
    startY: 0,
    showcart:true,
    showtot:false
  },
  //选择
  select: function (e) {
    var CheckAll = this.data.CheckAll;
    CheckAll = !CheckAll
    var cartItems = this.data.cartItems

    for (var i = 0; i < cartItems.length; i++) {
      cartItems[i].selected = CheckAll
    }

    this.setData({
      cartItems: cartItems,
      CheckAll: CheckAll
    })
    this.getsumTotal()
  },
  add: function (e) {
    var cartItems = this.data.cartItems   //获取购物车列表
    var index = e.currentTarget.dataset.index //获取当前点击事件的下标索引
    var value = cartItems[index].value  //获取购物车里面的value值

    value++
    cartItems[index].value = value;
    this.setData({
      cartItems: cartItems
    });
    this.getsumTotal()

    wx.setStorageSync("cartItems", cartItems)  //存缓存
  },

  //减
  reduce: function (e) {
    var cartItems = this.data.cartItems  //获取购物车列表
    var index = e.currentTarget.dataset.index  //获取当前点击事件的下标索引
    var value = cartItems[index].value  //获取购物车里面的value值

    if (value == 1) {
      value--
      cartItems[index].value = 1
    } else {
      value--
      cartItems[index].value = value;
    }
    this.setData({
      cartItems: cartItems
    });
    this.getsumTotal()
    wx.setStorageSync("cartItems", cartItems)
  },
  // 选择
  selectedCart: function (e) {

    var cartItems = this.data.cartItems   //获取购物车列表
    var index = e.currentTarget.dataset.index;  //获取当前点击事件的下标索引
    var selected = cartItems[index].selected;    //获取购物车里面的value值

    //取反
    cartItems[index].selected = !selected;
    this.setData({
      cartItems: cartItems
    })
    this.getsumTotal();
    wx.setStorageSync("cartItems", cartItems)
  },

  onLoad: function (e) {
  
    // if (!cartItems) {
    //   this.setData({
    //     showcart: true
    //   })
    // }
    // var that = this;
    // //common是自己写的公共JS方法，可忽略
    // // common.sys_main(app, that, e);
    // for (var i = 0; i < 10; i++) {
    //   this.data.cartItems.push({
    //     content: i + " 向左滑动删除哦,向左滑动删除哦,向左滑动删除哦,向左滑动删除哦,向左滑动删除哦",
    //     isTouchMove: false //默认隐藏删除
    //   })
    // }
    // this.setData({
    //   cartItems: this.data.cartItems
    // });
  }
  ,
  //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    this.data.cartItems.forEach(function (v, i) {
      if (v.isTouchMove)//只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      cartItems: this.data.cartItems
    })
  },
  //滑动事件处理
  touchmove: function (e) {
    var that = this,
      index = e.currentTarget.dataset.index,//当前索引
      startX = that.data.startX,//开始X坐标
      startY = that.data.startY,//开始Y坐标
      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
      //获取滑动角度
      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
    that.data.cartItems.forEach(function (v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    //更新数据
    that.setData({
      cartItems: that.data.cartItems
    })
  },
  /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  //删除事件
  del: function (e) {
    var cartItems = this.data.cartItems  
    //获取购物车列表
    var index = e.currentTarget.dataset.index  //获取当前点击事件的下标索引
    cartItems.splice(index, 1)
    this.setData({
      cartItems: cartItems
    });
    if (cartItems.length == 0) {
      console.log("购物车空")
      this.setData({
        cartList: true,
        // cartItems: cartItems,
        // // showcart:false
        showtot: false
      })
    }
    // if (cartItems.length) {
    //   this.setData({
    //     cartList: false,
    //   });
    // }
    this.getsumTotal()
    wx.setStorageSync("cartItems", cartItems)
  },
  onShow: function () {
    var cartItems = wx.getStorageSync("cartItems")

    this.setData({
      // cartList: false,
      cartItems: cartItems,
      // showcart:false
    })
    if (cartItems.length >= 1) {
      console.log(123)
      this.setData({
         cartList: false,
        // cartItems: cartItems,
        // // showcart:false
         showtot: true
      })
    }

    if (cartItems.length == 0 ) {
      console.log("购物车空")
      this.setData({
        cartList: true,
        // cartItems: cartItems,
        // // showcart:false
        showtot:false
      })
    }


     this.getsumTotal()
     

  },

  go: function (e) {
    this.setData({
      cartItems: []
    })
    wx.setStorageSync("cartItems", [])
  },


  //合计
  getsumTotal: function () {
    var sum = 0
    for (var i = 0; i < this.data.cartItems.length; i++) {
      if (this.data.cartItems[i].selected) {
        sum += this.data.cartItems[i].value * this.data.cartItems[i].price
      }
    }
    //更新数据
    this.setData({
      total: sum
    })
  },
})