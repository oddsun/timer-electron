<template>
  <v-app style="background: rgba(255,255,255,0)">
    <v-toolbar app class="draggable" style='background: rgba(255,255,255,0.8)'>
      <v-toolbar-title class="headline text-uppercase">
        <span>Timer</span>
        <!-- <span class="font-weight-light">MATERIAL DESIGN</span> -->
      </v-toolbar-title>
      <!-- <v-spacer></v-spacer> -->
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
      //
    }
  }
}
</script>

<style>
  .draggable {
      -webkit-app-region: drag;
  }
</style>
