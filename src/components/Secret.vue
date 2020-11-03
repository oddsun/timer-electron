<template>
  <v-container fluid fill-height>
    <!-- <v-row no-gutters justify="space-between" class="fill-height">
      <v-col cols="12"> -->
    <v-col
      align="center"
      justify="space-between"
      class="fill-height flex-column"
    >
      <v-row
        no-gutters
        justify="space-between"
        class="flex-grow-0 flex-shrink-1"
      >
        <v-col
          ref="letters"
          v-for="(letter, index) in letters"
          :key="index"
          @click="focus_letter(index)"
          :class="current_focus === index ? 'border' : 'noborder'"
          class="nooutline"
          @keydown="enter_decode($event, letter, index)"
          tabindex="0"
        >
          <Decode :letter="letter" :decoded="dict[letter]" />
        </v-col>
      </v-row>
      <!-- </v-col> -->
      <!-- <v-col cols="12"> -->
      <v-row no-gutters justify="space-between" class="flex-grow-1">
        <v-tabs background-color="transparent" dark left v-model="tab_puzzle">
          <v-tab>Part One</v-tab>
          <v-tab>Part Two</v-tab>
          <v-tab>Part Two Combined</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab_puzzle">
          <v-tab-item>
            <v-row>
              <v-col cols="5">
                <v-text-field
                  ref="part_one"
                  id="part_one_key"
                  v-model="part_one_key"
                  label="key"
                  hide-details
                  clearable
                  outlined
                  dense
                  background-color="transparent"
                  class="withpadding"
                  @click="focus_part_one_letters()"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col @click="focus_part_one_letters()" class="nooutline">
                <Decode
                  :letter="part_one"
                  :decoded="vigenere_decode(part_one, part_one_key)"
                />
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item>
            <v-row no-gutters class="pt-5" justify="space-between">
              <v-col
                cols="2"
                v-for="(letters, index) in part_two"
                :key="index"
                @click="focus_part_two_letters(index)"
                class="nooutline noborder"
                tabindex="0"
              >
                <v-row>
                  <v-text-field
                    ref="part_two"
                    id="part_two_key"
                    v-model="part_two_key[index]"
                    label="key"
                    hide-details
                    clearable
                    outlined
                    dense
                    background-color="transparent"
                    class="withpadding pl-5 pr-5"
                    @keydown.right="
                      focus_part_two_letters((index + 1) % part_two.length)
                    "
                    @keydown.left="
                      focus_part_two_letters(
                        (index - 1 + part_two.length) % part_two.length
                      )
                    "
                  >
                  </v-text-field>
                </v-row>
                <v-row>
                  <Decode
                    :letter="letters"
                    :decoded="vigenere_decode(letters, part_two_key[index])"
                  />
                </v-row>
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item>
            <v-row>
              <Decode :letter="part_two.join('')" :decoded="vigenere_decoded" />
            </v-row>
          </v-tab-item>
        </v-tabs-items>
      </v-row>
    </v-col>
    <!-- </v-row> -->
  </v-container>
</template>

<script>
import Decode from "./Decode";
import decode_dict from "../data/decode_dict_init.json";
import encoded_letters from "../data/encoded_letters.json";
import part1 from "../data/part1.json";
import part_two from "../data/part2.json";
export default {
  name: "secret",
  components: {
    Decode
  },
  data() {
    return {
      letters: encoded_letters,
      // dict: { h: "" },
      dict: decode_dict,
      current_focus: null,
      part_one: part1.join(""),
      part_two,
      part_one_key: "",
      current_focus_part_one: false,
      current_focus_part_two: null,
      tab_puzzle: null,
      part_two_key: Array(part_two.length).fill("")
    };
  },
  computed: {
    vigenere_decoded: function() {
      var temp = [];
      for (var i = 0; i < this.part_two.length; i++) {
        temp.push(this.vigenere_decode(this.part_two[i], this.part_two_key[i]));
      }
      return temp.join("");
    }
  },
  methods: {
    focus_letter: function(i) {
      this.current_focus = i;
      this.current_focus_part_one = false;
      this.current_focus_part_two = null;
      this.$refs.letters[i].focus();
    },
    focus_part_one_letters: function() {
      this.current_focus = null;
      this.current_focus_part_one = true;
      this.current_focus_part_two = null;
      // this.$refs.part_one[i].focus();
    },
    focus_part_two_letters: function(i) {
      this.current_focus = null;
      this.current_focus_part_one = false;
      this.current_focus_part_two = i;
      this.$refs.part_two[i].focus();
    },
    enter_decode: function(evt, letter, index) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keycode;
      // charCode = charCode + 97 - 65;
      if (charCode == 39) {
        var new_focus = (index + 1) % this.letters.length;
        // console.log(new_focus);
        this.focus_letter(new_focus);
        return;
      } else if (charCode == 37) {
        var new_focus = (index - 1) % this.letters.length;
        new_focus = new_focus < 0 ? new_focus + this.letters.length : new_focus;
        this.focus_letter(new_focus);
        return;
      }
      this.dict[letter] = String.fromCharCode(charCode); // new properties are not reactive
      // console.log(this.dict);
    },
    caesar_shift: function(charCode, shiftCharCode) {
      if (charCode >= "a".charCodeAt(0) && charCode <= "z".charCodeAt(0)) {
        charCode -= "a".charCodeAt(0);
        shiftCharCode -= "a".charCodeAt(0);
        charCode -= shiftCharCode;
        charCode %= 26;
        charCode = charCode < 0 ? charCode + 26 : charCode;
        return charCode + "a".charCodeAt(0);
      }
      return charCode;
    },
    vigenere_decode: function(text, key) {
      // console.log(key);
      if (key == null || key == "") {
        return "";
      }
      var j = 0;
      var new_text = "";
      // console.log(key.length);
      for (var i = 0; i < text.length; i++) {
        var charCode = text.charCodeAt(i);
        // console.log(j);
        new_text += String.fromCharCode(
          this.caesar_shift(charCode, key.charCodeAt(j))
        );
        if (charCode >= "a".charCodeAt(0) && charCode <= "z".charCodeAt(0)) {
          j++;
          j %= key.length;
        }
      }
      // console.log(new_text);
      return new_text;
    }
  }
};
</script>

<style>
.nooutline {
  outline: 0;
}

.withpadding.v-text-field.v-text-field--enclosed
  > .v-input__control
  > .v-input__slot {
  padding: 0 12px;
}

#part_one_key,
#part_two_key {
  color: var(--neon-text-highlight);
}

.opposite-color {
  color: var(--neon-box-shadow-highlight);
}
</style>
