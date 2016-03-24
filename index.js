var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var logger = require('morgan');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var pg = require('pg');
var pgp = require('pg-promise')(/*options*/);
var parseString = require('xml2js').parseString;
var http = require('http');
var request = require('request');

var app = express();
app.use(cookieParser());
app.use(logger('combined'));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(express.static('newport'));

app.get('/',function(req,res,next){
    res.redirect('/index.html');
});

app.use('/shoperator/parse',function(req,res,next){
    var xml = req.body;
    console.log(xml);
    request(xml.id,function(error,response,body){
        if(!error && response.statusCode == 200){
            var xmlPiece = body;
            parseString(xmlPiece,function(err,result){
                var item = result.ItemSearchResponse;
                res.send(item);
                console.log(item.Items);
            });
        }
    });
});

app.listen(3001);
