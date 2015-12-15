define(["dojo/_base/declare", "dojo/has",
	"dojox/mobile/ListItem", "dojox/mobile/EdgeToEdgeStoreList",
	"dojox/mobile/FilteredListMixin", "dijit/registry", "dojo/on", "dojo/dom", "aplanaHh/xhr/get", "aplanaHh/utils/listItemTransition", "aplanaHh/xhr/cache", "aplanaHh/utils/currentUser"],
	function(declare, has, ListItem, EdgeToEdgeStoreList, FilteredListMixin, registry, on, dom, xhrGet, listItemTransition, xhrCache,currentUser){
		var viewId="", uri="", logoffUri="", view=null, viewUser=null;
		return {
			init: function() {
				// Параметры берем из настроек
				viewId=this.name;
				view=this;
				uri=this.app.views[viewId].uri;
				logoffUri=this.app.views[viewId].logoffUri;
				// Подключаем пункты меню
				/*
				listItemTransition("menuVacationsItem","vacationMenu",viewId);
				listItemTransition("menuSicksItem","sickMenu",viewId);
				listItemTransition("menuRefUsersItem","refUsers",viewId);
				*/
				// Выход
				on(view.logoff,"click",function(){
					xhrGet({uri:logoffUri,
						disableErrors: true,
						domNode: this.domNode,
				 		viewId: viewId,
		 		 		load: function(data){
		 		 		},
		 		 	    error: function(error){
		 		 	    }});
					aplanaHh.params.user={};
 		 			xhrCache.clearAll();
				});
				//
				on(view.managerCall,"click",function(){
					if(viewUser && viewUser.manager) {
						var mobilePhone=viewUser.manager.mobilePhone;
						if(mobilePhone){
							mobilePhone=mobilePhone.replace(/[^\d+]/g, '');
						}
						if(mobilePhone){
							window.open('tel:'+mobilePhone, '_system');
						}
					}
				});
			},
			beforeActivate: function(){
				xhrGet({uri:uri,
			 		viewId: viewId,
			 		domNode: view.logoff,
	 		 		load: function(data){
	 		 			if(data.success===false) {
	 		 				if(data.onError && data.onError.authAjax===true) {
		 		 				aplanaHh.transitionToView(view.logoff, {
			                        target: "login"
			                    });
	 		 				}
	 		 			}
	 		 	    },
	 		 	    error: function(error){
	 		 			console.debug(error);
	 		 	    }
				});
				// Информация о сотруднике
				dojo.addClass(view.managerCall.domNode,"hidden");
				currentUser.get(viewId,this.domNode,view.nls.progress,function(user){
					viewUser=user;
 		 			if(user){
	 		 			if(user.manager && user.manager.id){
	 		 				view.manager._setManagerLabel(user.manager.fullName);
	 		 				view.manager._setManagerPhone(user.manager.mobilePhone);
	 		 				if(user.manager.mobilePhone){
		 						dojo.removeClass(view.managerCall.domNode,"hidden");
	 		 				}
	 		 			}
	 					// Уведомления
	 					view.notification._setNotificationList(user.notifications);
 		 			}
				});
			}
		};
});