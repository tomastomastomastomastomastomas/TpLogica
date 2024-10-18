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

//Para empezar, en esta funcion puse el segundo parametro por defecto null, asi ya no era 100% necesario recibir un segundo parametro, primero pregunto si de por si los 2 son numeros, los sumo y los retorno. Pero sino, pregunto si llego algo en el segundo parametro, para saber si tengo que retornar una funcion que reciba el otro parametro que se envio, pero si el primero o el segundo no es algun numero, consologueo el error.

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

//Para chequear esta funcion declare 2 listas de usuarios, donde una contiene algun usuario loguiado hace 30 minutos y en la otra no. Lo que hago en la funcion es llamar al objeto global date y obtengo los milisegundos actuales, y le resto 30 minutos (multiplicando 30 minutos por 60 segundos por 1000 milisegundos) y retorno el resultado del metodo some de la lista de los usuarios si es que encuentra un usuario que fue loguiado despues de los ultimos 30 minutos.

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

//Lo primero que hago en esta funcion es pasar a array cada string asi obtengo metodos para recorrer cada caracter que si eran strings no podia. Necesitaba ir descartando cada caracter de un string que no se encontraba en el otro string, con metodos como el includes, unicamente, no me servia ya que si se repetia algun caracter en un string y en el otro no, responderia algun error, entonces lo resolvi borrando los caracteres que ya pase del primer array con el metodo shift. Utilice el array characterchecked que guarda el indice de los caracteres ya pasados para que no vuelva a preguntar por un caracter que ya pase y utilice el found y el break para optimizar el bucle para que no haga iteraciones innescesarias.

function generateSecurePassword(length) {
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

  let groupCharactersLength = groupsCharacters.length;
  let maxLength = 25;

  if (
    isNaN(parseInt(length)) ||
    length <= groupCharactersLength ||
    length > maxLength
  ) {
    return "Is not a valid length";
  }

  let newPassword = "";
  let countCharacterUsed = 0;

  for (let i = 0; i < length; i++) {
    if (countCharacterUsed === 4) {
      let groupCharacters = parseInt(
        Math.random() * (groupCharactersLength + 1)
      );

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

//En la funcion de generar la contraseña valido inicialmente que sea una longitud valida, ya que tiene como requisito 4 condiciones para los caracteres, ingrese como validacion que sea de una longitud entre 4 (el largo de los grupos de caracteres nescesarios), 25 (un maximo para que no puedas ingresar un numero extremadamente grande) y que sea un numero. Luego hago un for donde las primeras 4 iteraciones son obligatoriamente un grupo de caracteres distinto al anterior, y una vez que se cumple, hago un random en base a la cantidad de grupos de caracteres y luego otro random en base a la cantidad de caracteres almacenados en el array de los grupos de caracteres indexado por el primero random. Y como claramente hay un patron que se repite en los primeros 4 caracteres, cree la funcion disorderString, que almacena la logica para retornar un nuevo string desordenado.
