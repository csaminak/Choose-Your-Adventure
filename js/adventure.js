(function(ns){
    'use strict';
    window.story = ns = (ns || {});

    var token;
    var $user = $('#login-name');

    $('.login').on('submit', function signIn(event){
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
        //send a ajax call to server with the username and get a token back
    }



})(window.story);
