var start = function (response) {

    console.log('SUCCESSFULLY routed to START function');
    writeResponse(response, 'Hello World');
};

var upload = function (response) {

    writeResponse(response, 'UPLOAD!');
    console.log('SUCCESSFULLY routed to UPLOAD function');
};

var writeResponse = function (response, message) {

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write(message);
    response.end();
};

exports.start = start;
exports.upload = upload;
