/*
Solution and the results are put into 1, going under "solution".
Variables with selected... is a string set after the user has selected something.
Variables with ...selected is a int with value set after the user has selected something.
^^ Also used before building the selects for each part.
...Object is variable used to define function objects.
When getting solution from DB - set Back btn to reset.

*/

/*Const for html parts*/
const lorryDocMain = document.querySelector(".lorrydoc-main");
const lorryDocWelcome = lorryDocMain.querySelector(".lorrydoc-welcome-container");
const lorryDocContainer = lorryDocMain.querySelector(".lorrydoc-container");
const lorryDocSolutionCont = lorryDocMain.querySelector(".lorrydoc-selected-container");

/*Array for selection*/
const brandSelectionArr = ["Volvo", "Scania", "Renault"];
const problemSelectionArr = ["wheels", "engine", "Other"];

/*Variable for Objects*/
//Brand = manufacturer
var brandObject;
var problemObject;
var solutionObject;

/*Variable value given after every process part*/
var selectedManufacturer;
var selectedProblem;

/*Variable value change after every step in process*/
var brandSelected = 0;
var problemSelected = 0;
var solutionSelected = 0;

/*Variable will change when login check is done*/

//Window onload
window.onload = function() {
  onPageLoad();

}
//when page is loaded val == loggedin;
function onPageLoad(){

  $.checkLoggedIn(function(retVal){
    console.log(retVal);
    if(retVal <= 0){
      loadLogin();
    }
    else if(retVal[0].customer_id > 0){
      if(document.getElementsByClassName("login-row").length > 0){
        $(".login-row").remove();//Jquery to remove
      }

      if(brandSelected < 1){ //If manufacturer is not selected
        brandObject.buildBrandSelect(); //Calling func for building brand select
      }
    }
  });

  brandObject = new loadSelectBrand(brandSelectionArr);
  problemObject = new loadSelectProblem(problemSelectionArr);
  solutionObject = new loadSolution(selectedProblem);


/*
  //Back button to return in the process && onclick function
  var selectBackBtn = lorryDocWelcome.querySelector(".back");
  selectBackBtn.onclick = function(){
    if(brandSelected == 1 && problemSelected == 0){ //IF BRAND IS SELECTED
      document.querySelector(".selected-brand-div").remove();
      problemObject.problemDiv.remove();
      brandObject.buildBrandSelect();
    }
    else if(brandSelected == 1 && problemSelected == 1){ //IF BRAND AND PROBLEM IS SELECTED
      problemObject.problemDiv.remove();
      problemObject.buildProblemSelect();
    }
  }
  */
}



function loadSelectBrand(brandSelectionArr){
  //Create all required elements
  this.brandDiv = document.createElement("div");
  this.brandSelectElem = document.createElement("select");
  this.selectDesc =  document.createElement("span");

  this.brandSelectionArr = brandSelectionArr;

  //Create back button
  this.backSpan = document.createElement("span");
  this.backSpan.textContent = "Back";
  this.backSpan.setAttribute("class", "back");

  this.buildBrandSelect = function(){
    this.brandDiv.setAttribute("class", "select-container");
    this.brandSelectElem.setAttribute("class", "brand-select");
    this.selectDesc.setAttribute("class", "select-description");

    this.selectDesc.innerHTML = "Select your manufacturer";

    if(this.brandSelectElem.length < 3){
      //Adding "Select Manufacturer" At top of select element
      this.selectOption = document.createElement("option");
      this.selectOption.textContent = "Select manufacturer";
      this.brandSelectElem.append(this.selectOption);
      for(i = 0; i < this.brandSelectionArr.length; i++){ //Select option for-loop
        this.selectOption = document.createElement("option");
        this.selectOption.textContent = this.brandSelectionArr[i];

        this.brandSelectElem.append(this.selectOption);
      }
    }
    this.brandDiv.append(this.selectDesc);
    this.brandDiv.append(this.brandSelectElem);

    lorryDocContainer.append(this.brandDiv);
  }
  this.hideBrandDiv = function(){
    this.brandDiv.remove();

    brandSelected = 1;
    lorryDocWelcome.append(this.backSpan);

  }

  this.brandSelectElem.onchange = function(){ //On brand selected
    if(brandObject.brandSelectElem.value != "Select manufacturer"){

      selectedManufacturer = brandObject.brandSelectElem.value;

      solutionObject.selectedBrand(selectedManufacturer);
      brandObject.hideBrandDiv();
      problemObject.buildProblemSelect();
    }
  }
}

function loadSelectProblem(problemSelectionArr){
  this.problemDiv = document.createElement("div");
  this.problemSelectElem = document.createElement("select");
  this.selectDesc = document.createElement("span");
  this.problemSelectionArr = problemSelectionArr;

  this.buildProblemSelect = function(){
    this.problemDiv.setAttribute("class", "select-container");
    this.problemSelectElem.setAttribute("class", "problem-select");
    this.selectDesc.setAttribute("class", "select-description");
    this.selectDesc.innerHTML = "Select your problem";


    if(this.problemSelectElem.length < 3) {
      //Add "Select Problem" At top of select element
      this.selectOption = document.createElement("option");
      this.selectOption.textContent = "Select Problem";
      this.problemSelectElem.append(this.selectOption);
      for (i = 0; i < 3; i++) { //Select option for-loop
        this.selectOption = document.createElement("option");
        this.selectOption.textContent = this.problemSelectionArr[i];

        this.problemSelectElem.append(this.selectOption);
      }
    }
    this.problemDiv.append(this.selectDesc);
    this.problemDiv.append(this.problemSelectElem);

    lorryDocContainer.append(this.problemDiv);
  }
  this.hideProblemDiv = function(){
    this.problemDiv.remove();
    problemSelected = 1;
  }

  this.problemSelectElem.onchange = function(){ //On problem selected
    if(problemObject.problemSelectElem.value != "Select Problem"){
      selectedProblem = problemObject.problemSelectElem.value;

      solutionObject.selectedBrand(selectedProblem);
      problemObject.hideProblemDiv();
      solutionObject.selectedProblem();
    }
  }
}

function loadSolution(){

  this.selectedBrand = function(manuVal){
    this.selectedBrandDiv = document.createElement("div");
    this.selectedBrandDiv.setAttribute("class", "selected-brand-div");
    this.selectedBrandSpan = document.createElement("span");
    this.selectedBrandSpan.setAttribute("class", "selected-brand");
    this.selectedBrandSpan.textContent = "Manufacturer: " + manuVal;

    this.selectedBrandDiv.append(this.selectedBrandSpan);
    lorryDocSolutionCont.append(this.selectedBrandDiv);
  }
  this.selectedProblem = function(probVal){
    this.selectedProblemDiv = document.createElement("div");
    this.selectedProblemDiv.setAttribute("class", "selected-problem-div");
    this.selectedProblemSpan = document.createElement("span");
    this.selectedProblemSpan.setAttribute("class", "selected-problem");
    this.selectedProblemSpan.textContent = probVal;

    this.selectedProblemDiv.append(this.selectedProblemSpan);
    lorryDocSolutionCont.append(this.selectedProblemDiv);
  }
  this.solution = function(){
  }
}

function loadLogin(){
  var loginRow = document.createElement("div");
  var loginContainer = document.createElement("div");
  var loginForm =  document.createElement("form");
  var loginEmailLabel = document.createElement("label");
  var loginEmailInput = document.createElement("input");
  var loginPasswordLabel = document.createElement("label");
  var loginPasswordInput = document.createElement("input");
  var loginSubmitBtn = document.createElement("input");
  var loginRegisterBtn = document.createElement("span");

  loginRow.classList.add("login-row", "row");

  loginContainer.classList.add("login-container");


  loginEmailInput.setAttribute("type", "email");
  loginEmailInput.setAttribute("placeholder", "Enter Email!");
  loginEmailInput.setAttribute("id", "login_email");
  loginEmailInput.classList.add("login-email-input");
  loginEmailLabel.textContent = "Email - ";

  loginPasswordInput.setAttribute("type", "password");
  loginPasswordInput.setAttribute("placeholder", "Enter Password!");
  loginPasswordInput.setAttribute("id", "login_password");
  loginPasswordInput.classList.add("login-password-input");
  loginPasswordLabel.textContent = "Password - ";

  loginSubmitBtn.setAttribute("class", "login-submit-button");
  loginSubmitBtn.setAttribute("type", "submit");
  loginSubmitBtn.setAttribute("value", "Login");

  loginRegisterBtn.setAttribute("class", "login-register-button");
  loginRegisterBtn.textContent = "Sign up";

  loginForm.append(loginEmailLabel);
  loginForm.append(loginEmailInput);
  loginForm.append(loginPasswordLabel);
  loginForm.append(loginPasswordInput);
  loginForm.append(loginSubmitBtn);
  loginForm.append(loginRegisterBtn);
  loginContainer.append(loginForm);
  loginRow.append(loginContainer);

  lorryDocMain.append(loginRow);

  loginSubmitBtn.onclick = function(e){
    loginUser(e);
  }

  loginRegisterBtn.onclick  = function(){//Sign up click
    toggleLoginRegisterForm();
  }
}

function loadRegister(){
  var registerRow = document.createElement("div");
  var registerContainer = document.createElement("div");
  var registerForm = document.createElement("form");
  var registerFirstNameInput = document.createElement("input");
  var registerLastNameInput = document.createElement("input");
  var registerEmailInput = document.createElement("input");
  var registerPasswordInput = document.createElement("input");
  var registerRePasswordInput = document.createElement("input");
  var registerAmBtn = document.createElement("span");
  var registerSubmitBtn = document.createElement("input");

  registerRow.classList.add("register-row", "row");

  registerContainer.classList.add("register-container");

  registerFirstNameInput.setAttribute("type", "text");
  registerFirstNameInput.setAttribute("placeholder", "Enter First Name");
  registerFirstNameInput.setAttribute("id", "reg_first_name");
  registerFirstNameInput.setAttribute("name", "reg_first_name");
  registerFirstNameInput.classList.add("register-first-name-input");

  registerLastNameInput.setAttribute("type", "text");
  registerLastNameInput.setAttribute("placeholder", "Enter Last Name");
  registerLastNameInput.setAttribute("id", "reg_last_name");
  registerLastNameInput.setAttribute("name", "reg_last_name");
  registerLastNameInput.classList.add("register-last-name-input");

  registerEmailInput.setAttribute("type", "email");
  registerEmailInput.setAttribute("placeholder", "Enter Email!");
  registerEmailInput.setAttribute("id", "reg_email");
  registerEmailInput.setAttribute("name", "reg_email");
  registerEmailInput.classList.add("register-email-input");

  registerPasswordInput.setAttribute("type", "password");
  registerPasswordInput.setAttribute("placeholder", "Enter Password!");
  registerPasswordInput.setAttribute("id", "reg_password");
  registerPasswordInput.setAttribute("name", "reg_pwd");
  registerPasswordInput.classList.add("register-password-input");

  registerRePasswordInput.setAttribute("type", "password");
  registerRePasswordInput.setAttribute("placeholder", "Enter Password again!");
  registerRePasswordInput.classList.add("register-password-input");

  registerAmBtn.setAttribute("class", "already-member-button");
  registerAmBtn.textContent = "Already a member";

  registerSubmitBtn.setAttribute("class", "register-submit-button");
  registerSubmitBtn.setAttribute("type", "submit");
  registerSubmitBtn.setAttribute("value", "Register");

  registerForm.append(registerFirstNameInput);
  registerForm.append(registerLastNameInput);
  registerForm.append(registerEmailInput);
  registerForm.append(registerPasswordInput);
  registerForm.append(registerRePasswordInput);
  registerForm.append(registerAmBtn);
  registerForm.append(registerSubmitBtn);
  registerContainer.append(registerForm);
  registerRow.append(registerContainer);

  lorryDocMain.append(registerRow);


  registerSubmitBtn.onclick = function(e){
    regUser(e);
  };

  registerAmBtn.onclick = function(){
    toggleLoginRegisterForm();
  }
}

function regUser(e){
  e.preventDefault();
  let email = document.getElementsByClassName("register-email-input")[0].value;
  let password = document.getElementsByClassName("register-password-input")[0].value;
  let password2 = document.getElementsByClassName("register-password-input")[1].value;
  let firstName = document.getElementsByClassName("register-first-name-input")[0].value;
  let lastName = document.getElementsByClassName("register-last-name-input")[0].value;

  var errors = {}; //Register error
  let minPassLength = 8; //For password check

  //Compare email
    data = "&reg_email=" + $('#reg_email').val();
    $.ajax({
      url: "http://127.0.0.1:1337/checkEmail",
      type: "POST",
      data: data,
      dataType: 'json',
      success: function (xdata) {
        if(xdata.length > 0){
          errors.emailIsFree = false;
        }
        else{
          errors.emailIsFree = true;
        }
      },
      error: function (xdata) {
        console.log("ERROR");
      }
    });

  setTimeout(function(){
    var validateCheck = {
      validateEmail: function(email){
        let re = /\S+@\S+\.\S+/;

        if(re.test(email) == true && email.length > 0){
          errors.emailIsValid = true;
        }else if(re.test(email) == false || email.length <= 0){
          errors.emailIsValid = false;
        }
      },
      validateName: function(firstName, lastName){
        let nameChars = /^[A-Za-z]+$/;
        //name.val().match(nameChars);
        if(firstName.match(nameChars) == null){
          errors.firstNameIsValid = false;
        }
        else if(firstName.match(nameChars).length > 0){
          errors.firstNameIsValid = true;
        }
        if(lastName.match(nameChars) == null){
          errors.lastNameIsValid = false;
        }
        else if(lastName.match(nameChars) == null > 0){
          errors.firstNameIsValid = true;
        }
      },
      validatePassword: function(password){

        if(password.length < minPassLength){
          errors.passwordIsValid = false;
        }
        else if(password.length >= minPassLength){
          errors.passwordIsValid = true;
        }
      },
      validatePassMatch: function(password, password2){
        if(password === password2 && password.length > 0){
          errors.passwordsMatch = true;
        }
        else if(password !== password2){
          errors.passwordsMatch = false;
        }
      },
      checkValidation: function(){
        if(Object.keys(errors).every(function(k){ return errors[k]}) === true){
          $.doSave();
          toggleLoginRegisterForm();
        }
        else if(Object.keys(errors).every(function(k){ return errors[k]}) === false){
          console.log("NOT FILLED OUT CORRECTLY");
        }
      }
    }

    //Check email is actual email
    validateCheck.validateEmail(email);

    //Check Name is actual name without special chars
    validateCheck.validateName(firstName, lastName);

    //Check passwords match
    validateCheck.validatePassword(password, minPassLength);
    validateCheck.validatePassMatch(password, password2);

    validateCheck.checkValidation();
  },200);

}

//Create login
function loginUser(e){
  let email = document.getElementsByClassName("login-email-input")[0].value;
  let password = document.getElementsByClassName("login-password-input")[0].value;
  let login = 0;

  if(login){
    console.log("yay");
  }
  else if(!login){
    e.preventDefault();
  }

  $.usrCheckLogin(function(retVal, sess){
    console.log(retVal);
    if(retVal.length >= 1){
      console.log("Logged In");
      onPageLoad();
    }
    else if(retVal.length <= 0){
      console.log("Not Logged In");
    }
    else{
      alert("Error");
    }
  });
}

function toggleLoginRegisterForm(){
  let registerContainerRow = document.querySelector(".register-row");
  let loginContainerRow = document.querySelector(".login-row");

  if(registerContainerRow == null){
    loginContainerRow.remove();
    loadRegister();
  }
  else if(loginContainerRow == null){
    registerContainerRow.remove();
    loadLogin();
  }
}

var resetSite = {
  reset : function(){
    brandSelected = 0;
    problemSelected = 0;
    selectedManufacturer = "";
    selectedProblem = "";
  }
}