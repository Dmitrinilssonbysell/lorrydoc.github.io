/*Const for html parts*/
const lorryDocMain = document.querySelector(".lorrydoc-main");
const lorryDocWelcome = lorryDocMain.querySelector(".lorrydoc-welcome-container");
const lorryDocContainer = lorryDocMain.querySelector(".lorrydoc-container");
const lorryDocSolutionCont = lorryDocMain.querySelector(".lorrydoc-solution-container");

/*Variable value change after every step in process*/
var brandSelected = 0;

//Window onload
window.onload = function() {
  onPageLoad();
}

function initSelects(val){
  //Val = type

  if(val == undefined){
    val = 1;
  }

  $.getSessVal(function(retVal){
    let sessVal = retVal;

    if(val > 0 && val < 3){
      $.buildSelect(val, sessVal);
    }
    $.selectBackFunc(val);
  });
}
//On page load
function onPageLoad(){

  $.checkLoggedIn(function(retVal){
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