const express = require("express")
const bodyParser = require("body-parser")
const exec = require('child_process').exec;

port = 3000

server = express()
var urlencodedParser = bodyParser.urlencoded({ extended: false })  


//Setting view Engine
server.set("view engine", "ejs")

// Static Files
server.use(express.static('public'));
server.use('/css', express.static(__dirname + 'public/css'))
server.use('/js', express.static(__dirname + 'public/js'))


let data = ["5*5", "25"]
let answer = 0

server.get("/", (req, res) => {
    res.render("index", {data:data})
    
})

server.post("/", urlencodedParser, (req, res)=>{
    equation = req.body.equation
    //console.log(equation)
    exec(`echo $((${equation}))`,
    function (error, stdout, stderr) {
        //console.log('stdout: ' + stdout);
        //console.log('stderr: ' + stderr);
        answer = stdout
        data = [equation, answer]
        if (error !== null) {
            console.log('exec error: ' + error);
            answer = "Error Occured please check your command"
            data = [equation, answer]
            error = null
        }
        
        res.render("index", {data:data})
        
    });
    
})


server.listen(port, ()=>{
    console.log(`Server is listening on port : ${port}`)
})
