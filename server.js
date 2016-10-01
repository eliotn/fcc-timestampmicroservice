//use moment?
var http = require('http');
var url = require('url');
var moment = require('moment');
moment().format();
var server = http.createServer(function (req, res) {
    var requestdata = url.parse(req.url, true);
    
    var urlpath = decodeURIComponent(requestdata.pathname);
    var date, unixtime, naturaldate, momentparse;
    if (urlpath.match(/^\/$/)) {
        res.writeHead(200, {'content-type': 'text/plain'});
        res.end("Welcome to the timestamp microservice.  Provide a date, and \
        the microservice will parse the date");
    }
    res.writeHead(200, {'Content-Type': 'application/json'});
    if (urlpath.match(/^\/-{0,1}[0-9]+$/)) {
        momentparse = moment(urlpath.slice(1), "X", 'en', true);
        
    }
    else {
        momentparse = moment(urlpath.slice(1), "MMMM DD, Y", 'en', true);
    }
    if (!momentparse.isValid()) {
        res.end(JSON.stringify({"error":"Invalid input for the date."}));
    }
    unixtime = momentparse.unix();
    naturaldate = momentparse.format("MMMM DD, Y");
        
    res.end(JSON.stringify({"unixtime":unixtime,"natural":naturaldate}));
        /*
    else if (requestdata["pathname"] === "/api/parsetime") {
        res.end(JSON.stringify({"hour":date.getHours(), "minute":date.getMinutes(), "second":date.getSeconds()}));
        
    }
    else {
        res.writeHead(404)
        res.end()
    }*/
    
    
    
});
server.listen(Number(process.env.PORT));