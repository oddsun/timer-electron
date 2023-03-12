import Vue from 'vue'
import Vuetify, {

} from 'vuetify/lib/framework'
// import {
//   Ripple
// } from 'vuetify/lib/directives';
// import '@mdi/font/css/materialdesignicons.css'
// bug in index.js in vue-cli-plugin-vuetify, add opts as parameter on line 7

Vue.use(Vuetify)

const opts = {
  icons: {
    iconfont: 'mdiSvg'
  },
  theme: {
    themes: {
      light: {
        primary: 'white'
        // primary: '#80D4FF',
        // secondary: '#FFAA80',
      }
    }
  }
}

export default new Vuetify(opts)
