const userInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInputInput = document.getElementById("password");
const createButton = document.getElementById("create-button");
const errorMessage = document.getElementById("error-message");
createButton.onclick = FUNCTION(){
const promise = firebase.auth().createUserWithEmailAndPassword(emailInput.value, passwordInput.value);
promise.catch(function(erro);{
              errorMessage.textContent = error.message;
              });
    promise.then(function(){
        location.href = "index.html";
    
    });
};