/**
 * @class Utility
 * @description Utility class
 */
fm.Package("common");
fm.Class("Utility");
Utility = function (me) {
    this.setMe = function (_me) {
        me = _me;
    };

    this.shortHand = "Utility";
    Static.getInt = function (a) {
        if (a) {
            return parseInt(a, 10);
        }
        return 0;
    };

    Static.getFloat = function (a) {
        if (a) {
            return parseFloat(a);
        }
        return 0.00;
    };

    Static.isValidEmail = function (email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(email)) {
            return true;
        }
        return false;
    };

    Static.UTCtoLocal = function (date) {
        var date = this.dateParse(date);
        var offset = -date.getTimezoneOffset();
        return new Date(date.getTime() + offset * 60 * 1000);
    };

    Static.parseFloat = function (a, decimal_point) {
        if (a) {
            decimal_point = decimal_point == undefined ? 2 : decimal_point;
            return parseFloat(parseFloat(a).toFixed(decimal_point));
        }
        return 0.00;
    };

    Static.addOneSecond = function (date) {
        var neDate = new Date(date);
        neDate.setSeconds(neDate.getSeconds() + 1);
        return neDate;
    };

    Static.removeOneSecond = function (date) {
        var neDate = new Date(date);
        neDate.setSeconds(neDate.getSeconds() - 1);
        return neDate;
    };

    Static.truncateString = function (str, len, appendStr) {
        str = str + "";
        len = len || 20;
        appendStr = appendStr || "...";
        if (str.length > len) {
            str = str.substring(0, len) + appendStr;
        }
        return str;
    };

    Static.showSuccessMessage = function (text) {
        noty({
            text: text,
            layout: "topCenter",
            type: 'success'
        });

    };

    Static.changeAMPM = function (val) {
        if (val == 12) return 12 + " pm";
        if (val > 12) return (val % 12) + " pm";
        if (val == 0) return 12 + " am";
        return val + " am";
    }

    Static.timeParse = function (d) {
        if (typeof d === 'string') {
            var time = d.split(":");
            return new Date(0, 0, 0, time[0], time[1], time[2]);
        }
    };

    Static.dateParse = function (d) {
        if (d instanceof Date) return new Date(d);
        if (!isNaN(d)) return new Date(parseInt(d));
        if (typeof d === 'string') {
            var a = d.split(" ");
            if (a.length === 3) {
                if (isNaN(a[1])) {
                    return Date.parse(d);
                }
                return new Date(a[2], a[1] - 1, a[0]);
            }
            var date = a[0].split("-"),
                time = [0, 0, 0];
            if (a.length === 2) {
                time = a[1].split(":");
            }
            return new Date(date[0], date[1] - 1, date[2], time[0], time[1], time[2]);
        }
    };

    Static.showSaving = function (popupelement) {
        popupelement.css('text-align', 'center').width(100).html("<img src='/images/anim.gif'><br /><br />Saving...");
    };

    Static.showErrorMessage = function (text) {
        noty({
            text: text,
            layout: "topCenter",
            type: 'error'
        });
    };

    Static.getIdList = function (items) {
        var arr = [];
        for (var i = 0; items && i < items.length; i++) {
            arr.push(items[i].id);
        };
        return arr;
    };

    Static.getBool = function (val, dflt) {
        var val = (val === undefined ? dflt : val);
        return val === 'true' || val === true ? true : false;
    };

    Static.getTimeDiffInMinutes = function (start, end) {
        var startTime = Date.parse(start);
        return Math.floor((Date.parse(end).getTime() - startTime.getTime()) / 60000);
    };

    Static.getFormatedTimeDiff = function (start, end) {
        if (!start) return;
        var timediff = this.getTimeDiffInMinutes(start, end);
        return this.getFormatedTime(timediff);
    };

    Static.isTimeConflict = function (t_range1, t_range2) {
        return (t_range2.t1 >= t_range1.t1 && t_range2.t2 <= t_range1.t2) || (t_range2.t1 <= t_range1.t1 && t_range2.t2 > t_range1.t1) || (t_range2.t1 < t_range1.t2 && t_range2.t2 >= t_range1.t2);
    };

    Static.getFormatedTime = function (timediff) {
        var day = timediff >= 1440 ? Math.floor(timediff / 1440) : 0;
        timediff = timediff % 1440;
        var h = timediff >= 60 ? Math.floor(timediff / 60) : 0;
        var m = Math.floor(timediff % 60);
        var text = "";
        if (day > 0) {
            text += day + " day";
            if (day > 1) {
                text += "s";
            }
            text += " ";
        }
        if (h > 0) {
            text += h + " hr";
            if (h > 1) {
                text += "s";
            }
            text += " ";
        }
        if (!day)
            text += m + " mins";
        return text;
    };

    Static.isTodayDate = function (d) {
        return Date.parse(d).format('dd-mm-yyyy') === timeNow().format('dd-mm-yyyy');
    };

    Static.getTwoDigit = function (val) {
        val = "" + val + "";
        if (val.length == 1) {
            val = "0" + val;
        }
        return val;
    };

    Static.bytesToSize = function (bytes) {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return 'n/a';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        if (i == 0) return bytes + ' ' + sizes[i];
        return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
    };
};
