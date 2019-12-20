// pages/shopcar/shopcar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts: [],  //存放数据
    hasList: false,
    deleteData: '',//当页面上没有数据时显示的
    selectAllStatus: false,    //全选状态
    totalPrice: 0,  //总价格
    totalCount: 0    //总数量
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that=this;
    wx.request({
      url: 'http://localhost:8080/cust/foodcar',
      data: {"type":"getall"},
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      dataType: 'JSON',
      success: (res) => {
        this.setData({
          hasList: true,
          carts: JSON.parse(res.data),
        })
        //显示页面时就调用总价格和总数量
        this.getTotalPrice();
        this.totalCount();
      },
    })
  },
  /**
   * 当前商品选中事件
   */
  handleselectList(e) {
    //获取当前的下标
    const index = e.currentTarget.dataset.index;
    //获取是否选中状态
    const selected = this.data.carts[index].selected;
    //默认全选的复选框是选中的
    this.data.selectAllStatus = true;
    //true --- false之间的切换
    this.data.carts[index].selected = !selected;
    //循环数组，判断选中还是未选中（selected）
    for (var i = this.data.carts.length - 1; i >= 0; i--) {
      if (!this.data.carts[i].selected) {
        this.data.selectAllStatus = false;
        break;
      }
    }
    this.setData({
      //让最后的结果显示在页面上
      carts: this.data.carts,
      selectAllStatus: this.data.selectAllStatus
    });
    this.getTotalPrice();
    this.totalCount();
  },
  /**
   * 数量增加事件
   */
  handleadd(e) {
    const index = e.currentTarget.dataset.index;
    const foodId = this.data.carts[index].foodByFoodId.foodId;
    wx.request({
      url: 'http://localhost:8080/cust/foodcar',
      data: {
        "type":"add",
        "qty":1,
        "foodId":foodId
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      dataType: 'JSON',
      success: (res) => {
        var s=JSON.parse(res.data)
        //显示页面时就调用总价格和总数量
        this.data.carts[index].qty = s.qty;
        this.getTotalPrice();
        this.totalCount();
      },
    })
  },
  /**
   * 数量减少事件
   */
  handleredus(e) {
    const index = e.currentTarget.dataset.index;
    const foodId = this.data.carts[index].foodByFoodId.foodId;
    if (this.data.carts[index].qty==1){
      wx.showModal({
        title: '提示',
        content: '数量不允许小于1',
        showCancel: false
      })
      return 0;
    }
    wx.request({
      url: 'http://localhost:8080/cust/foodcar',
      data: {
        "type": "add",
        "qty": -1,
        "foodId": foodId
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      dataType: 'JSON',
      success: (res) => {
        var s = JSON.parse(res.data);
        //显示页面时就调用总价格和总数量
        this.data.carts[index].qty = s.qty;
        this.getTotalPrice();
        this.totalCount();
      },
    })
  },
  /**
   * 删除事件
   */
  selectdel(e) {
    var select=null;
    for (var i = 0; i < this.data.carts.length; i++) {
      console.log(this.data.carts[i].selected);
      if(this.data.carts[i].selected){
        select=true;
      }
    }
    if(select){
      wx.showModal({
        title: '提示',
        content: '你确定要删除吗？',
        success:(res)=>{
          var car = this.data.carts;
          if (res.confirm) {
            for (var i = 0; i < this.data.carts.length; i++) {
              car = car.filter(item => {
                return item.selected!==true;
              })
            }
            this.setData({
              carts: car
            })
            if (!this.data.carts.length) {
              this.setData({
                hasList: false,
                deleteData: "购物车空空如也！"
              })
            } else {
              this.getTotalPrice();
              this.totalCount();
            }
          }
        }
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '你没有选中哦！',
        showCancel: false
      })
    }
  },
  handledel(e) {
    let index = e.currentTarget.dataset.index;
    var that = this;
    //选中时才可以删除
    if (that.data.carts[index].selected) {
      wx.showModal({
        title: '提示',
        content: '你确定要删除吗？',
        success(res) {
          if (res.confirm) {
            that.data.carts.splice(index, 1)
            that.setData({
              carts: that.data.carts
            })
            if (!that.data.carts.length) {
              that.setData({
                hasList: false,
                deleteData: "购物车空空如也！"
              })
            } else {
              that.getTotalPrice();
              that.totalCount();
            }
          }
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '你没有选中哦！',
        showCancel: false
      })
    }
  },
  /**
   * 总价
   */
  getTotalPrice() {
    let total = 0;
    let carts = this.data.carts
    for (let i = 0; i < carts.length; i++) {
      if (carts[i].selected) {
        total += carts[i].qty * carts[i].foodByFoodId.foodPrice;
      }
    }
    this.setData({
      carts: carts,  //渲染数据
      totalPrice: total.toFixed(2)
    })
  },
  /**
   * 总数量
   */
  totalCount() {
    let count = 0;
    let carts = this.data.carts;
    for (let i = 0; i < carts.length; i++) {
      if (carts[i].selected) {
        count += carts[i].qty;
      }
    }
    this.setData({
      carts: carts,
      totalCount: count
    })
  },
  /**
   * 全选状态
   */
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus;
    let carts = this.data.carts
    //开始的状态为未选中，当选中时执行以下代码
    //true---false之间的切换
    selectAllStatus = !selectAllStatus;
    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = selectAllStatus;
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      carts: carts
    });
    this.getTotalPrice();
  },
  tosettlement(){
    wx.navigateTo({
      url: '../settlement/settlement'
    })
  }
})