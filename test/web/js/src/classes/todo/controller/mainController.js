function mainController($scope, $rootScope) {
    
    $scope.safeApply = function (){

        if($rootScope.$$phase != '$apply' &&$rootScope.$$phase != '$digest'){
            $rootScope.$apply();
        }
    }

    $scope.inlineEditor = new common.InlineEditor();

    $scope.todo = new todo.Todo({board: {listManager:{items:[]}}});
    window.todot = $scope.todo;
    $scope.showAddListForm = function () {
    	$scope.showAddListFormFlag = true;	
    };

    $scope.$watch('todo', function () {
        localStorage.json = JSON.stringify($scope.todo);
    }, true);

    $scope.saveList = function () {
    	$scope.todo.board.listManager.addList({
    		head_text: $scope.newAddListFormHeaderText
    	});
    	$scope.newAddListFormHeaderText = "";
    	$scope.showAddListFormFlag = false;	
    };

    $scope.addCard = function (cardManager) {
    	cardManager.addCard({
    		text: ""
    	});
    };

    $scope.updateListIndex = function (current, old){
        $scope.todo.board.listManager.swapItemForIndex(current, old);
    };
}
