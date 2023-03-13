<template>
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
    <!-- <v-flex shrink>
<v-textarea id="comment-inpiut" v-model="comment" no-resize outlined label="Comments" hide-details></v-textarea>
</v-flex> -->
  </v-row>
</template>

<script>
export default {
  props: {
    color_main: Number,
    color_diff: Number,
  },
};
</script>
