define(["dojo/_base/array", "dojo/_base/lang", "dojo/has", "dojo/when",
	"dojo/Deferred", "dojo/query", "dojo/dom-class", "dijit/registry",
	"dojox/mobile/Button", "dojox/mobile/FormLayout",
	"dojox/mobile/TextArea", "aplanaHh/xhr/get", "aplanaHh/utils/dates", "dojo/on", "aplanaHh/xhr/cache",
	"dojo/dom-form", "aplanaHh/xhr/post", "aplanaHh/utils/json","aplanaHh/utils/messages", "aplanaHh/utils/fields",
	"aplanaHh/utils/currentUser"],
	function(array, lang, has, when, Deferred, query, domClass,
			 registry, Button, FormLayout, TextArea, xhrGet, utilDates, on, xhrCache, domForm, xhrPost, utilsJson,messages,utilFields,currentUser){
		var viewId="", usersUri="", uri="", cache="", cacheKey="", view=null, userCheckedItem={}, calcDateValue=null;
		return {
			init: function() {
				// Параметры берем из настроек
				viewId=this.name;
				view=this;
				uri=this.app.views[viewId].uri;
				usersUri=this.app.views[viewId].usersUri;
				cache=this.app.views[viewId].cache;
				cacheKey=this.app.views[viewId].cacheKey;
				// Открытие списка пользователей
				on(view.userLabel,"click",function(){
					var funcShow=function() {
						view.listUserPicker.show(view.userLabel.domNode,['above-centered','below-centered']);
					};
					if(!xhrCache.is(cacheKey,usersUri,cache)) {
						xhrGet({uri:usersUri,
							domNode: this.domNode,
							progress: view.nls.progress,
							viewId: viewId,
			 		 		load: function(data){
			 		 			if(data.items) {
									aplanaHh.loadedStores.users.setData(data.items);
									view.usersList.refresh();
									xhrCache.add(cacheKey,usersUri);
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
				// Открытие выбора даты
				on(view.calcDate,"click",function(){
					view.calcDatePicker.show(view.calcDate.domNode,['above-centered','below-centered']);
				});
				// Обработка выбора даты
				on(view.calcDatePickerOk,"click",function(){
					view.calcDatePicker.hide(true);
				});
				on(view.calcDatePickerCancel,"click",function(){
					view.calcDatePicker.hide(false);
				});
				// Обработка выбора сотрудника
				on(view.listUserPickerOk,"click",function(){
					view.listUserPicker.hide(true);
				});
				on(view.listUserPickerCancel,"click",function(){
					view.listUserPicker.hide(false);
				});
				on(view.calcButton,"click",function(){
					var formObj = utilsJson.formToJsonObject("vacationCalcForm");
					if(formObj.calcDate){
						formObj.calcDate=utilDates.datetime.json(formObj.calcDate);
					}
				 	xhrPost({uri:uri,
						domNode: this.domNode,
				 		jsonObject: formObj,
				 		progress: view.nls.calcProgress,
				 		viewId: viewId,
				 		load: function(data){
				 			if(data.success===true){
					 			if(data.messages){
				 					messages.addMessages(viewId,data.messages);
					 			}
								view.balance.set("value",data.data.balanceDays);
				 			}
				 	    },
				 	    error: function(error){
				 			console.debug(error);
				 	    }});
				});
			},
			beforeActivate: function(){
				if(!calcDateValue){
					calcDateValue=utilDates.date.format(new Date());
					view.calcDate.set("value",calcDateValue);
				}
				currentUser.get(viewId,this.domNode,null,function(user){
					if(user.id) {
						utilFields.setFieldByObjectName(view.userId,user,"id");
						utilFields.setFieldByObjectName(view.userLabel,user,"fullName");
					}
				});
				view.userLabel.set("disabled",true);
			},
			getSelectedUser: function(node, accept){
				if(accept === true){
					view.userId.value=userCheckedItem.id;
					view.userLabel.set("value",userCheckedItem.label);
					view.balance.set("value","");
					messages.clearAll(viewId);
				}
			},
			setSelectedUser: function(node) {
				
			},
			getSelectedCalcDate: function(node, accept){
				if(accept === true){
					calcDateValue=utilDates.date.format(utilDates.datetime.create(view.calcDateSelector.get("value")));
					view.calcDate.set("value",calcDateValue);
					view.balance.set("value","");
					messages.clearAll(viewId);
				}
			},
			setSelectedCalcDate: function(node) {
				
			},
			onCheckUser: function(item, checked) {
				setTimeout(function(){
					if(checked){
						userCheckedItem = item.itemSource;
					}
				}, 500);				
			}
		};
});