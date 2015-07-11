fm.Package("app");
fm.Implements("app.config.Config");
fm.Class("Todo> Base", function (me){this.setMe=function(_me){me=_me;};

	this.method = function( req, res ) {
		var path =  web.sources + "/index.html";
		require('fs').readFile(path, function( err, data ) {
			console.log("sdsdsd dfdfdf");
			if (err) {
				res.writeHead(400, {'Content-Type': 'text/html'});
				console.log(err);
			}
			else {
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.write(data);
				res.end();
			}
		});
	};

	this.create = function (req, res) {
		console.log('got', req.body, req.query);
		req.body && res.write(JSON.stringify(req.body));
		req.query && res.write(JSON.stringify(req.query));
		res.end();
	};
});