// Routing is all about handling requests for data, and the simplest is `get`:

// Here's what that syntax looks like:

// server.get('/', (req, res) => {
//     res.status(200).send('<h1>Hello world</h1>');
// });

// When a get request is sent to '/' with an anonymous function, it returns a 200 status and some text.
// Routing looks at the URL, returns stringified HTML.

const express = require('express') // imports the express package we asked for when we did `yarn add express' 

const server = express(); // creates the server

server.get('/', (req, res) => {
  res.send('Hello from inside the get');
});

// watch for connections on port 5000
server.listen(5000, () =>
  console.log('Server running on http://localhost:5000')
);

