<template>
  <v-row>
    <v-col cols="12" justify="center">
      <span v-html="letter"></span>
    </v-col>
    <v-col cols="12" justify="center">
      <span class="opposite-color" v-html="decoded"></span>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "decode",
  props: {
    letter: String,
    decoded: String,
  },
  // computed: {
  //   decoded_u: function() {
  //     console.log(this.decoded);
  //     return this.decoded;
  //   }
  // }
};
</script>
