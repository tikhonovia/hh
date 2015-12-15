define([
	"dojo/_base/declare",
	"dojo/_base/lang", "aplanaHh/utils/dates", "dojox/mobile/ListItem", "dijit/_TemplatedMixin"
], function(declare, lang, utilDates, ListItem, TemplatedMixin){

	return declare("aplanaHh.mobile.ManagerListItem", [ListItem, TemplatedMixin],{
		variableHeight: true,
		managerLabel: "",
		managerPhone: "",
		templateString: "<div><div data-dojo-attach-point='labelNode'></div><div class='manager-label' data-dojo-attach-point='labelManager'></div><div class='manager-phone' data-dojo-attach-point='labelManagerPhone'></div></div>",
		startup: function(){
			this.inherited(arguments);
		},
		_setManagerLabel: function(lbl){
			this.managerLabel=lbl;
			this.labelManager.innerHTML=lbl;
		},
		_setManagerPhone: function(phone){
			this.managerPhone=phone;
			this.labelManagerPhone.innerHTML=phone;
		}
	});
});
