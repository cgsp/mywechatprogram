// 如果不要半星的话
function toStarsArrNoHalf(starNum) {
  const num = starNum.toString().substr(0, 1) - 0;
  const arr = [];

  for (var i = 0; i < 5; i++) {
    if (i <= num) {
      arr.push(1);
    } else {
      arr.push(0);
    }
  }
  return arr;
}

// 如果要半星的话
function toStarsArrHasHalf(starNum) {
  let arr = [];
  for (let i = 0; i < 5; i++) {
    if (starNum <= i) {
      arr.push(0);
    } else if (i < starNum && starNum < (i + 1)) {
      // debugger;
      arr.push(0.5);
    } else {
      arr.push(1);
    }
  }
  return arr;
}
module.exports = {
  toStarsArrNoHalf,
  toStarsArrHasHalf
}