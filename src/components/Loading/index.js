/* eslint-disable */
//先引入loading组件
import LoadingComponent from './loading'
import Vue from 'vue'
    // 生成一个Vue的子类 同时这个子类也就是组件
    const LoadingConstructor = Vue.extend(LoadingComponent)
    // 生成一个该子类的实例
    const instance = new LoadingConstructor({
        el: document.createElement("div")
    })
    instance.show = false
    //注入vue的原型链
    const loading = {
        show() {
            instance.show = true
            document.body.appendChild(instance.$el)
        },
        hide() {
            instance.show = false
        }
    }
export default {
    install() {
        if (!Vue.$loading) {
            Vue.$loading = loading;
        }
        Vue.mixin({
            created() {
                this.$loading = Vue.$loading;
            }
        })
    }
}