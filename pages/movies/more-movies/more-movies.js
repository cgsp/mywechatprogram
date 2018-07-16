// pages/movies/more-movies/more-movies.js
const AppData = getApp().globalData;
const baseUrl = AppData.baseUrl;
const toStarsArrNoHalf = require('../../../utils/utils.js').toStarsArrNoHalf;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [],
    url: '',
    start: 0,
    count: 20,
    threshold: 500
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const title = options.title;
    let url = '';
    const that = this;
    console.log(title);
    wx.setNavigationBarTitle({
      title: title
    });


    switch (title) {
      case '正在热映':
        url = baseUrl + '/v2/movie/in_theaters';
        break;
      case '即将上映':
        url = baseUrl + '/v2/movie/coming_soon';
        break;
      case 'Top250':
        url = baseUrl + '/v2/movie/top250';
        break;
    }

    this.setData({
      url: url
    })
    this.handleAjax(url);
  },

  handleAjax(url) {
    const that = this;
    this.getMoviesData(url, (res) => {
      // debugger;
      const arr = that.data.movies;
      const dataArr = res.data.subjects;
      const count = res.data.count;
      that.setData({
        count: count
      })
      for (const k in dataArr) {
        const item = dataArr[k];
        let title = item.title;
        if (title.length > 6) {
          title = title.substr(0, 6) + '...';
        }
        const temp = {
          title: title,
          average: item.rating.average,
          coverageUrl: item.images.large,
          movieId: item.id,
          stars: toStarsArrNoHalf(item.rating.stars)
        }
        // debugger;
        arr.push(temp);
      }
      that.setData({
        movies: arr
      })
    })
  },

  getMoviesData(url, handleRes) {
    wx.showLoading({
      title: '加载中',
    })
    // wx.showNavigationBarLoading('正在加载');


    wx.request({
      url: url,
      data: {},
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        res && handleRes(res);
        setTimeout(function() {
          wx.hideLoading();
          // wx.hideNavigationBarLoading();
        }, 200)
      },
      fail: function(res) {
        console.log('fail');
        console.log(res);
      }
    })
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
    console.log('刷新');
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
  upper(e) {
    setTimeout(() => {
      console.log(e);
      console.log('顶部');
      this.setData({
        movies: []
      })
      const start = 0;
      this.setData({
        start: start
      });
      let url = `${this.data.url}?start=${start * 20}&count=20`;
      this.handleAjax(url);
    }, 100)
  },
  lower(e) {
    const count = this.data.count;
    if (count === 0) {
      console.log('没数据了');
      return;
    }
    const start = this.data.start + 1;
    this.setData({
      start: start
    });
    let url = `${this.data.url}?start=${start*20}&count=20`;
    console.log(e);
    console.log('到底了');
    this.handleAjax(url);
  }

})