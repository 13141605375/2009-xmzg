// pages/classFy/classFy.js
import Base from "../../utils/base"
const base = new Base();
const  localData = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curIndex: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    // 获取左侧数据
    await this._getData()
    // 获取右侧数据
    this.getRightData(0);
  },

  async _getData(){
    const res = await base.request("category/all")
    this.setData({product:res})
  },

  // 封装分类具体数据
  async getRightId(id){
    const products = await base.request("product/by_category",{ id })
    return products;
  },

  // 封装右侧数据渲染
  async getRightData(index){
    // 先查询记录是否有当前数据，有酒直接用
    if(localData[index]){
      this.setData(localData[index])
      return; 
    }
    // 记录册没有当前分类，需要去服务器重新加载
    const cate = this.data.product[index];
    const rightData = {
      img: cate.img.url,
      name: cate.name,
      products: await this.getRightId(cate.id),
    }
    this.setData({rightData})
    // 把当前分类数据保存至记录册
    localData[index] = rightData 
  },

  // 左侧点击切换事件
  onTap(e){
    const index = e.mark.index;
    this.setData({curIndex:index})
    this.getRightData(index)
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