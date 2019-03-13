// pages/voiceDetail/voiceDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    topImageUrl: '',
    voice: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let data = JSON.parse(unescape(options.data))

    const app = getApp()
    let voiceList = JSON.parse(app.globalData.voiceList)
    let currentVoiceIndex = app.globalData.currentVoiceIndex
    let voidce = voiceList[currentVoiceIndex] 

    let title = (currentVoiceIndex + 1) + "/" + voiceList.length

    this.setData({
      title: title,
      topImageUrl: data.topImageUrl
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
  * 点击返回
  */
  backClick() {
    wx.navigateBack({

    })
  },
})