// components/shop_list/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    product: Object,
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    navigate(){
      wx.navigateTo({
        url:"/pages/detail/detail?id="+this.data.product.id
      })
    }
  }
})
