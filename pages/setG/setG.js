// pages/setG/setG.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchCode:1,
    setGData:{
      a: 50,//单期数量
      b: 3,//叠加倍数
      c: 3,//循环期数
      d: 0,//总回报
      _data: [],//每期数
    }
  },
  bindViewTapDetail: function () {
    wx.navigateTo({
      url: '../seeMore/seeMore'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.showModal({
    //   title: '提示',
    //   content: '这是一个模态弹窗',
    //   success: function (res) {
    //     if (res.confirm) {
    //       console.log('用户点击确定')
    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var getCookie = function (name) {
      return wx.getStorageSync(name)
    };
    var clearCookie = function () {
      localStorage.clear()
    }
    var getG = function (name) {
      var that = this;
      if (getCookie(name)) {
        var data = getCookie(name);
        return data;
      }
    };
    console.log(getG('bindViewTapSetG'))
  },
  
  getSearchInput(e) {
     this.searchCode = e.detail.value;
  },
  getSearchValue() {
    this.getSaveSearchValue('searchCode', this.searchCode)
  },
  getSaveSearchValue(name, value) {// 存值入栈
    var data = {};
    data[name] = value;
    this.setData(data)
  }, 
  bindViewTapSetG: function () {
    console.log('bindViewTapSetG()');
    var data = this.data;
    data.setGData._data.push(this.data.searchCode);
    this.setData(data)
    console.log(data)

    wx.setStorageSync('bindViewTapSetG', this.data.setGData)
  },
  bindViewTapDeleteSetG: function () {
    console.log('bindViewTapDeleteSetG()');
    wx.removeStorage({
      key: 'bindViewTapSetG',
      success(res) {
        console.log("缓存已清理")
      }
    })
    wx.removeStorageSync('bindViewTapSetG');
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
})