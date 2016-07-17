(function(ns){
    'use strict';
    window.story = ns = (ns || {});

    var token;
    var userID;
    var firstStep;
    var adventure;
    var optionA;
    var optionB;

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
            console.log('This is the token and userID: ' + token + ' ' + userID); //TODO delete
        })
        .fail(errorMessage);
    };

    /**
     * TODO What should errorMessage do?????*********************************????????
     * @param  {[type]} xhr [description]
     * @return {[type]}     [description]
     */
    function errorMessage(xhr) {
        //xhr status code is something then story options are unable to be displayed.
        console.log(xhr);
    }

    ns.getAdventures = function getAdventures(){
        return $.ajax({
            url: 'https://tiydc-coa-1.herokuapp.com/adventure',
            method: 'get',
            headers: {'Authorization': token},
            dataType: 'json'
        })
        .done(function saveStep(storyList) {
            storyList.forEach(function story(data){
                firstStep = data.first_step_id;
                adventure = data.id;
                console.log(firstStep, adventure);//TODO DELETE
            });
        });
    };

    ns.enterStory = function enterStory(){
        return $.ajax({
            url: 'https://tiydc-coa-1.herokuapp.com/step/' + firstStep,
            method: 'get',
            headers: {'Authorization': token, 'first_step_id': firstStep},
            dataType: 'json'
        })
        .done(function saveOptionStep(data){
            optionA = data.option_a_step_id;
            optionB = data.option_b_step_id;
            console.log(data, optionA, optionB); //TODO DELTE
        });
    };

    ns.selectOption = function selectOption() {
        return $.ajax ({
            url: 'https://tiydc-coa-1.herokuapp.com/step/next',
            method: 'get',
            headers: {'Authorization': token, },
            dataType: 'json'
        })
        .done(function(data){
            console.log(data); //TODO DELETE
        })
    };



})(window.story);
