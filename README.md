# Choose-Your-Adventure

Learning Objectives

Let's get some more practice with Ajax and interacting with an API. Now our API implements different kinds of endpoints (methods) and we need an application that can do various different actions.

You will not be using the API you negotiated with your back end group.

Your Mission

You must create an application that can get data from the back end and send data to the back end (for storing/saving) in order to create a choose your own adventure story. You will be using an API already created by a back end developer. The API definition is up on GitHub as a gist.

Our front end application must allow a user to:

log in
send the back a name to log in with (no password required)
the server will respond with a token, which you must send in the Authorization header
view all existing stories
start a story by viewing the first step in that story
any time a step is viewed, update the user object with what the current step is
view the two options on any step (other than the last)
click on an option to go to that step (don't forget to update the current step)
on the last step, do not display any options, simply show the step text and a message: "The End"
The user interface can be very simple, but this should be a Single Page Application (SPA) - that is, all "views" discussed above should be done using DOM manipulation in the HTML document and calls to the back end with Ajax for data. (In other words, you may only have ONE HTML file.)

Some basic styles and HTML are provided for you, but you are free to update anything you need to.

EPIC Mode

Allow the user to go back a step and choose a different path.
