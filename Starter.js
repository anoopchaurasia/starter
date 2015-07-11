fm.Package("");
fm.Class("Starter");
Starter = function(){this.setMe=function(_me){me=_me;};
	'use strict';
	var servletObj, expressApp, express;
	function loadServlet( path, key ) {
		fm.Include(path);
		servletObj[key] = new (fm.stringToObject(path))();
	}

	this.init = function(){
		express = require('express');
		expressApp = express();
		var bodyParser = require('body-parser')
		expressApp.use( bodyParser.json() );
		Static.Const.preDefinedGetMethods = ["new", 'index', 'show'];
		Static.Const.preDefinedPostMethods = ["create"];
		Static.Const.preDefinedPatchMethods = ['edit', 'update'];
		Static.Const.preDefinedDeleteMethods = ['delete'];
	};

	Static.createServer = function(app){
		expressApp.listen(app.port, app.host, function(){
			console.log("Server running at ", this._connectionKey);
		});

		expressApp.use("/jsfm", express.static(require("path").resolve(__dirname + '/' + 'node_modules/jsfm')));
		console.log(require("path").resolve(app.source));
		app.source && expressApp.use(express.static(require("path").resolve(app.source)));
		handle(app);
	};

	function handle(app) {
	 	var instance;
		for(var k in app.controllers) {
			fm.Include(app.controllers[k]["class"]);
			instance  = new (fm.stringToObject(app.controllers[k]["class"]))();
			applyMethods('get', me.preDefinedGetMethods, app.controllers[k].get||[], instance, k);
			applyMethods('post', me.preDefinedPostMethods, app.controllers[k].post||[], instance, k);
			applyMethods('patch', me.preDefinedPatchMethods, app.controllers[k].patch||[], instance, k);
			applyMethods('delete', me.preDefinedDeleteMethods, app.controllers[k].delete||[], instance, k);
			applyMethods('put', [], app.controllers[k].put||[], instance, k);
			applyMethods('head', [], app.controllers[k].head||[], instance, k);
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
