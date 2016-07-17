(function (ns){
    'use strict';
    window.story = ns = (ns || {});


    var $user = $('#login-name');
    var $loginForm = $('form.login');
    var $adventuresView = $('.story-list');
    var $storyStep = $('.story-step');
    var $optionAText = $('.option-a');
    var $optionBText = $('.option-b');

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


    $adventuresView.on('click', 'button', function viewStory(event){
        ns.enterStory(event.target)
            .done(function(data) {
                displayStory(data);
            });
    });


    $storyStep.on('click', 'button', function viewStep(event){
        if (event.target.innerText === 'Choose A') {
            ns.selectOptionA(event.target)
                .done(function(data) {
                    displayStory(data);
                    console.log(data);
                });
        } else if (event.target.innerText === 'Choose B') {
            ns.selectOptionB(event.target)
                .done(function(data) {
                    displayStory();
                    console.log(data);
                });
        }

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
                    .append('<li>\
                                <h2>'+ data.title +'</h2>\
                                <button data-id='+ data.id +'>Begin Adventure</button>\
                             </li>');
        });
        $storyStep.hide();
        $('.login').hide();
    }

    /**
     * User has entered the story and will see the story text and
     * the story options in which they can select, if the story has
     * come to an end, then no options will show.
     * @param  {object} data the current story's step and options with text
     * @return {[type]}      [description]
     */
    function displayStory(data) {
        if (data.termination){
            $adventuresView.hide();
            $('.option').hide();
        } else {
            $adventuresView.hide();
            $('.story-end').hide();
            $storyStep
                .show()
                .find('.story-text')
                    .text(data.body);
            $optionAText
                .text(data.option_a_text);
            $optionBText
                .text(data.option_b_text);
        }
    }




})(window.story);
