fm.Package("");
fm.Class("Starter");
Starter = function(me){this.setMe=function(_me){me=_me;};
	'use strict';
	var servletObj, expressApp, express;

	this.init = function(){
		express = require('express');
		expressApp = express();
		var bodyParser = require('body-parser')
		expressApp.use( bodyParser.json({limit: '50mb'}));
		Static.Const.preDefinedGetMethods = ["new", 'index', 'show'];
		Static.Const.preDefinedPostMethods = ["create"];
		Static.Const.preDefinedPatchMethods = ['edit', 'update'];
		Static.Const.preDefinedDeleteMethods = ['delete'];
	};

	Static.createServer = function(app){
		var host = app.host || 'localhost';
		var port = app.port || 8080;
		expressApp.listen(port, host, function(){
			console.log("Server running at ", this._connectionKey);
		});

		expressApp.use("/jsfm", express.static(require("path").resolve(__dirname + '/' + 'node_modules/jsfm')));
		//console.log(require("path").resolve(app.source));
		app.source && expressApp.use(express.static(require("path").resolve(app.source)));
		handle(app);
	};

	function handle(app) {
	 	var instance, controller;
		for(var k in app.controllers) {
			controllers = app.controllers[k];
			fm.Include(controllers["class"]);
			instance  = new (fm.stringToObject(controllers["class"]))();
			applyMethods('get', me.preDefinedGetMethods, controllers.get||[], instance, k);
			applyMethods('post', me.preDefinedPostMethods, controllers.post||[], instance, k);
			applyMethods('patch', me.preDefinedPatchMethods, controllers.patch||[], instance, k);
			applyMethods('delete', me.preDefinedDeleteMethods, controllers.delete||[], instance, k);
			applyMethods('put', [], controllers.put||[], instance, k);
			applyMethods('head', [], controllers.head||[], instance, k);
		}
	}

	function applyMethods (httpmethod, m1, m2, instance, name){
		var usedMethods = {};
		m2.forEach(function(method){
			if(typeof instance[method] === 'function' && !usedMethods[method]) {
				usedMethods[method] = true;
				expressApp[httpmethod]("/"+name + "/"+ method, instance[method]);
			}
		});

		m1.forEach(function(method){
			if(typeof instance[method] === 'function' && !usedMethods[method]) {
				usedMethods[method] = true;
				expressApp[httpmethod]("/"+name + "/"+ method, instance[method]);
			}
		});
	};
};
