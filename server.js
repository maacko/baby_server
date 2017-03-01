var http = require('http');

var start = function () {

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
