fm.Package("");
fm.Class("Starter");
Starter = function(){this.setMe=function(_me){me=_me;};

	var servletObj, staticServer;
	function loadServlet( path, key ) {
		fm.Include(path);
		servletObj[key] = new (fm.stringToObject(path))();
	}

	this.init = function(){
		staticServer = new (require('node-static').Server)(undefined, {
		    cache : 1,
		    headers : {
			    'X-Powered-By' : 'node-static'
		    }
		});
	};

	Static.createServer = function(app){
		var server = require('http').createServer()
		.listen(app.port, app.host, function(){
			console.log("Server running at ", this._connectionKey);
		});
		me.handle(app, server);
	};

	Static.handle = function(app, server){
		servletObj = {};
		var filedir = "." + __dirname.replace(process.cwd(), "");
		var url = require('url'), qs=require("qs");
		server.on('request', function( req, resp ) {
			var url_parts = url.parse(req.url, true);
			var servletName = url_parts.pathname;
			if (servletName.indexOf("?") != -1) {
				servletName = servletName.substring(0, servletName.indexOf("?"));
			}
			servletName = servletName.replace(/\//g, "");

			if (app.controllers[servletName] && !servletObj[servletName]) {
				loadServlet(app.controllers[servletName].class, servletName);
			}

			if (servletObj[servletName]) {
				if (req.method == "POST") {
					var body = "";
					if(req.headers['content-type'].indexOf('multipart/form') != -1){
						servletObj[servletName].multiPart(req, resp, t);
						return;
					}

					req.on('data', function( data ) {
						body += data;
					});
					req.on('end', function( ) {
						req.params = JSON.parse(body);
						servletObj[servletName].POST(req, resp, url_parts.query.method, url_parts.query);
					});
				}
				else if (req.method == "GET") {
					var query = url_parts.query;
					req.params = query;
					servletObj[servletName].GET(req, resp, url_parts.query.method);
				}
			}
			else {
				if ( (servletName == "/" || servletName == "") && app.welcome_page) {
					req.url = app.welcome_page;
				}
				if(servletName.indexOf("jsfm.js") != -1){
					req.url = filedir + "/node_modules/jsfm/jsfm.js";
					console.log(filedir);

				}else if(servletName.indexOf("jfm") != -1){
					req.url = filedir + "/node_modules/jsfm/" + req.url.substring(req.url.indexOf("jfm"));
					console.log(filedir);

				}else{
					req.url = app.sources + req.url;
				}
				staticServer.serve(req, resp, function( err, result ) {
					if (err) {
						console.error('Error serving %s - %s', req.url, err.message);
						resp.end();
					}
				});
			}
		});
	}
};
