var http = require('http'); //npm built in
var fs = require('fs');
//var db = require('./db'); //use if not using sequelize
var db = require('./models'); //sequelize method
var express = require('express');
var cors = require('cors');
var path = require('path');
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars');


var app = express();

var port = 3000; //could use 8080, 5000, these are open ports
var connection;

//handlebars
app.engine('handlebars', handlebars({
    defaultLayout: 'main',
    helpers:{
        foo: function(funcParam){
            if(funcParam == "param1"){
                return "This is a cool param";
            }
            else{
                return "This is not a cool param";
            }
        },
        text: (funcParam)=>{
            if(funcParam == "text1"){
                return "Hello World";
            }
            else{
                return "ALL WORK AND NO PLAY MAKES STEVEN A DULL BOY"
            }
        }
    }
}));
app.set('view engine','handlebars'); //key = 'view engine', value 'handlebars'

//Express.js method
//middleware use
app.use(cors()); //saves us from having to do access-control-allow-origin
app.use(bodyParser.json());

app.get('/', (request, response)=>{
    //now using a get request at url '/'
    //response.sendFile(path.resolve("./pages/home.html")); //pre handlebar method
    response.render('home',{
        title: 'MyAwesomeTitle',
        condition: true,
        subheading:"Heading2",
        tmpArray: ['value1', 'value2', 'value3'],
        subtext: "No I'm not defending german technological superiority, I'm stating the F*cking obvious"
    });
});

app.get('/example', (request, response)=>{
    //response.sendFile(path.resolve("./pages/portfolio.html"));
    response.render('example');
});

app.get('/portfolio', (request, response)=>{
    //response.sendFile(path.resolve("./pages/portfolio.html"));
    response.render('portfolio');
});

app.get('/inventory', (req, res)=>{

    db.Inventory.findAll({}).then(data=>{
        res.render('inventory', {
            inventory: data,
            javascriptSources: [`https://code.jquery.com/jquery-3.3.1.min.js`]
        });
    });

    /*//non sequelize method
    connection.query(`SELECT * FROM inventory`, (err, data)=>{
        if(err){
            throw err;
        }
        res.render('inventory', {
            inventory: data,
            javascriptSources: [`https://code.jquery.com/jquery-3.3.1.min.js`]
        });
    });*/
});

//API method
app.get('/api/inventory', (req, res)=>{
    connection.query(`SELECT * FROM inventory`, (err, data)=>{
        if(err){
            throw err;
        }
        res.json(data); //"Content=Type":"application/json"
    });
});

app.post('/api/inventory', (req, res)=>{
    var body = req.body;
    connection.query(`INSERT INTO inventory (product_name, description, price, cost)
    VALUES (?,?,?,?)`,[body.name, body.description, body.price, body.cost], (err, data)=>{
        if (err){
            res.send("Couldn't write to db");
            throw err;
        }
        res.send("Successfully wrote to db");
    });
});

app.put('/api/inventory/:id', (request, response)=>{
    var body = request.body;
    connection.query(`UPDATE inventory SET product_name = ? WHERE id = ?`,[body.name, request.params.id], (err,data)=>{
        if (err){
            response.send(`Couldn't update ${request.params.id}`);
            throw err;
        }
        response.send(`Updated ${request.params.id}`);
    });
});

app.delete('/api/inventory/:id',(request,response)=>{
    connection.query(`DELETE FROM inventory WHERE id = ?`, [request.params.id], (err, data)=>{
        if (err){
            //response.send(`Failed to delete ${request.params.id}`);
            response.json({"succeeded": false}); //usually better to return json object than raw string
            throw err;
        }
        //response.send(`Delete ${request.params.id} successful`);
        response.json({"succeeded": true});
    })
});

app.post('/', (req, res)=>{
    //now using a post request at url '/'
    res.send(req.body.name);
});

app.put('/', (req, res)=>{
    res.send("This was from a put request");
})

app.listen(port, ()=> {
    console.log(`Connected on port: ${port}`);
    //connection = db.login();
    //connection.connect();
});


/*
//Node.js http method
var server = http.createServer(function(request, response){
    //response.end("This is a dummy response" + request.url);
    //response.end: The End method causes the Web server to stop processing the script and return the current result
    //think promises .then
    //200 is status code that means ok
    //have to specify who has access to recieve access origin
    response.writeHead(200, {
        "Content-Type":"text/html", //Important that you specify what data type it is, otherwise it will return just text
        "Access-Control-Allow-Origin": "*" //* is wild card, means anyone making request is allowed
    });
    switch(request.url){
        case "/":
            fs.readFile("./pages/home.html", function(err, data){
                if (err){
                    console.log(err);
                }
                response.end(data);
            });
            break;
        case "/portfolio":
            fs.readFile("./pages/portfolio.html", function(err, data){
                if(err){
                    console.log(err);
                }
                response.end(data);
            });
            break;
    }
});

var apiServer = http.createServer(function(request, response){
    response.writeHead(200, {
        "Content-Type":"application/json", //Important that you specify what data type it is, otherwise it will return just text
        "Access-Control-Allow-Origin": "*" //* is wild card, means anyone making request is allowed
    });
    switch(request.url){
        case "/api/inventory":
            connection.query(`select * from inventory`, (err, data) =>{
                //console.log(data);
                response.end(JSON.stringify(data));
            });
            break;
    }
});

server.listen(port,function(){
    console.log("YAY! our srver is running on port 3000");
});

apiServer.listen(port+1, function(){
    console.log("Our API Server is running on port 3001");
    connection = db.login();
    connection.connect();
});
*/