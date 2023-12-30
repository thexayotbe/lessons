// ! Roman To Integer

// var romanToInt = function (s) {
//   let values = {
//     CD: 400,
//     CM: 900,
//     XL: 40,
//     XC: 90,
//     IX: 9,
//     IV: 4,
//     III: 3,
//     V: 5,
//     X: 10,
//     L: 50,
//     C: 100,
//     D: 500,
//     M: 1000,
//     I: 1,
//     II: 2,
//   };
//   let result = 0;
//   let sortedKeys = Object.keys(values).sort((a, b) => b.length - a.length);
//   sortedKeys.map((value) => {
//     while (s.includes(value)) {
//       s = s.replace(value, "");
//       result += values[value];
//     }
//   });

//   return result;
// };

// console.log(romanToInt("DCXXI"));

//  ! Find Happy Number

const findHappyNumber = (num) => {
  let foundNumbers = 0;
  let sorted = {};
  let strNum = num.toString();
  strNum.split("").map((value) => (sorted[value] = (sorted[value] || 0) + 1));
  foundNumbers = Object.entries(sorted)
    .reverse()
    .filter((value) => value[0] == value[1]);
  return `Happy number is ${
    foundNumbers.length > 0 ? foundNumbers[0][0] : "None"
  }`;
};
console.log(findHappyNumber(123454778888888));

const findHappyNumberv2 = (num) => {
  num = String(num).split("");
  let happyNumbers = num.reduce((previousValue, currentValue) => {
    const happyCount = num.filter((value) => value == currentValue).length;

    let newObj = { ...previousValue };

    if (currentValue == happyCount) newObj[currentValue] = happyCount;

    return newObj;
  }, {});
  happyNumbers = Object.values(happyNumbers);
  console.log(happyNumbers);
  return `Happy number: ${happyNumbers[happyNumbers.length - 1]}`;
};
console.log(findHappyNumberv2(1223454778888888));
