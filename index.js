var server = require('./server');

/* To separate the code into reusable pieces, we use the module system to
 * separate the code into disinct modules. The commonjs module system used by
 * nodejs allows us to separate our code into their own contexts. This way we
 * avoid polluting the global namespace, and avoid conflicts between modules.
 */
server.start();
