define([
	"dojo/_base/declare",
	"dojo/_base/lang", "aplanaHh/utils/dates", "dojox/mobile/ListItem", "dijit/_TemplatedMixin", "aplanaHh/utils/dates"
], function(declare, lang, utilDates, ListItem, TemplatedMixin, utilDates){

	return declare("aplanaHh.mobile.SicksListItem", [ListItem, TemplatedMixin],{
		variableHeight: true,
		withUser: true,
		backView: "",
		templateString: "<div><div data-dojo-attach-point='labelNode'></div><div class='sick-list' data-dojo-attach-point='labelSickList'></div></div>",
		startup: function(){
			this.inherited(arguments);
		},
		_setSickList: function(sicks){
			var listItem=this;
			this.labelSickList.innerHTML="";
			if(sicks!=null && sicks.length){
				var html="<ul>";
				for(i in sicks){
					var sick=sicks[i];
					var start=utilDates.date.format(utilDates.datetime.create(sick.startDate));
					var end="";
					if(sick.endDate){
						end=utilDates.date.format(utilDates.datetime.create(sick.endDate));
					}
					else {
						end=utilDates.date.format(utilDates.datetime.create(sick.presDate));
					}
					html+="<li sick-id=\""+sick.id+"\"><a class=\"sick-open-link\" sick-id=\""+sick.id+"\" href=\"javascript:void(0);\">";
					if(this.withUser){
						html+="<div class=\"sick-user\">"+sick.user.label+"</div>";
					}
					html+="<div class=\"sick-detail\">"+sick.type.label+" "+start+"-"+end+", "+sick.status.label+"</div></a></li>";
				}
				html+="</ul>";
				this.labelSickList.innerHTML=html;
				dojo.query("a.sick-open-link",this.labelSickList).forEach(function(a){
					dojo.connect(a,"onclick",function(){
						listItem._openSick(a,listItem);
					});
				});
			}
		},
		_openSick: function(a,listItem) {
			var id=dojo.attr(a,"sick-id");
			aplanaHh.transitionToView(a, {
	            target: "sickDetail",
                params: {
                    id: id,
                    back: listItem.backView
                }
	        });
		}
	});
});
