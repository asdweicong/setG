// pages/seeMore/seeMore.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    setGData:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var getCookieValue = getG('bindViewTapSetG')
    this.setData({ setGData: getCookieValue})
    console.log(getCookieValue)
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