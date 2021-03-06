// miniprogram/pages/mine/mine.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbar:{},
    userInfo: null,
    user: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    app.editTabbar()
    this.setData({
      user: app.globalData.user
    })
    wx.cloud.callFunction({
      name: 'getUserInfo',
      data: {
        userid: app.globalData.userid,
        fields: {
          "wxUserInfo.nickName": true,
          "wxUserInfo.avatarUrl": true,
          contact: true, // object：字段有email/phone
          createDate: true, // 注册时间 Datetime字符串
          "introduction": true // 指定所需要的字段
        },
        stats: true // 客户端从 res.result.stats 获取统计结果。返回值里面的 stats：对象，字段包括post, heart, collect, follower, following，均为number。
      }
    }).then(res => {
      console.log(res)
      this.setData({
        userInfo: res.result
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onLoad: function () {
    
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
    wx.cloud.callFunction({
      name: 'getUserInfo',
      data: {
        userid: app.globalData.userid,
        fields: {
          "wxUserInfo.nickName": true,
          "wxUserInfo.avatarUrl": true,
          contact: true, // object：字段有email/phone
          createDate: true, // 注册时间 Datetime字符串
          "introduction": true // 指定所需要的字段
        },
        stats: true // 客户端从 res.result.stats 获取统计结果。返回值里面的 stats：对象，字段包括post, heart, collect, follower, following，均为number。
      }
    }).then(res => {
      console.log(res)
      this.setData({
        userInfo: res.result
      })
    })
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
    return {
      title: 'Seeplore一站式留学信息共享平台',
      imageUrl: '../../images/Pikachu.jpg',
      path: '/pages/loginEntry/entry'
    }
  },

  onAgentApply: function() {
    wx.navigateTo({
      url: 'agentApply',
    })
  },

  onMyCollection: function() {
    wx.navigateTo({
      url: 'collectedPost?isMine=true',
    })
  },

  onMyFollow: function () {
    wx.navigateTo({
      url: 'follower?isFollow=true&userid=' + app.globalData.userid,
    })
  },

  onMyFollower: function () {
    wx.navigateTo({
      url: 'follower?isFollow=false&userid=' + app.globalData.userid,
    })
  },

  onMyPost: function () {
    wx.navigateTo({
      url: 'myPost?isMine=true',
    })
  },

  onMyInfo: function () {
    wx.navigateTo({
      url: 'userSite?isMine=' + true,
    })
  },

  onMyApply: function () {
    wx.navigateTo({
      url: 'myApply',
    })
  },

  onApplyCheck: function () {
    wx.navigateTo({
      url: 'applyCheck',
    })
  }
})