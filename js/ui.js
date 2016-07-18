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
    var stepDetails = {};

    $adventuresView.hide();
    $storyStep.hide();


    $loginForm.on('submit', function signIn(event){
        event.preventDefault();
        ns.login($user.val())
            .done(function setStoriesView(){
                ns.getAdventures()
                    .done(function pullStories(data){
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
        var selectedStory = {};
        storyList.forEach(function(story) {
            if (story.id === storyId) {
                selectedStory = story;
            }
        });
        return selectedStory;
    }


    $adventuresView.on('click', 'button', function viewStory(event){
        var storyId = $(event.target).data('id');
        var story = findStory(storyList, storyId);

        ns.getStepDetails(story.first_step_id)
            .done(function(data) {
                stepDetails = data;
                displayStory();
            });
    });


    /**
     * User has entered the story and will see the story text and
     * the story options in which they can select. If the story has
     * come to an end, then no options will show.
     * @return {void}
     */
    function displayStory() {
        if (stepDetails.termination) {
            $adventuresView.hide();
            $('.option').hide();
            $storyEnd.show();
        } else {
            $adventuresView.hide();
            $storyEnd.hide();
            $optionAText
                .text(stepDetails.option_a_text);
            $optionBText
                .text(stepDetails.option_b_text);
        }
        $storyStep
            .show()
            .find('.story-text')
                .text(stepDetails.body);
    }


    $storyStep.on('click', 'button', function viewStep(event){
        var stepId;
        if (event.target.innerText === 'Choose A') {
            stepId = stepDetails.option_a_step_id;
        } else if (event.target.innerText === 'Choose B') {
            stepId = stepDetails.option_b_step_id;
        }
        ns.getStepDetails(stepId)
            .done(function(data) {
                stepDetails = data;
                displayStory();
            });
    });


})(window.story);
