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
var loggedin = 1;

//Onload window
window.onload = function() {
  brandObject = new loadSelectBrand(brandSelectionArr);
  problemObject = new loadSelectProblem(problemSelectionArr);
  solutionObject = new loadSolution(selectedProblem);
  loadForm(loggedin);
};

//Loading form. val == loggedin;
function loadForm(val){

  if(val == 1){ //If  logged in
    if(brandSelected <= 0){ //If manufacturer is not selected
      brandObject.buildBrandSelect(); //Calling func for building brand select
    }
    else if(brandSelected > 0 && problemSelected == 0){ //If manufacturer is selected and problem is not already selected
      problemObject.buildProblemSelect(); //Calling func for building problem select
    }
    else if(brandSelected >= 1 && problemSelected >= 1){
      //Calling func for displaying all elements
    }
  }
  else if(val == 0){
    loadLogin();

    document.querySelector(".login-register-button").onclick = function(){
      document.querySelector(".login-row").remove();
      loadRegister();
      document.querySelector(".already-member-button").onclick = function(){
        document.querySelector(".register-row").remove();
        loadForm(loggedin);
      }
    }
  }

  //On brand select elem change
  brandObject.brandSelectElem.onchange = function(){
    if(brandObject.brandSelectElem.value != "Select manufacturer"){
      console.log(brandObject.brandSelectElem.value);
      selectedManufacturer = brandObject.brandSelectElem.value;

      solutionObject.selectedBrand(selectedManufacturer);
      brandObject.hideBrandDiv();
      loadForm(val);
    }
  }
  //On problem select elem change
  problemObject.problemSelectElem.onchange = function(){
    if(problemObject.problemSelectElem.value != "Select Problem"){
      selectedProblem = problemObject.problemSelectElem.value;

      solutionObject.selectedBrand(selectedProblem);
      problemObject.hideProblemDiv();
      loadForm(val);
    }
  }

  //Back button to return in the process && onclick function
  var selectBackBtn = lorryDocWelcome.querySelector(".back");
    if (selectBackBtn.length > 1) {
        selectBackBtn.onclick = function () {
            if (brandSelected == 1 && problemSelected == 0) {
                document.querySelector(".selected-brand-div").remove();
                problemObject.problemDiv.remove();
                brandObject.buildBrandSelect();
            }
            else if (brandSelected == 1 && problemSelected == 1) {
                problemObject.problemDiv.remove();
                problemObject.buildProblemSelect();
            }
    }
  }
}



function loadSelectBrand(brandSelectionArr){
  //Create all required elements
  this.brandDiv = document.createElement("div");
  this.brandSelectElem = document.createElement("select");
  this.selectDesc =  document.createElement("span");

  this.brandSelectionArr = brandSelectionArr;

  

  this.buildBrandSelect = function(){
    this.brandDiv.setAttribute("class", "select-container");
    this.brandSelectElem.setAttribute("class", "brand-select");
    this.selectDesc.setAttribute("class", "select-description");

    this.selectDesc.innerHTML = "Select your manufacturer";

    //Create back button
    this.backSpan = document.createElement("span");
    this.backSpan.textContent = "Back";
    this.backSpan.setAttribute("class", "back");

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
  loginEmailInput.classList.add("login-email-input");
  loginEmailLabel.textContent = "Email - ";

  loginPasswordInput.setAttribute("type", "password");
  loginPasswordInput.setAttribute("placeholder", "Enter Password!");
  loginPasswordInput.classList.add("login-password-input");
  loginPasswordLabel.textContent = "Password - ";

  loginSubmitBtn.setAttribute("class", "login-submit-button");
  loginSubmitBtn.setAttribute("type", "submit");
  loginSubmitBtn.setAttribute("value", "Submit");

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
}

function loadRegister(){
  var registerRow = document.createElement("div");
  var registerContainer = document.createElement("div");
  var registerForm = document.createElement("form");
  var registerNameInput = document.createElement("input");
  var registerEmailInput = document.createElement("input");
  var registerPasswordInput = document.createElement("input");
  var registerRePasswordInput = document.createElement("input");
  var registerAmBtn = document.createElement("span");
  var registerSubmitBtn = document.createElement("input");

  registerRow.classList.add("register-row", "row");

  registerContainer.classList.add("register-container");

  registerNameInput.setAttribute("type", "text");
  registerNameInput.setAttribute("placeholder", "Enter Name");
  registerNameInput.classList.add("register-name-input");

  registerEmailInput.setAttribute("type", "email");
  registerEmailInput.setAttribute("placeholder", "Enter Email!");
  registerEmailInput.classList.add("register-email-input");

  registerPasswordInput.setAttribute("type", "password");
  registerPasswordInput.setAttribute("placeholder", "Enter Password!");
  registerPasswordInput.classList.add("register-password-input");

  registerRePasswordInput.setAttribute("type", "password");
  registerRePasswordInput.setAttribute("placeholder", "Enter Password again!");
  registerRePasswordInput.classList.add("register-password-input");

  registerAmBtn.setAttribute("class", "already-member-button");
  registerAmBtn.textContent = "Already a member";

  registerSubmitBtn.setAttribute("class", "register-submit-button");
  registerSubmitBtn.setAttribute("type", "submit");
  registerSubmitBtn.setAttribute("value", "Submit");

  registerForm.append(registerNameInput);
  registerForm.append(registerEmailInput);
  registerForm.append(registerPasswordInput);
  registerForm.append(registerRePasswordInput);
  registerForm.append(registerAmBtn);
  registerForm.append(registerSubmitBtn);
  registerContainer.append(registerForm);
  registerRow.append(registerContainer);

  lorryDocMain.append(registerRow);
}

var resetSite = {
  reset : function(){
    brandSelected = 0;
    problemSelected = 0;
    selectedManufacturer = "";
    selectedProblem = "";
  }
}