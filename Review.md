# Review Questions

## What is Node.js?

Node JS is a runtime environment (i.e. a program that runs programs) for Javascript, allowing for client-side scripting. 

## What is Express?

Express is a JS framework for Node, and extends functionality with things like routing and middleware.

React is to JS what Express is to Node on the backend.

## Mention two parts of Express that you learned about this week.

Routing, middleware. Routing is how we select which request handler acts, based on the URL served and which HTTP method was used.

## What is Middleware?

Functions that get a request and response, and perform operations on them. These functions can either pass reqs and res's to the next piece of middleware, or return them to the client. Used for logging requests, or authentication. Middleware can (but doesn't have to) change the req/res.

## What is a Resource?

Any data accessible through a URL.

## What can the API return to help clients know if a request was successful?

Status code 200, or an error message, or the data requested.

## How can we partition our application into sub-applications?

Routers, and this makes good, clean, DRY code.

## What is express.json() and why do we need it?

Express.json is middleware that allows us to use JS in our reqs and res's.