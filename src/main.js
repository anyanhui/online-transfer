// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import * as filters from './filter/filter'
import App from './App'

Vue.config.productionTip = false

Vue.use(VueResource);

// 对filter的使用
Object.keys(filters).forEach((key)=> {
  Vue.filter(key, filters[keys])
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
