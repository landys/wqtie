var validate_require = function(data) {
    return ($.trim(data).length > 0);
};

var phone_pattern = /^1[35]\d{9}$/;
var validate_phonenumber = function(data) {
    var v = $.trim(data);
    return (v != '' && phone_pattern.test(v));
};

var email_pattern = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
var validate_email = function(data) {
    var v = $.trim(data);
    return (v != '' && email_pattern.test(v));
};