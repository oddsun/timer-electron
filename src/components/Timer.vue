<template>
<div id="timer-cell" :class="{active: button_active}">
  <span id='timer-text' :class="{active: button_active}">{{ time }}</span>
  <!--<p>{{ start_time }}</p>-->
  <!--<button @click="start">{{button_text}}</button>-->
  <button @click="start" :class="{active: button_active}"></button>
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

<style scope>
:root{
  /* --neon-text-color: #fd5f00;
  --neon-border-color: #fd5f00; */
  /* --neon-text-color: #ff8000;
  --neon-border-color: #ff8000; */
  --neon-text-color: #ff026b;
  --neon-border-color: #ff026b;
  --row-background: rgba(204, 246, 255, 0.8);
}

button {
  background: rgba(2, 209, 255, 0.4);
  /* background: #02D1FF; */
  /* background: transparent; */
  color: white;
  width: 90px;
  height: 40px;
  border-radius: 10%;
  /* margin-top: 15px; */
  outline: 0;
  border-style: none;
  border-color: none;
  border-image: none;
  border-width: 0;
  font-size: 1.5em;
  /* border: 1px solid transparent; */
  box-shadow: 0 0 1px transparent;
  -webkit-backface-visibility: hidden;
  -webkit-transition: all 0.5s ease-out 0s;
}

button:after{
  content: 'Start';
  /* font-size: 20px; */
}


button:hover{
  color: var(--neon-text-color);
  border-radius: 50%;
  width: 40px;
  /* margin-left: 25px;
  margin-right: 25px; */
  background: transparent;
  /* background: rgba(204, 246, 255, 0); */
  /* background: #ccf6ff; */
  /* -webkit-transition: all 0.3s ease-out 0s, width 0s; */
}

button.active {
  background: var(--neon-text-color);
  border-radius: 0%;
  width: 40px;
  /* margin-left: 25px;
  margin-right: 25px; */
  color: var(--neon-text-color);
  transform: scale(0.4);
  /* -webkit-transition: all 0.3s ease-out 0s, width 0s; */
}

button.active:hover {
  background: var(--neon-text-color);
  border-radius: 100%;
  /* margin-left: 25px;
  margin-right: 25px; */
  width: 40px;
  /* color: #ccf6ff; */
  color: var(--row-background);
  transform: scale(1);
}

div#timer-cell{
  padding: 10px;
  padding-top: 20px;
  text-align: center;
  transition: background 0.5s ease-out 0s, border 0.5s ease-out 0s;
  background: transparent;
  border: 1px solid transparent;
}

div#timer-cell:hover, div#timer-cell.active {
  /* background: #ccf6ff; */
  background: var(--row-background);
  color: var(--neon-text-color);
  /* border: 1px solid transparent; */
}

div#timer-cell:hover {
  border: 1px solid var(--neon-border-color);
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
  font-size: 3em;
  height: 60px;
  line-height: 60px;
  width: 200px;
  margin: auto;
  margin-bottom: 15px;
  vertical-align: middle;
  border: 1px solid transparent;
  box-shadow: none;
  text-shadow: none;
  -webkit-transition: all 0.3s linear 0s;
}

span#timer-text.active{
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

button:hover:after {
  content: '\25B6';
  /* font-size: 1.5em; */
}

button.active:after{
  content: '\2668';
  /* display: block; */
  /* padding-bottom: 4px; */
  /* font-size: 2em; */
}
</style>
