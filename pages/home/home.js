// pages/home/home.js
var localData = require('./data.js')
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
  onLoad: function (options) {

    // wx.cloud.init({
    //   traceUser: true,
    //   env: 'asmr-db-b1d6d1'
    // })

    wx.cloud.init();
    const asmrDB = wx.cloud.database({
      env: 'asmr-db-b1d6d1'
    })

    let albumsT = asmrDB.collection("albums")

    albumsT
      // .orderBy('album_name', 'desc')
      .where({
      // '_id': 'XIXHjXkPDdDCJ629'
      })
      .get({
        success(res) {
          var name = res.data[0].album_name

          console.log(unescape((name.replace(/\\u/gi, '%u'))))
        }
      })

    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#ff0000',
    })
    console.log(localData.dataJson);
    this.setData({
      cellListHeight: (wx.getSystemInfoSync().windowHeight - 250),
      albumDataList: localData.dataJson
    })
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
   * 点击专辑列表
   */
  albumListCellClick(e) {
    let album = JSON.stringify(e.currentTarget.dataset.album)
    wx.navigateTo({
      url: '/pages/albumDetail/albumDetail?album=' + escape(album)
    })
  }
})