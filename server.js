//use moment?
var http = require('http');
var url = require('url');
var server = http.createServer(function (req, res) {
    /*if (req.method != 'POST')  
         return res.end('send me a POST\n');*/
    var requestdata = url.parse(req.url, true);
    
    var urlpath = decodeURIComponent(requestdata.pathname);
    var date, unixtime, naturaldate;
    if (urlpath.match(/^\/$/)) {
        res.writeHead(200, {'content-type': 'text/plain'});
        res.end("Welcome to the timestamp microservice.  Provide a date, and \
        the microservice will parse the date");
    }
    res.writeHead(200, {'Content-Type': 'application/json'});
    if (urlpath.match(/^\/-{0,1}[0-9]+$/)) {
        unixtime = parseInt(urlpath.slice(1));
        if (unixtime < 0 || unixtime > 8624674407370955) {
            res.end(JSON.stringify({"error":"The time is not in a valid range for unix time"}));
        }
        naturaldate = new Date(unixtime).toDateString();
        
    }
    else {
        date = new Date(Date.parse(urlpath.slice(1)));
        if (isNaN(date)) {
            res.end(JSON.stringify({"error":"invalid string"}));
            return;
        }
        unixtime = date.getTime();
        if (unixtime < 0 || unixtime > 8624674407370955) {
            res.end(JSON.stringify({"error":"The time is not in a valid range for unix time"}));
        }
        naturaldate = date.toDateString()
    }
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