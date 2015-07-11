fm.Package("app.config");
fm.Interface("Config");
app.config.Config = function (me){
	this.port = 8321;
	this.host = "localhost";
	this.source = fm.appdir + "/web";
	this.controllers = {
        "todo" : {'class':"app.Todo", get:['abcd']}
	};
};
