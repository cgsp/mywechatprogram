const AppData = getApp().globalData;
const baseUrl = AppData.baseUrl;
const toStarsArrNoHalf = require('../../utils/utils.js').toStarsArrNoHalf;
// console.log(baseUrl);
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: {},
    comingSong: {},
    top250: {}
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
      const arr = this.handleMovieData(res.data.subjects);
      // debugger;
      this.setData({
        inTheaters: {
          name: '正在热映',
          movies: arr
        }
      })
    });

    this.getMoviesData(comingSongUrl, (res) => {
      const arr = this.handleMovieData(res.data.subjects);
      this.setData({
        comingSong: {
          name: '即将上映',
          movies: arr
        }
      })
    });

    this.getMoviesData(top250Url, (res) => {
      const arr = this.handleMovieData(res.data.subjects);
      this.setData({
        top250: {
          name: 'Top250',
          movies: arr
        }
      })
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
  },

  handleMovieData(data) {
    const arr = [];
    for (const k in data) {
      const item = data[k];
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
    return arr;
  },

  onMoreTap(e) {
    const title = e.currentTarget.dataset.title;
    wx.navigateTo({
      url: `more-movies/more-movies?title=${title}`
    })
  }

})