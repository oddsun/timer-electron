<template>
  <v-app :dark="dark_theme" style="background: rgba(0, 0, 0, 0.5)">
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
    <v-tabs
      background-color="transparent"
      dark
      :color="tab_color"
      class="draggable d-none d-sm-flex"
      left
      v-model="tab"
    >
      <v-tab class="d-none d-sm-flex">Timer</v-tab>
      <v-tab class="d-none d-sm-flex">Calendar</v-tab>
      <v-tab class="d-none d-sm-flex secret">Secret</v-tab>
      <!-- <v-spacer></v-spacer>
    <v-btn fab text small class="mr-0" @click="resize_window">
      <v-icon>{{ resize }}</v-icon>
    </v-btn> -->
      <!-- <HelloWorld/> -->
    </v-tabs>
    <v-tabs-items
      v-model="tab"
      :class="{
        'small-window': $vuetify.breakpoint.xsOnly,
        draggable: $vuetify.breakpoint.xsOnly,
        'non-draggable': !$vuetify.breakpoint.xsOnly,
      }"
    >
      <v-tab-item>
        <Timer @update_color="update_color" :large_win="large_win" />
      </v-tab-item>
      <v-tab-item>
        <Calendar />
      </v-tab-item>
      <v-tab-item>
        <Secret />
      </v-tab-item>
      <!-- <Timer/>
      <Timer/>
      <Timer/> -->
      <!-- </v-content> -->
    </v-tabs-items>
    <v-layout class="window-config">
      <v-btn
        fab
        text
        small
        :ripple="false"
        class="mr-0"
        @click="resize_window"
        dark
      >
        <v-icon>{{ resize }}</v-icon>
      </v-btn>
    </v-layout>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld'
import Timer from "./components/Timer";
import Calendar from "./components/Calendar";
import Secret from "./components/Secret";
import { mdiResize, mdiArrowCollapse, mdiArrowExpand } from "@mdi/js";
import { ipcRenderer } from "electron";

export default {
  name: "App",
  components: {
    // HelloWorld,
    Timer,
    Calendar,
    Secret,
  },
  data() {
    return {
      unused_resize: mdiResize,
      resize: mdiArrowCollapse,
      tab: null,
      dark_theme: true,
      tab_color_hue: parseInt(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--neon-color-primary"
        ),
        10
      ),
      tab_color_diff: parseInt(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--neon-degree"
        ),
        10
      ),
      large_win: true,
    };
  },
  computed: {
    tab_color: {
      get: function () {
        // console.log(getComputedStyle(document.documentElement).getPropertyValue('--neon-color-primary'))
        // console.log(document.documentElement.style.getPropertyValue('--neon-color-primary'));
        // console.log(typeof(this.tab_color_hue));
        // console.log(this.tab_color_diff);
        // console.log(this.tab_color_hue + 180 - 2 * this.tab_color_diff)
        return (
          "hsl(" +
          (this.tab_color_hue + 180 - 2 * this.tab_color_diff) +
          ", 100%, 75%)"
        );
      },
      set: function (new_value) {
        // console.log(new_value);
        var colors = new_value.split(" ");
        // console.log(colors);
        this.tab_color_hue = parseInt(colors[0], 10);
        this.tab_color_diff = parseInt(colors[colors.length - 1], 10);
      },
    },
  },
  methods: {
    toggle_theme: function () {
      this.dark_theme = !this.dark_theme;
    },
    update_color: function () {
      // console.log(document.documentElement.style.getPropertyValue('--neon-color-primary') + " " + getComputedStyle(document.documentElement).getPropertyValue('--neon-degree'));
      this.tab_color =
        document.documentElement.style.getPropertyValue(
          "--neon-color-primary"
        ) +
        " " +
        getComputedStyle(document.documentElement).getPropertyValue(
          "--neon-degree"
        );
      // this.tab_color = document.documentElement.style.getPropertyValue('--neon-color-primary') + " " + document.documentElement.style.getPropertyValue('--neon-degree'); //this doesn't work when property isn't set by js.
      // this.tab_color_hue = parseInt(document.documentElement.style.getPropertyValue('--neon-color-primary'), 10);
      // this.tab_color_diff = parseInt(document.documentElement.style.getPropertyValue('--neon-degree'), 10);
    },
    resize_window: function () {
      this.large_win = !this.large_win;
      if (!this.large_win) {
        this.tab = 0;
        this.resize = mdiArrowExpand;
        // this.$refs.timer.focus();
      } else {
        this.resize = mdiArrowCollapse;
      }
      ipcRenderer.send("resize", this.large_win);
    },
  },
};
</script>

<style>
.draggable {
  -webkit-app-region: drag;
}

.non-draggable {
  -webkit-app-region: no-drag;
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

.window-config {
  position: fixed;
  top: 0;
  right: 0;
}

.v-btn,
.v-btn:before,
.v-btn:after {
  background: none !important;
}

.theme--light.v-tabs-items.small-window {
  height: 100%;
}

.theme--dark.v-tabs > .v-tabs-bar .v-tab.secret:not(.v-tab--active) {
  color: transparent;
}
</style>
