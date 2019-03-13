// pages/albumSoundsList/albumSoundsList.js
var utils = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cellListHeight: '',
    title: '',
    topImageUrl: '',
    soundsId: '',
    soundList: [],
    page: '',
    isHideLoadMore: true,
    loadMoreMsg: '加载更多···',
    isRefreshing: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    let data = JSON.parse(unescape(options.data))

    this.setData({
      soundsId: data.soundsId,
      title: data.albumName,
      topImageUrl: data.albumImageUrl
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
  initData() {

    if (this.data.isRefreshing) {
      return;
    }

    this.setData({
      isRefreshing: true
    })

    wx.showLoading({
      "title": '加载中···'
    });

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
          dataArr = that.data.soundList.concat(arr);

          that.setData({
            soundList: dataArr,
            isHideLoadMore: !noMoreData,
            loadMoreMsg: noMoreData ? "没有更多了" : "加载更多···"
          });
        },

        complete() {
          // 隐藏加载
          wx.hideLoading()
          that.setData({
            isRefreshing: false
          })

          // 隐藏底部提示
          setTimeout(function() {
            that.setData({
              isHideLoadMore: true
            })
          }, 300)
        }
        
      })
  },
/**
 * 滚动到底部
 */
  scrolltolower() {
    this.setData({
      isHideLoadMore: false
    });
    this.initData();
  },
  /**
   * 点击cell 跳转
   */
  soundListCellClick(e) {
    
    let obj = {}
    obj["topImageUrl"] = this.data.topImageUrl
    let data = JSON.stringify(obj)
    
    wx.navigateTo({
      url: '/pages/voiceDetail/voiceDetail?data=' + data
    })

    const app = getApp()
    app.globalData.voiceList = JSON.stringify(this.data.soundList)
    app.globalData.currentVoiceIndex = e.currentTarget.dataset.currentVoiceIndex
  },
  /**
   * 点击返回
   */
  backClick() {
    wx.navigateBack({
      
    })
  },
})