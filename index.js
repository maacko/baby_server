var server = require('./server');
var router = require('./router');
var handlers = require('./handlers');

/* In order to create reusable pieces of functionality, we use the module system to
 * separate code into disinct modules. The CommonJS module system used by
 * nodejs allows us to separate our code into their own contexts. This way we
 * avoid polluting the global namespace, and avoid conflicts between modules.
 *
 * Since the index.js bootstrap our application, we place the router dependency
 * here rather than in our server module. This way, the server is a standalone
 * module not dependent on any specific router module. The same goes for
 * handlers.js.
 *
 * Handle is a map specific to our applicaton. We don't create this map in
 * router because it would hardcode routes that may not be applicable to other
 * applications. It destroys the resuability of the router module. So instead we
 * create it here and pass it on.
 *
 * Notice: That we are passing references to function objects. We can invoke
 * these references in the route method.
 */

var handle = {
    "/start": handlers.start,
    "/upload": handlers.upload,
    "/show": handlers.show
}
/*
 * As a sidenote, if you are wondering how we can pass an object over to a
 * function that returns immediately, such as start, and still retain access to
 * it in future requests, the answer is that the callback onRequest, as a
 * closure, will carries with it the environment (outer variables, etc.) it was
 * defined in.  Therefore, an invocation of onRequest, by createServer, will
 * always be able to access the handle object even after start returns.
 */

server.start(router.route, handle);
