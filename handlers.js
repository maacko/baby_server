/*Note the number of arguments that a function accepts is equal to the number of
* parameters in its definition. If the number of arguments exceed this number,
* then the superfluous arguments are discarded.
*/
var start = function (response) {
    var body = "\
<html>\
    <head>\
        <title>upupupupupload</title>\
        <meta http-equiv='Content-Type' type='text/html' lang='en' charset='UTF-8'/>\
    </head>\
    <body>\
        <form action='/upload' method='post'>\
            <textarea name='text' rows='20' cols='60'></textarea>\
            <input type='submit' value='Submit Text'/>\
        </form>\
    </body>\
</html>";

    console.log('SUCCESSFULLY routed to START function');
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
};

var upload = function (response, postData) {

    console.log(typeof postData);
    writeResponse(response, postData);
    console.log('SUCCESSFULLY routed to UPLOAD function');
};

var writeResponse = function (response, message) {

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write(message);
    response.end();
};

exports.start = start;
exports.upload = upload;
