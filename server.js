//use moment?
var http = require('http');
var url = require('url');
var moment = require('moment');
var express = require('express');
moment().format();
var server = http.createServer(function (req, res) {
    var requestdata = url.parse(req.url, true);
    
    var urlpath = decodeURIComponent(requestdata.pathname);
    var date, unixtime, naturaldate, momentparse;
    if (urlpath.match(/^\/$/)) {
        res.writeHead(200, {'content-type': 'text/html'});
        var todaysmoment = moment(moment().format("MMMM D, Y"), "MMMM D, Y", 'en', true);
        var todaysmomentformatted = todaysmoment.format("MMMM D, Y");
        var todaysunixtime = todaysmoment.unix();
        res.end("<html><head><title>Timestamp Microservice</title></head><body>" +
        "<h1>Welcome to Eliot's timestamp microservice.</h1><h3>To use this serveice, put " +
        "a unix timestamp in the format " +
        "/[integer timestamp]' or a date in the format " +
        "/[Month Name]%20[Day],%20[Year]'.</a></h3>" +
        "<p>For example if you request <a href='./" + todaysmomentformatted + "'>" +
        "'/" + encodeURI(todaysmomentformatted) + "'</a> " + 
        "or  <a href='./" + encodeURI(todaysmomentformatted) + "'>'/" + todaysunixtime + "'</a>" +
        "</p><p>You will get the following output: {" +
        "\"unixtime\":" + todaysunixtime + ",\"natural\":\"" + todaysmomentformatted + "\"}" +
        "</body></html>");
    }
    res.writeHead(200, {'Content-Type': 'application/json'});
    if (urlpath.match(/^\/-{0,1}[0-9]+$/)) {
        momentparse = moment(urlpath.slice(1), "X", 'en', true);
        
    }
    else {
        momentparse = moment(urlpath.slice(1), "MMMM D, Y", 'en', true);
    }
    if (!momentparse.isValid()) {
        res.end(JSON.stringify({"unixtime":null,"natural":null}));
    }
    unixtime = momentparse.unix();
    naturaldate = momentparse.format("MMMM D, Y");
        
    res.end(JSON.stringify({"unixtime":unixtime,"natural":naturaldate}));
    
    
    
});
server.listen(Number(process.env.PORT));