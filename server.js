// Routing is all about handling requests for data, and the simplest is `get`:

// Here's what that syntax looks like:

// server.get('/', (req, res) => {
//     res.status(200).send('<h1>Hello world</h1>');
// });

// When a get request is sent to '/' with an anonymous function, it returns a 200 status and some text.
// Routing looks at the URL, returns stringified HTML.

const express = require('express') // imports the express package we asked for when we did `yarn add express`
const server = express(); // creates the server
const actionEndPoint = require('./data/helpers/actionModel'); // imports our actions data 
const projectsEndPoint = require('./data/helpers/projectModel') // imports our projects data

server.get('/', (req, res) => {
  res.send('Hello from inside the get');
});

// watch for connections on port 5000
server.listen(5000, () =>
  console.log('Server running on http://localhost:5000')
);

// you can use nodemon as a short cut to automatically reboot the node application every time you change a file in the directory.
// you just have to edit the package.json file to include the correct script, but after that you can use whatever incantation you want.

// Ok, so, CRUD apps:
// Create -- `post`
// Read -- `get`
// Update -- `put'
// Destroy -- 'delete`

server.get('/api/actions', (req, res) => {
    actionEndPoint.get() // `get`s our actions data that we imported above
    .then(action => { // `then` returns a promise (in this case, line 38). we're saying "action" is our value. A promise is an outcome, I think as a sort of if/else statement? Return our action value as a response, else return an error.
        res.json(action)
    })
    .catch(error => {
        res.status(500) // an internal server error -- "I couldn't process this request for whatever reason", with a more helpful error message returned in the response
        res.json(`Huh, I can't find those actions`)

    })
})

server.get('/api/projects', (req, res) => {
    projectsEndPoint.get()
    .then(project => {
        res.json(project)
    })
    .catch(error => {
        res.status(500)
        res.json(`Huh, I can't find those actions`)
    })
})