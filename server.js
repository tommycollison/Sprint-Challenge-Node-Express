const express = require('express'); // import the express package

const server = express(); // creates the server
const router = express.Router();
const projectsRouter = require('./projects');
const actionsRouter = require('./actions')
const actionz = require('./data/helpers/actionModel')
const projectz = require('./data/helpers/projectModel')


server.get('/api/actions', (req, res) => {
    actionz.get()
    .then(action => {
        res.json(action)
    })
    .catch(err => {
        res.status(500)
        res.json(`Huh, can't find those actions`)
    })
})

// const userDb = require('./data/dbConfig.js')

server.use(express.json());

// handle requests to the root of the api, the / route
server.get('/', (req, res) => {
  res.send('Hello from Express');
});

// watch for connections on port 5000
server.listen(5000, () =>
  console.log('Server running on http://localhost:5000')
);


// server.get('/projects', (req, res) => {
//     userDb.get()
//     .then(projects => {
//         res.json(projects)
//     })
//     .catch(err => {
//         res.status(500)
//         res.json(`Huh, can't find those projects`)
//     })
// })

module.exports = router;

