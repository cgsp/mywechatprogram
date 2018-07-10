const AppData = getApp();

console.log(AppData.globalData.g_postId);

Page({

  /**
   * 页面的初始数据
   */
  data: {
    collected: false,
    isPlaying: AppData.globalData.g_playingMusic
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

    if (AppData.globalData.g_playingMusic && AppData.globalData.g_postId === this.data.postId) {
      this.setData({
        isPlaying: true
      })
    } else {
      this.setData({
        isPlaying: false
      })
    }

    wx.onBackgroundAudioPlay(() => {
      this.setData({
        isPlaying: true
      })

      AppData.globalData.g_playingMusic = true;
      AppData.globalData.g_postId = this.data.postId;
    })

    wx.onBackgroundAudioPause(() => {
      this.setData({
        isPlaying: false
      })

      AppData.globalData.g_playingMusic = false;
      AppData.globalData.g_postId = null;
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
    wx.showToast({
      title: '收藏成功',
      icon: 'success',
      duration: 2000,
      mask: true
    })
  },

  cancleCollect() {
    this.setData({
      collected: false
    });
    const collectArr = wx.getStorageSync('collectArr') || {};
    collectArr[this.data.postId] = false;
    wx.setStorageSync('collectArr', collectArr);
    wx.showToast({
      title: '取消成功',
      icon: 'success',
      image: '/images/avatar.png',
      duration: 2000,
      mask: true
    })
    // wx.showModal({
    //   title: '提示',
    //   content: '这是一个模态弹窗',
    //   cancelText: '残忍取消',
    //   cancelText: '残忍取消',
    //   cancelColor: 'red',
    //   confirmText: '继续挽留',
    //   confirmColor: 'green',
    //   success: function(res) {
    //     if (res.confirm) {
    //       console.log('用户点击确定')
    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // })

    // wx.showActionSheet({
    //   itemList: ['A', 'B', 'C'],
    //   itemColor: 'red',
    //   success: function(res) {
    //     console.log(res.tapIndex)
    //   },
    //   fail: function(res) {
    //     console.log(res.errMsg)
    //   }
    // })


  },

  share() {
    wx.showActionSheet({
      itemList: [
        '分享到朋友圈',
        '分享到微信好友',
        '分享到QQ',
        '分享到微博'
      ],
      // itemColor: 'red',
      success: function(res) {
        console.log(res.tapIndex)
      },
      fail: function(res) {
        console.log(res.errMsg)
        console.log('取消');
      }
    })
  },
  musicTap() {
    if (this.data.isPlaying) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlaying: false
      })
      AppData.globalData.g_playingMusic = false;
    } else {
      this.setData({
        isPlaying: true
      })
      wx.playBackgroundAudio({
        dataUrl: "http://dl.stream.qqmusic.qq.com/C400000ZIFcG2soEBZ.m4a?vkey=1544C54E19C1F23C60ED9DFAC5515D0BDE73B4537B9E9DAD4B08D38509DAF9712B52CCEB5B6B41EB790DEFF13AC8DFEB891FE21E3DA12CEE&guid=7805873585&uin=0&fromtag=66",
        title: "随便找的歌曲",
        coverImg: "https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E7%99%BE%E5%BA%A6%E5%9B%BE%E7%89%87&step_word=&hs=0&pn=109&spn=0&di=2591227870&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=0&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=undefined&cs=755255683%2C853164483&os=1707032616%2C744425739&simid=3364019822%2C123993936&adpicid=0&lpn=0&ln=1946&fr=&fmq=1531202349293_R&fm=&ic=undefined&s=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&ist=&jit=&cg=&bdtype=0&oriquery=&objurl=http%3A%2F%2Fpic.pc6.com%2Fup%2F2015-1%2F201501081123544676817.png&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3Brvm_z%26e3Bv54AzdH3Fj17AzdH3F0nam9_z%26e3Bip4s&gsm=3c&rpstart=0&rpnum=0&islist=&querylist="
      })

      AppData.globalData.g_playingMusic = true;
    }

  }
})