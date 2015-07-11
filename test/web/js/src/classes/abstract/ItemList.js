fm.package("abstract");
fm.AbstractClass("ItemList");
abstract.ItemList = function (me) {
    'use strict';
    this.setMe = function (_me) {
        me = _me;
    };
    var itemType, keyValue;
    this.ItemList = function (type, items, arg1, arg2) {
        this.items = [];
        keyValue = {};
        items = typeof items == 'undefined' ? [] : items;
        itemType = type;
        for (var i = 0; i < items.length; i++) {
            keyValue[items[i].id] = i;
            this.items.push(new type(items[i], arg1, arg2));
        };
    };

    this.add = function (item, arg1, arg2) {
        this.items.push(new itemType(item, arg1, arg2));
        keyValue[item.id] = this.items.length - 1;
    };

    function resetKeyValue() {
        var items = me.items;
        keyValue = {};
        for (var i = 0; i < items.length; i++) {
            keyValue[items[i].id] = i;
        }
    }

    this.resetKeyValue = resetKeyValue;

    this.replaceItems = function (items) {
        this.items = items;
        resetKeyValue();
    };

    this.replaceItem = function (index, replaceWith, arg1, arg2) {
        me.items[index] = new itemType(replaceWith, arg1, arg2);
    };

    this.set = function (item, arg1, arg2, noSett) {
        var index = this.indexOf(item);
        if (index !== undefined) { ///update
            me.items[index] = new itemType(item, arg1, arg2);
        } else { //Add at last
            this.items.push(new itemType(item, arg1, arg2));
            keyValue[item.id] = this.items.length - 1;
        }
    };

    this.multiSet = function (items, arg1, arg2) {
        var t = timeNow().getTime();
        for (var i = 0; i < items.length; i++) {
            this.set(items[i], arg1, arg2);
        }
        resetKeyValue();
        ActionLogger.gaLog('Calendar', 'multiSet', 'Total time for adding object in list', timeNow().getTime() - t);
    };

    this.indexOf = function (item) {
        if (typeof item === 'object') {
            return keyValue[item.id];
        };
    };

    this.remove = function (item, noSett) {
        var temp, index = this.indexOf(item);
        if (index !== undefined) {
            temp = me.items.splice(index, 1);
            resetKeyValue();
        }
        return temp;
    };

    this.getById = function (id) {
        if (!id) {
            return;
        }
        return this.items[keyValue[id]];
    };

    this.swapItemForIndex = function (index1, index2) {
        this.items.splice(index1, 0, 
        this.items.splice(index2, 1)[0]);
    };
};