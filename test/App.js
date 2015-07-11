require(__dirname+'/../index.js');
fm.appdir = __dirname;
fm.basedir = fm.appdir + "/node";
fm.Package("");
fm.Implements("app.config.Config");
fm.Class("App", function (me) {
	'use strict';
	this.setMe= function(_me){me=_me};
	Static.main=function(){
		me.getInstance();
	};

	var instance;
	Static.getInstance = function (){
		return instance = (instance ? instance : new App());
	};

	this.App = function (){
		Starter.createServer(me);
	};
});
