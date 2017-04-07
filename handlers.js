var querystring = require('querystring');
var fs = require('fs');
var formidable = require('formidable');
var util = require('util');

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
        <form action='/upload' method='post' enctype='multipart/form-data'>\
            <h1>upload this!</h1></br>\
            <input type='file' name='upload'></br></br>\
            <input type='submit' value='upload'/>\
        </form>\
    </body>\
</html>";

    console.log('SUCCESSFULLY routed to START function');
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
};

var upload = function (response, request) {

    console.log('SUCCESSFULLY routed to UPLOAD function');
    //parse the string query so that we may extact the text sent
    var form = new formidable.IncomingForm();
    var body ;
    form.parse(request, function (error, fields, files) {
        if (error) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(error);
            response.end();
        }
        else {
            if (files.upload.size > 0) {
                body ="<html><body><img src='/show'/></body></html>";

                fs.rename(files.upload.path, '/tmp/show.png', function (error) {
                    //in the case that it can't be rename (usually in Windows)
                    if (error) {
                        fs.unlink('/tmp/show.png');
                        fs.rename(files.upload.path, '/tmp/show.png');
                    }
                });
            }
            else {
                body = "<html><body><h1>An image was not selected.</h1></html>";
            }
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(body);
            response.end();
            //response.end(util.inspect({fields:fields, files:files}));
        }
    });
};

var show = function (response) {

    console.log('SUCCESSFULLY routed to SHOW function');
    fs.readFile('/tmp/show.png', 'binary', function (error, file) {
        if (error) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(error + '\n');
            response.end();
        }
        else {
            response.writeHead(200, {"Content-Type": "image/png"});
            response.write(file,'binary');
            response.end();
        }
    });
}

exports.start = start;
exports.upload = upload;
exports.show = show;
