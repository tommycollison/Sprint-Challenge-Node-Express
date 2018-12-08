const express = require('express'); // import the express package

const server = express(); // creates the server

const router = express.Router();
const projectsRouter = require('./projects');
const actionsRouter = require('./actions')
const actionz = require('./data/helpers/actionModel')
const projectz = require('./data/helpers/projectModel')


server.use(express.json());

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

server.get('/api/projects', (req, res) => {
    projectz.get()
    .then(project => {
        res.json(project)
    })
    .catch(err => {
        res.status(500)
        res.json(`Huh, can't find those projects.`)
    })
})

// get a specific action 

server.get('/api/actions/:id', (req, res) => {
    const {id} = req.params;
    actionz.get(id)
    .then(user => {
        if(user){
            res.json(user);
        } else {
            status(404)
            res.json(`Huh, don't know that action`)
        }
    })
    .catch(err => {
        res.status(500)
        res.json('Error 500: Idk that action')
    })
})

// get a specific project 

server.get('/api/projects/:id', (req, res) => {
    const {id} = req.params;
    projectz.get(id)
    .then(project => {
        if(project){
            res.json(project);
        } else {
            status(404)
            res.json(`Huh, don't know that project`)
        }
    })
    .catch(err => {
        res.status(500)
        res.json('Error 500: Idk that project')
    })
})

// add action

server.post('/api/actions', (req, res) => {
    console.log(req);
    const action = req.body;
    console.log(req.body);
    console.log('action from body:', action)
    actionz.insert(action).then(action => {
        console.log('action from insert method:', action);
        res.json(action);
    }).catch(err => {
        console.log(`console log error inside actions post:`, err)
        res
        .status(500)
        .json('Error: failed to add action')
    })
})

// add project

server.post('/api/projects', (req, res) => {
    const project = req.body;
    console.log('user from body:', project)
    projectz.insert(project).then(project => {
        console.log('user from insert method:', project);
        res.json(project);
    }).catch(err => {
        res
        .status(500)
        .json('Error: failed to add project')
    })
})


// delete project

server.delete('/api/projects/:id', (req, res) => {
    const {id} = req.params;
    const project = req.body;

    projectz.remove(id)
    .then(count => {
        if(count) {
            res.json('project was successfully deleted')

        } else {
            res.status(404).json('invalid ID')
        }

    })
    .catch(err => {
        res.status(500).json('I could not delete that project')
    })

})

// delete action

server.delete('/api/actions/:id', (req, res) => {
    const {id} = req.params;
    const action = req.body;

    actionz.remove(id)
    .then(count => {
        if(count) {
            res.json('action was successfully deleted')

        } else {
            res.status(404).json('invalid ID')
        }

    })
    .catch(err => {
        res.status(500).json('I could not delete that action')
    })

})



// const userDb = require('./data/dbConfig.js')



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

