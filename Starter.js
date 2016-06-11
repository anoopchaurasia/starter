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
	 	var instance, controllerconfig;
	 	var rooturl = app.rooturl;
	 	if(rooturl) {
	 		fm.Include(rooturl["class"]);
			instance  = new (fm.stringToObject(rooturl["class"]))();
			expressApp['get']("/", instance[rooturl.method || "index"]);
	 	}
		for(var k in app.controllers) {
			controllerconfig = app.controllers[k];
			fm.Include(controllerconfig["class"]);
			instance  = new (fm.stringToObject(controllerconfig["class"]))();
			applyMethods('get', [me.preDefinedGetMethods, controllerconfig.get||[],  (instance.api && instance.api.get)|| []], instance, k);
			applyMethods('post', [me.preDefinedPostMethods, controllerconfig.post||[],  (instance.api && instance.api.post)|| []], instance, k);
			applyMethods('patch', [me.preDefinedPatchMethods, controllerconfig.patch||[],  (instance.api && instance.api.patch)|| []], instance, k);
			applyMethods('delete', [me.preDefinedDeleteMethods, controllerconfig.delete||[],  (instance.api && instance.api.delete)|| []], instance, k);
			applyMethods('put', [[], controllerconfig.put||[],  (instance.api && instance.api.put)|| []], instance, k);
			applyMethods('head', [[], controllerconfig.head||[],  (instance.api && instance.api.head)|| []], instance, k);
			if(controllerconfig['static']) {
				controllerconfig['static'].forEach(function (path) {
					expressApp.use(path.url, express.static(path.dir));
				});
			}
		}
	}

	function applyMethods (httpmethod, methods, instance, name){
		var temp = [];
		methods = [].concat.apply([], methods).filter(function (a, i, arr) {
			return arr.indexOf(a) == i;
		});
		var usedMethods = {};
		methods.forEach(function(method){
			if(typeof instance[method] === 'function') {
				expressApp[httpmethod]("/"+name + "/"+ method, instance[method]);
			}
		});
	};
};
