<template>
  <v-app :dark="dark_theme" style="background: rgba(0,0,0,0.8)">
    <v-toolbar app class="draggable" style="background: rgba(0,0,0,0.5)">
      <v-toolbar-title class="headline text-uppercase">
        <span>Timer</span>
        <!-- <span class="font-weight-light">MATERIAL DESIGN</span> -->
      </v-toolbar-title>
      <!-- <v-spacer></v-spacer> -->
      <!-- <v-btn flat @click='toggle_theme'><span class="mr-2">Change Theme</span></v-btn> -->
      <!-- <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn> -->
    </v-toolbar>

    <v-content>
      <!-- <HelloWorld/> -->
      <Timer/>
      <Timer/>
      <Timer/>
      <Timer/>
    </v-content>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld'
import Timer from './components/Timer'

export default {
  name: 'App',
  components: {
    // HelloWorld,
    Timer
  },
  data () {
    return {
      dark_theme: true,
    }
  },
  methods: {
    toggle_theme: function () {
      this.dark_theme = !this.dark_theme;
    }
  }
}
</script>

<style>
  .draggable {
      -webkit-app-region: drag;
  }
</style>
