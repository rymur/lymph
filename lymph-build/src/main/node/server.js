var fs         = require("fs")
var path       = require("path")
var browserify = require("browserify")
var html       = require("lymph-server").html
var styles     = require("./styles")

exports.run = function (appHandler, port) {

    var send   = require("send")
    var http   = require("http")
    var watch  = require("node-watch")
    var router = require("router")

    var connection = {}
    var config = readConfig()
    var route = router()
    var srv = http.createServer(route)

    route.get("/events", function (req, res) {
        connection = createClientConnection(req, res)
    })

    route.get("/tests", function (req, res) {
        res.end(testPage(config))
    })

    route.get("/stdlib/index.js", function (req, res) {
        browserify("./lib/index.js").bundle().pipe(res)
    })

    route.get("/stdlib/index-browser.js", function (req, res) {
        browserify("./lib/index-browser.js").bundle().pipe(res)
    })

    route.get("/stdlib/index-test.js", function (req, res) {
        browserify("./lib/index-test.js").bundle().pipe(res)
    })

    route.get("/stdlib/index.css", function (req, res) {
        styles(function (err, css) {
            if (err) {
                res.end("less error: " + err.message + " on line " + err.line)
            }
            else {
                res.writeHead(200, {
                    'Content-Type': 'text/css'
                });

                res.end(css)
            }
        })
    })

    route.get(appHandler)

    srv.listen(porty(port), function () {
        var address = srv.address()
        var url = "http://" + address.address + ":" + address.port

        console.log("Server is running:", url)
        console.log("Server is running:", url + "/tests")
    })

    watch("./src", function(filename) {

        if (connection.res) {
            connection.res.write("event: filechanged\n");
            connection.res.write("data: true\n\n");
        }
    })
}

function createClientConnection (req, res) {

    var path = "./src"

    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });

    res.connection.setTimeout(600000)

    res.write("event: started\n")
    res.write("data: done\n\n")

    console.log("connection established")

    return {
        res: res
    }
}

function dependencyScripts (config) {
    return (config.clientDependencies || []).map(function (name) {
        return html.helpers.SCRIPT(
            {type:"text/javascript", src:"/stdlib/"+name+".js" }
        )
    })
}

function testPage (config) {

    var h = html.helpers

    return html.buildDocumentString(h.HTML(
        h.HEAD(
            h.TITLE(config.name),
            h.SCRIPT({type:"text/javascript", src:"/stdlib/index-test.js"})
        ),
        h.BODY(
            h.DIV({id:"container"})
        )
    ))
}

function readConfig () {
    return JSON.parse(fs.readFileSync("package.json", "utf-8"))
}

function tree (start) {

    var files = []

    try {
        var startStat = fs.lstatSync(start)
        traverse(start)
        return files
    } catch (ex) {
        console.log(ex.message)
        return []
    }

    function traverse (currentDir) {
        var currentFiles = fs.readdirSync(currentDir)
        currentFiles.forEach(function (f) {
            var fpath = path.join(currentDir, f)
            if (fs.lstatSync(fpath).isDirectory()) {
                traverse(fpath)
            }
            else {
                files.push(fpath)
            }
        })
    }
}

function porty (configuredPort) {
    if (configuredPort === undefined) {
        return 8080
    }
    else if (configuredPort === 0) {
        return 0
    }
    else {
        return configuredPort
    }
}

