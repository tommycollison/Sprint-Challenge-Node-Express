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

server.use(express.json())

// I already know how to use middleware in Node -- Line 17 here is what parses JSON-readable content out of request bodies.


// Middleware basically changes the order in which functions gets executed  as they're introduced into our server code.

// So which Line 17 it goes: server request -> express.json -> JSON-readable copy -> and back(?)

// `server.use` is the magic incantation for bringing in middleware.

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

server.get('/api/actions/:id', (req, res) => {
    const {id} = req.params; // this is saying "id" is equal to whatever the id parameter of our request is" 
    actionEndPoint.get(id) // we're passing the id to our get request
    .then(action => {
        res.json(action) // by virtue of line 61, this res only returns one action, not the list
    })
    .catch(error => {
        res.status(404) // universal error status code
        res.json(`Error 404 action not found`)
    })
})

server.get('/api/projects/:id', (req, res) => {
    const {id} = req.params; 
    projectsEndPoint.get(id) 
    .then(project => {
        res.json(project) 
    })
    .catch(error => {
        res.status(404) 
        res.json(`Error 404 project not found`)
    })
})

// Projects

// id: number, no need to provide it when creating projects, the database will generate it.
// name: string, up to 128 characters long, required.
// description: string, no size limit, required.
// completed: boolean to indicate if the project has been completed, not required

server.post('/api/projects', (req, res) => {
    const project = req.body;
    console.log(`hi`)
    projectsEndPoint.insert(project)
    .then(project => {
        console.log(`cl from inside my then`)
        res.json(project)
    })
    .catch(err => {
        res
        .status(500)
        .json(`I have failed to add a new action`)
    })
})

// Actions

// id: number, no need to provide it when creating posts, the database will automatically generate it.
// project_id: number, required, must be the id of an existing project.
// description: string, up to 128 characters long, required.
// notes: string, no size limit, required. Used to record additional notes or requirements to complete the action.
// completed: boolean to indicate if the action has been completed, not required

server.post('/api/actions', (req, res) => {
    const action = req.body; // calling "action" the body req we send to the server
    console.log('hi: ', action)
    console.log(req.body)
    actionEndPoint.insert(action) // insert our body req payload into actionEndPoint
        .then(action => {
            console.log(`hi john`)
            res.json(action)
        })
        .catch(err => {
            res
            .status(500)
            .json(`I have failed to add new action`)
        })
 })

 server.delete('/api/actions/:id', (req, res) => {
     const {id} = req.params;

     actionEndPoint.remove(id)
     .then(count => {
         if(count) {
             res
             .status(201)
             .json(`action was successfully deleted`)
         } else {
             res
             .status(404)
             .json(`invalid ID`)
         }
     })
     .catch(err => {
         res.status(500).json(`Hm, I failed to delete that action`)
     })
 })

 server.delete('/api/projects/:id', (req, res) => {
     const {id} = req.params;

     projectsEndPoint.remove(id)
     .then(count => {
         if(count) {
             res
             .status(201)
             .json(`project successfully deleted`)
         } else {
             res
             .status(404)
             .json(`invalid ID`)
         }
     })
     .catch(err => {
         res.status(500).json(`Hmm, I failed to delete that project`)
     })
 })


//  server.put('/api/actions/:id', (req, res) => {
//     const {id} = req.params;
//     const action = req.body;
//     console.log(req.body)

//     actionEndPoint.update(id, action)
//     .then(count => {
//             actionEndPoint.findById(id)
//             .then(action => {
//                 res
//                 .status(201)
//                 .json(`updated successfully`);
//             })
//     })
//     .catch(err => {
//         res
//         .status(500)
//         .json(`Hm, I couldn't update that.`)
//     })
// })


// Projects

// id: number, no need to provide it when creating projects, the database will generate it.
// name: string, up to 128 characters long, required.
// description: string, no size limit, required.
// completed: boolean to indicate if the project has been completed, not required

server.put('/api/projects/:id', (req, res) => {
    const {id} = req.params;
    const project = req.body;
    projectsEndPoint.update(id, project)
    .then(project => {
        res.json(project)
    })
    .catch(err =>  {
        res.status(500)
        res.json(`could not update project`)
    })
})

// Actions

// id: number, no need to provide it when creating posts, the database will automatically generate it.
// project_id: number, required, must be the id of an existing project.
// description: string, up to 128 characters long, required.
// notes: string, no size limit, required. Used to record additional notes or requirements to complete the action.
// completed: boolean to indicate if the action has been completed, not required


server.put('/api/actions/:id', (req, res) => {
    const {id} = req.params;
    const action = req.body; 
    actionEndPoint.update(id, action) 
    .then(action => {
        res.json(action) 
    })
    .catch(err => {
        res.status(500) 
        res.json(`could not update`)
    })
})

// server.put('/api/actions/:id', (req, res) => {
//     const {id} = req.params;
//     const action = req.body;
//     console.log(req.body)

//     actionEndPoint.update(id, action)
//     .then(count => {
//         if (count){
//             actionEndPoint.findById(id)
//             .then(action => {
//                 res
//                 .status(201)
//                 .json(`updated successfully`);
//             })
//            } else {
//                res
//                .status(404)
//                .json(`invalid ID, could not update`)
//         }
//     })
//     .catch(err => {
//         res
//         .status(500)
//         .json(`Hm, I couldn't update that.`)
//     })
// })

