define([
	"dojo/_base/declare",
	"dojo/_base/lang", "aplanaHh/utils/dates", "dojox/mobile/ListItem", "dijit/_TemplatedMixin"
], function(declare, lang, utilDates, ListItem, TemplatedMixin){

	return declare("aplanaHh.mobile.DescriptionListItem", [ListItem, TemplatedMixin],{
		variableHeight: true,
		clickable: true,
		description: "",
		templateString: "<div><div data-dojo-attach-point='labelNode'></div><div class='item-description' data-dojo-attach-point='labelDescription'></div></div>",
		startup: function(){
			this.inherited(arguments);
			this._setDescription(this.description);
		},
		_setDescription: function(descr){
			this.labelDescription.innerHTML=descr;
			this.description=descr;
		},
	});
});
