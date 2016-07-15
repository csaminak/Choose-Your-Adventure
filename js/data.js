(function(ns){
    'use strict';
    window.story = ns = (ns || {});

    var token;
    var userID;

    /**
     * Takes the name user has provided, and brings them to a welcome screen.
     * A token will be saved for later use.
     * @param  {string} username  [name that user types in]
     * @return {object} xhr
     */
    ns.login = function login(username) {
        if(!username) {
            $('.login p')
                .prepend('<p class="no-login">Sorry! You did not enter your name.</p>');
            var defer = $.Deferred();
            defer.reject('no username');
            return defer.promise();
        }
        return $.ajax({
            url: 'https://tiydc-coa-2.herokuapp.com/users/login',
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({username: username}),
            dataType: 'json'
        })
        .done(function saveToken(data) {
            token = data.token;
            userID = data.id;
            console.log('This is the token and userID: ' + token + ' ' + userID); //TODO delete
        })
        .fail(errorMessage);
    };

    /**
     * TODO What should errorMessage do?????
     * @param  {[type]} xhr [description]
     * @return {[type]}     [description]
     */
    function errorMessage(xhr) {
        console.log(xhr);
    }



})(window.story);
