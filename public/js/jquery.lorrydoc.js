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
  doSave: function(){
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

  usrCheckLogin:function(callbackFnk) {
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
    data = "&brand_id=" + document.querySelector(".selected-brand").dataset.id + "&brand_name=" + document.querySelector(".selected-brand").dataset.brand;

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
  buildBrandSelect:function(){
    //Ajax query to check if there is a selected vehicle from earlier
    //Inside ajax query an if statement to check whether the returned value is a vehicle or not

    //If vehicle/brand has been selected before in the session, the select should be built around it, making that value the main value
  },
  buildProblemSelect:function(){
    //Ajax query to check if there is a selected problem from earlier
    //Inside ajax query an if statement to check whether the returned value is a problem or not

    //If problem has been selected before in the session, the select should be built around it, making that value the main value
  },
  buildLogin:function(){
    //Build login
  },
  buildRegister:function(){
    //Build register
  },
  registerUser:function(){
    //Create register form that displays when something is wrong or correct
  }

})