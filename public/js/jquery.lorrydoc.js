$.extend({
  checkLoggedIn:function(callbackFnk){
    var request = $.ajax({
      url: "http://127.0.0.1:1337/checkLoggedIn",
      type: "GET",
      dataType: 'json',
    });
    request.done(function( msg ) {
      if(typeof callbackFnk === 'function') callbackFnk.call(this,msg);
    });

    request.fail(function(jqXHR,textStatus,errorThrown) {
      if(typeof callbackFnk === 'function') callbackFnk.call(this,0);
    });
  },

  getBrand:function(callbackFnk) {
    var request = $.ajax({
      url: "http://127.0.0.1:1337/getBrands",
      type: "POST",
      dataType: 'json',
    });

    request.done(function (msg) {
      if (typeof callbackFnk === 'function') callbackFnk.call(this, msg);
    });

    request.fail(function (jqXHR, textStatus, errorThrown) {
      if (typeof callbackFnk === 'function') callbackFnk.call(this, 0);
    });
  },
  getProblem:function(callbackFnk) {
    data = "&brand_id=" + document.querySelector(".selected-brand").dataset.id + "&brand_name=" + document.querySelector(".selected-brand").dataset.val;

    var request = $.ajax({
      url: "http://127.0.0.1:1337/getProblem",
      type: "POST",
      data: data,
      dataType: 'json',
    });

    request.done(function (msg) {
      if (typeof callbackFnk === 'function') callbackFnk.call(this, msg);
    });

    request.fail(function (jqXHR, textStatus, errorThrown) {
      if (typeof callbackFnk === 'function') callbackFnk.call(this, 0);
    });
  },
  getSolution:function(callbackFnk){
    data = "&problem_id=" + document.querySelector(".selected-problem").dataset.id + "&problem_name=" + document.querySelector(".selected-problem").dataset.val;

    var request = $.ajax({
      url: "http://127.0.0.1:1337/getSolution",
      type: "POST",
      data: data,
      dataType: 'json',
    });

    request.done(function (msg) {
      if (typeof callbackFnk === 'function') callbackFnk.call(this, msg);
    });

    request.fail(function (jqXHR, textStatus, errorThrown) {
      if (typeof callbackFnk === 'function') callbackFnk.call(this, 0);
    });
  },
  buildRegister:function(){
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

    registerForm.setAttribute("class", "reg-form");

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

    registerValidation();

    registerAmBtn.onclick = function(){
      toggleLoginRegisterForm();
    }

    function registerValidation(){
      //Input errors
      let errors = {
        emailIsFree: false,
        emailIsValid: false,
        firstNameIsValid: false,
        lastNameIsValid: false,
        passwordIsValid: false,
        passwordsMatch: false
      };

      //Validation checks
      $(".register-email-input").keyup(function(){ //Email check
        let emailVal = document.getElementsByClassName("register-email-input")[0].value;
        let re = /\S+@\S+\.\S+/;

        if(re.test(emailVal) == true && emailVal.length > 0){
          errors.emailIsValid = true;

          console.log("Email is valid");
        }
        else if(re.test(emailVal) == false || emailVal.length <= 0){
          errors.emailIsValid = false;
          console.log("Email is invalid");
        }
        //Do a compare between email input and email in DB
      });
      $(".register-email-input").blur(function(){

        data = "&reg_email=" + document.getElementsByClassName("register-email-input")[0].value;
        $.ajax({
          url: "http://127.0.0.1:1337/checkEmail",
          type: "POST",
          data: data,
          dataType: 'json',
          success: function (xdata) {

            let emailExist = xdata[0].emailCount; //Retval from query

            if(emailExist > 0){ //If emailExist > 0 == email exist
              $.formValidationStatus(0, $(".register-email-input"));
              errors.emailIsFree = false;
            }
            else if(emailExist <= 0){ //If emailExist <= 0 ==  email is free
              $.formValidationStatus(1, $(".register-email-input"));
              errors.emailIsFree = true;

              if(errors.emailIsValid == false){ //Checks if email valid inside email free
                $.formValidationStatus(0, $(".register-email-input"));
                errors.emailIsValid = false;
              }
              else if(errors.emailIsValid == true){
                $.formValidationStatus(1, $(".register-email-input"));
                errors.emailIsValid = true;
              }
            }

          },
          error: function (xdata) {
            alert("Error, please contact an administrator or support");
          }
        });

        setTimeout(function(){

        },200);
      });

      $(".register-first-name-input").keyup(function(){ //First name check
        let firstNameVal = document.getElementsByClassName("register-first-name-input")[0].value;
        let nameChars = /^[A-Za-z]+$/;

        if(firstNameVal.match(nameChars) == null){
          errors.firstNameIsValid = false;
          console.log("First name not valid");
        }
        else if(firstNameVal.match(nameChars).length > 0){
          errors.firstNameIsValid = true;
          console.log("first name valid");
        }
      });
      $(".register-first-name-input").blur(function(){
        if(errors.firstNameIsValid == false){
          $.formValidationStatus(0, $(".register-first-name-input"));
          errors.firstNameIsValid = false;
        }
        else if(errors.firstNameIsValid == true){
          $.formValidationStatus(1, $(".register-first-name-input"));
          errors.firstNameIsValid = true;
        }
      });

      $(".register-last-name-input").keyup(function(){ //Last name check
        let lastNameVal = document.getElementsByClassName("register-last-name-input")[0].value;
        let nameChars = /^[A-Za-z]+$/;

        if(lastNameVal.match(nameChars) == null){
          errors.lastNameIsValid = false;
          console.log("Last name not valid");
        }
        else if(lastNameVal.match(nameChars).length > 0){
          errors.lastNameIsValid = true;
          console.log("Last name valid");
        }
      });
      $(".register-last-name-input").blur(function(){
        if(errors.lastNameIsValid == false){
          $.formValidationStatus(0, $(".register-last-name-input"));
          errors.lastNameIsValid = false;
        }
        else if(errors.lastNameIsValid == true){
          $.formValidationStatus(1, $(".register-last-name-input"));
          errors.lastNameIsValid = true;
        }
      });

      $(".register-password-input").keyup(function(){
        let passwordVal = document.getElementsByClassName("register-password-input")[0].value;
        let password2Val = document.getElementsByClassName("register-password-input")[1].value;
        let minPassLength = 8; //For password check

        if(passwordVal.length < minPassLength){
          errors.passwordIsValid = false;
          console.log("Password is not valid");
        }
        else if(passwordVal.length >= minPassLength){
          errors.passwordIsValid = true;
          console.log("Password is valid");
        }
        if(passwordVal === password2Val && passwordVal.length > 0){
          errors.passwordsMatch = true;
          console.log("Passwords match");
        }
        else if(passwordVal !== password2Val){
          errors.passwordsMatch = false;
          console.log("Passwords do not match");
        }
      });
      $(".register-password-input").blur(function(){
        if(errors.passwordIsValid == false || errors.passwordsMatch == false){
          $.formValidationStatus(0, $(".register-password-input"));
          errors.passwordIsValid = false;
        }
        else if(errors.passwordIsValid == true){
          $.formValidationStatus(1, $(".register-password-input"));
          errors.passwordIsValid = true;
        }
      });



      //Register btn
      registerSubmitBtn.onclick = function(e){
        e.preventDefault();

        //Check if form is filled correctly
        if(Object.keys(errors).every(function(k){ return errors[k]}) === true){
          $.saveCustomer();
          toggleLoginRegisterForm();
        }
        else if(Object.keys(errors).every(function(k){ return errors[k]}) === false){
          $.formErrorMessage($(".reg-form"));
        }
      }
    }
  },
  formValidationStatus: function(status, elem){
    //status = status (Fullfilling request or not)
    let inputElem;
    for(i = 0; i < elem.length; i++){
      inputElem = elem[i];

      let iconType; //Which icon
      let iconColor; //Icon color changes per status
      let inputId = inputElem.id; //Input ID
      let inputBorderColor; //Input border color

      let iconElem = document.createElement("i");

      let formOffsetTop = inputElem.parentNode.offsetTop;
      let inputOffsetTop = inputElem.offsetTop;
      let iconOffsetTop = inputOffsetTop - formOffsetTop + "px";

      let iconHeight = inputElem.clientHeight + "px";

      switch(status){
        case 0:
          iconType = "x-square";
          iconColor = "red";
          inputBorderColor = "red";
          break;
        case 1:
          iconType = "check-square";
          iconColor = "green";
          inputBorderColor = "green";
          break;
        default:
          iconType = "alert-octagon";
          iconColor = "grey";
          inputBorderColor = "orange";
      }
      if(iconType.length > 0){
        if($("#"+inputId + "_icon").length > 0 ){
          $("#"+inputId + "_icon").remove();
          inputElem.style.borderColor = "black";
        }
        inputElem.style.borderColor = inputBorderColor;

        iconElem.dataset.feather = iconType;
        iconElem.style.color = iconColor;
        iconElem.style.marginTop = iconOffsetTop;
        iconElem.style.height = iconHeight;
        iconElem.setAttribute("class","reg-icon");
        iconElem.setAttribute("id", inputId + "_icon");

        inputElem.before(iconElem);

        feather.replace();
      }
    }
  },
  saveCustomer: function(){
    data = "reg_first_name=" + $('#reg_first_name').val() + "&reg_last_name=" + $('#reg_last_name').val() + "&reg_email=" + $('#reg_email').val() + "&reg_password=" + $("#reg_password").val();

    $.ajax({
      url: "http://127.0.0.1:1337/add",
      data: data,
      type: "POST",
      dataType: 'json',
      success: function (xdata) {
        if (!xdata === 0) {
          ExitOutWithError(xdata['answer'], false);
          return;
        }
        m_returnValue = true;
      },
      error: function (xdata) {
        ExitOutWithError("Unknown error", true);
      }
    });
  },

  buildLogin:function(){
    var loginRow = document.createElement("div");
    var loginContainer = document.createElement("div");
    var loginForm =  document.createElement("form");
    var loginEmailInput = document.createElement("input");
    var loginPasswordInput = document.createElement("input");
    var loginSubmitBtn = document.createElement("input");
    var signUpBtn = document.createElement("span");

    loginRow.classList.add("login-row", "row");

    loginContainer.classList.add("login-container");

    loginForm.setAttribute("class", "login-form");


    loginEmailInput.setAttribute("type", "email");
    loginEmailInput.setAttribute("placeholder", "Enter Email!");
    loginEmailInput.setAttribute("id", "login_email");
    loginEmailInput.classList.add("login-email-input");

    loginPasswordInput.setAttribute("type", "password");
    loginPasswordInput.setAttribute("placeholder", "Enter Password!");
    loginPasswordInput.setAttribute("id", "login_password");
    loginPasswordInput.classList.add("login-password-input");

    loginSubmitBtn.setAttribute("class", "login-submit-button");
    loginSubmitBtn.setAttribute("type", "submit");
    loginSubmitBtn.setAttribute("value", "Login");

    signUpBtn.setAttribute("class", "sign-up-button");
    signUpBtn.textContent = "Sign up";

    loginForm.append(loginEmailInput);
    loginForm.append(loginPasswordInput);
    loginForm.append(loginSubmitBtn);
    loginForm.append(signUpBtn);
    loginContainer.append(loginForm);
    loginRow.append(loginContainer);

    lorryDocMain.append(loginRow);

    //Position loginBtn
    let loginBtnPositionLeft = window.screen.width - loginSubmitBtn.clientWidth;
    loginSubmitBtn.style.left = loginBtnPositionLeft + "px"; //Screen width - button width

    loginSubmitBtn.onclick = function(e){
      loginUser(e);
    }
    signUpBtn.onclick  = function(){//Sign up click
      toggleLoginRegisterForm();
    }

    function loginUser(e){

      e.preventDefault();
      $.usrLogin(function(retVal){
        if(retVal.length >= 1){
          onPageLoad();
        }
        else if(retVal.length <= 0){
          $.formErrorMessage($(".login-form")); //send form elem
        }
        else{
          alert("Error");
        }
      });
    }
  },
  usrLogin:function(callbackFnk) {
    data = "&login_email=" + $('#login_email').val() + "&login_password=" + $('#login_password').val();

    var request = $.ajax({
      url: "http://127.0.0.1:1337/login",
      type: "POST",
      data: data,
      dataType: 'json',
    });

    request.done(function (msg) {
      if (typeof callbackFnk === 'function') callbackFnk.call(this, msg);
    });

    request.fail(function (jqXHR, textStatus, errorThrown) {
      if (typeof callbackFnk === 'function') callbackFnk.call(this, 0);
    });
  },

  formErrorMessage:function(form){
    //form = form(?)

    if(document.querySelectorAll(".form-error-div").length > 0){
      document.querySelector(".form-error-div").remove();
    }
    let formErrorDiv = document.createElement("div");
    let formError = document.createElement("span");

    formErrorDiv.setAttribute("class", "form-error-div");
    formError.setAttribute("class", "form-error-span");
    formErrorDiv.style.textAlign = "center";
    formError.style.color = "red";
    formError.textContent = "Make sure form is filled correctly!";

   formErrorDiv.append(formError);
    form.before(formErrorDiv);
  },

  buildSelect:function(typeNum, preSelVal){
    //typeNum = Stage
    //1 = Brand
    //2 = Problem
    //3 = solution(?)
    //preSelVal = if val has been selected before

    let typeArray;

    let typeName; //Name of select (Brand, problem, solution)
    let sessTypeName;
    let typeForLoopId; //The id of the type in array (Used in for loop) ^^
    let typeForLoopName; //The name of the type in array (Used in for loop) ^^
    console.log(preSelVal);
    console.log(typeNum);

    //To get which stage we're at
    switch(typeNum){
      case 1:
        if(preSelVal != undefined){
          sessTypeName = preSelVal.brand_name;
          console.log(sessTypeName);
        }
        typeName = "brand";
        $.getBrand(function(retVal){
          typeArray = retVal;
          createSelect(typeArray, typeName, sessTypeName);
        });
        break;
      case 2:
        if(preSelVal != undefined){
          sessTypeName = preSelVal.problem_str;
        }
        typeName = "problem";

        $.getProblem(function(retVal){
          typeArray = retVal;
          createSelect(typeArray, typeName, sessTypeName);
        });
        break;
      default:
        console.log(":D");
        break;
    }

    //Where we build
    function createSelect(typeArray, typeName, sessTypeName){
      if(typeName.length > 1 && document.querySelectorAll(".select-container").length < 1){

        let selectDiv = document.createElement("div");
        let selectMenu = document.createElement("select");
        let selectDesc = document.createElement("span");
        let selectOption = document.createElement("option");

        selectDiv.classList.add(typeName +"-select-cont", "select-container");
        selectMenu.setAttribute("class", "select-menu");
        selectDesc.setAttribute("class", "select-description");
        selectDesc.innerHTML = "Select your " + typeName;

        if(selectMenu.length <3){
          //Set first value to "Select {type}"
          selectOption.textContent = "Select " + typeName;
          selectMenu.append(selectOption);

          for(i = 0; i < typeArray.length; i++){
            //Switch statement to get array selector
            switch(typeName){
              case "brand":
                typeForLoopName = typeArray[i].brand_name;
                typeForLoopId = typeArray[i].brand_id;
                break;
              case "problem":
                typeForLoopName = typeArray[i].problem_str;
                typeForLoopId = typeArray[i].problem_id;
                break;
            }

            selectOption = document.createElement("option");
            selectOption.setAttribute("id", typeForLoopId);
            selectOption.textContent = typeForLoopName;

            if(sessTypeName == typeForLoopName){
              selectOption.setAttribute("selected", "true");
            }

            selectMenu.append(selectOption);
          }
          selectDiv.append(selectDesc);
          selectDiv.append(selectMenu);

          lorryDocContainer.append(selectDiv);
        }
        selectMenu.onchange = function(){
          if(selectMenu.value != "Select " + typeName && selectMenu.value != selectMenu[0].value){
            selectDiv.remove();
            let selectedVal = selectMenu.value;
            let selectedId = $(this).children(":selected").attr("id");

            $.displaySelected(selectedVal, selectedId, typeName, typeNum);
          }else{
            console.log("Can't pick this one");
          }
        }
      }else{
        alert("ERROR");
      }
    }
  },
  displaySelected: function(selectedVal, selectedId, typeName, typeNum){
    //selectedVal = selected value from selectMenu
    //slectedId = Id of selected value
    //typeName = Name of type
    //typeNum = Num of type

    let selectedDiv = document.createElement("div");
    let selectedSpan = document.createElement("span");
    let selectedDesc = document.createElement("span");

    //Styling selected elements
    selectedDiv.classList.add("selected-"+typeName+"-container", "selected-container");

    selectedDesc.classList.add("selected-desc-" + typeName);
    selectedDesc.textContent = "Selected " + typeName + ":";

    selectedSpan.classList.add("selected-" + typeName);
    selectedSpan.dataset.id = selectedId;
    selectedSpan.dataset.val = selectedVal;
    selectedSpan.textContent = selectedVal;

    selectedDiv.append(selectedDesc);

    selectedDiv.append(selectedSpan);

    lorryDocSolutionCont.appendChild(selectedDiv);

    let nextVal = ++typeNum;
    switch(nextVal){
      case 2:
        initSelects(nextVal);
        break;
      case 3:
        $.getSolution(function(retVal){
          let solArr = retVal;
          dispSolution(solArr);
        });
        break;
      default:
        console.log(nextVal);
        break;
    }

    function dispSolution(solArr){
      let sol_name;
      let sol_id;

      for(i = 0; i < solArr.length; i++){
        sol_name = solArr[i].solution_str;
        sol_id = solArr[i].solution_id;
      }
      let solutionDiv = document.createElement("div");
      let solutionDesc = document.createElement("span");
      let solutionSpan = document.createElement("span");

      solutionDiv.classList.add("solution-div");

      solutionDesc.classList.add("solution-desc-span");
      solutionDesc.textContent = "Recommended Solution";

      solutionSpan.classList.add("solution-span");
      solutionSpan.dataset.id = sol_id;
      solutionSpan.textContent = sol_name;

      solutionDiv.append(solutionDesc);
      solutionDiv.append(solutionSpan);

      lorryDocSolutionCont.appendChild(solutionDiv);
      initSelects(nextVal);
    }
  },

  selectBackFunc: function(typeNum){
    if(document.querySelectorAll(".back-button").length == 0){
      let backBtn = document.createElement("span");
      backBtn.classList.add("back-button");
      backBtn.textContent = "Back";
      lorryDocWelcome.append(backBtn);
    }

    let buttonBack = document.querySelector(".back-button");
    buttonBack.onclick = function(e){
      if(typeNum == 3 && document.querySelectorAll(".problem-select-cont").length >0){
        --typeNum;
      }

      $.getSessVal(function(retVal){
        let selectedVal = retVal;
        switch(typeNum){
          case 2:
            $(".select-container").remove();
            $.buildSelect(1, selectedVal);
            $(".selected-brand-container").remove();
            break;
          case 3:
            $(".select-container").remove();
            $.buildSelect(2, selectedVal);
            $(".selected-problem-container").remove();
            $(".solution-div").remove();
            break;
          default:
            console.log(":)");
            break;
        }
      })
      e.preventDefault();
    }
  },

  getSessVal: function(callbackFnk){
    var request = $.ajax({
      url: "http://127.0.0.1:1337/getSelected",
      type: "GET",
      dataType: 'json',
    });
    request.done(function( msg ) {
      if(typeof callbackFnk === 'function') callbackFnk.call(this,msg);
    });

    request.fail(function(jqXHR,textStatus,errorThrown) {
      if(typeof callbackFnk === 'function') callbackFnk.call(this,0);
    });
  }
})