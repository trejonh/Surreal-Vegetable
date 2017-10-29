var mongoose = require("mongoose");
var gracefulShutdown;
var dbURL = "mongodb://"+process.env["dbu"]+":"+process.env["dbp"]+"@ds117311.mlab.com:17311/msoewrestling"; //jshint ignore:line
mongoose.Promise = global.Promise;
mongoose.connect(dbURL);
//Connection Events

mongoose.connection.on("connected",function(){
  console.log("Mongoose connected to "+dbURL);
});

mongoose.connection.on("disconnected",function(){
  console.log("Mongoose disconnected from "+dbURL);
});

//Capture app termination
gracefulShutdown = function(msg, callBack){
  mongoose.connection.close(function(){
    console.log("Mongoose disconnected thru "+msg);
    callBack();
  });
};

//for nodemon restarts
process.once("SIGUSR2", function(){
  gracefulShutdown("nodemon restarts", function(){
    process.kill(process.pid,"SIGUSR2");
  });
});
//for app termination
process.once("SIGINT", function(){
  gracefulShutdown("app termination", function(){
    process.exit(0);
  });
});
//bring in schemas
require("./schemaIndex");
