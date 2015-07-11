fm.Package("todo.list");
fm.Import("todo.list.List");
fm.Class("ListManager", "abstract.ItemList");
todo.list.ListManager = function (me, List) {

	this.ListManager = function (lists) {
        this.$$hashKey = null;
		this.base(List, lists || []);
	};

    this.addList = function (listData){
        this.add(new List(listData));
    };

    this.swapItemForIndex = function (index1, index2) {
    	this.base.swapItemForIndex(index1, index2);
    	this.items.forEach(function (item, index) {
    		item.order = index;
    	});	
    };
};