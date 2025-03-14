const apiUrl = "http://127.0.0.1:8080/api/auth/login";

$(document).ready(function () {
    $('#loginForm').submit(function (e) {
        e.preventDefault();

        const username = $('#username').val();
        const password = $('#password').val();

        // Encode credentials using Base64 (for Basic Auth)
        const authHeader = "Basic " + btoa(username + ":" + password);

        $.ajax({
            url: apiUrl,
            type: "POST",
            headers: { "Authorization": authHeader },
            success: function (response) {
                // Store the token in localStorage
                localStorage.setItem('token', response.token);
                localStorage.setItem('username', username);
                window.location.href = 'dashboard.html';
            },
            error: function () {
                $('#errorMsg').removeClass('d-none').text('Invalid Username or Password');
            }
        });
    });
});
