angular.module("app", [])
.directive("listDragDrop", [
	function () {
		function linker (scope, element, attrs) {
			element.sortable({
				placeholder: "ui-state-highlight",
				start: function (e, helper) {
					helper.placeholder
					.height(helper.item.height())
					.width(helper.item.width())
					helper.placeholder.
					css({
						"padding-top": helper.item.css("padding-top"),
						"padding-right": helper.item.css("padding-right"),
						"padding-bottom": helper.item.css("padding-bottom"),
						"padding-left": helper.item.css("padding-left"),
						"margin-top": helper.item.css("margin-top"),
						"margin-right": helper.item.css("margin-right"),
						"margin-bottom": helper.item.css("margin-bottom"),
						"margin-left": helper.item.css("margin-left"),
						"border": "1px solid transparent",
						"border-radius": "3px"
					});
					element.find(".list.add").hide();
					helper.item.data('oldIndex', helper.item.index());
					helper.item.css("transform", "rotate(4deg)");
				},
				stop: function (e, helper) {
					element.find(".list.add").show();
					helper.item.css("transform", "rotate(0deg)");
					var oldIndex = helper.item.data('oldIndex');
					var currentIndex = helper.item.index();
					scope.updateListIndex(currentIndex, oldIndex);		
					scope.safeApply();			
				}
			});
			element.disableSelection();
		}

		return {
			link: linker
		};
	}
])
.directive("cardDragDrop", [
	function () {
		function linker (scope, element, attrs) {
			element.sortable({
				placeholder: "ui-state-highlight",
				start: function (e, helper) {
					helper.item.data('oldIndex', helper.item.index());
				},
				stop: function (e, helper) {
					var oldIndex = helper.item.data('oldIndex');
					var currentIndex = helper.item.index();
					scope.list.cardManager.swapItemForIndex(currentIndex, oldIndex);
					scope.safeApply();	
				}
			});
			element.disableSelection();
		}

		return {
			link: linker
		};
	}
])
.directive("inlineEditor", ["$timeout",
	function ($timeout) {
		function linker(scope, element, attrs) {
			element.click(function () {
				scope.inlineEditor.editText(element, function(text){
					scope.card.text = text;
				});
			});
			if(!scope.card.text) {
				$timeout(function(){
					scope.inlineEditor.editText(element, function(text){
						scope.card.text = text;
					});
				}, 100);
			}
		}

		return {
			link: linker
		}
	}
]);

fm.Include("todo.Todo",function(){
    $(document).ready(function(){
    	fm.globaltransient = ["$$hashKey"];
        angular.bootstrap(document, ["app"]);
    });
});