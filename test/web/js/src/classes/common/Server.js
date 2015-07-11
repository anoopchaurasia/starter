fm.Package("common");
fm.Class("Server");
common.Server = function (me) {
    var baseurl = "/api/v1/";
    var querystring = require("querystring");
    Static.patch = function (data, url, cb, error) {
        send("PATCH", url, data, cb, error);
    };
    Static.post = function (data, url, cb, error) {
        send("POST", url, data, cb, error);
    };
    Static.get = function (data, url, cb, error) {
        send("GET", url + "?" + querystring.stringify(data), data, cb, error);

    };
    Static.head = function (data, url, cb, error) {
        send("HEAD", url + "?" + querystring.stringify(data), data, cb, error);
    }

    Static.delete = function (data, url, cb, error) {
        send("DELETE", url, data, cb, error);
    };

    function send(method, url, data, cb, error) {
        var copy;
        copy = data.serialize ? data.serialize() : data;
        if (!copy.id) {
            copy.id = Math.floor(Math.random() * 1000000)
        }
        cb && cb.call(this, method, copy, data);

        return;
        headers = {};
        if (global.auth_token) {
            headers["x-AUTH-TOKEN"] = auth_token;
        }

        var options = {
            method: method.toUpperCase(),
            body: copy,
            dataType: 'json',
            headers: headers
        };
        require('requestify')
            .request("http://ray.practo.local" + baseurl + url,
                options)
            .then(
                function (response) {})
            .fail(function (e) {
                error && error(e);
            });
    }
};