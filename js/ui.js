(function (ns){
    'use strict';
    window.story = ns = (ns || {});


    var $user = $('#login-name');
    var $loginForm = $('form.login');
    var $adventuresView = $('.story-list');
    var $storyStep = $('.story-step');

    console.log($loginForm); //TODO delete

    $adventuresView.hide();
    $storyStep.hide();

    $loginForm.on('submit', function signIn(event){
        event.preventDefault();
        ns.login($user.val())
            .done(function setStoriesView(){
                ns.getAdventures()
                    .done(function pullStories(data){
                        adventureList(data);
                    });
            });
    });

    $adventuresView.on('click', 'button', function (event){
        //depending on which button the event targets a certain type of story will appear.
    });





    /**
     * when user logs they will be presented with a list of stories to choose from.
     * @param {array} storyList, the list of stories from ns.getAdventures.
     * @return {void}
     */
    function adventureList(storyList) {
        console.log(storyList); //TODO DELETE
        storyList.forEach(function showStories(data) {
            $adventuresView
                .show()
                .find('ul')
                    .append('<li first_step_id=' + data.first_step_id + '>\
                                <h2>'+ data.title +'</h2>\
                                <button data-id='+ data.id +'>Begin Adventure</button>\
                             </li>');
        });
        $storyStep.hide();
        $('.login').hide();
    }




})(window.story);
