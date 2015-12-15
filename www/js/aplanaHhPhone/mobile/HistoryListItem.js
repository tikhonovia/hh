define([
	"dojo/_base/declare",
	"dojo/_base/lang", "aplanaHh/utils/dates", "dojox/mobile/ListItem", "dijit/_TemplatedMixin", "aplanaHh/utils/dates"
], function(declare, lang, utilDates, ListItem, TemplatedMixin, utilDates){

	return declare("aplanaHh.mobile.HistoryListItem", [ListItem, TemplatedMixin],{
		variableHeight: true,
		withUser: true,
		backView: "",
		templateString: "<div><div data-dojo-attach-point='labelNode'></div><div class='history-list' data-dojo-attach-point='labelHistoryList'></div></div>",
		startup: function(){
			this.inherited(arguments);
		},
		_setHistoryList: function(histories){
			this.labelHistoryList.innerHTML="";
			if(histories!=null && histories.length){
				var html="<ul>";
				for(i in histories){
					var history=histories[i];
					var changeDate=utilDates.datetime.format(utilDates.datetime.create(history.changeDate));
					html+="<li>";
					html+="<div class=\"history-item\">"+history.user.label+", "+changeDate+", "+history.status.label+"</div>";
					if(history.comment){
						html+="<div class=\"history-comment\">"+history.comment+"</div>";
					}
					html+="</li>";
				}
				html+="</ul>";
				this.labelHistoryList.innerHTML=html;
			}
		}
	});
});
