import Vue from 'vue';
import Vuetify, {

} from 'vuetify/lib';
// import {
//   Ripple
// } from 'vuetify/lib/directives';
// import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdiSvg',
  },
  theme: {
    themes: {
      light: {
        primary: 'white',
        // primary: '#80D4FF',
        // secondary: '#FFAA80',
      },
    },
  },
});