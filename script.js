function sum(firstParameter, secondParameter = null) {
  if (isNumber(firstParameter) && isNumber(secondParameter)) {
    return firstParameter + secondParameter;
  } else {
    if (!secondParameter && isNumber(firstParameter)) {
      return function (posibleNumber) {
        return isNumber(posibleNumber)
          ? firstParameter + posibleNumber
          : "second parameter is not a number";
      };
    } else {
      return "There are not valid parameters";
    }
  }
}

function isNumber(number) {
  return typeof number === "number";
}

console.log(sum(1)(2));
console.log(sum(1)("a"));
console.log(sum(1, "a"));
console.log(sum(1, 2));

const users1 = [
  {
    id: 1,
    login_time: new Date(new Date().getTime() - 15 * 60 * 1000),
  },
  {
    id: 2,
    login_time: new Date(new Date().getTime() - 60 * 60 * 1000),
  },
  {
    id: 3,
    login_time: new Date(new Date().getTime() - 40 * 60 * 1000),
  },
  {
    id: 4,
    login_time: new Date(new Date().getTime() - 20 * 60 * 1000),
  },
];

const users2 = [
  {
    id: 1,
    login_time: new Date(new Date().getTime() - 40 * 60 * 1000),
  },
  {
    id: 2,
    login_time: new Date(new Date().getTime() - 60 * 60 * 1000),
  },
  {
    id: 3,
    login_time: new Date(new Date().getTime() - 35 * 60 * 1000),
  },
  {
    id: 4,
    login_time: new Date(new Date().getTime() - 50 * 60 * 1000),
  },
];

function someUserLoggedInLastMinutes(users) {
  let minutes = 30;
  let time = new Date().getTime() - minutes * 60 * 1000;
  return users.some(function (user) {
    return user.login_time.getTime() >= time;
  });
}

console.log(
  "There are some user logged in last 30 minutes",
  someUserLoggedInLastMinutes(users1)
);

console.log(
  "There are some user logged in last 30 minutes",
  someUserLoggedInLastMinutes(users2)
);

function isAnAnargam(string1, string2) {
  if (!isString(string1) || !isString(string2)) {
    return "Some parameter is not a string";
  }
  let arrayString1 = getArrayString(string1.toLowerCase());
  let arrayString2 = getArrayString(string2.toLowerCase());

  let arrayString1Length = arrayString1.length;
  let arrayString2Length = arrayString2.length;

  let characterChecked = [];
  for (let i = 0; i < arrayString1Length; i++) {
    let found = false;
    for (let n = 0; n < arrayString2Length; n++) {
      if (
        arrayString1[0] === arrayString2[n] &&
        !characterChecked.includes(n)
      ) {
        characterChecked.push(n);
        arrayString1.shift();
        found = true;
        break;
      }
    }
    if (!found) {
      return false;
    }
  }
  return arrayString1.length === 0;
}

function getArrayString(string) {
  let arrayOfCharacter = [];

  let stringLength = string;

  for (let i = 0; i < stringLength; i++) {
    if (string[i] !== " ") {
      arrayOfCharacter.push(string[i]);
    }
  }
  return arrayOfCharacter;
}

function isString(string) {
  return typeof string === "string";
}

console.log("Anagram: ", isAnAnargam(2, "bo AA arbostboaaa "));
console.log("Anagram: ", isAnAnargam("2", "bo AA arbostboaaa "));
console.log(
  "Anagram: ",
  isAnAnargam("   arbosta  bo AA  boaa", "bo AA arbostboaaa ")
);

function generateSecurePassword(length) {
  if (isNaN(parseInt(length)) || length < 4 || length > 100) {
    return "Is not a valid length";
  }

  const toUpperCaseCharacters = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
  const toLowerCaseCharacters = "abcdefghijklmnñopqrstuvwxyz";
  const numbers = "0123456789";
  const specialCharacters = "!@#$%^&*()-_=+[]{}|;:,.<>?";

  let groupsCharacters = [
    toUpperCaseCharacters,
    toLowerCaseCharacters,
    numbers,
    specialCharacters,
  ];

  let newPassword = "";
  let countCharacterUsed = 0;

  for (let i = 0; i < length; i++) {
    if (countCharacterUsed === 4) {
      let groupCharacters = parseInt(Math.random() * 4);

      let selectedCharacter = groupsCharacters[groupCharacters];

      newPassword +=
        selectedCharacter[parseInt(Math.random() * selectedCharacter.length)];
    } else {
      let selectedCharacter = groupsCharacters[countCharacterUsed];

      newPassword +=
        selectedCharacter[parseInt(Math.random() * selectedCharacter.length)];
      countCharacterUsed++;
    }
  }
  return disorderString(newPassword);
}

function disorderString(string) {
  let newDisorderString = "";
  let stringLength = string.length;
  let indexUsed = [];
  for (let i = 0; i < stringLength; i++) {
    while (true) {
      let indexCharacter = parseInt(Math.random() * stringLength);
      if (!indexUsed.includes(indexCharacter)) {
        indexUsed.push(indexCharacter);
        newDisorderString += string[indexCharacter];
        break;
      }
    }
  }
  return newDisorderString;
}

console.log(generateSecurePassword(10000000000000));
console.log(generateSecurePassword("a"));
console.log(generateSecurePassword(-1));
console.log(generateSecurePassword(3));
console.log(generateSecurePassword(5));
console.log(generateSecurePassword(8));
