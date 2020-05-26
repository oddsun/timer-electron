import Vue from 'vue'
import vuetify from './plugins/vuetify'
import App from './App.vue'

// import 'typeface-graduate/index.css'
import 'typeface-iceland/index.css'
import 'typeface-iceberg/index.css'
import 'typeface-roboto/index.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
// import '@mdi/font/css/materialdesignicons.css'

import db from './datastore'

// const Datastore = require('nedb')
// const db = new Datastore({
//   filename: `${process.env.NODE_ENV !== 'production' ? '.' : app.getAppPath('userData')}/data/timer.db`,
//   timestampData: true,
//   autoload: true
// })

Vue.config.productionTip = false
Vue.prototype.$db = db

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
