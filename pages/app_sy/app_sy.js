// pages/app_sy/app_sy.js
import Base from "../../utils/base"
const base = new Base()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this._getData()
  },

  async _getData(){
    const res = await base.request("banner/1")
    this.setData({
      banner: res.items,
    })
    const res1 = await base.request("theme?ids=1,2,3")
    this.setData({
      theme: res1,
    })
    const res2 = await base.request("product/recent")
    this.setData({
      recent: res2,
    })
    console.log(res2)
  },

  naviTo(e){
    const id = e.mark.id
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})