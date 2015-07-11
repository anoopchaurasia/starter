fm.Package("todo.card");
fm.Import("todo.card.Card");
fm.Class("CardManager", "abstract.ItemList");
todo.card.CardManager = function (me, Card) {

	this.CardManager = function (cards) {
        this.$$hashKey = null;
		this.base(Card, cards || []);
	};

    this.addCard = function (card){
        this.add(new Card(card));
    };

    this.saveCard = function(card) {
    	
    };

    this.swapItemForIndex = function (index1, index2) {
    	this.base.swapItemForIndex(index1, index2);
    	this.items.forEach(function (item, index) {
    		item.order = index;
    	});	
    };
};