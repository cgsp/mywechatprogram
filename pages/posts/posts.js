const postDatas = require('../../mock/posts-data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      res: postDatas.postList
    });
    console.log('post页面load')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    console.log('post页面ready')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log('post页面show')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    console.log('post页面hide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    console.log('post页面unload')
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

  toDetail(e){
    console.log(e.currentTarget.dataset.postId);
    wx.navigateTo({
      url: 'post-detail/post-detail'
    })
  }
})