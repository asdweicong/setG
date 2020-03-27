// pages/setG/setG.js
var setDefaultData = function () {
  return {
    a: 50, //单期数量
    h: 0, //下注数量
    b: 3, //叠加倍数
    i: 1, //叠加次数
    j: 2, //循环个数
    k: 2, //循环轮数
    c: {
      value: 2,
      value_: 1,
      valueDefault: 1,
      next: false,
    }, //循环期数
    d: 0, //总回报
    e: {
      value: '单',
      bool: false //false-->单  true-->双
    }, //当前下注单双
    f: {
      value: '小',
      bool: false //false-->小  true-->大
    }, //当前下注大小
    g: false, //false -->大小  、true -->单双
    _data: [], //每期数
  }
};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchCode: 1,
    setGData: new setDefaultData()
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
  getSaveSearchValue(name, value) { // 存值入栈
    var data = {};
    data[name] = value;
    this.setData(data)
  },
  bindViewTapSetG: function () {
    console.log('bindViewTapSetG()');
    var data = this.data;
    var object = {
      value: this.data.searchCode,
      size: this.data.searchCode < 5 ? '小' : '大',
      singleAndDouble: (this.data.searchCode % 2 == 0) ? '双' : '单',
      sizeWin: false,
      singleAndDoubleWin: false,
      win: false,
    }
    data.setGData._data.splice(0, 0, object);
    data.setGData = this.setNextValue(data.setGData);
    this.setData(data);
    wx.setStorageSync('bindViewTapSetG', this.data.setGData)
  },
  setNextValue: function (setGData) {
    if (setGData.c.value_ == setGData.c.value) {
      setGData.c.value_ = setGData.c.valueDefault;
      setGData.e.bool = !setGData.e.bool;
      setGData.f.bool = !setGData.f.bool;
    } else {
      setGData.c.value_++;
    }
    console.log(setGData.c.value_)
    if (setGData.e.bool) {
      setGData.e.value = '双';
    } else {
      setGData.e.value = '单';
    }
    if (setGData.f.bool) {
      setGData.f.value = '小';
    } else {
      setGData.f.value = '大';
    }
    setGData._data[0].e = JSON.parse(JSON.stringify(setGData.e));
    setGData._data[0].f = JSON.parse(JSON.stringify(setGData.f));
    try {
      if (setGData._data[1].size == setGData.f.value) {
        setGData._data[0].sizeWin = true
      }
      if (setGData._data[1].size == setGData.f.value) {
        setGData._data[0].singleAndDoubleWin = true
      }
    } catch (error) {

    }
    if (setGData._data.g) {
      if (setGData._data[0].sizeWin) {
        setGData.i = 0;
        setGData._data[0].win = true;
      } else {
        setGData.i++;
      }
    }
    if (!setGData._data.g) {
      if (setGData._data[0].singleAndDoubleWin) {
        setGData.i = 0;
        setGData._data[0].win = true;
      } else {
        setGData.i++;
      }
    }

    if (setGData._data[0].win) {
      setGData.d += setGData.h
      setGData.h = setGData.a;
      setGData.i = 0;
    } else {
      setGData.d -= setGData.h
      if (setGData.h == 0) {
        setGData.h = setGData.a;
      }
      if (setGData.i >= (setGData.j * setGData.k)) {
        setGData.h = setGData.a;
      } else {
        setGData.h = setGData.h * setGData.b;
      }
    }
    console.log(setGData)
    return setGData;
  },
  sizeFilter: function (value) {
    console.log('sizeFilter', value)
    if (value) {
      return '小'
    } else {
      return '大'
    }
  },
  singleAndDoubleFilter: function (value) {
    console.log('singleAndDoubleFilter', value)
    if (value) {
      return '双'
    } else {
      return '单'
    }
  },
  bindViewTapDeleteSetG: function () {
    console.log('bindViewTapDeleteSetG()');
    this.setData({
      setGData: new setDefaultData()
    });
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