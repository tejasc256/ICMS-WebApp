const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 6000;
const mysql = require('mysql');
const session = require('express-session');
const cookieParser = require('cookie-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
    secret: 'randomshit',
    resave: true,
    saveUninitialized: true
}));

// connect to database
// const mc = require('./model/db');

var customerRouter = require('./routes/customerRouter');
var agentRouter = require('./routes/agentRouter');
var policyRouter = require('./routes/policyRouter');
var requestRouter = require('./routes/requestRouter');
var attributesRouter = require('./routes/attributesRouter');
var loginRouter = require('./routes/loginRouter');
var claimRouter = require('./routes/claimRouter');
var managerRouter = require('./routes/managerRouter');
var ceoRouter = require('./routes/ceoRouter');
var investigateRouter = require('./routes/investigateRouter');

app.use('/customer', customerRouter);
app.use('/agent', agentRouter);
app.use('/policy', policyRouter);
app.use('/request', requestRouter);
app.use('/attribute', attributesRouter);
app.use('/login', loginRouter);
app.use('/manager',managerRouter);
app.use('/claims',claimRouter); 
app.use('/ceo',ceoRouter);
app.use('/investigate',investigateRouter);

// This line should be AFTER all routes
app.get('*', function(req, res) {
     res.send("Sorry, Invalid URL");
});

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});


// var routes = require('./routes/approutes'); //importing route
// routes(app); //register the route
