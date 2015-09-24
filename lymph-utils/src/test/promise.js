//describe("promise", function () {

    //var assert = chai.assert
    //var promise = lymph.req("utils.promise")

    //it("creates a promise that is resolved", function (done) {

        //var p = promise.of(41)

        //p.fork(
            //function(data) {
                //assert.equal(41, data)
                //done()
            //},
            //function(error) {
                //done()
            //}
        //)
    //})

    //it("creates a promise that fails", function (done) {

        //var p = promise.error(41)

        //p.fork(
            //function(data) {
                //done()
            //},
            //function(error) {
                //assert.equal(41, error)
                //done()
            //}
        //)
    //})

    //it("creates a chain of a promise of a value", function (done) {

        //var p = promise.of(41).chain(function(a) {
            //return promise.of(a + 1)
        //})

        //p.fork(
            //function(data) {
                //assert.equal(42, data)
                //done()
            //},
            //function(error) {
                //done()
            //}
        //)
    //})

    //it("rejects an errored promis", function (done) {

        //var p = promise.error(41).reject(function(a) {
            //return promise.error(a + 1)
        //})

        //p.fork(
            //function(data) {
                //done()
            //},
            //function(error) {
                //assert.equal(42, error)
                //done()
            //}
        //)
    //})

    //it("map a promise to a function", function (done) {

        //var p = promise.of(41).map(function(a) {
            //return a + 1
        //})

        //p.fork(
            //function(data) {
                //assert.equal(42, data)
                //done()
            //},
            //function(error) {
                //done()
            //}
        //)
    //})

    //it("can join two promises together and chaing a function to them", function (done) {

        //var p0 = promise.of(42)
        //var p1 = promise.of(p0).chain(function(a) {
            //return a
        //})

        //p1.fork(
            //function(data) {
                //assert.equal(42, data)
                //done()
            //},
            //function(error) {
                //done()
            //}
        //)
    //})
//})

