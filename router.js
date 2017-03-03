/*
* route routes the program to a handler using the handler map, handle. The map is
* an object that pairs a pathname to a function exposed by a module, in
* our case handlers.js.
*
* Again, we want reusability in our router, reusability allows us to perform
* dependancy injections so that we can lightly couple the server and the router.
*
* For the same reasons, we pass in a map of pathnames to handlers into route.
* We use a dependency injection (passing in a structure that maps pathnames to
* functions, references to functions in handlers.js) instead of hardcoding directly
* in the router which path names correspond to which functions. We don't create
* this map in router because it hardcodes routes that may not be applicable to
* other applications. It destroys the resuability of the router module.
*
*/
var route = function (pathname, handle) {
    if (typeof pathname === 'string' && typeof handle[pathname] === 'function') {
        var handler = handle[pathname];
        console.log('Routing' + pathname + 'to the appropriate handler');
        /*As of now the handlers just output to the console, nothing else.*/
        handler();
    }
}

exports.route = route;
