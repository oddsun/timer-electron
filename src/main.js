import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'

// import 'typeface-graduate/index.css'
import 'typeface-iceland/index.css'

import vuetify from './plugins/vuetify'
import db from './datastore'

// const Datastore = require('nedb')
// const db = new Datastore({
//   filename: `${isDevelopment ? '.' : app.getAppPath('userData')}/data/timer.db`,
//   timestampData: true,
//   autoload: true
// })

Vue.config.productionTip = false
Vue.prototype.$db = db

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')