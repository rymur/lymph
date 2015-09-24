var fs   = require("fs")
var less = require("less")

module.exports = function (callback) {

    var lessDir = process.cwd() + "/lib"
    var lessFile = lessDir + "/index.less"

    fs.readFile(lessFile, "utf-8", function (err, lessContent) {
        if (err) {
            callback(err)
        }
        else {
            var parser = new(less.Parser)({
                paths: [process.cwd() + "/node_modules"],
                filename: "index.less"
            })

            parser.parse(lessContent, function (e, tree) {
                if (e) {
                    callback("less error: " + e.message + " on line " + e.line)
                }
                else {
                    callback(null, tree.toCSS({ compress: true }))
                }
            })
        }
    })
}

