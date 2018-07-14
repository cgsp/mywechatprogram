const AppData = getApp().globalData;
const baseUrl = AppData.baseUrl;
console.log(baseUrl);
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const params = '?start=0&count=3';
    const inTheatersUrl = baseUrl + '/v2/movie/in_theaters' + params;
    const comingSongUrl = baseUrl + '/v2/movie/coming_soon' + params;
    const top250Url = baseUrl + '/v2/movie/top250' + params;

    this.getMoviesData(inTheatersUrl, (res) => {
      console.log(res.data.subjects);
    });

    this.getMoviesData(comingSongUrl, (res) => {
      console.log(res.data.subjects);
    });

    this.getMoviesData(top250Url, (res) => {
      console.log(res.data.subjects);
    })

  },

  getMoviesData(url, handleRes) {
    wx.request({
      url: url,
      data: {},
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        res && handleRes(res);
      },
      fail: function(res) {
        console.log('fail');
        console.log(res);
      }
    })
  }

})