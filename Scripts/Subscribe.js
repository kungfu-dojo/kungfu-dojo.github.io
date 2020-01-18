$(document).ready(function () {
    $("#SendEmailSubscribeBtn").click(function () {
        if (Page_ClientValidate("SubscribeValidators")) {
            switchSendEmailNotice(true);
            var data = {
                'email': $('.txtEmailSubscibe').val()
            };

            $.ajax({
                type: "POST",
                url: "/Service/Service.aspx/Authorization",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                success: function (response) {
                    response = $.parseJSON(response.d);
                    if (response.Success == true) {
                        alert("На введенный вами email было выслано письмо с подтверждением корректности введенного email адреса. Пожалуйста проверьте вашу почту.");
                        window.location.href = response.RedirectUrl;
                    }
                    else {
                        if (response.Error != null) {
                            alert(response.Error);
                        }
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    alert("Возникла непредвиденная ошибка. Пожалуйста сообщите администратору по email адресу (admin@kungfu.com.ua).");
                }
            });
        }
        else {
            switchSendEmailNotice(false);
        }
    });

    return false;
});

$(".txtEmailSubscibe").keydown(function (e) {
    if (e.keyCode == 13) {
        $("#SendEmailSubscribeBtn").click();
    }

});

function switchSendEmailNotice(isVisible) {
    if (isVisible) {
        $("#sendEmailSubscibeNotice").css("display", "block");
    }
    else {
        $("#sendEmailSubscibeNotice").css("display", "none");
    }
}

function getCookie(c_name)
{
var i,x,y,ARRcookies=document.cookie.split(";");
for (i=0;i<ARRcookies.length;i++)
{
  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  x=x.replace(/^\s+|\s+$/g,"");
  if (x==c_name)
    {
    return unescape(y);
    }
  }
}

