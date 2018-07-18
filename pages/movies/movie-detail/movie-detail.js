const AppData = getApp().globalData;
const baseUrl = AppData.baseUrl;
const utils = require('../../../utils/utils.js');
Page({
  data: {
    movie: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.id);
    const title = options.title;
    wx.setNavigationBarTitle({
      title: title
    });
    const url = baseUrl + '/v2/movie/subject/' + options.id;
    this.handleAjax(url);
  },
  getMoviesData(url, handleRes) {
    wx.showLoading({
      title: '加载中',
    })
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

  handleAjax(url) {
    const that = this;
    this.getMoviesData(url, (res) => {
      var director = {
        avatar: "",
        name: "",
        id: ""
      }
      var data = res.data;
      if (!data) {
        return;
      }
      if (data.directors[0] != null) {
        if (data.directors[0].avatars != null) {
          director.avatar = data.directors[0].avatars.large

        }
        director.name = data.directors[0].name;
        director.id = data.directors[0].id;
      }
      var movie = {
        movieImg: data.images ? data.images.large : "",
        country: data.countries[0],
        title: data.title,
        originalTitle: data.original_title,
        wishCount: data.wish_count,
        commentCount: data.comments_count,
        year: data.year,
        generes: data.genres.join("、"),
        stars: utils.convertToStarsArray(data.rating.stars),
        score: data.rating.average,
        director: director,
        casts: utils.convertToCastString(data.casts),
        castsInfo: utils.convertToCastInfos(data.casts),
        summary: data.summary
      }
      that.setData({
        movie: movie
      })

      console.log(movie);
    })
  },

  viewImage(e) {
    const src = e.currentTarget.dataset.src;
    wx.previewImage({
      current: src, // 当前图的链接
      urls: [src] // 预览的图的链接
    })
  }

})