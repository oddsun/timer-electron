import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'

// import 'typeface-graduate/index.css'
import 'typeface-iceland/index.css'

import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
