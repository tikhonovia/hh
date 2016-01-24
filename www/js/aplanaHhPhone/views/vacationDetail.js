define(["dojo/_base/array", "dojo/_base/lang", "dojo/has", "dojo/when",
	"dojo/Deferred", "dojo/query", "dojo/dom-class", "dijit/registry",
	"dojox/mobile/Button", "dojox/mobile/FormLayout",
	"dojox/mobile/TextArea", "aplanaHh/xhr/get", "aplanaHh/xhr/post", "aplanaHh/utils/dates", "dojo/on", "aplanaHh/utils/json", "aplanaHh/utils/fields", "aplanaHh/xhr/cache","aplanaHh/utils/messages"],
	function(array, lang, has, when, Deferred, query, domClass,
			 registry, Button, FormLayout, TextArea, xhrGet, xhrPost, utilDates, on, utilJson, utilFields, xhrCache, messages){
		var viewId="", uri="", agreementUri="", rejectUri="", saveUri="", toAgreementUri="", view=null, startDateValue=null, endDateValue=null, startDate=null, endDate=null, aggrCheckedItems=[], cacheKey=null, aggrsUri="", aggrsCache=null, aggrsCacheKey=null, calcWorkdaysUri=null, agreementCount=0, grants={};
		return {
			init: function() {
				// Параметры берем из настроек
				var domNode=this.domNode;
				viewId=this.name;
				view=this;
				uri=this.app.views[viewId].uri;
				agreementUri=this.app.views[viewId].agreementUri;
				rejectUri=this.app.views[viewId].rejectUri;
				saveUri=this.app.views[viewId].saveUri;
				toAgreementUri=this.app.views[viewId].toAgreementUri;
				cacheKey=this.app.views[viewId].cacheKey;
				aggrsUri=this.app.views[viewId].aggrsUri;
				aggrsCache=this.app.views[viewId].aggrsCache;
				aggrsCacheKey=this.app.views[viewId].aggrsCacheKey;
				calcWorkdaysUri=this.app.views[viewId].calcWorkdaysUri;
				// Поиск по вхождению, а не началу
				var filterBox = this.aggrsList.getFilterBox();
				filterBox.set("queryExpr", "*${0}*");
				// Открытие выбора даты начала
				on(view.startDate,"click",function(){
					view.startDatePicker.show(view.startDate.domNode,['above-centered','below-centered']);
				});
				// Обработка выбора даты начала
				on(view.startDatePickerOk,"click",function(){
					view.startDatePicker.hide(true);
				});
				on(view.startDatePickerCancel,"click",function(){
					view.startDatePicker.hide(false);
				});
				// Открытие выбора даты окончания
				on(view.endDate,"click",function(){
					view.endDatePicker.show(view.endDate.domNode,['above-centered','below-centered']);
				});
				// Обработка выбора даты окончания
				on(view.endDatePickerOk,"click",function(){
					view.endDatePicker.hide(true);
				});
				on(view.endDatePickerCancel,"click",function(){
					view.endDatePicker.hide(false);
				});
				on(view.buttonSave,"click",function(){
					view.postForm(saveUri,{edited:grants.allowEdit?1:0},view.nls.progress.save,domNode);
				});
				on(view.buttonToAgreement,"click",function(){
					view.postForm(toAgreementUri,{edited:grants.allowEdit?1:0},view.nls.progress.toAgreement,domNode);
				});
				on(view.buttonReject,"click",function(){
					view.postForm(rejectUri,{edited:0},view.nls.progress.reject,domNode);
				});
				on(view.buttonAgreement,"click",function(){
					view.postForm(agreementUri,{edited:0},view.nls.progress.agreement,domNode);
				});
				// Открытие списка пользователей
				on(view.agreement,"click",function(){
					var funcShow=function() {
						view.aggrsList.refresh();
						view.listAggrPicker.show(view.agreement.domNode,['above-centered','below-centered']);
						aggrCheckedItems=[];
					};
					var uri=aggrsUri+"?notId="+aplanaHh.params.user.id;
					if(!xhrCache.is(aggrsCacheKey,uri,aggrsCache)) {
						xhrGet({uri:aggrsUri,
							domNode: this.domNode,
							progress: view.nls.progress.users,
							viewId: viewId,
			 		 		load: function(data){
			 		 			if(data.items) {
									aplanaHh.loadedStores.agreements.setData(data.items);
									xhrCache.add(aggrsCacheKey,uri);
									//
									funcShow();
			 		 			}
			 		 	    },
			 		 	    error: function(error){
			 		 			console.debug(error);
			 		 	    }});
					}
					else {
						funcShow();
					}
				});
				// Обработка выбора сотрудника
				on(view.listAggrPickerOk,"click",function(){
					view.aggrsList.deselectAll();
					view.listAggrPicker.hide(true);
				});
				on(view.listAggrPickerCancel,"click",function(){
					view.aggrsList.deselectAll();
					view.listAggrPicker.hide(false);
				});
			},
			beforeActivate: function(){
				view.applyGrants({});
				if(view.backButton && !view.backButton.target){
					view.backButton.target="vacationMenu";
				}
				xhrGet({uri:uri,
					domNode: this.domNode,
					progress: view.nls.progress.base,
			 		viewId: viewId,
			 		//sync: true,
			 		content: this.params,
	 		 		load: function(data){
	 		 			view.fillData(data);
	 		 		},
	 		 	    error: function(error){
	 		 			view.fillData(null);
	 		 	    }});
			},
			getSelectedStartDate: function(node, accept){
				if(accept === true){
					view.startDateId.value=view.startDateSelector.get("value");
					startDate=utilDates.datetime.create(view.startDateId.value);
					startDateValue=utilDates.date.format(utilDates.datetime.create(view.startDateSelector.get("value")));
					view.startDate.set("value",startDateValue);
					
					if(startDate>endDate) {
						endDate=utilFields.setDateFieldByObjectName(view.endDateId,view.endDate,{vacationList:{startDate:view.startDateId.value}},"vacationList.startDate");
					}
					view.refreshWorkDays();
				}
			},
			setSelectedStartDate: function(node) {
				view.startDateSelector.set("value",view.startDateId.value);				
			},
			getSelectedEndDate: function(node, accept){
				if(accept === true){
					view.endDateId.value=view.endDateSelector.get("value");
					endDate=utilDates.datetime.create(view.endDateId.value);
					endDateValue=utilDates.date.format(utilDates.datetime.create(view.endDateSelector.get("value")));
					view.endDate.set("value",endDateValue);
					
					if(startDate>endDate) {
						startDate=utilFields.setDateFieldByObjectName(view.startDateId,view.startDate,{vacationList:{endDate:view.endDateId.value}},"vacationList.endDate");
					}
					view.refreshWorkDays();
				}
			},
			setSelectedEndDate: function(node) {
				view.endDateSelector.set("value",view.endDateId.value);				
			},
			getSelectedAggr: function(node, accept){
				if(accept === true){
					messages.clearAll(viewId);
					for(i in aggrCheckedItems){
						var o={id:null,user:aggrCheckedItems[i],status:{id:1}};
						if(view.checkAgreement(o)){
							view.addAgreement(o);
							agreementCount++;
						}
					}
				}
			},
			setSelectedAggr: function(node) {
				
			},
			onCheckAggr: function(item, checked) {
				setTimeout(function(){
					if(checked){
						aggrCheckedItems.push(item.itemSource);
					}
					else {
						for(i in aggrCheckedItems){
							if(aggrCheckedItems[i].id==item.itemSource.id) {
								delete aggrCheckedItems[i];
							}
						}
					}
				}, 500);				
			},
			refreshWorkDays: function() {
				xhrGet({uri:calcWorkdaysUri,
					domNode: this.domNode,
					viewId: viewId,
					content: {start:view.startDateId.value,end:view.endDateId.value},
	 		 		load: function(data){
	 					utilFields.setFieldByObjectName(view.workDays,data,"data.workDays");
	 		 	    },
	 		 	    error: function(error){
	 		 			console.debug(error);
	 		 	    }});
			},
			clearAgreements: function() {
				dojo.attr(view.agreements,"innerHTML","");				
			},
			checkAgreement: function(aggr) {
				var ex=false;
				dojo.query("input.aggr-user-id",view.agreements).forEach(function(inp) {
					if(aggr.user.id==dojo.attr(inp,"value")){
						var p=dojo.attr(inp,"pos");
						var a=true;
						dojo.query("input.aggr-active.pos-"+p,view.agreements).forEach(function(nActive) {
							a=false;
						});
						ex=a;
					}
				});
				return !ex;
			},
			addAgreement: function(aggr) {
				aggr=aggr||{};aggr.user=aggr.user||{};aggr.status=aggr.status||{id:1};
				var tr=dojo.create("tr", {id:"aggrRow"+agreementCount}, view.agreements);
				var td=dojo.create("td", {}, tr);
				dojo.create("span", {"class":"aggr-user-name","innerHTML":aggr.user.label}, td);
				if(aplanaHh.params.constants.vacation.status.approved==aggr.status.id){
					dojo.create("span", {"class":"agr-approved","innerHTML":"("+view.nls.agreement.approved+")"}, td);
				}
				if(aplanaHh.params.constants.vacation.status.rejected==aggr.status.id){
					dojo.create("span", {"class":"agr-rejected","innerHTML":"("+view.nls.agreement.rejected+")"}, td);
				}
				dojo.create("input", {"type":"hidden","class":"aggr-id","name":"agreements["+agreementCount+"].id","value":aggr.id}, td);
				dojo.create("input", {"type":"hidden","class":"aggr-user-id","name":"agreements["+agreementCount+"].user.id","value":aggr.user.id,"pos":agreementCount}, td);
				// Удаление
				if(grants.allowDeleteAgreements || (grants.allowEditAgreements && aplanaHh.params.user.id==aggr.user.id)) {
					var a=dojo.create("a", {"href":"javascript:void(0);","aggr":agreementCount,"class":"deleteIcon deleteAggr","pos":agreementCount}, td);
					on(a,"click",function(){
						view.deleteAgreement(a);
					});
				}
			},
			deleteAgreement: function(a) {
		    	var ind=dojo.attr(a,"aggr");
		    	var td=a.parentNode;
		    	dojo.query("span.aggr-user-name,span.agr-approved,a.deleteAggr",td).forEach(function(node) {
		        	dojo.destroy(node);
		    	});
				dojo.create("input", {"type":"hidden","class":"aggr-active pos-"+ind,"name":"agreements["+ind+"].isActive","value":"0"}, td);
			},
			postForm: function(uri,obj,progress,domNode) {
				obj=obj||{};
				var json=dojo.mixin(utilJson.formToJsonObject("vacationDetailForm"),obj);
			 	xhrPost({uri:uri,
			 		jsonObject: json,
			 		progress: progress,
			 		viewId: viewId,
			 		load: function(data){
			 			if(data.success){
							xhrCache.clear(cacheKey);
	 		 				aplanaHh.transitionToView(domNode, {
		                        target: "vacationMenu"
		                    });
			 			}
			 	    },
			 		onShowError: function(){
			 			view.scrollableView.scrollTo({x:0,y:0});
			 		},
			 	    error: function(error){
			 			console.debug(error);
			 	    }});
			},
			applyGrants : function(newGrants) {
				grants = newGrants;
				// Рдактирование полей
				view.vacationDetailType1.set("disabled",!grants.allowEditType);
				view.vacationDetailType2.set("disabled",!grants.allowEditType);
				view.startDate.set("disabled",!grants.allowEdit);
				view.endDate.set("disabled",!grants.allowEdit);
				view.agreement.set("disabled",!grants.allowEditAgreements);
				view.comment.set("disabled",!grants.allowEditComment);
				view.createAppointment.set("disabled",!grants.allowEditExchange);
				// Видимость кнопок
				utilFields.fieldVisible(view.buttonAgreement,grants.allowAgreement);
				utilFields.fieldVisible(view.buttonReject,grants.allowReject);
				utilFields.fieldVisible(view.buttonSave,grants.allowSave);
				utilFields.fieldVisible(view.buttonToAgreement,grants.allowToAgreement);
				utilFields.fieldVisible(view.buttonRegister,grants.allowRegister);
			},
			fillData : function(vacation) {
				vacation=vacation||{};
				vacation.additionals=vacation.additionals||{};
				// Разрешения
				view.applyGrants(vacation.additionals);
				// Заполняем значения
				utilFields.setFieldByObjectName(view.balanceDays,vacation,"additionals.balanceDays");
				utilFields.setFieldByObjectName(view.experience,vacation,"additionals.experience");
				// Тип
				if(!vacation.vacationList.type){
					vacation.vacationList.type={id:1};
				}
				utilFields.fieldCheck(view.vacationDetailType1,vacation,"vacationList.type.id",1);
				utilFields.fieldCheck(view.vacationDetailType2,vacation,"vacationList.type.id",2);
				// Видимость поля ID
				utilFields.fieldVisible(view.divId,(vacation.vacationList && vacation.vacationList.id));
				// Заполняем значения
				utilFields.setFieldByObjectName(view.id,vacation,"vacationList.id");
				utilFields.setFieldByObjectName(view.version,vacation,"vacationList.version");
				utilFields.setFieldByObjectName(view.userId,vacation,"vacationList.user.id");
				utilFields.setFieldByObjectName(view.userLabel,vacation,"vacationList.user.label");
				utilFields.setFieldByValue(view.comment,"");
				// Даты
				startDate=utilFields.setDateFieldByObjectName(view.startDateId,view.startDate,vacation,"vacationList.startDate");
				endDate=utilFields.setDateFieldByObjectName(view.endDateId,view.endDate,vacation,"vacationList.endDate");
				utilFields.setFieldByObjectName(view.workDays,vacation,"vacationList.workDays");
				// Флажки
				utilFields.fieldCheck(view.createAppointment,vacation,"vacationList.createAppointment",true);
				// Согласующие
				view.clearAgreements();
				agreementCount=0;
				if(vacation.agreements && vacation.agreements.length>0){
					for(i in vacation.agreements){
						view.addAgreement(vacation.agreements[i]);
						agreementCount++;
					}
				}
				// История
				view.history._setHistoryList(vacation.histories);
				utilFields.fieldVisible(view.listHistory,(vacation.histories && vacation.histories.length>0));
			}
		};
});