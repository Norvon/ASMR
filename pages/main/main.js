// pages/main/main.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataArr: [],
    isHideLoadMore: true,
    loadMoreMsg: '加载更多···',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getPicUrl();
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
    this.getPicUrl(true);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.setData({
      isHideLoadMore: false
    });
    this.getPicUrl();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /**
   * 发送获取图片URL
   */
  getPicUrl(isPullDownRefresh) {

    if (!isPullDownRefresh) {
      wx.showLoading({
        "title": '加载中···'
      });
    }
    
    let count = 20;
    let that = this;

    // 数据库
    wx.cloud.init();
    const db = wx.cloud.database({
      env: 'daily-fish-yun-2a3e79' // 云服务的 环境ID 需要替换为自己的
    });

    // 表
    let imgageT = db.collection('image'); // 云服务表名 需要替换为自己的表名

    // 查找
    imgageT
      .limit(count)
      .skip(this.data.dataArr.length)
      // .orderBy('image_id', 'desc')
      .where({
        // "author_name": "新浪"
      })
      .get({
        success(res) {

          // 请求成功
          let arr = res.data;
          let noMoreData = (arr.length <= 0);

          let dataArr = [];
          if (isPullDownRefresh) {
            dataArr = arr.concat(that.data.dataArr);
          } 
          else {
            dataArr = that.data.dataArr.concat(arr);
          }
           
          that.setData({
            dataArr: dataArr,
            isHideLoadMore: !noMoreData,
            loadMoreMsg: noMoreData ? "没有更多了" : "加载更多···"
          });

          // 隐藏加载
          wx.hideLoading();
          wx.stopPullDownRefresh();
        }
      });
  },

  /**
   * 点击cell
   */
  cellClick(e) {

    let imageArr = [];
    this.data.dataArr.map((item) => {
      imageArr.push(item.image_url)
    });

    let url = e.currentTarget.id;
  
    wx.previewImage({
      urls: imageArr,
      current: url
    })
  },

  /**
   * 点击关于按钮
   */
  clickAbuout(e) {
    wx.navigateTo({
      url: '/pages/about/about'
    });
  },
  /**
   * 点击返回
   */
  backClick() {
    wx.navigateBack({

    })
  },
});