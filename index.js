var server = require('./server');
var router = require('./router');
/* In order to create reusable pieces of functionality, we use the module system to
 * separate code into disinct modules. The CommonJS module system used by
 * nodejs allows us to separate our code into their own contexts. This way we
 * avoid polluting the global namespace, and avoid conflicts between modules.
 *
 * Since the index.js bootstrap our application, we place the router dependency
 * here rather than in our server module. This way, the server is a standalone
 * module not dependent on any specific router module.
 */
server.start(router.route);
