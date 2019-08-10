<template>
<v-app :dark="dark_theme" style="background: rgba(0,0,0,0.7)">
  <!-- <v-toolbar app class="draggable" style="background: rgba(0,0,0,0.7)">
      <v-toolbar-title class="headline text-uppercase">
        <span>Timer</span> -->
  <!-- <span class="font-weight-light">MATERIAL DESIGN</span> -->
  <!-- </v-toolbar-title> -->
  <!-- <v-spacer></v-spacer> -->
  <!-- <v-btn flat @click='toggle_theme'><span class="mr-2">Change Theme</span></v-btn> -->
  <!-- <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn> -->
  <!-- </v-toolbar> -->

  <!-- <v-content> -->
  <v-tabs background-color="transparent" dark :color="tab_color" left>
    <v-tab>Timer</v-tab>
    <v-tab>Calendar</v-tab>
    <!-- <HelloWorld/> -->
    <v-tab-item>
      <Timer @update_color="update_color" />
    </v-tab-item>
    <v-tab-item>
      <Timer />
    </v-tab-item>
    <!-- <Timer/>
      <Timer/>
      <Timer/> -->
    <!-- </v-content> -->
  </v-tabs>
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
  data() {
    return {
      dark_theme: true,
      tab_color_hue: document.documentElement.style.getPropertyValue('--neon-color-primary'),
    }
  },
  computed: {
    tab_color: {
      get: function() {
        // console.log(getComputedStyle(document.documentElement).getPropertyValue('--neon-color-primary'))
        console.log(document.documentElement.style.getPropertyValue('--neon-color-primary'));
        return "hsl(" + this.tab_color_hue + ", 100%, 75%)";
      },
      set: function(new_value) {
        this.tab_color_hue = new_value;
      }
    }
  },
  methods: {
    toggle_theme: function() {
      this.dark_theme = !this.dark_theme;
    },
    update_color: function() {
      this.tab_color_hue = document.documentElement.style.getPropertyValue('--neon-color-primary');
    }
  }
}
</script>

<style>
.draggable {
  -webkit-app-region: drag;
}

span {
  color: var(--neon-text-highlight);
  /* text-shadow: var(--neon-text-shadow); */
}

.theme--light.v-tabs-items {
  background: transparent;
  height: calc(100% - 48px);
}

.v-window__container,
.v-window-item {
  height: 100%;
}
</style>
