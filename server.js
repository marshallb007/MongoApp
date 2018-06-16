

var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override')
var app = express();
var path = require("path");
var port = process.env.PORT || 3000;
var morgan = require("morgan");




app.use("/commentpage", express.static(path.join(__dirname + '/views')));
app.use("/", express.static(path.join(__dirname+"/views")));
app.use("/commentshow", express.static(path.join(__dirname+"/views")));

 
app.use(bodyParser.urlencoded({
    extended: false
}))
 
app.use(methodOverride('_method'));

app.use(morgan());

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

var controller = require("./controller/app_controller")(app);

app.listen(port, function(){
console.log("Listening on "+ port);
});