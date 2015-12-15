define(["dojo/_base/array", "dojo/_base/lang", "dojo/has", "dojo/when",
	"dojo/Deferred", "dojo/query", "dojo/dom-class", "dijit/registry",
	"dojox/mobile/Button", "dojox/mobile/FormLayout",
	"dojox/mobile/TextArea", "aplanaHh/xhr/get", "aplanaHh/xhr/post", "aplanaHh/utils/dates", "dojo/on", "aplanaHh/utils/json", "aplanaHh/utils/fields", "aplanaHh/xhr/cache","aplanaHh/utils/messages"],
	function(array, lang, has, when, Deferred, query, domClass,
			 registry, Button, FormLayout, TextArea, xhrGet, xhrPost, utilDates, on, utilJson, utilFields, xhrCache, messages){
		var viewId="", uri="", saveUri="", closeUri="", view=null, startDateValue=null, presDateValue=null, endDateValue=null, startDate=null, presDate=null, endDate=null, informCheckedItems=[], cacheKey=null, informsUri="", informsCache=null, informsCacheKey=null, informCount=0, grants={};
		return {
			init: function() {
				// Параметры берем из настроек
				var domNode=this.domNode;
				viewId=this.name;
				view=this;
				uri=this.app.views[viewId].uri;
				saveUri=this.app.views[viewId].saveUri;
				closeUri=this.app.views[viewId].closeUri;
				cacheKey=this.app.views[viewId].cacheKey;
				informsUri=this.app.views[viewId].informsUri;
				informsCache=this.app.views[viewId].informsCache;
				informsCacheKey=this.app.views[viewId].informsCacheKey;
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
				on(view.presDate,"click",function(){
					view.presDatePicker.show(view.presDate.domNode,['above-centered','below-centered']);
				});
				// Обработка выбора даты окончания
				on(view.presDatePickerOk,"click",function(){
					view.presDatePicker.hide(true);
				});
				on(view.presDatePickerCancel,"click",function(){
					view.presDatePicker.hide(false);
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
				on(view.buttonClose,"click",function(){
					view.postForm(closeUri,{edited:grants.allowEdit?1:0},view.nls.progress.close,domNode);
				});
				// Открытие списка пользователей
				on(view.inform,"click",function(){
					var funcShow=function() {
						view.informsList.refresh();
						view.listInformPicker.show(view.inform.domNode,['above-centered','below-centered']);
						informCheckedItems=[];
					};
					var uri=informsUri+"?notId="+aplanaHh.params.user.id;
					if(!xhrCache.is(informsCacheKey,uri,informsCache)) {
						xhrGet({uri:uri,
							domNode: this.domNode,
							progress: view.nls.progress.users,
							viewId: viewId,
			 		 		load: function(data){
			 		 			if(data.items) {
									aplanaHh.loadedStores.agreements.setData(data.items);
									xhrCache.add(informsCacheKey,uri);
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
				on(view.listInformPickerOk,"click",function(){
					view.informsList.deselectAll();
					view.listInformPicker.hide(true);
				});
				on(view.listInformPickerCancel,"click",function(){
					view.informsList.deselectAll();
					view.listInformPicker.hide(false);
				});
			},
			beforeActivate: function(){
				view.applyGrants({});
				if(view.backButton && !view.backButton.target){
					view.backButton.target="sickMenu";
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
					
					if(startDate>endDate && endDate!=null) {
						endDate=utilFields.setDateFieldByObjectName(view.endDateId,view.endDate,{sickList:{startDate:view.startDateId.value}},"sickList.startDate");
					}
					if(startDate>presDate && presDate!=null) {
						presDate=utilFields.setDateFieldByObjectName(view.presDateId,view.presDate,{sickList:{startDate:view.startDateId.value}},"sickList.startDate");
					}
				}
			},
			setSelectedStartDate: function(node) {
				view.startDateSelector.set("value",view.startDateId.value);				
			},
			getSelectedPresDate: function(node, accept){
				if(accept === true){
					view.presDateId.value=view.presDateSelector.get("value");
					presDate=utilDates.datetime.create(view.presDateId.value);
					presDateValue=utilDates.date.format(utilDates.datetime.create(view.presDateSelector.get("value")));
					view.presDate.set("value",presDateValue);
					if(startDate>presDate) {
						startDate=utilFields.setDateFieldByObjectName(view.startDateId,view.startDate,{sickList:{presDate:view.presDateId.value}},"sickList.presDate");
					}
				}
			},
			setSelectedPresDate: function(node) {
				view.presDateSelector.set("value",view.presDateId.value);				
			},
			getSelectedEndDate: function(node, accept){
				if(accept === true){
					view.endDateId.value=view.endDateSelector.get("value");
					endDate=utilDates.datetime.create(view.endDateId.value);
					endDateValue=utilDates.date.format(utilDates.datetime.create(view.endDateSelector.get("value")));
					view.endDate.set("value",endDateValue);
					
					if(startDate>endDate) {
						startDate=utilFields.setDateFieldByObjectName(view.startDateId,view.startDate,{sickList:{endDate:view.endDateId.value}},"sickList.endDate");
					}
				}
			},
			setSelectedEndDate: function(node) {
				view.endDateSelector.set("value",view.endDateId.value?view.endDateId.value:view.presDateId.value);				
			},
			getSelectedInform: function(node, accept){
				if(accept === true){
					messages.clearAll(viewId);
					for(i in informCheckedItems){
						var o={id:null,user:informCheckedItems[i],status:{id:1}};
						if(view.checkInform(o)){
							view.addInform(o);
							informCount++;
						}
					}
				}
			},
			setSelectedInform: function(node) {
				
			},
			onCheckInform: function(item, checked) {
				setTimeout(function(){
					if(checked){
						informCheckedItems.push(item.itemSource);
					}
					else {
						for(i in informCheckedItems){
							if(informCheckedItems[i].id==item.itemSource.id) {
								delete informCheckedItems[i];
							}
						}
					}
				}, 500);				
			},
			clearInforms: function() {
				dojo.attr(view.informs,"innerHTML","");				
			},
			checkInform: function(inform) {
				var ex=false;
				dojo.query("input.inform-user-id",view.informs).forEach(function(inp) {
					if(inform.user.id==dojo.attr(inp,"value")){
						var p=dojo.attr(inp,"pos");
						var a=true;
						dojo.query("input.inform-active.pos-"+p,view.informs).forEach(function(nActive) {
							a=false;
						});
						ex=a;
					}
				});
				return !ex;
			},
			addInform: function(inform) {
				inform=inform||{};inform.user=inform.user||{};inform.status=inform.status||{id:1};
				var tr=dojo.create("tr", {id:"informRow"+informCount}, view.informs);
				var td=dojo.create("td", {}, tr);
				dojo.create("span", {"class":"inform-user-name","innerHTML":inform.user.label}, td);
				dojo.create("input", {"type":"hidden","class":"inform-id","name":"informs["+informCount+"].id","value":inform.id}, td);
				dojo.create("input", {"type":"hidden","class":"inform-user-id","name":"informs["+informCount+"].user.id","value":inform.user.id,"pos":informCount}, td);
				// Удаление
				if(grants.allowDeleteInforms || (grants.allowEditInforms && aplanaHh.params.user.id==inform.user.id)) {
					var a=dojo.create("a", {"href":"javascript:void(0);","inform":informCount,"class":"deleteIcon deleteInform","pos":informCount}, td);
					on(a,"click",function(){
						view.deleteInform(a);
					});
				}
			},
			deleteInform: function(a) {
		    	var ind=dojo.attr(a,"inform");
		    	var td=a.parentNode;
		    	dojo.query("span.inform-user-name,span.agr-approved,a.deleteInform",td).forEach(function(node) {
		        	dojo.destroy(node);
		    	});
				dojo.create("input", {"type":"hidden","class":"inform-active pos-"+ind,"name":"informs["+ind+"].isActive","value":"0"}, td);
			},
			postForm: function(uri,obj,progress,domNode) {
				obj=obj||{};
				var json=dojo.mixin(utilJson.formToJsonObject("sickDetailForm"),obj);
				console.debug(json);
			 	xhrPost({uri:uri,
			 		jsonObject: json,
			 		progress: progress,
			 		viewId: viewId,
			 		load: function(data){
			 			if(data.success){
							xhrCache.clear(cacheKey);
	 		 				aplanaHh.transitionToView(domNode, {
		                        target: "sickMenu"
		                    });
			 			}
			 	    },
			 	    error: function(error){
			 			console.debug(error);
			 	    }});
			},
			applyGrants : function(newGrants) {
				grants = newGrants;
				// Рдактирование полей
				view.startDate.set("disabled",!grants.allowEdit);
				view.presDate.set("disabled",!grants.allowEdit);
				view.endDate.set("disabled",!grants.allowEdit);
				view.inform.set("disabled",!grants.allowEditInforms);
				view.comment.set("disabled",!grants.allowEditComment);
				// Видимость кнопок
				utilFields.fieldVisible(view.buttonSave,grants.allowSave);
				utilFields.fieldVisible(view.buttonClose,grants.allowClose);
			},
			fillData : function(sick) {
				sick=sick||{};
				sick.additionals=sick.additionals||{};
				//
				console.debug(sick);
				// Разрешения
				view.applyGrants(sick.additionals);
				// Заполняем значения
				utilFields.setFieldByObjectName(view.id,sick,"sickList.id");
				utilFields.setFieldByObjectName(view.version,sick,"sickList.version");
				utilFields.setFieldByObjectName(view.userId,sick,"sickList.user.id");
				utilFields.setFieldByObjectName(view.userLabel,sick,"sickList.user.label");
				utilFields.setFieldByObjectName(view.type,sick,"sickList.type.id");
				utilFields.setFieldByValue(view.comment,"");
				// Даты
				startDate=utilFields.setDateFieldByObjectName(view.startDateId,view.startDate,sick,"sickList.startDate");
				presDate=utilFields.setDateFieldByObjectName(view.presDateId,view.presDate,sick,"sickList.presDate");
				endDate=utilFields.setDateFieldByObjectName(view.endDateId,view.endDate,sick,"sickList.endDate");
				// Согласующие
				view.clearInforms();
				informCount=0;
				if(sick.informs && sick.informs.length>0){
					for(i in sick.informs){
						view.addInform(sick.informs[i]);
						informCount++;
					}
				}
				// История
				view.history._setHistoryList(sick.histories);
				utilFields.fieldVisible(view.listHistory,(sick.histories && sick.histories.length>0));
			}
		};
});