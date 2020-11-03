<template>
  <v-col>
    <v-row justify="center">
      <span v-html="letter"></span>
    </v-row>
    <v-row justify="center">
      <span class="opposite-color" v-html="decoded"></span>
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: "decode",
  props: {
    letter: String,
    decoded: String
  }
  // computed: {
  //   decoded_u: function() {
  //     console.log(this.decoded);
  //     return this.decoded;
  //   }
  // }
};
</script>
