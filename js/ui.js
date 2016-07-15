(function (ns){
    'use strict';
    window.story = ns = (ns || {});


    var $storyView = $('.story-list');
    var $storyStep = $('.story-step');
    var $user = $('#login-name');
    var $loginForm = $('form.login');

    console.log($loginForm); //TODO delete

    $storyView.hide();
    $storyStep.hide();

    $loginForm.on('submit', function signIn(event){
        event.preventDefault();
        ns.login($user.val())
            .done(function displayStory() {
                $storyView.show();
                $storyStep.show();
                $loginForm.hide();
                $('.login p').hide();
            });

    });



})(window.story);
