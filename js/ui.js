(function (ns){
    'use strict';
    window.story = ns = (ns || {});


    var $adventuresView = $('.story-list');
    var $storyStep = $('.story-step');
    var $user = $('#login-name');
    var $loginForm = $('form.login');
    var adventureTitle;
    var adventureId;


    console.log($loginForm); //TODO delete

    $adventuresView.hide();
    $storyStep.hide();

    $loginForm.on('submit', function signIn(event){
        event.preventDefault();
        ns.login($user.val())
            .done(function settingStoryView(){
                ns.getAdventures()
                    .done(function(data){
                        adventureList(data)
                    });
            });
    });

    $adventuresView.on('click', 'button', function (event){
        //depending on which button the event targets a certain type of story will appear.
    });

    /**
     * when user logs in they will be directed to a view with different stories to pick.
     * @param {array} storyList the list of stories from ns.getAdventures.
     * @return {void}
     */
    function adventureList(storyList) {
        console.log(storyList);
        $storyStep.hide();
        $('.login').hide();
        $adventuresView
            .show()
            .find('ul')
                .append('<li class="adventure">\
                            <h2>'+ adventureTitle +'</h2>\
                            <button data-id='+ adventureId +'>Begin Adventure</button>\
                         </li>');
    }




})(window.story);
