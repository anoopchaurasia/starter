fm.Package("todo.card");
fm.Class("Card");

todo.card.Card = function (me) {
	
	this.Card = function (card) {
		this.$$hashKey = null;
		this.text = card.text;	
		this.order = card.order;
	};
};
