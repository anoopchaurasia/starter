fm.Package("todo");
fm.Include("common.InlineEditor");
fm.Include("todo.controller.mainController");
fm.Import("todo.board.Board");
fm.Class("Todo");
todo.Todo = function (me, Board) {
	
	this.Todo = function (data) {
		this.$$hashKey = null;
		this.board = new Board(data.board);	
	};
};