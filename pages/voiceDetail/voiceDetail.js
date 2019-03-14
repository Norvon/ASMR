// pages/voiceDetail/voiceDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    topImageUrl: '',
    voice: {},
    voicePlayerHeight: '',
    isPlayer: Boolean
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let data = JSON.parse(unescape(options.data))

    const app = getApp()
    let voiceList = JSON.parse(app.globalData.voiceList)
    let currentVoiceIndex = app.globalData.currentVoiceIndex
    let voice = voiceList[currentVoiceIndex] 

    let title = (currentVoiceIndex + 1) + "/" + voiceList.length


    this.setData({
      title: title,
      topImageUrl: data.topImageUrl,
      voice: voice,
      voicePlayerHeight: (wx.getSystemInfoSync().windowHeight - 250 - 60),
    })

    this.playVoice()
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
  /**
   * 上一首
   */
  previousClick() {
    let app = getApp()
    let voiceList = JSON.parse(app.globalData.voiceList)

    if (app.globalData.currentVoiceIndex > 0) {
      app.globalData.currentVoiceIndex = app.globalData.currentVoiceIndex - 1
    }

    let currentVoiceIndex = app.globalData.currentVoiceIndex
    let voice = voiceList[currentVoiceIndex]

    let title = (currentVoiceIndex + 1) + "/" + voiceList.length

    this.setData({
      title: title,
      voice: voice
    })

    this.playVoice()
  },
  /**
   * 开始播放
   */
  beginPlayerClick() {

    let that = this;
    wx.getBackgroundAudioPlayerState({
      success(res) {
        const status = res.status
        if (status == 1) { // 播放中
          wx.getBackgroundAudioManager().pause()
          that.setData({
            isPlayer: false
          })
        } 
        else if (status == 0 ) { // 暂停中 
          that.playVoice()
        }
        else if (status == 2) { // 没有音乐播放
          that.playVoice()
        }
      },
      fail(res) {
        console.log(res)
      }
    })
  },

  /**
   * 下一首
   */
  nextSongClick() {
    let app = getApp()
    let voiceList = JSON.parse(app.globalData.voiceList)
    
    if (app.globalData.currentVoiceIndex < voiceList.length - 1) {
      app.globalData.currentVoiceIndex = app.globalData.currentVoiceIndex + 1
    }

    let currentVoiceIndex = app.globalData.currentVoiceIndex
    let voice = voiceList[currentVoiceIndex]

    let title = (currentVoiceIndex + 1) + "/" + voiceList.length

    this.setData({
      title: title,
      voice: voice
    })

    this.playVoice()
  },
/**
 * 播放声音
 */
  playVoice() {
    const manager = wx.getBackgroundAudioManager()
    manager.src = this.data.voice.voice_url
    manager.title = this.data.voice.voice_name

    manager.play()
    this.setData({
      isPlayer: true
    })
  }
})