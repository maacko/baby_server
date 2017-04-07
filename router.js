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
* We want the handler to craft the response, therefore response object, along
* with the request object, is passed on to the handler so that it may write to it.
*
* Since we are passing the request object to the handlers, the handlers, if they
* choose to, can now utilize the request object to extract data.
*
*/
var route = function (pathname, handle, response, request) {
    if (typeof pathname === 'string' && typeof handle[pathname] === 'function') {
        var handler = handle[pathname];
        console.log('Routing' + pathname + ' to the appropriate handler');

        handler(response, request);
    }
    else {
        response.writeHead(404, {"Content-Type": "plain/text"});
        response.write('404 NOT FOUND');
        response.end();
    }
}

exports.route = route;
