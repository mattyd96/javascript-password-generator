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
  //get user prefferences for password structure

  //used to verify input has been validated
  let isValidated = false;

  //get password length from user between 8 and 128 characters
  let length = 8;

  while(!isValidated) {
    length = parseInt(prompt("Please choose a password length between 8 and 128 characters", "8"));
    if(length >= 8 && length <= 128) {isValidated = true}
  }
  
  isValidated = false;
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

  const lowerString = "abcdefghijklmnopqrstuvwxyz";
  const upperString = lowerString.toUpperCase();
  const numericString = "1234567890";
  const specialString = "!@#$%^&*()_-+=`~";

  let charPool = "";

  if(lower) {charPool = charPool.concat(lowerString);}
  if(upper) {charPool = charPool.concat(upperString);}
  if(numeric) {charPool = charPool.concat(numericString);}
  if(special) {charPool = charPool.concat(specialString);}

  let possibleSelect = charPool.length;
  let password = "";

  for(var i = 0; i < length; i++) {
    password = password.concat(charPool[Math.floor(Math.random() * possibleSelect)]);
  }

  return password;

}