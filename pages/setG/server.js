var server = {
  getG: function (data) {
    var that = this;
    console.log(data)
    if (that.getCookie()){
      data = that.getCookie();
    }
  },
  getCookie: function (name) {
    return wx.getStorageSync(name)
  },
  setCookie: function (name, value) {
    wx.setStorageSync(name, value)
  },
  deleteCookie: function (name) {
    wx.removeStorage({
      key: name,
      success(res) {
        console.log("缓存已清理")
      }
    })
    wx.removeStorageSync(name);
  },
  clearCookie: function () {
    localStorage.clear()
  }
};
module.exports.server = server;