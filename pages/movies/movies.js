const AppData = getApp().globalData;
const baseUrl = AppData.baseUrl;
const toStarsArrNoHalf = require('../../utils/utils.js').toStarsArrNoHalf;
const myThrottle = require('../../utils/utils.js').myThrottle;
let me = null;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: {},
    comingSong: {},
    top250: {},
    searchResult: false,
    value: '初始',
    searchList: {
      name: '',
      movies: []
    },
    start: 0,
    count: 20,
    searchUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    me = this;
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
  },
  bindfocus(e) {},
  bindblur() {},
  bindinput: myThrottle((e) => {
    let searchResult = false;
    if (!e.detail.value) {
      searchResult = false;
    } else {
      searchResult = true;
    }

    const url = baseUrl + '/v2/movie/search?q=' + e.detail.value;
    me.setData({
      searchResult: searchResult,
      searchUrl: url
    })
    me.handleAjax(url);
  }, 300),
  clear() {
    this.setData({
      value: '',
      searchResult: false,
      searchList: {
        name: '',
        movies: []
      }
    })
  },
  bindconfirm(e) {
    console.log(e.detail.value);
    this.setData({
      target: e.detail.value,
      searchResult: true
    })
  },
  handleAjax(url) {
    const that = this;
    this.getMoviesData(url, (res) => {
      // debugger;
      const arr = that.data.searchList.movies;
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
        searchList: {
          name: '搜索结果',
          movies: arr
        }
      })
    })
  },
  upper(e) {
    setTimeout(() => {
      console.log(e);
      console.log('顶部');
      this.setData({
        searchList: {
          name: '搜索结果',
          movies: []
        }
      })
      const start = 0;
      this.setData({
        start: start
      });
      let searchUrl = `${this.data.searchUrl}&start=${start * 20}&count=20`;
      this.handleAjax(searchUrl);
    }, 100)
  },
  lower(e) {
    const count = this.data.count;
    // debugger;
    if (count === 0) {
      console.log('没数据了');
      return;
    }
    const start = this.data.start + 1;
    this.setData({
      start: start
    });
    let searchUrl = `${this.data.searchUrl}&start=${start * 20}&count=20`;
    // console.log(e);
    console.log('到底了');
    this.handleAjax(searchUrl);
  }
})