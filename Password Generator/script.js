const passwordBox = document.getElementById("password");
const length = 12;

const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const number = "0123456789";
const symbol = "!@#$%^&*()_+~`|}{[]></-=";

const allChars = upperCase + lowerCase + number + symbol;

function createPassword() {
    let password = "";
    // Ensure the password has at least one of each character type for security
    password += upperCase[Math.floor(Math.random() * upperCase.length)];
    password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
    password += number[Math.floor(Math.random() * number.length)];
    password += symbol[Math.floor(Math.random() * symbol.length)];

    // Fill the rest of the password length with a mix of all characters
    while(length > password.length){
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    // Shuffle the password to make it more random
    password = password.split('').sort(function(){return 0.5-Math.random()}).join('');

    passwordBox.value = password;
}

function copyPassword() {
    passwordBox.select();
    document.execCommand("copy");
    alert("Password copied to clipboard!");
}