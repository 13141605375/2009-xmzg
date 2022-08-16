// pages/detail/detail.js
import Base from "../../utils/base"
const base = new Base()
// 定义全局变量求飞入购物车图标横向平移距离
let x = 0;
let y = 0;
// 定义全局变量充当购物车
let cartArr = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr:[1,2,3,4,5,6,7,8,9,10],
    num: 1,
    btnList:["产品详情","产品参数","售后保障"],
    curIndex: 0,
    isFly: false,
    isScale: false,
    translateStyle: "translate(0px)"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const id = options.id
    this.data.id = id
    this._getData(id)
  },

  async _getData(id){
    const detailData = await base.request(`product/${this.data.id}`)
    console.log(detailData)
    this.setData({detailData})
  },

  // 点击切换
  onTap(e){
    const index = e.mark.index
    this.setData({curIndex:index})
  },

  // picker数量选择
  onChange(e){
      // 拿到选中的数量对应的下标
    const index = e.detail.value
    this.setData({
        num: this.data.arr[index]
    })
  },
  // 点击加入购物车
  onAddCart(){
    // 当前有商品在飞，请稍等
    if(this.data.isFly){
        return;
    }
    this.setData({
        isFly: true,
        isScale: false,
    })
    // 数量增加
    this.addCart()
    // 商品飞入购物车效果
    this.flyCart()
  },

    //  更新商品数量
    addCart(){
      // 先从购物车中找是否有这件商品有就更新数量，没有则打包
      const pro = cartArr.find(item=>{
        return item.id == this.data.id
      })
      if(pro){
        // 说明有这件商品，刷新数量
        pro.count += this.data.num
      }else{
        // 购物车没有这件商品，需要打包数据
        // 将当前要加入购物车的数据打包
        const a = this.data.detailData
        console.log(a)
        const product = {
            imgSrc: a.main_img_url,
            name: a.name,
            price: a.price,
            id: a.id,
            count: this.data.num,
            status: true,
        }
        cartArr.push(product)
      }
        // 更新缓存： 将当前购物车存入缓存
        wx.setStorageSync("cart",cartArr)
        // 更新购物车总数
        this.getTotal()             
    },

    getTotal(){
        let sum = 0
        cartArr.forEach(item=>{
            sum += item.count
        })
        console.log(sum)
        this.setData({sum})
    },
    // 商品飞入购物车
    flyCart(){
        // 平移距离 = fixed_box.left - s_gwc.left
            const query =  wx.createSelectorQuery();
            query
                .select(".header_img").boundingClientRect()
                .select(".add_img").boundingClientRect()
                .exec(res=>{
                    // 求横向平移距离
                    x = (res[0].left - res[1].left) + (res[0].width-res[1].width)/2
                    // 求纵向平移距离
                    y = res[1].top - res[0].top - (res[0].height - res[1].height)/2
                })
            this.setData({
                translateStyle: `translate(${x}px,-${y}px) scale(0.4)`
            })
        // 飞入后回归原位
        setTimeout(()=>{
            // 将商品添加至购物车
            // this.addCart()
            this.setData({
                isFly: false,
                isScale: true,
                translateStyle: `translate(0px)`,
            })
        },600)
    },

    // 跳转至购物车 
    navigate(){
      wx.reLaunch({
        url: "/pages/cart/cart",
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
    // 重新获取缓存
    cartArr = wx.getStorageSync("cart") || [];
    // 更新购物车总数
    this.getTotal()
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