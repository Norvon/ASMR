// pages/albumSoundsList/albumSoundsList.js
var utils = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cellListHeight: '',
    soundsId: "",
    soundList: [],
    page: '',
    isHideLoadMore: true,
    loadMoreMsg: '加载更多···',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    let soundsId = JSON.parse(unescape(options.soundsId))
    this.setData({
      soundsId: soundsId
    })
    this.initUI()
    this.initData()
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
    console.log(12313)
    this.setData({
      isHideLoadMore: false
    });
    this.initData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 初始化UI
   */
  initUI() {
    // 设置状态栏颜色
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#ff0000'
    })

    this.setData({
      cellListHeight: (wx.getSystemInfoSync().windowHeight - 250),
    })
  },
  /**
   * 初始化数据
   */
  initData(isPullDownRefresh) {

    // if (!isPullDownRefresh) {
    //   wx.showLoading({
    //     "title": '加载中···'
    //   });
    // }

    let that = this;
    let count = 20;

    let soundsT = utils.getDBTable('sounds')

    soundsT
      .limit(count)
      .skip(this.data.soundList.length)
      .orderBy('_id', 'desc')

      .where({
        'album_id': that.data.soundsId
      })
      .get({
        success(res) {
          // 请求成功
          let arr = res.data;
          let noMoreData = (arr.length <= 0);

          let dataArr = [];

          if (isPullDownRefresh) {
            dataArr = arr.concat(that.data.soundList);
          }
          else {
            dataArr = that.data.soundList.concat(arr);
          }

          that.setData({
            soundList: dataArr,
            isHideLoadMore: !noMoreData,
            loadMoreMsg: noMoreData ? "没有更多了" : "加载更多···"
          });
        }
      })
  },
})