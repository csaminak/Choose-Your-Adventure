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
            .done(storyList);
    });

    $('ul').on('click', 'button', function (event){
        if(event.target === '[data-id="1"]') {
            console.log('button1');
        } else if(event.target === '[data-id="2"]') {
            console.log('button2');
        } else if(event.target === '[data-id="3"]'){
            console.log('button3');
        }
    });

    /**
     * when user logs in they will be directed to a view with different stories to pick.
     * @return {void}
     */
    function storyList() {
        $storyStep.hide();
        $('.login').hide();
        $storyView
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
