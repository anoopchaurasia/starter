fm.Package("todo.list");
fm.Import("todo.card.CardManager");
fm.Class('List');
todo.list.List = function (me, CardManager) {
	
	this.List = function (data) {
		this.$$hashKey = null;
		data.cardManager = data.cardManager || {};
		this.cardManager = new CardManager(data.cardManager.items);
		this.head_text = data.head_text;
		this.order = data.order;
	};
};