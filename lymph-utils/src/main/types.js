exports.def = function (name, fields) {
    function wrapped() {
        var i, self = getInstance(this, wrapped)

        if(arguments.length != fields.length) {
            throw new TypeError(
                "Expected " + fields.length +
                " arguments, got " + arguments.length
            )
        }

        for(i = 0; i < fields.length; i++) {
            self[fields[i]] = arguments[i]
        }

        return self
    }

    wrapped._name = name
    wrapped._length = fields.length

    return wrapped
}

function getInstance(self, constructor) {
    return self instanceof constructor ? self : create(constructor.prototype)
}

function create(proto) {
    function Ctor() {}
    Ctor.prototype = proto
    return new Ctor()
}

