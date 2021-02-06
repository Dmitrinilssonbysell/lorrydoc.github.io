/*Const for html parts*/
const lorryDocMain = document.querySelector(".lorrydoc-main");
const lorryDocWelcome = lorryDocMain.querySelector(".lorrydoc-welcome-container");
const lorryDocContainer = lorryDocMain.querySelector(".lorrydoc-container");
const lorryDocSolutionCont = lorryDocMain.querySelector(".lorrydoc-solution-container");

//Window onload
window.onload = function() {
  onPageLoad();
}

function getPreSel(){
  $.getSessVal(function(retVal){
    let sessVal = retVal;
    let sessSelectedVal;
    let sessSelectedId;
    let sessTypeName;
    let sessTypeNum;
    let doInit;

    if(sessVal.selStage != undefined){
      for(i = 1; i < sessVal.selStage; i++){
        if(i == 1){
          sessSelectedVal = sessVal.brand_name;
          sessSelectedId = sessVal.brand_id;
          sessTypeName = "brand";
          sessTypeNum = i;
        }
        else if(i == 2){
          sessSelectedVal = sessVal.problem_str;
          sessSelectedId = sessVal.problem_id;
          sessTypeName = "problem";
          sessTypeNum = i;
        }
        $.displaySelected(sessSelectedVal, sessSelectedId, sessTypeName,sessTypeNum, 0);
      }
      if(i == 3){
        $.displaySolution(4);
      }
      console.log(sessVal.selStage);
      if(sessVal.selStage < 3){
        if(sessVal.selStage == 2){
          initSelects(2);
        }
      }
      $.selectBackFunc(i);
    }
    else {
      initSelects();
      return;
    }

  });

}

function initSelects(val){
  //Val = type
  if(val == undefined){
    val = 1;
  }
  if(val > 0 && val < 3){
    $.buildSelect(val);
  }
  else if(val == 3){
    $.displaySolution(4);
  }
  $.selectBackFunc(val);
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
      getPreSel();
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