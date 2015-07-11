fm.Package("common");
fm.Class("InlineEditor");
common.InlineEditor = function () {

	function createTextArea(div, afterUpdate) {
		var text = $.trim(div.html()).replace(	/\s+/g, " ").replace(/<br\s*\/?>/mgi,"\n");
		$(this).hide();
        div.css("position", "relative");
		var pos = $( div ).position();
		var height = 0;
		var html = "<textarea>" + text + "</textarea>";
		var textarea = $( html ).appendTo(div.parent());
        var divPaddingHeight = parseInt(div.css("padding-top")) + parseInt(div.css("padding-bottom"));
        var divPaddingWidth = parseInt(div.css("padding-left")) + parseInt(div.css("padding-right"));
		textarea.css({
			left:pos.left + parseInt( div.css("margin-left")) -1,
			top:pos.top + parseInt( div.css("margin-top")) -1,
			position:"absolute",
			width:div.width() + divPaddingWidth,
			height:div.height() + divPaddingHeight,
            "padding-top": div.css("padding-top"),
            "padding-left": div.css("padding-left"),
            "padding-bottom": div.css("padding-bottom"),
            "padding-right": div.css("padding-right"),
			"max-height": div.height() + divPaddingHeight,
            "word-break": "break-word",
			"font-size": div.css("font-size"),
			"font-weight":div.css("font-weight"),
			display:"block",
			border:"1px solid #ccc",
			"font-family":div.css("font-family"),
			"overflow-x": "auto",
			"overflow-y": "hidden",
            resize: "none"
		}).blur( function() {
			div.html( this.value.replace(/\n/g, "<br>") );
			div.css("visibility","visible");
			$( this).remove();
			afterUpdate && afterUpdate(this.value);
		}).keyup(function(e) {
            div.html( this.value.replace(/\n/g, "<br>") );
			if( height !=  this.scrollHeight ){
				$(this).height( this.scrollHeight ).css( "max-height", this.scrollHeight);
			}
		});
		textarea.focus();
        moveCaretToEnd(textarea[0])
		div.css("visibility","hidden");

	}

    function moveCaretToEnd(el) {
        if (typeof el.selectionStart == "number") {
            el.selectionStart = el.selectionEnd = el.value.length;
        } else if (typeof el.createTextRange != "undefined") {
            el.focus();
            var range = el.createTextRange();
            range.collapse(false);
            range.select();
        }
    }

	this.editText = function (element, afterUpdate){
		createTextArea( element, afterUpdate);
	};
};