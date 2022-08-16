// pages/music/music.js
import Base from "../../utils/base1"
const base = new Base()
const bgm = wx.getBackgroundAudioManager()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    like: false,
    playing: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this._getData()
  },

  async _getData(){
    const newData = await base.request("latest",{appkey:"Xf7SpOfQYnREMLyV"})
    this.setData({newData})
    this.getMusic()
  },

  // 上一刊期、
  async prev(){
    const index = this.data.newData.index
    const newData = await base.request(`${index}/previous`,{appkey:"Xf7SpOfQYnREMLyV"})
    this.setData({newData})
    this.getMusic()
  },

  // 下一刊期
  async next(){
    const index = this.data.newData.index
    const newData = await base.request(`${index}/next`,{appkey:"Xf7SpOfQYnREMLyV"})
    this.setData({newData})
    this.getMusic()
  },

  // 判断时候歌曲的地址
  getMusic(){
      const newData = this.data.newData
    //   if(newData.type==200){
    //     bgm.title = newData.title;
    //     bgm.src = newData.url
    //   }
      const res = newData.pubdate,
      type = newData.type,
      num = newData.fav_nums,
      year = res.slice(0,4),
      moth = res.slice(5,7);
      this.setData({
        num,
        year,
        moth,
        type,
      })
      console.log(newData,type)
  },

  // 喜欢
  onTap(){
    if(!this.data.like){
      this.setData({
        like: true,
        num: this.data.num + 1,
      })
    }else{
      this.setData({
        like: false,
        num: this.data.num - 1,
      })
    }
  },

  // 音乐播放暂停
  toPlay(){
    if(this.data.palying){
        bgm.pause()
    }else{
        const {title,url} = this.data.newData
        bgm.src = url,
        bgm.title = title
    }
    this.setData({
        playing:!this.data.playing
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