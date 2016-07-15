(function (ns){
    'use strict';
    window.story = ns = (ns || {});


    var $adventuresView = $('.story-list');
    var $storyStep = $('.story-step');
    var $user = $('#login-name');
    var $loginForm = $('form.login');

    console.log($loginForm); //TODO delete

    $adventuresView.hide();
    $storyStep.hide();

    $loginForm.on('submit', function signIn(event){
        event.preventDefault();
        ns.login($user.val())
            .done(adventureList);
    });

    $adventuresView.on('click', 'button', function (event){
        //depending on which button the event targets a certain type of story will appear.
    });

    /**
     * when user logs in they will be directed to a view with different stories to pick.
     * @return {void}
     */
    function adventureList() {
        $storyStep.hide();
        $('.login').hide();
        $adventuresView
            .show()
            .find('ul')
                .append('<li class="adventure">\
                            <h2>Beach Vacation</h2>\
                            <button data-id="1">Begin Adventure</button>\
                         </li>\
                         <li class="adventure">\
                            <h2>Camping Trip</h2>\
                            <button data-id="2">Begin Adventure</button>\
                         </li>\
                         <li class="adventure">\
                            <h2>Hiking in the Mountains</h2>\
                            <button data-id="3">Begin Adventure</button>\
                         </li>');
        console.log($('ul'));
    }




})(window.story);
