var http = require('http');
var url = require('url');

/*
 * Again we want the router to be reusable, reusability allows us to perform
 * dependency injections in order to lightly couple the server and the router.
 * The entire router isn't passed to the server because that would entail
 * hard-coding an action to the server; instead, we pass an action (a function
 * object from the router) so that we may invoke it without directly referencing
 * the router object and its methods. We generalize the route function rather
 * than having the server module depend on a specific router object and its route.
*/
var start = function (route, handle) {

/* This function will be called back to when a request has been received. The
 * request will be passed as an object along with an empty response object, which
 * we can modify.
 */
var onRequest = function (request, response) {
    /* Note: If a request is issued from a browser, then this function will be
     * invoked twice since the browser issues two http requests: one to retrieve
     * a favicon and another for the user's request.
     */
    console.log('Request Received');

    var pathname = url.parse(request.url).pathname;
    route(pathname, handle);

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write('Hello World');
    response.end();
}
/* createServer is an async function, therefore any subsequent code will not be
 * block because of its invocation. Upon a request, the server will make a call back to
 * the function onRequest -- functions like onRequest are referred to as callbacks.
 */
http.createServer(onRequest).listen(8888);
console.log('Server Created');
/* The expected output is:
 * Server Created
 * Request Received <-This output only occurs if the browser (client) makes a request
 * Request Received
 */
};

/*server is a module, exported as an object, that exposes start as a method*/
exports.start = start;
