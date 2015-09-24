exports.productionBuilder = function (path, fs, uglifyjs) {
    return function () {
        var uglify = uglifier(path, fs, uglifyjs)
        uglify("node", nodeFiles(path, fs))
        uglify("browser", browserFiles(path, fs))
        uglify("mut", mutFiles(path, fs))
    }
}

exports.testBuilder = function (path, fs, uglifyjs) {
    return function () {
        var uglify = uglifier(path, fs, uglifyjs)
        uglify("mut", mutFiles(path, fs))
        uglify("test", testFiles(path, fs))
    }
}

function uglifier (path, fs, UglifyJS) {

    return function (indexName, fileNames) {

        var toplevel = UglifyJS.parse("")

        try {
            fileNames.forEach(function (file) {
                try {
                    var code = fs.readFileSync(file, "utf-8")

                    toplevel = UglifyJS.parse(code, {
                        filename: file.replace("src/", ""),
                        toplevel: toplevel
                    })
                }
                catch (ex) {
                    console.log(ex.message + "  [" + file + ":" + ex.line + "," + ex.col + "]")
                    throw new Error("build failed")
                }
            })
        } catch (ex) {
            console.log(ex)
        }

        if (indexName === "node") {
            toplevel = wrapit(toplevel)
        }

        toplevel.figure_out_scope()

        var stream = UglifyJS.OutputStream({
            beautify: true
        })

        toplevel.print(stream)

        var fd = null

        try {
            fd = fs.openSync("lib/index-" + indexName + ".js", "w")
            fs.writeSync(fd, stream)
        }
        catch (ex) {
            console.log(ex)
        }
        finally {
            fs.closeSync(fd)
        }
    }


    function wrapit (body) {

        var wrapper = UglifyJS.parse("module.exports = function (lymph) { '$BODY'; }")

        return wrapper.transform(new UglifyJS.TreeTransformer(function before (node) {
            if (node instanceof UglifyJS.AST_Directive && node.value == "$BODY") {
                return body
            }
        }))
    }

    function transformer(body) {

        return new UglifyJS.TreeTransformer(null, function(node){

            if (node instanceof UglifyJS.AST_Directive && node.value == "$BODY") {
                console.log("found body")
                return body
            }
            else if (node instanceof UglifyJS.AST_String && node.getValue().match(/^\![a-z]*/)) {
                return new UglifyJS.AST_String({
                    value : node.getValue().slice(1),
                    start : node.start,
                    end   : node.end
                })
            }
        })
    }
}

function testFiles (path, fs) {
    return tree(path, fs, "src/test")
}

function mutFiles (path, fs) {
    return tree(path, fs, "src/main/shared")
        .concat(tree(path, fs, "src/main/node"))
        .concat(tree(path, fs, "src/main/browser"))
}

function nodeFiles (path, fs) {
    return tree(path, fs, "src/main/shared").concat(tree(path, fs, "src/main/node"))
}

function browserFiles (path, fs) {
    return tree(path, fs, "src/main/shared").concat(tree(path, fs, "src/main/browser"))
}

function tree (path, fs, start) {

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

