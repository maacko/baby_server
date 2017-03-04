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

        //Used to collect the data via append
        var postData = '';
        /*
         * Handling Post Requests and their data
         *
         * When a post request is sent from the client, we can access the data
         * through the request object.
         *
         * request is both an EventEmitter as well as a ReadableStream, meaning
         * that it's a stream that emits events when a chunk of data ready to be
         * consumed. Since the data is available in chunks, we collect them to piece
         * together the whole post.
         *
         * request also emits an end event when the stream has come to an end,
         * that is, when there's no more data availaible in the stream. For some
         * streams it doesn't make sense to have an end if there is an
         * indeterminate amound of data. However, in this case, there is a
         * determinate amount of data -- the data in the input box.
         */
        request.setEncoding('utf8');
        request.on('data', function(dataChunk) {
            console.log('Received post data chunk: ' + dataChunk);
            postData += dataChunk;
        });
        request.on('end', function () {
            //Only handle non-favicon requests
            /*The response object is a streaming object that we can write to
             * anywhere, so we aren't restricted to the server module if we want to
             * write a response.
             *
             * We pass on the response object so that the handler may craft a response.
             *
             * The postData that has been collected and joined together (as a
             * string) is passed over to the handlers.
             *
             * routing only takes place after an end, an end event always fires
             * from a request, even if a get request is placed.
             */
            if(pathname != '/favicon.ico') route(pathname, handle, response, postData);
        });
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
