(function(ns){
    'use strict';
    window.story = ns = (ns || {});

    var token;
    var userID;

    /**
     * Takes the name user has provided and logs them into the story screen.
     * A token will be saved for later use along with a userID.
     * @param  {string} username  name that user types in
     * @return {object}     xhr   this is where the data that contains token and id is stored.
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
            url: 'https://tiydc-coa-1.herokuapp.com/users/login',
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
        })
        .fail(errorMessage);
    };

    /**
     * Alerts user when there is an issue with the page.
     * @param  {object}  xhr   the data returned from the ajax request.
     * @return {void}
     */
    function errorMessage(xhr) {
        if (xhr.statusCode >= 500 || xhr.statusCode <= 599) {
            alert('the server is down, please try again later.');
        } else if(xhr.statusCode >= 400 || xhr.statusCode <= 499) {
            alert('the link you are trying to reach was not found.');
        } else {
            alert('issue is unknown at this time.');
        };
    }

    ns.getAdventures = function getAdventures(){
        return $.ajax({
            url: 'https://tiydc-coa-1.herokuapp.com/adventure',
            method: 'get',
            headers: {'Authorization': token},
            dataType: 'json'
        });
    };

    ns.getStepDetails = function getStepDetails(stepId) {
        return $.ajax({
            url: 'https://tiydc-coa-1.herokuapp.com/step/' + stepId,
            method: 'get',
            headers: {'Authorization': token},
            dataType: 'json'
        });
    };



})(window.story);
