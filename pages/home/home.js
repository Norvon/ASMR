// pages/home/home.js
var utils = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cellListHeight: 0, // 列表高度
    albumDataList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.initUI()
    this.initData()

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

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
    this.getAlbumsData()
  },
  /**
   * 获取专辑列表
   */
  getAlbumsData() {
    let that = this;
    let albumsT = utils.getDBTable('albums')
    albumsT.get({
      success(albumsRes) {
        let albumsList = albumsRes.data
        that.getSoundsCount(albumsList)
      },
    })
  },
  
  getSoundsCount(albumsList) {
    let that = this;
    for (var i = 0; i < albumsList.length; i++) {
      var obj = albumsList[i]
      let album_id = obj['_id']
      let soundsT = utils.getDBTable('sounds')
      soundsT
        .where({
          'album_id': album_id
        })
        .count({
          success(soundsRes) {
            obj['sounds_count'] = soundsRes.total
            
            var tempData = that.data.albumDataList
            tempData.push(obj)
            that.setData({
              albumDataList: tempData
            })
          }
        })
    }
  },
  /**
   * 点击专辑列表
   */
  albumListCellClick(e) {
    console.log(e)
    let soundsId = JSON.stringify(e.currentTarget.dataset.soundsId)
    wx.navigateTo({
      url: '/pages/albumSoundsList/albumSoundsList?soundsId=' + escape(soundsId)
    })
  }
})