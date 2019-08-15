export default {
  parse_latex: function(s) {
    var i = 0;
    var ast = [];
    var prev_type = '';
    var temp = '';
    while (s[i]) {

      if (!prev_type or) {

      }
    }
  },
  get_type: function(char) {
    switch (true) {
      case /^[0-9.]$/.test(char):
        return 'number';
      case char === '\\':
        return 'slash';
      case char === '{':
        return 'open_bracket';
      case char === '}':
        return 'close_bracket';
      case /^[a-zA-Z]$/.test(char):
        return 'letters';
      case /^[-+\/*]$/.test(char):
        return 'math_op';
      case char === '^':
        return 'super';
      case char === '_':
        return 'sub';
      default:
        return '';
    }
  }
}