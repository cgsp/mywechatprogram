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

function myThrottle(func, delay) {
  let timer;

  return function(...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

function throttle(func, delay) {
  let timer = null;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(func, delay);
  };
};

// 没加节流的使用方法
// this.$watch('query', (newQuery, oldQuery) => {
//   console.log(newQuery);
//   this.$emit('queryChange', newQuery);
// });


// 加节流的使用方法
// this.$watch('query', myThrottle((newQuery, oldQuery) => {
//     this.$emit('queryChange', newQuery);
//   }, 300)
// );

function convertToStarsArray(stars) {
  var num = stars.toString().substring(0, 1);
  var array = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push(1);
    } else {
      array.push(0);
    }
  }
  return array;
}

function convertToCastString(casts) {
  var castsjoin = "";
  for (var idx in casts) {
    castsjoin = castsjoin + casts[idx].name + " / ";
  }
  return castsjoin.substring(0, castsjoin.length - 2);
}

function convertToCastInfos(casts) {
  var castsArray = []
  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : "",
      name: casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}

module.exports = {
  toStarsArrNoHalf,
  toStarsArrHasHalf,
  myThrottle,
  throttle,
  convertToStarsArray,
  convertToCastString,
  convertToCastInfos
}