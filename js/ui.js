(function (ns){
    'use strict';
    window.story = ns = (ns || {});


    var $user = $('#login-name');
    var $loginForm = $('form.login');
    var $adventuresView = $('.story-list');
    var $storyStep = $('.story-step');
    var $optionAText = $('.option-a');
    var $optionBText = $('.option-b');
    var $storyEnd = $('.story-end');
    var storyList = [];

    $adventuresView.hide();
    $storyStep.hide();



    // Get the list of stories to show the user from the server.
    $loginForm.on('submit', function signIn(event){
        event.preventDefault();
        ns.login($user.val())
            .done(function setStoriesView(){
                ns.getAdventures()
                    .done(function pullStories(data){
                        // Save the list of stories that the server returns
                        //  into a global variable so we can use it later
                        storyList = data;
                        adventureList();
                    });
            });
    });

    /**
     * Show the list of stories to the user.
     * @param {array} storyList, the list of stories from ns.getAdventures.
     * @return {void}
     */
    function adventureList() {
        console.log('storyList: ', storyList);
        storyList.forEach(function showStories(story) {
            $adventuresView
                .show()
                .find('ul')
                    .append('<li>\
                                <h2>'+ story.title +'</h2>\
                                <button data-id='+ story.id +'>Begin Adventure</button>\
                             </li>');
        });
        $storyStep.hide();
        $('.login').hide();
    }


    /**
     * Loops through the list of stories to find the story selected.
     * @param  {Array}  storyList The array with the various stories when user logs in
     * @param  {string} storyId   the id in the individual story object in the array
     * @return {object}           the story object with it's various properties.
     */
    function findStory(storyList, storyId) {
        // TODO: Ask Jordan why we can't return story from within the forEach loop
        var selectedStory = {};
        storyList.forEach(function(story) {
            if (story.id === storyId) {
                selectedStory = story;
            }
        });

        return selectedStory;
    }

    // Get the story details
    $adventuresView.on('click', 'button', function viewStory(event){
        var storyId = $(event.target).data('id');
        var story = findStory(storyList, storyId);

        // Get story details starting at the specified step from server
        ns.enterStory(story.first_step_id)
            .done(function(data) {
                // Show story details at step
                displayStory(data);
            });
    });

    /**
     * User has entered the story and will see the story text and
     * the story options in which they can select, if the story has
     * come to an end, then no options will show.
     * @param  {object}    data    the current story's step and options with text
     * @return {void}
     */
    function displayStory(data) {
        if (data.termination) {
            $adventuresView.hide();
            $('.option').hide();
            $storyEnd.show();
        } else {
            $adventuresView.hide();
            $storyEnd.hide();
            $optionAText
                .text(data.option_a_text);
            $optionBText
                .text(data.option_b_text);
        }
        $storyStep
            .show()
            .find('.story-text')
                .text(data.body);
    }

    // Get the next step of the story
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
                    displayStory(data);
                    console.log(data);
                });
        }
    });
})(window.story);
