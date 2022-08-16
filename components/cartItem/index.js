// components/cartItem/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        cart: Object,
    },

    /**
     * 组件的初始数据
     */
    data: {
        select:"/images/icon/circle@selected.png",
        noselect:"/images/icon/circle@noselected.png",
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // + 按钮操作
        onAdd(){
            // 选获取当前操作商品的id
            const id = this.properties.cart.id
            // 通知页面我点击了 + 按钮
            this.triggerEvent("changeCounts",{id,type:"add"})
        },
        // - 按钮操作
        onCut(){
            const id = this.properties.cart.id
            this.triggerEvent("changeCounts",{id,type:"cut"})
        },
        onDel(){
            const id = this.properties.cart.id
            this.triggerEvent("del",{id})
        },
        // 单选操作
        onSelect(){
            const id = this.properties.cart.id
            this.triggerEvent("changeCounts",{id,type:"select"})
        },
    }
})
