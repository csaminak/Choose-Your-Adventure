(function(ns){
    'use strict';
    window.story = ns = (ns || {});

    var token;
    var $user = $('#login-name');
    var loginForm = $('form.login');

    console.log(loginForm); //TODO delete

    loginForm.on('submit', function signIn(event){
        event.preventDefault();
        login($user.val());
    });


    /**
     * Takes the name user has provided, and brings them to a welcome screen.
     * A token will be saved for later use.
     * @param  {string} username [name that user types in]
     * @return {void}
     */
    function login(username) {
        if(!username) {
            return;
        }
        $.ajax({
            url: 'https://tiydc-coa-2.herokuapp.com/users/login',
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({username: username}),
            dataType: 'json'
        })
        .done(function(data){
            token =  data.token;
            console.log('This is the token: ' + token); //TODO delete
        });
    }



})(window.story);
