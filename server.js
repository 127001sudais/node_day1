let http = require("http")
let fs = require("fs")
let _ = require("lodash")


let server = http.createServer((req, res) => {

    // lodash
    const num = _.random(4, 100)
    console.log(num)

    //lodash firing fucntion once only
    let greet = _.once(() => {
        console.log("hello world ")
    })

    greet()
    greet()


    // set header content type
    res.setHeader("Content-Type", "text/html")

    // sending hard-coded data
    /**
    res.write("<h1>hello world</h1>")
    res.write("<strong>sudais is a software engineer</strong>")
    res.end()
     */

    // sending html file
    /** fs.readFile("./views/index.html", (err, data) => {
     * 
         if (err) {
             console.log(err)
             res.end()
         } else {
             console.log("welcome to home page")
             res.end(data)
         }
     }) */

    // routing
    let path = "./views/"
    switch (req.url) {
        case "/":
            path += "index.html"
            res.statusCode = 200
            break;
        case "/about":
            path += "aboutme.html"
            res.statusCode = 200
            break;
        case "/sudais":
            res.setHeader("Location", "/about")
            res.statusCode = 301
            res.end()
            break;
        default:
            path += "404.html"
            res.statusCode = 404
            break;
    }

    fs.readFile(`./${path}`, (err, data) => {
        if (err) {
            console.log(err)
            res.end()
        } else {
            res.end(data)
        }
    })


})


server.listen(3000, () => {
    console.log(`server listening on port 3000`)
})