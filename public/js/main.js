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

/*Variable for Objects*/
//Brand = manufacturer
var brandObject;
var problemObject;
var solutionObject;

/*Variable value given after every process part*/
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

function initSelects(val){
  //Val = init

  let maxVal = 3;

  if(val > maxVal){
    console.log("ERROR");
    return;
  }
  if(brandSelected == 0 || val == 1){
    $.buildSelect(1);
    brandSelected = 1;
  }
  $.buildSelect(val);

  if(val > 1){
    $.selectBackFunc(val);
  }
}
//On page load
function onPageLoad(){

  $.checkLoggedIn(function(retVal){
    console.log(retVal);
    if(retVal <= 0){ //If not logged in
      $.buildLogin();
    }
    else if(retVal[0].customer_id > 0){ //If logged in
      if(document.getElementsByClassName("login-row").length > 0){
        $(".login-row").remove();//Jquery to remove
      }
      initSelects();
    }
  });
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



function toggleLoginRegisterForm(){
  let registerContainerRow = document.querySelector(".register-row");
  let loginContainerRow = document.querySelector(".login-row");

  if(registerContainerRow == null){
    loginContainerRow.remove();
    $.buildRegister();
    }
  else if(loginContainerRow == null){
    registerContainerRow.remove();
    $.buildLogin();
  }
}