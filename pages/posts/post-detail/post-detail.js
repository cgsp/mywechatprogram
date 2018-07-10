Page({

  /**
   * 页面的初始数据
   */
  data: {
    collected: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const postId = options.postId;
    const collectArr = wx.getStorageSync('collectArr') || {};

    this.setData({
      postId: postId,
      collected: collectArr[postId] || false
    })

    console.log(this.data.collected);
    // debugger;
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

  collect() {
    // 异步
    // wx.setStorage({
    //   key: 'nameYibu',
    //   data: 'chang',
    // })

    // 同步
    // wx.setStorageSync('name', {
    //   'name': 'gsp'
    // });
    this.setData({
      collected: true
    });
    const collectArr = wx.getStorageSync('collectArr') || {};
    collectArr[this.data.postId] = true;
    wx.setStorageSync('collectArr', collectArr);
    // debugger;
  },

  cancleCollect() {
    this.setData({
      collected: false
    });
    const collectArr = wx.getStorageSync('collectArr') || {};
    collectArr[this.data.postId] = false;
    wx.setStorageSync('collectArr', collectArr);
  }
})