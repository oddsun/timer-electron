<template>
<div id="timer-cell" :class="{active: button_active}">
          <v-text-field
            id="label-input"
            v-model="prob_num"
            label="Problem Number"
            outlined
            clearable
            autofocus
          ></v-text-field>
  <span id='timer-text' :class="{active: button_active}">{{ time }}</span>
  <!--<p>{{ start_time }}</p>-->
  <!--<button @click="start">{{button_text}}</button>-->
  <button class='timer-button' @click="start" :class="{active: button_active}"></button>
</div>
</template>

<script>

export default {
  name: 'test',
  data () {
    return {
      time: '',
      start_time: '',
      job: '',
      button_text:'Start',
      stop_time: '',
      button_active: false,
      prob_num: '',
    }
  },
  methods: {
    start: function () {
      if(!this.job)
      {
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
        this.job = '';
        this.stop_time = new Date();
        this.button_active = false;
      }
      console.log(this.prob_num);
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
      }
    }
}

</script>

<style>
:root{
  /* --neon-text-color: #fd5f00;
  --neon-border-color: #fd5f00; */
  /* --neon-text-color: #ff8000;
  --neon-border-color: #ff8000; */
  /* --neon-text-color: #ff026b; */
  /* --neon-border-color: #ff026b; */
  --neon-text-color: #ff026b;
  --row-background: rgba(204, 246, 255, 0.8);
  --neon-color-primary: 20;
  --neon-color-complement: calc(var(--neon-color-primary) + 90);
  --neon-color-primary-shadow: calc(var(--neon-color-primary) - 90);
  --neon-color-complement-shadow: calc(var(--neon-color-complement) + 90);

  --neon-text-shadow:
  0 0 0.02em hsl(var(--neon-color-primary), 100%, 50%),
  0 0 0.05em hsl(var(--neon-color-primary-shadow), 100%, 50%),
  0 0 0.1em hsl(var(--neon-color-primary-shadow), 100%, 50%),
  0 0 0.2em hsl(var(--neon-color-primary-shadow), 100%, 50%),
  0 0 0.2em hsl(var(--neon-color-primary-shadow), 100%, 50%),
  0.02em 0.02em 0.02em hsl(var(--neon-color-primary),100%,50%);
  --neon-text-highlight: hsl(var(--neon-color-primary), 100%,75%);
  --neon-text-shadow-reverse:
  0 0 0.02em hsl(var(--neon-color-complement), 100%, 50%),
  0 0 0.05em hsl(var(--neon-color-complement-shadow), 100%, 50%),
  0 0 0.1em hsl(var(--neon-color-complement-shadow), 100%, 50%),
  0 0 0.2em hsl(var(--neon-color-complement-shadow), 100%, 50%),
  0 0 0.2em hsl(var(--neon-color-complement-shadow), 100%, 50%),
  0.02em 0.02em 0.02em hsl(var(--neon-color-complement),100%,50%);
  --neon-text-highlight-reverse: hsl(var(--neon-color-complement), 100%,75%);

  --neon-box-shadow:
  0 0 1px hsl(var(--neon-color-complement), 100%, 50%),
  inset 0 0 1px hsl(var(--neon-color-complement), 100%, 50%),
  0 0 2px hsl(var(--neon-color-complement-shadow), 100%, 50%),
  inset 0 0 2px hsl(var(--neon-color-complement-shadow), 100%, 50%),
  0 0 6px hsl(var(--neon-color-complement-shadow), 100%, 50%),
  inset 0 0 6px hsl(var(--neon-color-complement-shadow), 100%, 50%),
  0 0 10px hsl(var(--neon-color-complement-shadow), 100%, 50%),
  inset 0 0 10px hsl(var(--neon-color-complement-shadow), 100%, 50%);
  --neon-box-shadow-highlight: hsl(var(--neon-color-complement), 100%, 75%);
  --neon-box-shadow-reverse:
  0 0 1px hsl(var(--neon-color-primary), 100%, 50%),
  inset 0 0 1px hsl(var(--neon-color-primary), 100%, 50%),
  0 0 2px hsl(var(--neon-color-primary-shadow), 100%, 50%),
  inset 0 0 2px hsl(var(--neon-color-primary-shadow), 100%, 50%),
  0 0 6px hsl(var(--neon-color-primary-shadow), 100%, 50%),
  inset 0 0 6px hsl(var(--neon-color-primary-shadow), 100%, 50%),
  0 0 10px hsl(var(--neon-color-primary-shadow), 100%, 50%),
  inset 0 0 10px hsl(var(--neon-color-primary-shadow), 100%, 50%);
  --neon-box-shadow-highlight-reverse: hsl(var(--neon-color-primary), 100%, 75%);
  --neon-box-shadow-flipped:
  0 0 1px hsl(var(--neon-color-complement-shadow), 100%, 50%),
  inset 0 0 1px hsl(var(--neon-color-complement-shadow), 100%, 50%),
  0 0 2px hsl(var(--neon-color-complement), 100%, 50%),
  inset 0 0 2px hsl(var(--neon-color-complement), 100%, 50%),
  0 0 6px hsl(var(--neon-color-complement), 100%, 50%),
  inset 0 0 6px hsl(var(--neon-color-complement), 100%, 50%),
  0 0 10px hsl(var(--neon-color-complement), 100%, 50%),
  inset 0 0 10px hsl(var(--neon-color-complement), 100%, 50%);
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



button.timer-button:hover{
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
  box-shadow: var(--neon-box-shadow-reverse);
   border: 1px solid var(--neon-box-shadow-highlight-reverse);
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

div#timer-cell{
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

div#timer-cell:hover, div#timer-cell.active {
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

span#timer-text{
  display: block;
  font-family: "Iceland", cursive;
  /* font-weight: bold; */
  color: var(--neon-text-color);
  font-size: 8em;
  height: 2em;
  line-height: 2em;
  min-width: 4em;
  margin: auto;
  margin-top: 0.3em;
  margin-bottom: 0.3em;
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

span#timer-text.active{
  text-shadow: var(--neon-text-shadow);
  color: var(--neon-text-highlight);
  box-shadow: var(--neon-box-shadow);
   border: 1px solid var(--neon-box-shadow-highlight);
   border-radius: 0;
   /* -webkit-transition: all 0.5s linear 0s; */
}

span#timer-text.active_old {
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

button.timer-button:after{
  content: '\25B7';
  color: var(--neon-text-color);
  text-shadow: none;
  text-decoration: none;
  /* font-size: 20px; */
}

button.timer-button:hover:after{
  content: '\25B7';
    text-shadow: var(--neon-text-shadow);
    color: var(--neon-text-highlight);
  /* font-size: 1.5em; */
}

button.timer-button.active:after{
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

#label-input, .v-input .v-label{
  color: var(--neon-text-highlight);
  /* border: var(--neon-text-shadow-highlight); */
}

.theme--light.v-text-field--outlined fieldset,
.theme--light.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state):hover fieldset {
  border-color: var(--neon-box-shadow-highlight);
}

.theme--light.v-icon {
  color: var(--neon-text-highlight);
}

</style>
