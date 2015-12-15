define([
	"dojo/_base/declare",
	"aplanaHh/mobile/EdgeToEdgeStoreList",
	"dojo/_base/lang", "aplanaHh/utils/dates", "dojox/mobile/ListItem", "dijit/_TemplatedMixin"
], function(declare, EdgeToEdgeStoreList, lang, utilDates, ListItem, TemplatedMixin){

	// module:
	//		dojox/mobile/EdgeToEdgeStoreList

	var VacationItem = declare([ListItem, TemplatedMixin], {
		target: "vacationDetail",
		clickable: true,
		variableHeight: true,
		postMixInProperties: function(){
			this.inherited(arguments);
			this.transitionOptions = {
				params: {
					"id" : this.itemSource.id
				}
			};
		},
		templateString: "<div><div data-dojo-attach-point='labelNode'></div><div class='vacation-period'>${itemSource.startDateStr} - ${itemSource.endDateStr} (рабочих дней: ${itemSource.workDays})</div><div class='vacation-type'>${itemSource.type.label}</div><div class='vacation-status'>${itemSource.status.label}</div></div>",
		startup: function() {
			this.inherited(arguments);
		}
	});
	
	return declare("aplanaHh.mobile.VacationStoreList", [EdgeToEdgeStoreList],{
		itemRenderer: VacationItem,
		processItem: function(item) {
			// Подпись
			item.label = item.id+". "+item.user.label;
			// Даты
			if(item.startDate) {
				item.startDateStr=utilDates.date.format(utilDates.datetime.create(item.startDate));
			}
			if(item.endDate) {
				item.endDateStr=utilDates.date.format(utilDates.datetime.create(item.endDate));
			}
		}
	});
});
