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

    let continuePlay = (voice.voice_url == this.data.voice.voice_url)

    this.setData({
      title: title,
      topImageUrl: data.topImageUrl,
      voice: voice,
      voicePlayerHeight: (wx.getSystemInfoSync().windowHeight - 250 - 200),
    })

    this.playVoice(continuePlay)
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
        } 
        else if (status == 0 ) { // 暂停中 
          that.playVoice(true)
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
  playVoice(continuePlay) {
    const manager = wx.getBackgroundAudioManager()

    // 是否是继续播放
    if (!continuePlay) {
      manager.src = this.data.voice.voice_url
      manager.title =  '序号:' + this.data.title + ' 名称:' + this.data.voice.voice_name
    }

    // 播放  
    manager.play()

    // 按钮显示
    this.setData({
      isPlayer: true
    })

  

    let that = this;
    // 监听背景音频自然播放结束事件
    manager.onEnded((e) => {
      that.nextSongClick()
    })

    // 监听用户在系统音乐播放面板点击下一曲事件（仅iOS）
    manager.onNext((e) => {
      that.nextSongClick()
    })

  // 监听背景音频暂停事件
    manager.onPause((e) => {
      // 按钮显示
      that.setData({
        isPlayer: false
      })
    })

    // 监听背景音频播放事件
    manager.onPlay((e) => {
      // 按钮显示
      that.setData({
        isPlayer: true
      })
    })
    
    // 监听用户在系统音乐播放面板点击上一曲事件（仅iOS）
    manager.onPrev((e) => {
      that.previousClick()
    })
  }
})