//fakeData.js

var fakeData = {
	item : {
    category: "饮料",
    imgSrc: "../../image/jihua1.jpg",
    title: "粥品",
    realPrice: 999,
    originalPrice: 1000,
    actName: ""
  },

 	data : ['全部', '美食', '甜品饮品', '超市便利', '蔬菜水果', '早餐', '正餐优选','夜宵'],

 	coupon : {
      couponPrice: 10,
      couponTitle: "虐狗必备优惠券",
      couponCondition: "满199使用",
      couponTimeStampStart: "2019-10-10",
      couponTimeStampEnd: "2021-10-10",
      couponStatus: 0
    },
	/**
   * 模仿后台传输数据项 - 请求分类项
   */
  requestForCategories: function() {
    return this.data;
  },

  /**
   * 模仿后台传输数据项 - 请求对应分类的商品
   * @param {number} first - 请求的头一项在数据库中的索引位置
   * @param {number} num - 请求的数据量
   * @param {string} itemType - 请求的数据所属类别，默认为"全部"，可不填
   * @return {array} itemsArr - 商品信息数组
   */
  requestForItemsOfType: function (first, num, itemType = '全部') {
  	var temp = this.item;
    temp.category = itemType;
    temp.title = itemType + " - 食品介绍文本"
    var itemsArr = [];
    for (var i = first; i < first + num; i++) {
      itemsArr.push(temp);
    }
    return itemsArr;
  },

  /**
   * 模拟向后台请求对应分类的商品
   * param {number} couponStatus - 0: 立即使用, 1: 点击领取, 2:已使用, 3:已过期
   */
  requestForCouponOfStatus: function (couponStatus) {
    var temp = this.coupon
    temp.couponStatus = couponStatus;
    var tempArr = [];
    for (var i = 0; i < 10; i++) {
      tempArr.push(temp);
    }
    return tempArr;
  },

   /**
   * 测试用函数 - 模仿后台传输数据项，请求活动项
   */
  requestForSaleActs: function() {
    var data = [];
    for (var i = 0; i < 3; i++) {
      data.push({
        actName: "计划主题" + i,
        actImgSrc: "../../image/jihua2.jpg"
      });
    }
    return data;
  },

  /**
   * 测试用函数 - 模仿后台传输数据项，请求对应活动项的商品
   * @param {number} first - 请求的头一项在数据库中的索引位置 
   * @param {number} num - 请求的数据量
   * @param {string} actName - 请求商品对应的活动名
   * @return {array} 商品信息数组
   */
  requestForItemsOfSaleAct: function (first, num, actName) {
    var temp = this.item;
    temp.actName = actName;
    temp.title = actName + " - 饮食计划介绍文本"
    var tempArr = [];
    for (var i = 0; i < num; i++) {
      tempArr.push(temp);
    }
    return tempArr;
  },

  /**
   * 测试用函数 - 模仿后台传输数据项，搜索数据请求
   * @param {number} num - 请求的数据量
   * @param {string} search - 搜索字段
   * @return {array} 商品信息数组
   */
  requestForItemsOfSearch: function (num, search) {
    var temp = this.item;
    var tempArr = [];
    temp.title = search;

    for (var i = 0; i < num; i++) {
      tempArr.push(temp);
    }
    return tempArr;
  }
}

module.exports = fakeData;