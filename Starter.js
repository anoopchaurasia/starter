fm.Package("");
fm.Class("Starter");
Starter = function(){this.setMe=function(_me){me=_me;};

	var servletObj;
	function loadServlet( path, key ) {
		fm.Include(path);
		servletObj[key] = new (fm.stringToObject(path))();
	}
	
	Static.main = function(){
		if( typeof global.web == 'undefined'){
			fm.Include("web");
		}
		servletObj = {};
		var http = require('http');
		var url = require('url');
		http.createServer(function( req, resp ) {
			var url_parts = url.parse(req.url, true);
			var servletName = url_parts.pathname;
			if (servletName.indexOf("?") != -1) {
				servletName = servletName.substring(0, servletName.indexOf("?"));
			}
			servletName = servletName.replace(/\//g, "");
			
			if (web.path[servletName] && !servletObj[servletName]) {
				loadServlet(web.path[servletName].class, servletName);
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
						req.params = qs.parse(body);
						try {
							servletObj[servletName].POST(req, resp);
						}
						catch (e) {
							console.log(e);
							// resp.write(JSON.parse(e));
							resp.end();
						}
					});
				}
				else if (req.method == "GET") {
					console.log(servletName, servletObj[servletName].GET);
					var query = url_parts.query;
					req.params = query;
					try {
						servletObj[servletName].GET(req, resp);
					}
					catch (e) {
						resp.end();
					}
				}
			}
			else {
				
			}
		}).listen((web.port || 80));
	};
};
