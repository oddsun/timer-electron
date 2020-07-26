<!-- button for auto color switching, change color for main tab, editable comments -->
<template>
  <!-- <div id="timer-cell" :class="{active: button_active}"> -->
  <v-container fluid fill-height pa-0 ma-0>
    <v-row no-gutters class="fill-height" justify="space-between">
      <v-col
        cols="12"
        sm="10"
        text-center
        class="pa-0 ma-0 justify-space-between fill-height"
        align-self="center"
      >
        <v-row
          class="fill-height ma-0 pa-3"
          :class="{ border_right: large_win }"
          align-content="space-between"
        >
          <v-col cols="12" class="pa-0">
            <v-row class="d-none d-sm-flex">
              <v-col class="pt-0 pb-0">
                <v-text-field
                  ref="name"
                  id="label-input-name"
                  v-model="prob_num"
                  label="Problem Number"
                  hide-details
                  clearable
                  solo
                  flat
                  background-color="transparent"
                  autofocus
                  @keydown.enter="focus_comment"
                  class="large-font"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-divider class="border d-none d-sm-flex"></v-divider>
            <v-row class="d-none d-sm-flex">
              <v-col class="pt-1 pb-0">
                <v-text-field
                  ref="comment"
                  id="label-input-comment"
                  v-model="comment"
                  label="Comments"
                  hide-details
                  clearable
                  solo
                  flat
                  background-color="transparent"
                  @keydown.enter="start_switch"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <!-- <v-flex class="draggable"> -->
          <v-col cols="12" class="pa-0">
            <v-row
              no-gutters
              justify="center"
              align="center"
              class="mt-md-auto fill-height"
            >
              <!-- @mousedown="mouse_down" @mousemove="mouse_move" @mouseup="mouse_up" @click="start_switch"> -->

              <v-col cols="12" justify="center" align="center">
                <!-- <v-switch v-model="count_up" :label='switch_label' hide-details inset :color='track_color_diff' :disabled="timer_started"></v-switch> -->

                <button
                  class="glow-button inactive"
                  :class="{ noborder: !count_up }"
                  @click="toggle_up_down"
                >
                  <v-icon>{{ up_icon }}</v-icon>
                </button>
                <button
                  class="glow-button inactive"
                  :class="{ noborder: count_up }"
                  @click="toggle_up_down"
                >
                  <v-icon>{{ down_icon }}</v-icon>
                </button>
                <!-- <span>{{count_up}}</span> -->
              </v-col>
              <v-col
                cols="12"
                justify="center"
                align="center"
                ref="timer"
                @mousedown="mouse_down"
                @mousemove="mouse_move"
                @mouseup="mouse_up"
                @click="start_switch"
              >
                <!-- <v-hover @click.native="start"> <template v-slot:default="{ hover }"> -->
                <div
                  id="timer-text-container"
                  :class="{ active: button_active }"
                >
                  <v-text-field
                    ref="timer_input"
                    class="timer-input"
                    v-model="time_input"
                    hide-details
                    @keypress="validate_input($event)"
                    @keydown.enter="enter_switch"
                  ></v-text-field>
                  <span
                    class="timer-text"
                    :class="{
                      active: button_active,
                      'small-text': $vuetify.breakpoint.xsOnly
                    }"
                    >{{ time }}</span
                  >
                  <!--  :rules='rules' -->
                  <!--<p>{{ start_time }}</p>-->
                  <!--<button @click="start">{{button_text}}</button>-->
                  <!-- <v-fade-transition>
                <v-overlay v-if="hover" absolute> -->
                  <!-- color="#036358" -->
                  <!-- <v-btn>See more info</v-btn> -->
                  <!-- <button class='timer-button' :class="{active: button_active}"></button>
                </v-overlay>
              </v-fade-transition> -->
                </div>
                <!-- </template> </v-hover> -->
              </v-col>
              <v-col cols="12" justify="center" align="center">
                <!-- <v-switch v-model="count_up" :label='switch_label' hide-details inset :color='track_color_diff' :disabled="timer_started"></v-switch> -->

                <button class="glow-button inactive noborder" @click="start">
                  <v-icon>{{ start_stop_icon }}</v-icon>
                </button>
                <button
                  class="glow-button inactive noborder"
                  @click="clear_timer"
                >
                  <v-icon>{{ refresh_icon }}</v-icon>
                </button>
                <!-- <span>{{total_micro_sec_down}} {{micro_sec}}</span> -->
              </v-col>
            </v-row>
            <!-- <v-row class="d-none d-sm-flex">
            <v-col>
              <v-switch v-model="count_up" :label='switch_label' hide-details inset :color='track_color_diff' :disabled="timer_started"></v-switch>
            </v-col>
          </v-row> -->
          </v-col>
          <v-col cols="12" class="d-none d-sm-flex pa-0">
            <!-- <v-container pa-0> -->
            <v-row align="center" no-gutters justify="end">
              <!-- <v-flex> -->
              <v-col cols="10" justify="end">
                <v-row no-gutters>
                  <v-col>
                    <v-slider
                      hide-details
                      v-model="color_main"
                      min="0"
                      max="360"
                      label="color"
                      thumb-label
                      @change="change_main_color"
                      :color="slider_color"
                      :track-color="track_color"
                    ></v-slider>
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col>
                    <v-slider
                      hide-details
                      v-model="color_diff"
                      min="-90"
                      max="90"
                      label="contrast"
                      thumb-label
                      @change="change_contrast"
                      :color="slider_color_diff"
                      :track-color="track_color_diff"
                    ></v-slider>
                  </v-col>
                </v-row>
              </v-col>
              <v-col align="center" justify="center">
                <button
                  class="glow-button"
                  :class="{ inactive: cycle_button_off }"
                  @click="cycle_color"
                >
                  Cycle Color
                </button>
              </v-col>
              <!-- <v-flex shrink> <v-textarea id="comment-inpiut" v-model="comment" no-resize outlined label="Comments" hide-details></v-textarea> </v-flex> -->
            </v-row>
            <!-- </v-container> -->
          </v-col>
        </v-row>
        <!-- </v-row> -->
      </v-col>
      <!-- <v-divider vertical class="border d-none d-sm-flex"></v-divider> -->
      <v-col
        cols="0"
        sm="2"
        align="center"
        justify="space-between"
        class="ml-0 pa-0 d-none d-sm-flex fill-height flex-column"
      >
        <!-- <v-row class="fill-height flex-column" no-gutters align-content='space-between'> <v-col cols="12" class="ml-0"> -->
        <v-row class="ma-0 flex-grow-0 flex-shrink-1">
          <v-col justify="center" align="center" class="pt-1">
            <span class="timer-side-text active opposite">HISTORY</span>
            <!-- can add "glow" to class for above -->
          </v-col>
        </v-row>
        <!-- </v-col>  </v-row>  <v-col cols="12" class="flex-grow-1"> -->
        <v-row
          style="overflow-y: auto; height: 0;"
          class="fill-height flex-grow-1"
        >
          <v-col>
            <v-list two-line disabled dark color=" transparent" width="10em">
              <v-list-item-group>
                <!-- use v-model="item" to highlight item-->
                <v-list-item v-for="(item, i) in items" :key="i">
                  <v-list-item-content>
                    <v-list-item-title
                      class="timer-side-text active opposite"
                      v-text="item.name"
                    ></v-list-item-title>
                    <v-list-item-subtitle
                      class="timer-side-text active"
                      v-text="item.time"
                    ></v-list-item-subtitle>
                    <!-- can add "glow" to class for above -->
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-col>
        </v-row>
        <!-- </v-col> <v-col cols="12" class="ml-n3"> -->
        <v-row class="flex-shrink-1 flex-grow-0">
          <v-col justify="center" align="center" class="mb-2">
            <button class="glow-button inactive" @click="clear_history">
              clear
            </button>
          </v-col>
        </v-row>
        <!-- </v-col>
  </v-row> -->
      </v-col>
      <!-- </div> -->
    </v-row>
  </v-container>
</template>

<script>
import shared from "../shared.js";
import { EventBus } from "../event-bus.js";
// const {
//   dialog,
//   shell
// } = require("electron").remote
import { remote } from "electron";
import {
  mdiChevronDoubleUp,
  mdiChevronTripleUp,
  mdiChevronDown,
  mdiChevronDoubleDown,
  mdiChevronTripleDown,
  mdiStop,
  mdiPause,
  mdiPlay,
  mdiRefresh
} from "@mdi/js";

export default {
  name: "timer",
  props: {
    large_win: Boolean
  },
  data() {
    return {
      // time: '00:00:00',
      start_time: "",
      job: "",
      job_cycle: "",
      button_text: "Start",
      stop_time: "",
      button_active: false,
      prob_num: "",
      items: [],
      comment: "",
      color_main: 75, // 130, 90, 90, 75, 130, 50, 120
      color_diff: 60, // -235, -100, -45, +-60, 60, -60, 60
      cycle_button_off: true,
      cycle_delta: 15,
      count_up: true,
      timer_started: false,
      dragging: false,
      is_mouse_down: false,
      time_input: "",
      stored_time_input: "",
      remaining_micro_sec: 0,
      total_micro_sec_up: 0,
      total_micro_sec_down: 0,
      // rules: [
      //   value => !!value || 'Required.',
      //   value => (value || '').length <= 6 || 'Max 6 characters',
      //   value => {
      //     const pattern = /^\d+$/
      //     return pattern.test(value) || 'Numbers only'
      //   },
      // ],
      start_micro_sec: 0,
      running_micro_sec: 0,
      up_icon: mdiChevronTripleUp,
      down_icon: mdiChevronTripleDown,
      // start_stop_icon: mdiPlay,
      pause_icon: mdiPause,
      refresh_icon: mdiRefresh
    };
  },
  computed: {
    switch_label: function() {
      return this.count_up ? "Count Up" : "Count Down";
    },
    slider_color: function() {
      // if (Math.abs(this.color_diff) < 90) {
      //   this.temp_color = this.color_main + this.color_diff + 180;
      // } else {
      //   this.temp_color = this.color_diff + this.color_diff;
      // }
      return "hsl(" + (this.color_main + 180) + ", 100%, 75%)";
    },
    track_color: function() {
      return "hsl(" + this.color_main + ", 100%, 85%)";
    },
    slider_color_diff: function() {
      return "hsl(" + (this.color_main + 180) + ", 100%, 75%)";
    },
    track_color_diff: function() {
      return (
        "hsl(" + (this.color_main + 180 - 2 * this.color_diff) + ", 100%, 75%)"
      );
    },
    micro_sec: function() {
      // var n = time_input.length
      // if (n == 0) {
      //   return 0
      // }
      if (this.remaining_micro_sec) {
        return this.remaining_micro_sec;
      }
      var sec = this.time_input.slice(-2);
      var min = this.time_input.slice(-4, -2);
      var hr = this.time_input.slice(-6, -4);
      return (
        (parseInt(hr) || 0) * 3600000 +
        (parseInt(min) || 0) * 60000 +
        (parseInt(sec) || 0) * 1000
      );
    },
    time: function() {
      // function pad(n, z) {
      //   z = z || 2
      //   return ('00' + n).slice(-z)
      // }

      var curr_micro_sec =
        this.timer_started || this.count_up
          ? this.running_micro_sec
          : this.micro_sec;
      curr_micro_sec += this.count_up
        ? this.total_micro_sec_up
        : -this.total_micro_sec_down;

      return this.msToTime(curr_micro_sec);
      // var ms = curr_micro_sec % 1000
      // var s = (curr_micro_sec - ms) / 1000
      // var secs = s % 60
      // s = (s - secs) / 60
      // var mins = s % 60
      // var hrs = (s - mins) / 60
      //
      // return pad(hrs) + ':' + pad(mins) + ':' + pad(secs)
    },

    start_stop_icon: function() {
      if (this.timer_started) {
        return mdiStop;
      }
      return mdiPlay;
    }
    // time_curr_session: function() {
    //   var curr_micro_sec = this.timer_started || this.count_up ? this.running_micro_sec : this.micro_sec
    //   return this.msToTime(curr_micro_sec)
    // }
  },
  watch: {
    color_main: function() {
      this.change_main_color();
    }
  },
  methods: {
    start_switch: function() {
      if (this.count_up || this.timer_started) {
        this.start();
      } else {
        this.focus_input();
      }
    },
    enter_switch: function() {
      if (!this.count_up) {
        if (!this.timer_started && !this.micro_sec) {
          return;
        }
        this.start();
      }
    },
    start: function(is_stop = false) {
      // console.log('starting_timer')
      if (this.dragging) {
        return;
      }
      if (!this.job) {
        this.timer_started = true;
        this.start_time = new Date();
        if (!this.count_up) {
          this.start_micro_sec = this.micro_sec - this.total_micro_sec_down;
          this.running_micro_sec = this.start_micro_sec;
        }
        this.job = setInterval(() => {
          if (this.count_up) {
            this.running_micro_sec = Math.abs(new Date() - this.start_time);
          } else {
            this.count_down_timer();
          }
          // this.time = this.msToTime(Math.abs(new Date() - this.start_time))
          // console.log(this.time);
        }, 1);
        this.button_text = "Stop";
        this.button_active = true;
        if (!this.job_cycle) {
          this.cycle_color();
        }
      } else {
        this.timer_started = false;
        var record_time = this.count_up
          ? this.msToTime(this.running_micro_sec)
          : this.msToTime(this.start_micro_sec - this.running_micro_sec);
        this.button_text = "Start";
        clearInterval(this.job);
        this.items.unshift({
          time: record_time,
          name: this.prob_num
        });
        this.job = "";
        this.stop_time = new Date();
        this.button_active = false;
        if (this.count_up) {
          this.total_micro_sec_up += this.running_micro_sec;
        } else {
          this.remaining_micro_sec = this.running_micro_sec;
        }
        // this.remaining_micro_sec = this.running_micro_sec
        this.running_micro_sec = 0;
        this.$db.insert(
          {
            name: this.prob_num,
            start: shared.formatDate(this.start_time),
            end: shared.formatDate(this.stop_time),
            details: this.comment,
            time: record_time,
            color: "hsl(" + this.color_main + ",100%,35%)"
          },
          (err, newrec) => {
            // Callback is optional
            // newrec is the newly inserted document, including its _id
            // newrec has no key called notToBeSaved since its value was undefined
            console.log(err);
            EventBus.$emit("send_newrec", newrec);
            if (!this.count_up && this.remaining_micro_sec == 0) {
              this.show_alert();
            }
            // console.log(newrec);
            // console.log(this);
          }
        );
        // this.$db.find({
        //   name: {
        //     $regex: /test/
        //   }
        // }, function(err, docs) {
        //   // docs is an array containing documents that have name as bigbounty
        //   // If no document is found, docs is equal to []
        //   // console.log(docs)
        // });
        this.$refs.name.focus();
      }
      // console.log(this.prob_num);
    },
    cycle_color: function() {
      if (!this.job_cycle) {
        this.cycle_button_off = false;
        this.job_cycle = setInterval(() => {
          this.cycle_delta =
            this.color_main > 359 || this.color_main <= 0
              ? -this.cycle_delta
              : this.cycle_delta;
          this.color_main = this.color_main + this.cycle_delta;
          // console.log(this.time);
          // console.log(this.color_main);
        }, 5000);
      } else {
        clearInterval(this.job_cycle);
        this.job_cycle = "";
        this.cycle_button_off = true;
      }
    },
    count_down_timer: function() {
      this.running_micro_sec = Math.max(
        this.start_micro_sec - Math.abs(new Date() - this.start_time),
        0
      );
      // console.log(this.start_micro_sec)
      if (this.running_micro_sec <= 0) {
        this.start();
        // this.show_alert()
      }
    },
    show_alert: function() {
      remote.shell.beep();
      // FIXME:
      // Electron v9 doesn't have 3rd parameter, instead returns a Promise
      // object, which is like an async object which will produce resutls
      // when ready. Should fix when upgrading to v9.
      remote.dialog
        .showMessageBox(remote.getCurrentWindow(), {
          message: "Time's Up!",
          buttons: ["Close"]
        })
        .then(result => {
          // console.log(response)
        })
        .catch(err => {
          // console.log(err)
        });
      // console.log('hi')
    },
    clear_history: function() {
      this.items = [];
    },
    // start_counting: function() {
    //   this.time = self.msToTime(Math.abs(new Date() - this.start_time));
    //   console.log(this.time);
    // },
    msToTime: function(s) {
      // Pad to 2 or 3 digits, default is 2
      function pad(n, z) {
        z = z || 2;
        return ("00" + n).slice(-z);
      }

      var ms = s % 1000;
      s = (s - ms) / 1000;
      var secs = s % 60;
      s = (s - secs) / 60;
      var mins = s % 60;
      var hrs = (s - mins) / 60;

      return pad(hrs) + ":" + pad(mins) + ":" + pad(secs); // + '.' + pad(ms, 3);
    },
    focus_comment: function() {
      this.$refs.comment.focus();
    },
    focus_input: function() {
      // console.log('focusing timer_input')
      this.$refs.timer_input.focus();
    },
    change_main_color: function() {
      document.documentElement.style.setProperty(
        "--neon-color-primary",
        this.color_main
      );
      this.$emit("update_color");
    },
    change_contrast: function() {
      document.documentElement.style.setProperty(
        "--neon-degree",
        this.color_diff
      );
      this.$emit("update_color");
    },
    mouse_down: function() {
      this.is_mouse_down = true;
      // this.dragging = false; // will mess up starting timer with keydown
    },
    mouse_move: function() {
      if (this.is_mouse_down) {
        this.dragging = true;
      }
    },
    mouse_up: function() {
      // this.dragging = false;
      setTimeout(() => (this.dragging = false), 1);
      this.is_mouse_down = false;
    },
    validate_input: function(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keycode;
      // console.log(charCode)
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57 || this.time_input.length >= 6)
      ) {
        // console.log('stop event')
        evt.preventDefault();
      } else {
        return true;
      }
    },
    toggle_up_down: function() {
      if (this.timer_started) {
        return;
      }
      this.count_up = !this.count_up;
    },
    clear_timer: function() {
      if (this.timer_started) {
        return;
      }
      if (this.count_up) {
        this.total_micro_sec_up = 0;
      } else {
        this.total_micro_sec_down = 0;
      }
    }
  }
};
</script>

<style>
::-webkit-scrollbar {
  display: none;
  /* background: var(--neon-box-shadow-highlight); */
}

:root {
  /* --neon-text-color: #fd5f00;
  --neon-border-color: #fd5f00; */
  /* --neon-text-color: #ff8000;
  --neon-border-color: #ff8000; */
  /* --neon-text-color: #ff026b; */
  /* --neon-border-color: #ff026b; */
  --neon-text-color: hsl(var(--neon-color-primary), 100%, 50%);
  --row-background: rgba(204, 246, 255, 0.8);
  --neon-color-primary: 75;
  --neon-degree: 60;
  --neon-degree-opposite: 180;
  --neon-color-complement: calc(
    var(--neon-color-primary) + var(--neon-degree-opposite) - 2 *
      var(--neon-degree)
  );
  --neon-color-primary-shadow: calc(
    var(--neon-color-primary) - 2 * var(--neon-degree)
  );
  --neon-color-complement-shadow: calc(
    var(--neon-color-complement) + 2 * var(--neon-degree)
  );

  --neon-text-shadow: 0 0 0.02em hsl(var(--neon-color-primary), 100%, 25%),
    0 0 0.05em hsl(var(--neon-color-primary-shadow), 100%, 50%),
    0 0 0.1em hsl(var(--neon-color-primary-shadow), 100%, 50%),
    0 0 0.2em hsl(var(--neon-color-primary-shadow), 100%, 35%),
    0 0 0.4em hsl(var(--neon-color-primary-shadow), 100%, 25%),
    0.02em 0.02em 0.02em hsl(var(--neon-color-primary), 100%, 25%);
  /* 0.06em -0.06em 0.05em hsl(var(--neon-color-primary), 100%, 50%),
    0.06em -0.06em 0.1em hsl(var(--neon-color-primary-shadow), 100%, 50%), */
  /* 0.05em -0.07em 0em hsl(var(--neon-color-primary), 100%, 50%),
    0.05em -0.07em 0.1em hsl(var(--neon-color-primary-shadow), 100%, 50%),
    0.1em -0.14em 0em hsl(var(--neon-color-primary), 100%, 45%),
    0.1em -0.14em 0.1em hsl(var(--neon-color-primary-shadow), 100%, 45%),
    0.14em -0.19em 0em hsl(var(--neon-color-primary), 100%, 40%),
    0.14em -0.19em 0.1em hsl(var(--neon-color-primary-shadow), 100%, 40%); */
  /* -0.5em 0.5em 0.1em hsl(var(--neon-color-primary), 100%, 50%),
    0.5em -0.5em 0.1em hsl(var(--neon-color-primary), 100%, 50%),
    -0.5em -0.5em 0.1em hsl(var(--neon-color-primary), 100%, 50%); */
  --neon-text-highlight: hsl(var(--neon-color-primary), 100%, 85%);
  --neon-text-shadow-reverse: 0 0 0.02em
      hsl(var(--neon-color-complement), 100%, 25%),
    0 0 0.05em hsl(var(--neon-color-complement-shadow), 100%, 50%),
    0 0 0.1em hsl(var(--neon-color-complement-shadow), 100%, 50%),
    0 0 0.2em hsl(var(--neon-color-complement-shadow), 100%, 35%),
    0 0 0.4em hsl(var(--neon-color-complement-shadow), 100%, 25%),
    0.02em 0.02em 0.02em hsl(var(--neon-color-complement), 100%, 25%);
  --neon-text-highlight-reverse: hsl(var(--neon-color-complement), 100%, 75%);

  --neon-box-shadow: 0 0 2px hsl(var(--neon-color-complement), 100%, 50%),
    inset 0 0 2px hsl(var(--neon-color-complement), 100%, 50%),
    /* 10px -14px 2px transparent,
    inset 10px -14px 2px transparent,
    11px -15px 2px hsl(var(--neon-color-complement), 100%, 50%),
    inset 11px -15px 2px hsl(var(--neon-color-complement), 100%, 50%),
    20px -28px 2px hsl(var(--neon-color-complement), 100%, 50%),
    inset 20px 28px 2px hsl(var(--neon-color-complement), 100%, 50%), */
      0 0 3px hsl(var(--neon-color-complement-shadow), 100%, 35%),
    inset 0 0 3px hsl(var(--neon-color-complement-shadow), 100%, 35%),
    0 0 6px hsl(var(--neon-color-complement-shadow), 100%, 35%),
    inset 0 0 6px hsl(var(--neon-color-complement-shadow), 100%, 35%),
    0 0 10px hsl(var(--neon-color-complement-shadow), 100%, 35%),
    inset 0 0 10px hsl(var(--neon-color-complement-shadow), 100%, 35%);
  --neon-box-shadow-highlight: hsl(var(--neon-color-complement), 100%, 75%);
  --neon-box-shadow-highlight-transparent: hsla(
    var(--neon-color-complement),
    100%,
    75%,
    0.3
  );
  --neon-box-shadow-reverse: 0 0 1px hsl(var(--neon-color-primary), 100%, 25%),
    inset 0 0 1px hsl(var(--neon-color-primary), 100%, 25%),
    0 0 2px hsl(var(--neon-color-primary-shadow), 100%, 50%),
    inset 0 0 2px hsl(var(--neon-color-primary-shadow), 100%, 50%),
    0 0 6px hsl(var(--neon-color-primary-shadow), 100%, 50%),
    inset 0 0 6px hsl(var(--neon-color-primary-shadow), 100%, 50%),
    0 0 10px hsl(var(--neon-color-primary-shadow), 100%, 35%),
    inset 0 0 10px hsl(var(--neon-color-primary-shadow), 100%, 35%);
  --neon-box-shadow-highlight-reverse: hsl(
    var(--neon-color-primary),
    100%,
    75%
  );
  --neon-box-shadow-flipped: 0 0 1px
      hsl(var(--neon-color-complement-shadow), 100%, 50%),
    inset 0 0 1px hsl(var(--neon-color-complement-shadow), 100%, 50%),
    0 0 2px hsl(var(--neon-color-complement), 80%, 50%),
    inset 0 0 2px hsl(var(--neon-color-complement), 80%, 50%),
    0 0 4px hsl(var(--neon-color-complement), 80%, 50%),
    inset 0 0 4px hsl(var(--neon-color-complement), 80%, 50%);
  /* 0 0 10px hsl(var(--neon-color-complement), 100%, 50%),
  inset 0 0 10px hsl(var(--neon-color-complement), 100%, 50%); */
  --neon-box-shadow-highlight-flipped: hsl(
    var(--neon-color-complement-shadow),
    100%,
    75%
  );
}

button.timer-button {
  /* background: rgba(2, 209, 255, 1); */
  /* background: #02D1FF; */
  background: transparent;
  margin-top: 0.3em;
  /* margin-bottom: 0.5em; */
  border-radius: 50%;
  /* color: white; */
  width: 1.5em;
  height: 1.5em;
  /* border-radius: 10px; */
  /* margin-top: 15px; */
  outline: 0;
  border-style: none;
  border-color: none;
  border-image: none;
  border-width: 0;
  font-size: 3em;
  /* border: 1px solid transparent; */
  box-shadow: none;
  /* box-shadow: 0 0 1px transparent; */
  /* -webkit-backface-visibility: hidden; */
  -webkit-transition:
    /* all 1s; */ border-radius 0.2s ease-in-out 0s,
    transform 0.2s ease-in-out 0s, box-shadow 0.3s ease-in-out 0s,
    border 0.3s ease-in-out 0s;
}

button.timer-button:hover {
  color: var(--neon-text-color);
  border-radius: 50%;
  width: 1.5em;
  /* margin-left: 25px;
  margin-right: 25px; */
  background: transparent;
  /* background: rgba(204, 246, 255, 0); */
  /* background: #ccf6ff; */
  /* -webkit-transition: all 0.3s ease-out 0s, width 0s; */
}

button.timer-button.active {
  /* background: var(--neon-text-color); */
  background: transparent;
  border-radius: 0%;
  width: 1.5em;
  /* margin-left: 25px;
  margin-right: 25px; */
  /* color: var(--neon-text-color); */
  color: transparent;
  text-shadow: none;
  box-shadow: var(--neon-box-shadow);
  border: 1px solid var(--neon-box-shadow-highlight);
  -webkit-transform: scale(0.5);
  /* -webkit-transition: all 0.3s linear 0s; */
}

button.timer-button.active:hover {
  /* background: var(--neon-text-color); */
  border-radius: 50%;
  /* margin-left: 25px;
  margin-right: 25px; */
  width: 1.5em;
  /* color: #ccf6ff; */
  /* color: var(--row-background); */
  /* color: var(--neon-text-color); */
  -webkit-transform: scale(1);
}

button.glow-button {
  background: transparent;
  box-shadow: var(--neon-box-shadow-reverse);
  border: 1px solid var(--neon-box-shadow-highlight-reverse);
  color: var(--neon-text-highlight-reverse);
  text-shadow: var(--neon-text-shadow-reverse);
  outline: 0;
  border-radius: 5%;
  padding: 0.2em;
  margin: 0.5em;
}

button.glow-button.inactive {
  background: transparent;
  /* box-shadow: var(--neon-box-shadow-reverse); */
  box-shadow: none;
  border: 1px solid var(--neon-box-shadow-highlight-reverse);
  color: var(--neon-text-highlight-reverse);
  text-shadow: none;
}

button.glow-button.noborder {
  border: 1px solid transparent;
}

.noborder {
  border: 1px solid transparent;
}

div#timer-cell {
  padding: 1.5em;
  /* padding-top: 2em; */
  text-align: center;
  height: 90vh;
  margin: 5vh;
  /* -webkit-transition: all 0.3s ease-in-out 0s; */
  /* -webkit-transition: background 0.5s ease-out 0s, border 0.5s linear 0s, box-shadow 0.5s linear 0s; */
  background: transparent;
  color: var(--neon-text-color);
  /* border: 1px solid transparent;
    box-shadow: var(--neon-box-shadow-reverse); */
  /* border: 1px solid var(--neon-box-shadow-highlight-reverse); */
}

div#timer-cell:hover,
div#timer-cell.active {
  /* background: #ccf6ff; */
  /* background: var(--row-background); */
  /* color: var(--neon-text-color); */
  /* border: 1px solid transparent; */
}

div#timer-cell:hover {
  /* box-shadow: var(--neon-box-shadow-reverse);
  border: 1px solid var(--neon-box-shadow-highlight-reverse); */
  /* -webkit-transition: border 0.1s linear 0s, box-shadow 0.1s linear 0s; */
}

#triangle-right {
  display: inline-block;
  content: "";
  border-top: 15px solid transparent;
  border-left: 30px solid var(--neon-text-color);
  border-bottom: 15px solid transparent;
}

div#timer-text-container {
  position: relative;
  border: 1px solid transparent;
  -webkit-transition:
    /* transform 0s ease-in-out 0s; */ all 0.3s ease-in-out
    0s;
  border-radius: 5px;
}

/* div#timer-text-container.active {
  box-shadow: var(--neon-box-shadow);
  border: 1px solid var(--neon-box-shadow-highlight);
} */

span.timer-text {
  display: block;
  font-family: "Iceland", cursive;
  /* font-weight: bold; */
  color: var(--neon-text-highlight);
  font-size: 10em;
  /* min-height: 1.5em;
  line-height: 1.5em; */
  min-height: 0.7em;
  line-height: 0.7em;
  min-width: 4em;
  margin: auto;
  /* margin-left: 2em;
  margin-right: 2em; */
  /* padding-top: 0.3em;
  padding-bottom: 0.3em; */
  vertical-align: middle;
  border: 1px solid transparent;
  box-shadow: none;
  text-shadow: none;
  -webkit-transition:
    /* text-shadow 1s,
  color 1s,
  border 1s,
  box-shadow 1s; */ all
    0.3s ease-in-out 0s;
  /* transform 0s ease-in-out 0s; */
}

span.small-text {
  font-size: 4em;
}

.timer-input.v-input--is-focused + .timer-text {
  /* text-decoration-line: underline; */
  /* text-decoration-thickness: 0.1em; */
  border-bottom: 1px solid;
}

.timer-input.v-input--is-focused + .timer-text.active {
  /* text-decoration: none; */
  border-bottom: 1px solid transparent;
}

.timer-text.active {
  text-shadow: var(--neon-text-shadow);
  color: var(--neon-text-highlight);
  background: transparent;
  /* border: 1px transparent; */
  /* box-shadow: var(--neon-box-shadow);
   border: 1px solid var(--neon-box-shadow-highlight); */
  /* border-radius: 0; */
  /* -webkit-transition: all 0.5s linear 0s; */
}

.timer-side-text.active {
  /* text-shadow: var(--neon-text-shadow); */
  color: var(--neon-box-shadow-highlight-flipped) !important;
  font-family: "Iceland", cursive;
  font-size: 2em;
  /* box-shadow: var(--neon-box-shadow);
   border: 1px solid var(--neon-box-shadow-highlight); */
  /* border-radius: 0; */
  /* -webkit-transition: all 0.5s linear 0s; */
}

.timer-side-text.active.opposite {
  /* text-shadow: var(--neon-text-shadow); */
  color: var(--neon-text-highlight) !important;
  font-family: "Iceland", cursive;
  font-size: 2em;
  /* box-shadow: var(--neon-box-shadow);
   border: 1px solid var(--neon-box-shadow-highlight); */
  /* border-radius: 0; */
  /* -webkit-transition: all 0.5s linear 0s; */
}

.timer-side-text.active.glow {
  text-shadow: var(--neon-text-shadow);
  color: var(--neon-text-highlight);
  font-family: "Iceland", cursive;
  font-size: 1.5em;
  /* box-shadow: var(--neon-box-shadow);
   border: 1px solid var(--neon-box-shadow-highlight); */
  /* border-radius: 0; */
  /* -webkit-transition: all 0.5s linear 0s; */
}

.timer-side-text.active.glow.opposite {
  text-shadow: var(--neon-text-shadow-reverse);
  color: var(--neon-text-highlight-reverse);
  font-family: "Iceland", cursive;
  font-size: 2em;
  /* box-shadow: var(--neon-box-shadow);
   border: 1px solid var(--neon-box-shadow-highlight); */
  /* border-radius: 0; */
  /* -webkit-transition: all 0.5s linear 0s; */
}

span.timer-text.active_old {
  color: white;
  text-shadow: -0.5px -0.5px 0.5px #fff, 0.5px 0.5px 0.5px #fff,
    -0.5px 0.5px 0.5px #fff, 0.5px -0.5px 0.5px #fff,
    0 0 2px var(--neon-text-color), 0 0 4px var(--neon-text-color),
    0 0 8px var(--neon-text-color), 0 0 12px var(--neon-text-color);
  /* 0 0 5px var(--neon-text-color); */

  box-shadow: 0 0 2px #fff, inset 0 0 2px #fff, 0 0 4px var(--neon-border-color),
    inset 0 0 4px var(--neon-border-color), 0 0 6px var(--neon-border-color),
    inset 0 0 6px var(--neon-border-color);
  /* border: 2px solid var(--neon-border-color); */
  border: 2px solid white;
  border-radius: 15px;
}

/* button.timer-button:after{
  content: '\25B7';
  color: var(--neon-text-highlight-reverse);
  text-shadow: none;
  text-decoration: none;
} */

button.timer-button:after {
  content: "\25B7";
  text-shadow: var(--neon-text-shadow-reverse);
  color: var(--neon-text-highlight-reverse);
  /* font-size: 1.5em; */
}

button.timer-button.active:after {
  content: "\2668";
  text-shadow: none;
  color: transparent;
  /* display: block; */
  /* padding-bottom: 4px; */
  /* font-size: 2em; */
}

button.timer-button.active:hover:after {
  content: "\2668";
  text-shadow: var(--neon-text-shadow-reverse);
  color: var(--neon-text-highlight-reverse);
}

#label-input-name,
#label-input-comment,
.v-textarea.v-text-field--enclosed .v-text-field__slot textarea,
.v-input .v-label {
  color: var(--neon-text-highlight);
  font-family: "Iceland", cursive;
  font-size: 1.5em;
  /* border: var(--neon-text-shadow-highlight); */
}

.large-font {
  font-size: 2em;
  /* line-height: 3em; */
}

.v-input .v-label {
  height: 1em;
  line-height: 1em;
  color: var(--neon-box-shadow-highlight-flipped);
}

.v-text-field.v-text-field--solo .v-label {
  top: calc(50% - 0.5em);
}

.v-text-field.v-text-field--solo .v-input__control {
  min-height: 1em;
  /* height: 1em; */
}

/* .v-input__control {
  height: 1em;
} */

.theme--light.v-text-field--outlined fieldset,
.theme--light.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state):hover
  fieldset {
  border-color: var(--neon-box-shadow-highlight);
}

.v-input__slot:before,
.v-input__slot:hover:before,
.theme--light.v-text-field:not(.v-input--has-state)
  > .v-input__control
  > .v-input__slot:before {
  border-color: var(--neon-box-shadow-highlight-flipped) !important;
}

.theme--light.v-icon {
  color: var(--neon-box-shadow-highlight-flipped);
}

.no-bg.active {
  background: transparent;
}

.border {
  border: 1px solid var(--neon-box-shadow-highlight) !important;
  /* box-shadow: var(--neon-box-shadow); */
}

.border_right {
  border-right: 2px solid var(--neon-box-shadow-highlight) !important;
  /* box-shadow: var(--neon-box-shadow); */
}

input {
  width: 100%;
  outline: 0;
  caret-color: var(--neon-text-highlight);
  color: var(--neon-text-highlight);
  font-family: "Iceland", cursive;
  font-size: 2em;
  margin-bottom: -1em;
  margin-top: -1em;
  /* padding: 0; */
  /* border: 1px solid white; */
}

.small {
  font-size: 1.5em;
}

::placeholder {
  /* color: hsl(var(--neon-color-complement-shadow), 50%, 75%); */
  color: var(--neon-box-shadow-highlight-flipped);
}

.input-wrapper {
  text-align: left;
}

.divider {
  /* height: 1px; */
  border: 0.5px solid var(--neon-box-shadow-highlight);
}

.v-input__slot {
  margin: 0;
}

/* .v-application .primary.lighten-3 {
  background-color: var(--neon-box-shadow-highlight) !important;
  border-color: var(--neon-box-shadow-highlight) !important;
} */

.v-text-field.v-text-field--enclosed .v-text-field__details,
.v-text-field.v-text-field--enclosed > .v-input__control > .v-input__slot {
  padding: 0;
}

.v-input input {
  max-height: none;
}

/* .v-input--selection-controls .v-input--selection-controls__input:hover .v-input--selection-controls__ripple:before {
  transform: none;
  -webkit-transform: none;
} */

.v-application--is-ltr .v-input--switch .v-input--selection-controls__ripple {
  left: -7px;
}

.v-input--switch .v-input--selection-controls__ripple {
  top: calc(50% - 19px);
}

.v-application--is-ltr
  .v-input--switch--inset.v-input--is-dirty
  .v-input--selection-controls__ripple {
  transform: translate(0, 0) !important;
}

.v-application--is-ltr
  .v-input--switch--inset.v-input--is-dirty
  .v-input--switch__thumb {
  transform: translate(20px, 0) !important;
}

.v-input--selection-controls__ripple {
  /* height: 20px;
  width: 20px; */
  opacity: 0;
  border-radius: 14px;
  height: 24px;
  width: 40px;
}

.timer-input {
  height: 0;
  width: 0;
  padding: 0;
  margin: 0;
}
</style>
