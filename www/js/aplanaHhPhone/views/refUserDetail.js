define(["dojo/_base/array", "dojo/_base/lang", "dojo/has", "dojo/when",
	"dojo/Deferred", "dojo/query", "dojo/dom-class", "dijit/registry",
	"dojox/mobile/Button", "dojox/mobile/FormLayout",
	"dojox/mobile/TextArea", "aplanaHh/xhr/get", "aplanaHh/utils/dates", "aplanaHh/utils/fields", "dojo/on"],
	function(array, lang, has, when, Deferred, query, domClass,
			 registry, Button, FormLayout, TextArea, xhrGet, utilDates, utilFields, on){
		var viewId="", uri="", cache="", view=null;
		var fillData = function(user) {
			// Заполняем значения
			utilFields.setFieldByObjectName(view.fullName,user,"fullName");
			utilFields.setFieldByObjectName(view.position,user,"position");
			utilFields.setFieldByObjectName(view.department,user,"department");
			utilFields.setFieldByObjectName(view.manager,user,"manager.fullName");
			utilFields.setFieldByObjectName(view.mobilePhone,user,"mobilePhone");
			utilFields.setFieldByObjectName(view.homePhone,user,"homePhone");
			utilFields.setFieldByObjectName(view.workPhone,user,"workPhone");
			utilFields.setFieldByObjectName(view.eMail,user,"eMail");

			/*
			view.sex.set("value",
					(user && user.sex) ? view.nls.sex[user.sex] : null);
			view.birthDay.set("value",
					(user && user.birthDay) ? user.birthDay : null);
			*/
			//
			/*
			view.userStatus.set("value",
					(user && user.userStatus) ? user.userStatus : null);
			view.tabNo.set("value",
					(user && user.tabNo) ? user.tabNo : null);
			view.workBegin.set("value",
					(user && user.workBegin) ? user.workBegin : null);
			view.firstWorkBegin.set("value",
					(user && user.firstWorkBegin) ? user.firstWorkBegin : null);
			view.dismissDate.set("value",
					(user && user.dismissDate) ? user.dismissDate : null);
			*/
			/*
			view.positionBegin.set("value",
					(user && user.positionBegin) ? user.positionBegin : null);
			*/
			/*
			view.balanceDays.set("value",
					(user && user.balanceDays) ? user.balanceDays : null);
			*/
			//
		};
		return {
			user: {},
			init: function() {
				// Параметры берем из настроек
				viewId=this.name;
				view=this;
				uri=this.app.views[viewId].uri;
				//
				on(view.buttonCall,"click",function(){
					var mobilePhone=user.mobilePhone;
					if(mobilePhone){
						mobilePhone=mobilePhone.replace(/[^\d+]/g, '');
					}
					if(mobilePhone){
						window.open('tel:'+mobilePhone, '_system');
					}
				});
			},
			beforeActivate: function(){
				xhrGet({uri:uri,
					domNode: this.domNode,
					progress: view.nls.progress,
			 		viewId: viewId,
			 		//sync: true,
			 		content: this.params,
	 		 		load: function(data){
	 		 			user = data.data;
	 		 			fillData(data.data);
	 		 		},
	 		 	    error: function(error){
	 		 			console.debug(error);
	 		 			user = {};
	 		 			fillData(null);
	 		 	    }});
			},
			_beforeActivate: function(user){
				
				console.debug(user);
				
				// get the id of the displayed contact from the params if
				// we don't have a contact or from the contact if we have
				// one
				if(user){
					this.params.id = user.id;
				}
				var id = this.params.id;
	
				// are we in edit mode or not? if we are we need to
				// slightly update the view for that
				var edit = this.params.edit;
				// are we in create mode
				var create = (typeof id === "undefined");
				// change widgets readonly value based on that
				query("input", this.domNode).forEach(function(node){
					registry.byNode(node).set("readOnly", !edit);
				});
				// in edit mode change the label and params of the
				// edit button
				this.editButton.set("label",
					edit?this.nls.ok:this.nls.edit);
				// put a listener to save the form when we are editing if
				// there is not one already
				if(!this._onHandler && edit){
					this._onHandler = this.editButton.on("click",
						lang.hitch(this, this._saveForm));
				}else if(this._onHandler && !edit){
					this._onHandler.remove();
					this._onHandler = null;
				}
				var editButtonOptions =
					this.editButton.transitionOptions;
				editButtonOptions.params.edit = !edit;
				// also update the edit & ok button to reference the
				// currently displayed item
				editButtonOptions.params.id = id;
				var cancelButtonOptions =
					this.cancelButton.transitionOptions;
				if(create){
					// if we cancel we want to go back to main view
					cancelButtonOptions.target = "list";
					if(cancelButtonOptions.params.id){
						delete cancelButtonOptions.params.id;
					}
				}else{
					cancelButtonOptions.target = "details";
					cancelButtonOptions.params.id = id;
				}
				// hide back button in edit mode
				if(edit){
					domClass.add(this.backButton.domNode, "hidden");
					domClass.remove(this.formLayout.domNode,
						"mblFormLayoutReadOnly");
				}else{
					domClass.remove(this.backButton.domNode, "hidden");
					domClass.add(this.formLayout.domNode,
						"mblFormLayoutReadOnly");
				}
				// cancel button must be shown in edit mode only,
				// same for delete button if we are not creating a
				// new contact
				this.cancelButton.domNode.style.display = edit?"":"none";
	
				// let's fill the form with the currently selected contact
				// if nothing selected skip that part
				var view = this;
				var promise = null;
				if(!create && !user){
					id = id.toString();
					// get the contact on the store
					promise = this.loadedStores.users.get(id);
				}else{
					promise = user;
				}
				when(promise, function(user){
					view.label.set("value",
						user ? user.label : null);
					if(user){
						// hide empty fields when not in edit mode
						if(!edit){
							view._hideEmptyFields(view);
						}
					}
				});
			},
			_saveForm: function(){
				var id = this.params.id, view = this;
				view._savePromise = new Deferred();
				if(typeof id === "undefined"){
					view._createContact();
				}else{
					// get the contact on the store
					var promise =
						this.loadedStores.contacts.get(id.toString());
					when(promise, function(contact){
						view._saveContact(contact);
						// save the updated item into the store
						when(view.loadedStores.contacts.put(contact),
							function(savedContact){
								// some store do return a contact some
								// other an ID
								view._savePromise.resolve(
									savedContact == id ?
										contact:savedContact);
							}
						);
					});
				}
			},
			_createContact: function(){
				var contact = {
					"id": (Math.round(Math.random()*1000000)).toString(),
					"name": {},
					"displayName": "",
					"phoneNumbers": [],
					"emails": [],
					"organizations": []
				};
				var view = this;
				this._saveContact(contact);
				when(this.loadedStores.contacts.add(contact),
					function(savedContact){
						// some store do return a contact some other an ID
						view._savePromise.resolve(savedContact ==
							contact.id ? contact : savedContact);
					}
				);
			},
			_saveContact: function(contact){
				// set back the values on the contact object
				var value, keys;
				// deal with name first
				var displayName = "";
				value = this.firstname.get("value");
				if(typeof value !== "undefined"){
					contact.name.givenName = value;
					displayName += value;
				}
				value = this.lastname.get("value");
				if(typeof value !== "undefined"){
					contact.name.familyName = value;
					displayName += " " + value;
				}
				contact.displayName = displayName;
				value = this.company.get("value");
				if(typeof value !== "undefined"){
					if(!contact.organizations){
						contact.organizations = [{}];
					}else if(contact.organizations.length == 0){
						contact.organizations.push({});
					}
					contact.organizations[0].name = value;
				}
				for(var key in DATA_MAPPING){
					value = this[key].get("value");
					if(typeof value !== "undefined"){
						// there is a value, save it
						keys = DATA_MAPPING[key].split(".");
						if(contact[keys[0]] == null){
							contact[keys[0]] = [];
						}
						getStoreField(contact[keys[0]],
							keys[1]).value = value;
					}
				}
			},
			_hideEmptyFields: function(view){
				query(".readOnlyHidden",
					view.formLayout.domNode).forEach(function(node){
					domClass.remove(node, "readOnlyHidden");
				});
				query("input",
					view.formLayout.domNode).forEach(function(node){
					var val = registry.byNode(node).get("value");
					if(!val && node.parentNode.parentNode &&
						node.id !== "firstname" &&
						node.id !== "lastname"){
							domClass.add(node.parentNode.parentNode,
								"readOnlyHidden");
					}
				});
	
			},
			_deleteContact: function(){
				var view = this;
				when(this.loadedStores.contacts.remove(
					this.params.id.toString()), function(){
					// we want to be back to list
					view.app.transitionToView(view.domNode, {
						target: "list" });
				});
			}
		}
});