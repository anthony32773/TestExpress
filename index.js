var express = require("express");
var http = require("http");
var logger = require("morgan");
var path = require("path");
var app = express();

// Makes the folder public accessible and will send
var publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

// This tells express that your views will be in a folder called views
app.set("views", path.resolve(__dirname, "views"));
// This tells express that we are using EJS
app.set("view engine", "ejs");

// This sets the morgan logger to start working
app.use(logger("short"));

// This is the standard format for setting up a middleware
// app.use(function(request, response, next)
// {
//     console.log("In comes a " + request.method + "to: " + request.url);
//     next();
// });

// Setup for a get request to the homepage
app.get("/", function(request, response)
{
    response.render("index",
        {
            message: "hi this is the message var"
        });
});

// The who is a property of req.params, you can use it to
// do dynamic urls - /hello/something
app.get("/hello/:who", function(request, response)
{
    // This allows you to redirect to a different link
    response.redirect("/about");
    //response.end("Hello " + request.params.who);
});

app.get("/about", function(request, response)
{
    response.end("Welcome to the about page!");
});

app.get("/weather", function(request, response)
{
    response.end("Welcome to the weather page!");
});

app.use(function(request, response)
{
    response.statusCode = 404;
    response.end("404!");
})
// app.use(function(request, response)
// {
//     response.writeHead(200 , {"Content-type": "text/plain"});
//     response.end("Hello World");
// });

//Create the server on port 3000
http.createServer(app).listen(3000);

// function requestHandler(request, response)
// {
//     console.log("In comes a request to: " + request.url);
//     response.end("Hello World");
// }
//
// var server = http.createServer(requestHandler);
//
// server.listen(3000);