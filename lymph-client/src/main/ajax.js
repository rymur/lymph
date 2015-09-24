exports.get = function (xhr, url, fn) {
    
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4){
            if (xhr.getResponseHeader("Content-Type") === "application/json") {
                fn(JSON.parse(xhr.responseText))
            }
            else {
                fn(xhr.responseText)
            }
        }
    }

    xhr.open("GET", url, true)
    xhr.send(null)
}

