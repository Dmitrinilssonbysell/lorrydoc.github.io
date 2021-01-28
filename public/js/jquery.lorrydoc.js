$.extend({
    checkLoggedIn: function (callbackFnk) {

        var request = $.ajax({
            url: "http://127.0.0.1:1337/checkLoggedIn",
            type: "GET",
            dataType: 'json',
        });

        request.done(function (msg) {
            if (typeof callbackFnk === 'function') callbackFnk.call(this, msg);
        });

        request.fail(function (jqXHR, textStatus, errorThrown) {
            if (typeof callbackFnk === 'function') callbackFnk.call(this, 0);
        });
    },
    usrEmailCheck: function (callbackFnk) {
        data = "&reg_email=" + $('#reg_email').val();

        var request = $.ajax({
            url: "http://127.0.0.1:1337/checkEmail",
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
    doSave: function () {
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

    usrCheckLogin: function (callbackFnk) {
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
    }
}) 