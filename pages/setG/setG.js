// pages/setG/setG.js
var setDefaultData = function () {
  return {
    a: 50, //单期数量
    h: 50, //下注数量
    b: 3, //叠加倍数
    i: 1, //叠加次数
    j: 2, //循环个数
    k: 2, //循环轮数
    c: {
      value_: 1,
      valueDefault: 1,
      next: false,
    }, //循环期数
    d: 0, //总回报
    e: {
      value: '单',
      bool: false //false-->单  true-->双
    }, //当前下注单双
    // f: {
    //   value: '小',
    //   bool: false //false-->小  true-->大
    // }, //当前下注大小
    g: false, //true -->大小  false -->单双
    _data: [{
      value: 1,
      size: '小',
      singleAndDouble: '单',
      sizeWin: true,
      singleAndDoubleWin: true,
      win: true,
    }], //每期数
  }
};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchCode: '',
    changeValue: '',
    checked:{
      value:1,
      num:[1,2,3,4]
    },
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
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    var data = {
      checked:{
        value:e.detail.value,
      }
    }
    this.setData(data)
  },
  getSearchInput(e) {
    this[e.currentTarget.id] = e.detail.value;
  },
  getSearchValue(e) {
    this.getSaveSearchValue(e.currentTarget.id, this[e.currentTarget.id])
  },
  getSaveSearchValue(name, value) { // 存值入栈
    var data = {};
    data[name] = value;
    this.setData(data)
  },
  bindViewTapChange:function(){
    var data = this.data;
    var checked = this.data.checked;
    var changeValue = this.data.changeValue;
    checked.value = parseInt(checked.value);
    console.log(checked.value,typeof checked.value)
    switch (checked.value){
      case 1:{
        data.setGData.a = changeValue
        break;
      }
      case 2:{
        data.setGData.b = changeValue
        break;
      }
      case 3:{
        data.setGData.j = changeValue;
        break;
      }
      case 4:{
        data.setGData.k = changeValue;
        break;
      }
    }
    this.setData(data)
  },
  bindViewTapSetG: function () {
    var data = this.data;
    console.log('bindViewTapSetG()',data.searchCode);

    var object = {
      value: data.searchCode,
      size: data.searchCode < 5 ? '小' : '大',
      singleAndDouble: (data.searchCode % 2 == 0) ? '双' : '单',
      sizeWin: false,
      singleAndDoubleWin: false,
      win: false,
    }
    data.setGData._data.splice(0, 0, object);
    data.setGData = this.setTheWin(data.setGData);
    data.setGData = this.setAllWin(data.setGData);
    data.setGData = this.setCAndE(data.setGData);
    data.setGData = this.setNextValue(data.setGData);
    this.setData(data);
    wx.setStorageSync('bindViewTapSetG', this.data.setGData)
  },
  setCAndE:function(setGData){
    if (setGData.c.value_ == setGData.j) {
      setGData.c.value_ = setGData.c.valueDefault;
      setGData.e.bool = !setGData.e.bool;
    } else {
      setGData.c.value_++;
    }
    if (setGData.e.bool) {
      setGData.e.value = '双';
    } else {
      setGData.e.value = '单';
    }
    return setGData
  },
  setTheWin:function(setGData){
    setGData._data[0].e = JSON.parse(JSON.stringify(setGData.e));
    if (!setGData._data.g) {
      if (setGData._data[0].singleAndDouble == setGData.e.value) {
        setGData._data[0].singleAndDoubleWin = true
      }  
    }
    return setGData;
  },
  setAllWin:function(setGData){
    if (!setGData._data.g) {
      setGData._data[0].win = setGData._data[0].singleAndDoubleWin;
    }
    return setGData;
  },
  setNextValue: function (setGData) {
    console.log(setGData._data[0].win,setGData.i)
    if (setGData._data[0].win) {
      setGData.d += setGData.h
      setGData.h = setGData.a;
      setGData.i = 0;
    } else {
      setGData.d -= setGData.h
      if (setGData.i >= (setGData.j * setGData.k)) {
        setGData.h = setGData.a;
        setGData.i = 0;
      } else {
        setGData.i ++;
        setGData.h = setGData.h * setGData.b;
      }
    }
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
      searchCode:0,
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