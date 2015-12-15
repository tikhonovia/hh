define([
	"dojo/_base/declare",
	"dojo/_base/lang", "aplanaHh/utils/dates", "dojox/mobile/ListItem", "dijit/_TemplatedMixin", "aplanaHh/utils/dates", "aplanaHh/utils/json", "aplanaHh/xhr/post"
], function(declare, lang, utilDates, ListItem, TemplatedMixin, utilDates, utilJson, xhrPost){

	return declare("aplanaHh.mobile.VacationsListItem", [ListItem, TemplatedMixin],{
		variableHeight: true,
		withUser: true,
		allowDelete: false,
		backView: "",
		deleteUrl: "vacation/delete",
		templateString: "<div><div data-dojo-attach-point='labelNode'></div><div class='vacation-list' data-dojo-attach-point='labelVacationList'></div></div>",
		startup: function(){
			this.inherited(arguments);
		},
		defaultClickAction: function(/*Event*/e){
			
			console.debug("clicked");
			// summary:
			//		The default action of this item.
			this.handleSelection(e);
			if(this.userClickAction(e) === false){ return; } // user's click action
			this.makeTransition(e);
		},
		_setVacationList: function(vacations){
			var listItem=this;
			this.labelVacationList.innerHTML="";
			if(vacations!=null && vacations.length){
				var html="<ul>";
				for(i in vacations){
					var vac=vacations[i];
					var start=utilDates.date.format(utilDates.datetime.create(vac.startDate));
					var end=utilDates.date.format(utilDates.datetime.create(vac.endDate));
					html+="<li>";
					html+="<a class=\"vacation-open-link\" vacation-id=\""+vac.id+"\" href=\"javascript:void(0);\">";
					if(this.withUser){
						html+="<div class=\"vacation-user\">"+vac.user.label+"</div>";
					}
					html+="<div class=\"vacation-detail\">"+vac.type.label+" "+start+"-"+end+"</div></a>";
					if(this.allowDelete){
						html+="<a href=\"javascript:void(0);\" vacation-id=\""+vac.id+"\" class=\"deleteIcon deleteVacation\"></a>";
					}
					html+="</li>";
				}
				html+="</ul>";
				this.labelVacationList.innerHTML=html;
				dojo.query("a.vacation-open-link",this.labelVacationList).forEach(function(a){
					dojo.connect(a,"onclick",function(){
						listItem._openVacation(a,listItem);
					});
				});
				dojo.query("a.deleteVacation",this.labelVacationList).forEach(function(a){
					dojo.connect(a,"onclick",function(){
						listItem._deleteVacation(a,listItem);
					});
				});
			}
		},
		_openVacation: function(a,listItem) {
			var id=dojo.attr(a,"vacation-id");
			aplanaHh.transitionToView(a, {
	            target: "vacationDetail",
                params: {
                    id: id,
                    back: listItem.backView
                }
	        });
		},
		onDeleteVacation: function(id,json) {
			
		},
		_deleteVacation: function(a,listItem) {
			var id=dojo.attr(a,"vacation-id");
			var json=utilJson.objectToJsonObject({"vacationLists[0].id":id});
			this.onDeleteVacation(id,json);
		}
	});
});
