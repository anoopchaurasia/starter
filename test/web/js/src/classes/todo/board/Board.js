fm.Package("todo.board");
fm.Import("todo.list.ListManager");
fm.Class("Board");

todo.board.Board = function (me, ListManager) {
	
	this.Board = function (data) {
		this.$$hashKey = null;
		this.listManager = new ListManager(data.listManager.items);
	};
};