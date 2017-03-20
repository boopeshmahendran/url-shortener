var alphabet = '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ';
var base = alphabet.length;

function encode(num) {
  // corner case
  if (num === 0) return '1';

  var answer = '';
  while (num) {
    answer = alphabet[num % base] + answer;
    num = Math.floor(num / base);
  }
  return answer;
}

function decode(str) {
  var answer = 0;
  for (let x of str) {
    answer = answer * base + alphabet.indexOf(x);
  }
  return answer;
}

module.exports = {
  encode,
  decode
};
