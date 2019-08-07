<template>
<!-- <div id="timer-cell" :class="{active: button_active}"> -->
<v-container fluid fill-height pa-5 ma-0 row justify-space-between>
  <v-layout column text-center mr-5 justify-space-between>
    <v-flex shrink mb-1>
      <!-- <div class="input-wrapper"> -->
      <!-- <input type="text" placeholder="Problem Number" v-model="prob_num" /> -->
      <!-- <div class="divider"></div> -->
      <!-- <v-divider class="border"></v-divider> -->
      <!-- <input type="text" placeholder="Comments" v-model="comment" class='small' /> -->
      <!-- <v-divider class="border"></v-divider> -->
      <!-- </div> -->
      <v-text-field ref="name" id="label-input-name" v-model="prob_num" label="Problem Number" hide-details clearable solo flat background-color="transparent" autofocus @keydown.enter="focus_comment" class="large-font"></v-text-field>
    </v-flex>
    <v-divider class="border"></v-divider>
    <!-- <v-flex shrink pl-2>
      <div class="divider"></div>
    </v-flex> -->
    <v-flex shrink mt-1>
      <v-text-field ref="comment" id="label-input-comment" v-model="comment" label="Comments" hide-details clearable solo flat background-color="transparent" @keydown.enter="start"></v-text-field>
    </v-flex>
    <v-flex class="draggable">
      <v-layout justify-center column fill-height>
        <!-- <v-hover @click.native="start">
          <template v-slot:default="{ hover }"> -->
        <div id="timer-text-container" :class="{active: button_active}">
          <span class='timer-text' :class="{active: button_active}">{{ time }}</span>
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
        <!-- </template>
        </v-hover> -->
      </v-layout>
    </v-flex>
    <v-flex shrink>
      <v-slider v-model="color_main" min="0" max="360" label="color" thumb-label @change="change_main_color" :color="slider_color" :track-color="track_color"></v-slider>
    </v-flex>
    <v-flex shrink mt-1>
      <v-slider v-model="color_diff" min="-90" max="90" label="contrast" thumb-label @change="change_contrast" :color="slider_color_diff" :track-color="track_color_diff"></v-slider>
    </v-flex>
    <!-- <v-flex shrink>
      <v-textarea id="comment-inpiut" v-model="comment" no-resize outlined label="Comments" hide-details></v-textarea>
    </v-flex> -->
  </v-layout>
  <v-divider vertical class="border"></v-divider>
  <v-layout text-center shrink column align-center justify-space-between fill-height ml-5 pa-0>
    <v-flex shrink>
      <v-subheader class="timer-side-text active glow opposite">HISTORY</v-subheader>
    </v-flex>
    <v-flex style="overflow-y: auto; height: 0;">
      <v-list two-line disabled dark color="transparent" width="10em">
        <v-list-item-group>
          <!-- use v-model="item" to highlight item-->
          <v-list-item v-for="(item, i) in items" :key="i">
            <v-list-item-content>
              <v-list-item-title class="timer-side-text active opposite" v-text="item.name"></v-list-item-title>
              <v-list-item-subtitle class="timer-side-text active glow" v-text="item.time"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-flex>
    <v-flex text-center shrink>
      <button class="glow-button" @click="clear_history">clear</button>
    </v-flex>
  </v-layout> <!-- </div> -->
</v-container>
</template>

<script>
export default {
  name: 'test',
  data() {
    return {
      time: '00:00:00',
      start_time: '',
      job: '',
      button_text: 'Start',
      stop_time: '',
      button_active: false,
      prob_num: '',
      items: [],
      comment: '',
      color_main: 75, //130, 90, 90, 75, 130
      color_diff: 60, //-235, -100, -45, +-60, 60
    }
  },
  computed: {
    slider_color: function() {
      // if (Math.abs(this.color_diff) < 90) {
      //   this.temp_color = this.color_main + this.color_diff + 180;
      // } else {
      //   this.temp_color = this.color_diff + this.color_diff;
      // }
      return "hsl(" + (this.color_main + 180) + ", 100%, 75%)";
    },
    track_color: function() {
      return "hsl(" + this.color_main + ", 100%, 75%)";
    },
    slider_color_diff: function() {
      return "hsl(" + (this.color_main + 180) + ", 100%, 75%)";
    },
    track_color_diff: function() {
      return "hsl(" + (this.color_main + 180 + 2 * this.color_diff) + ", 100%, 75%)";
    }
  },
  methods: {
    start: function() {
      if (!this.job) {
        this.start_time = new Date();
        this.job = setInterval(() => {
          this.time = this.msToTime(Math.abs(new Date() - this.start_time));
          // console.log(this.time);
        }, 1);
        this.button_text = 'Stop';
        this.button_active = true;
      } else {
        this.button_text = 'Start';
        clearInterval(this.job);
        this.items.unshift({
          time: this.time,
          name: this.prob_num
        });
        this.job = '';
        this.stop_time = new Date();
        this.button_active = false;
        this.$db.insert({
          name: this.prob_num,
          start: this.start_time,
          end: this.stop_time,
          comment: this.comment,
        }, function(err, newrec) { // Callback is optional
          // newrec is the newly inserted document, including its _id
          // newrec has no key called notToBeSaved since its value was undefined
          // console.log(newrec)
        });
        this.$db.find({
          name: {
            $regex: /test/
          }
        }, function(err, docs) {
          // docs is an array containing documents that have name as bigbounty
          // If no document is found, docs is equal to []
          // console.log(docs)
        });
        this.$refs.name.focus();
      }
      // console.log(this.prob_num);
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
        return ('00' + n).slice(-z);
      }

      var ms = s % 1000;
      s = (s - ms) / 1000;
      var secs = s % 60;
      s = (s - secs) / 60;
      var mins = s % 60;
      var hrs = (s - mins) / 60;

      return pad(hrs) + ':' + pad(mins) + ':' + pad(secs); // + '.' + pad(ms, 3);
    },
    focus_comment: function() {
      this.$refs.comment.focus();
    },
    change_main_color: function() {
      document.documentElement.style.setProperty('--neon-color-primary', this.color_main);
    },
    change_contrast: function() {
      document.documentElement.style.setProperty('--neon-degree', this.color_diff);
    }
  }
}
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
  --neon-color-primary: 70;
  --neon-degree: 60;
  --neon-degree-opposite: 180;
  --neon-color-complement: calc(var(--neon-color-primary) + var(--neon-degree-opposite) - 2*var(--neon-degree));
  --neon-color-primary-shadow: calc(var(--neon-color-primary) - 2*var(--neon-degree));
  --neon-color-complement-shadow: calc(var(--neon-color-complement) + 2*var(--neon-degree));

  --neon-text-shadow:
    0 0 0.02em hsl(var(--neon-color-primary), 100%, 25%),
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
  --neon-text-highlight: hsl(var(--neon-color-primary), 100%, 75%);
  --neon-text-shadow-reverse:
    0 0 0.02em hsl(var(--neon-color-complement), 100%, 25%),
    0 0 0.05em hsl(var(--neon-color-complement-shadow), 100%, 50%),
    0 0 0.1em hsl(var(--neon-color-complement-shadow), 100%, 50%),
    0 0 0.2em hsl(var(--neon-color-complement-shadow), 100%, 35%),
    0 0 0.4em hsl(var(--neon-color-complement-shadow), 100%, 25%),
    0.02em 0.02em 0.02em hsl(var(--neon-color-complement), 100%, 25%);
  --neon-text-highlight-reverse: hsl(var(--neon-color-complement), 100%, 75%);

  --neon-box-shadow:
    0 0 2px hsl(var(--neon-color-complement), 100%, 50%),
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
  --neon-box-shadow-reverse:
    0 0 1px hsl(var(--neon-color-primary), 100%, 25%),
    inset 0 0 1px hsl(var(--neon-color-primary), 100%, 25%),
    0 0 2px hsl(var(--neon-color-primary-shadow), 100%, 50%),
    inset 0 0 2px hsl(var(--neon-color-primary-shadow), 100%, 50%),
    0 0 6px hsl(var(--neon-color-primary-shadow), 100%, 50%),
    inset 0 0 6px hsl(var(--neon-color-primary-shadow), 100%, 50%),
    0 0 10px hsl(var(--neon-color-primary-shadow), 100%, 35%),
    inset 0 0 10px hsl(var(--neon-color-primary-shadow), 100%, 35%);
  --neon-box-shadow-highlight-reverse: hsl(var(--neon-color-primary), 100%, 75%);
  --neon-box-shadow-flipped:
    0 0 1px hsl(var(--neon-color-complement-shadow), 100%, 50%),
    inset 0 0 1px hsl(var(--neon-color-complement-shadow), 100%, 50%),
    0 0 2px hsl(var(--neon-color-complement), 80%, 50%),
    inset 0 0 2px hsl(var(--neon-color-complement), 80%, 50%),
    0 0 4px hsl(var(--neon-color-complement), 80%, 50%),
    inset 0 0 4px hsl(var(--neon-color-complement), 80%, 50%);
  /* 0 0 10px hsl(var(--neon-color-complement), 100%, 50%),
  inset 0 0 10px hsl(var(--neon-color-complement), 100%, 50%); */
  --neon-box-shadow-highlight-flipped: hsl(var(--neon-color-complement-shadow), 100%, 75%);
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
    /* all 1s; */
    border-radius 0.2s ease-in-out 0s,
    transform 0.2s ease-in-out 0s,
    box-shadow 0.3s ease-in-out 0s,
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
  content: '';
  border-top: 15px solid transparent;
  border-left: 30px solid var(--neon-text-color);
  border-bottom: 15px solid transparent;
}

div#timer-text-container {
  position: relative;
  border: 1px solid transparent;
  -webkit-transition:
    all 0.3s ease-in-out 0s;
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
  font-size: 8em;
  min-height: 1.5em;
  line-height: 1.5em;
  min-width: 4em;
  margin: auto;
  padding-top: 0.3em;
  padding-bottom: 0.3em;
  vertical-align: middle;
  border: 1px solid transparent;
  box-shadow: none;
  text-shadow: none;
  -webkit-transition:
    /* text-shadow 1s,
  color 1s,
  border 1s,
  box-shadow 1s; */
    all 0.3s ease-in-out 0s;
}

.timer-text.active {
  text-shadow: var(--neon-text-shadow);
  color: var(--neon-text-highlight);
  background: transparent;
  /* box-shadow: var(--neon-box-shadow);
   border: 1px solid var(--neon-box-shadow-highlight); */
  /* border-radius: 0; */
  /* -webkit-transition: all 0.5s linear 0s; */
}

.timer-side-text.active {
  /* text-shadow: var(--neon-text-shadow); */
  color: var(--neon-text-highlight);
  font-family: "Iceland", cursive;
  font-size: 1em;
  /* box-shadow: var(--neon-box-shadow);
   border: 1px solid var(--neon-box-shadow-highlight); */
  /* border-radius: 0; */
  /* -webkit-transition: all 0.5s linear 0s; */
}

.timer-side-text.active.opposite {
  /* text-shadow: var(--neon-text-shadow); */
  color: var(--neon-text-highlight);
  font-family: "Iceland", cursive;
  font-size: 1.5em;
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
  text-shadow:
    -0.5px -0.5px 0.5px #fff,
    0.5px 0.5px 0.5px #fff,
    -0.5px 0.5px 0.5px #fff,
    0.5px -0.5px 0.5px #fff,
    0 0 2px var(--neon-text-color),
    0 0 4px var(--neon-text-color),
    0 0 8px var(--neon-text-color),
    0 0 12px var(--neon-text-color);
  /* 0 0 5px var(--neon-text-color); */

  box-shadow:
    0 0 2px #fff,
    inset 0 0 2px #fff,
    0 0 4px var(--neon-border-color),
    inset 0 0 4px var(--neon-border-color),
    0 0 6px var(--neon-border-color),
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
  content: '\25B7';
  text-shadow: var(--neon-text-shadow-reverse);
  color: var(--neon-text-highlight-reverse);
  /* font-size: 1.5em; */
}

button.timer-button.active:after {
  content: '\2668';
  text-shadow: none;
  color: transparent;
  /* display: block; */
  /* padding-bottom: 4px; */
  /* font-size: 2em; */
}

button.timer-button.active:hover:after {
  content: '\2668';
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
}

.v-input__control {
  height: 1em;
}

.theme--light.v-text-field--outlined fieldset,
.theme--light.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state):hover fieldset {
  border-color: var(--neon-box-shadow-highlight);
}

.v-input__slot:before,
.v-input__slot:hover:before,
.theme--light.v-text-field:not(.v-input--has-state)>.v-input__control>.v-input__slot:before {
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

.v-application .primary.lighten-3 {
  background-color: var(--neon-box-shadow-highlight) !important;
  border-color: var(--neon-box-shadow-highlight) !important;
}

.v-text-field.v-text-field--enclosed .v-text-field__details,
.v-text-field.v-text-field--enclosed>.v-input__control>.v-input__slot {
  padding: 0;
}
</style>
