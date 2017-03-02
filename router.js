/*Again we want reusability in our router, reusability allows us to perform
* dependancy injections so that we can lightly couple the server and the
* router.
*/
var route = function (pathname) {
    /*a basic prototype of what route should at take in at the minimum*/
    console.log('Routing' + pathname + 'to the appropriate handler');
}

exports.route = route;
