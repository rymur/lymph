//function Promise (fork) {
    //this.fork = fork
//}

//Promise.prototype = {

    //chain: function (f) {
        //var promise = this
        //return new Promise(function(resolve, reject) {
            //promise.fork(function(a) {
                //f(a).fork(resolve, reject)
            //}, reject)
        //})
    //},

    //reject: function (f) {
        //var promise = this
        //return new Promise(function(resolve, reject) {
            //promise.fork(resolve, function(a) {
                //f(a).fork(resolve, reject)
            //})
        //})
    //},

    //map: function (f) {
        //var promise = this
        //return new Promise(function(resolve, reject) {
            //promise.fork(function(a) {
                //resolve(f(a))
            //}, reject)
        //})
    //}
//}

//exports.of = function (x) {
    //return new Promise(function(resolve, reject) {
        //resolve(x)
    //})
//}

//exports.error = function (x) {
    //return new Promise(function(resolve, reject) {
        //reject(x)
    //})
//}
