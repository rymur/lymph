//lymph.def("lymph.server.utils", function (req, exp) {

    //function buildResponse (opt) {

        //var headers = opt.headers || {};

        //if (!headers["Content-Type"]) {
            //headers["Content-Type"] = opt.contentType || "text/plain";
        //}

        //headers["Content-Length"] = opt.body ? Buffer.byteLength(opt.body, "utf8") : 0;

        //// always enable CORS calls
        //headers["access-control-allow-origin"] = "*";

        //return {
            //status: opt.status || 200,
            //reason: opt.reason || "OK",
            //headers: headers,
            //body: opt.body || ""
        //}
    //}

    //var responses = {

        //html: function (content) {
            //return buildResponse({
                //contentType: "text/html",
                //body: content
            //});
        //},

        //json: function (content) {
            //return buildResponse({
                //contentType: "application/json",
                //body: JSON.stringify(content)
            //});
        //},

        //css: function (content) {
            //return buildResponse({
                //contentType: "text/css",
                //body: content
            //});
        //},

        //error: function (rst) {
            //return buildResponse({
                //status: rst.status,
                //reason: rst.reason
            //});
        //},

        //cors: buildResponse({
            //status: 204,
            //reason: "No Content",
            //headers: {
                //"access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
                //"access-control-allow-headers": "content-type, accept",
                //"access-control-max-age": 10, // Seconds.
                //"content-length": 0
            //}
        //}),

        //redirect: function (location) {
            //return buildResponse({
                //status: 302,
                //headers: {
                    //"Location": location
                //}
            //})
        //}
    //}

    //function buffered (res, callback) {
        //var responseBuffer = [];
        //res.setEncoding("utf8");
        //res.on("data", function (chunck) {
            //responseBuffer.push(chunck);
        //});
        //res.on("end", function(){
            //callback(responseBuffer.join(""));
        //});
    //}

    //function bufferedJSON (res, callback) {
        //buffered(res, function(data) {
            //callback(JSON.parse(data))
        //})
    //}

    //function merge (target, src) {

        //var array = Array.isArray(src)
        //var dst = array && [] || {}

        //if (array) {
            //target = target || []
            //dst = dst.concat(target)
            //src.forEach(function(e, i) {
                //if (typeof e === 'object') {
                    //dst[i] = merge(target[i], e)
                //}
                //else {
                    //if (target.indexOf(e) === -1) {
                        //dst.push(e)
                    //}
                //}
            //})
        //}
        //else {
            //if (target && typeof target === 'object') {
                //Object.keys(target).forEach(function (key) {
                    //dst[key] = target[key]
                //})
            //}
            //Object.keys(src).forEach(function (key) {
                //if (typeof src[key] !== 'object' || !src[key]) {
                    //dst[key] = src[key]
                //}
                //else {
                    //if (!target[key]) {
                        //dst[key] = src[key]
                    //}
                    //else {
                        //dst[key] = merge(target[key], src[key])
                    //}
                //}
            //})
        //}

        //return dst
    //}

    //var cookies = {

        //parse: function (s) {

            //var trim = function (x) {
                //return (x || "").trim();
            //}

            //var array2pair = function (xs) {
                //return { name:xs[0], value: xs[1] };
            //}

            //var parseCookie = function (s) {
                //return array2pair(s.split("=").map(trim));
            //}

            //var results = {};
            //if (s !== undefined) {
                //s.split(";").map(parseCookie).forEach(function(c) {
                    //results[c.name] = c.value;
                //});
            //}
            //return results;
        //}
    //}

    //function setupRouting (routes) {

        //return function (request, state) {

            //var route, i, matches

            //for (i = 0; i < routes.length; i++) {

                //route  = routes[i]
                //matches = request.url.match(route.pattern)

                //if (route.method == request.method && matches) {
                    //return route.action.apply(
                        //this,
                        //[request].concat(matches.slice(1)).concat(state)
                    //)
                //}
            //}
        //}
    //}

    //function server (config) {
        
        //var send = require("send")
        //var url = require("url")
        //var http = require("http")

        //return function (program) {

            //http.createServer(function(nodeRequest, nodeResponse){

                //buffered(nodeRequest, function (bufferedRequestData) {

                    //var urlobj = url.parse(nodeRequest.url, true)

                    //// wrap node's request and the data in a friendly request object
                    //var request = {
                        //method: nodeRequest.method,
                        //url: nodeRequest.url,
                        //headers: nodeRequest.headers,
                        //query: urlobj.query,
                        //pathname: urlobj.pathname,
                        //cookies: cookies.parse(nodeRequest.headers.cookie),
                        //body: bufferedRequestData
                    //}

                    //// run the application's program as a request/response async cycle
                    //program(request, function (response) {

                        //if (response) {

                            //nodeResponse.writeHead(response.status, response.headers)

                            //// send the generated response back
                            //if (response.status != 204) {
                                //nodeResponse.end(response.body)
                            //}
                            //else {
                                //nodeResponse.end()
                            //}
                        //}
                        //else {
                            //// no response generated, so send a file instead
                            //var libPathPattern = new RegExp("^/lib/(.*)$")
                            //var stdlibPathPattern = new RegExp("^/stdlib/(.*)$")
                            //var srcPathPattern = new RegExp("^/src/(.*)$")

                            //if (libPathPattern.test(nodeRequest.url)) {
                                //var path = nodeRequest.url.match(libPathPattern)[1]
                                //send(nodeRequest, path).root("lib").pipe(nodeResponse)
                            //}
                            //else if (stdlibPathPattern.test(nodeRequest.url)) {
                                //var path = nodeRequest.url.match(stdlibPathPattern)[1]
                                //send(nodeRequest, path + "/lib/index-browser.js").root("node_modules").pipe(nodeResponse)
                            //}
                            //else if (srcPathPattern.test(nodeRequest.url)) {
                                //var path = nodeRequest.url.match(srcPathPattern)[1]
                                //send(nodeRequest, path).root("src").pipe(nodeResponse)
                            //}
                            //else {
                                //send(nodeRequest, nodeRequest.url)
                                    //.root(config.static)
                                    //.pipe(nodeResponse)
                            //}
                        //}
                    //})
                //})

            //}).listen(8080)
        //}
    //}

    //function setupEventLog (config) {

        //var fs = require("fs")

        //return function (events, done) {

            //events.forEach(function (e) {

                //var file = config.eventLogFileName

                //e.date = (new Date()).getTime()
                //var jsonEvent = JSON.stringify(e)

                //fs.appendFile(file, jsonEvent+"\n", function(err){
                    //if (err) {
                        //console.log(err)
                    //}
                    //if(done) {
                        //done()
                    //}
                //});
            //})
        //}
    //}

    //function dump (request, state) {
        //console.log("dumping this");
        //return {
            //response: responses.cors
        //}
    //}

    //return {
        //buildResponse: buildResponse,
        //responses: responses,
        //buffered: buffered,
        //bufferedJSON: bufferedJSON,
        //merge: merge,
        //cookies: cookies,
        //setupRouting: setupRouting,
        //setupEventLog: setupEventLog,
        //server: server
    //}
//})

