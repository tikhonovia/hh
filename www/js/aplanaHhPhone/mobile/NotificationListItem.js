define([
	"dojo/_base/declare",
	"dojo/_base/lang", "aplanaHh/utils/dates", "dojox/mobile/ListItem", "dijit/_TemplatedMixin"
], function(declare, lang, utilDates, ListItem, TemplatedMixin){

	return declare("aplanaHh.mobile.NotificationListItem", [ListItem, TemplatedMixin],{
		variableHeight: true,
		templateString: "<div><div data-dojo-attach-point='labelNode'></div><div class='notification-list' data-dojo-attach-point='labelNotificationList'></div></div>",
		startup: function(){
			this.inherited(arguments);
		},
		_setNotificationList: function(notifications){
			this.labelNotificationList.innerHTML="";
			if(notifications!=null && notifications.length){
				var html="<ul>";
				for(i in notifications){
					html+="<li notification-id=\""+notifications[i].id+"\">"+notifications[i].label+"</li>";
				}
				html+="</ul>";
				this.labelNotificationList.innerHTML=html;
			}
		},
	});
});
