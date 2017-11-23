fm.Package("");
fm.Class("Starter");
Starter = function(me){this.setMe=function(_me){me=_me;};
	'use strict';
	var servletObj, express, expressApp;

	this.init = function(){
		express = require('express');
		expressApp = express();
		var bodyParser = require('body-parser')
		expressApp.use( bodyParser.json({limit: '500mb'}));
		var fs = require("fs");
		var path = __dirname + '/' + 'node_modules/jsfm'
		if (fs.existsSync(path)) {
		    expressApp.use("/jsfm", express.static(require("path").resolve(path)));
		} else {
			expressApp.use("/jsfm", express.static(require("path").resolve(__dirname + '/../jsfm')));
		}
	};

	Static.getExpress = function () {
		return expres;
	};

	Static.getExpressApp = function () {
		return expressApp;
	};

	Static.createServer = function(app){
		var host = app.host || 'localhost';
		var port = app.port || 8080;
		expressApp.listen(port, host, function(){
			console.log("Server running at ", this._connectionKey);
		});
	};

	Static.addMethod = function(method, url, cb, middleware) {
		if(typeof middleware == "function") {
			expressApp[method||"get"](url, middleware, cb);
		}else {
			expressApp[method||"get"](url, cb);
		}
	};

	Static.addStaticFile = function(url, file) {
		expressApp.use(url, express.static(file));
	};
};
