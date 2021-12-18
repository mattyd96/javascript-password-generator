// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);


//Generate Password
function generatePassword() {

  //strings holding character sets for each option
  const lowerString = "abcdefghijklmnopqrstuvwxyz";
  const upperString = lowerString.toUpperCase();
  const numericString = "1234567890";
  const specialString = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
  //end string used for creating the password
  let charPool = "";

  //get user prefferences for password structure
  let [length, lower, upper, numeric, special] = getInput();

  //build charPool string based on user selected options
  if(lower) {charPool = charPool.concat(lowerString);}
  if(upper) {charPool = charPool.concat(upperString);}
  if(numeric) {charPool = charPool.concat(numericString);}
  if(special) {charPool = charPool.concat(specialString);}

  //initialize password length and password string
  let possibleSelect = charPool.length;
  let password = "";

  //generate password
  for(var i = 0; i < length; i++) {
    var random = cryptoRandom();
    password = password.concat(charPool[Math.floor(random * possibleSelect)]);
  }

  return password;
}

//function to get a floating point number from 0 to almost 1
//works like Math.random but uses the crypto api
function cryptoRandom() {
  var arr = new Uint32Array(1);
  window.crypto.getRandomValues(arr);
  return arr[0]/(0xffffffff + 0.9999999999);
}

//gets user input and validates it
//returns array[5] with [number length, bool lower, bool upper, bool numeric, bool special]
function getInput() {

  //used to verify input has been validated
  let isValidated = false;

  //get password length from user between 8 and 128 characters
  let length = 0;

  while(!isValidated) {
    length = parseInt(prompt("Please choose a password length between 8 and 128 characters", "8"));
    if(length >= 8 && length <= 128) {isValidated = true}
  }
  
  //reset validation status
  isValidated = false;

  //get user options for lower/uppercase, numeric/special characters
  let lower,upper,numeric,special;

  while(!isValidated) {
    //include lowercase ?
    lower = confirm("Include lowercase letters?");

    //include uppercase ?
    upper = confirm("Include uppercase letters?");

    //include numeric character?
    numeric = confirm("Include numbers?");

    //inlcude special characters
    special = confirm("Include special characters? (!,@,# etc.)");

    if(lower || upper || numeric || special) {
      isValidated = true;
    } else {
      alert("please select at least one option");
    }
  }

  return [length, lower, upper, numeric, special];
}