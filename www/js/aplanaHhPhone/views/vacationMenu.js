define(["dojo/_base/declare", "dojo/has",
	"dojox/mobile/ListItem", "dojox/mobile/EdgeToEdgeStoreList",
	"dojox/mobile/FilteredListMixin", "dijit/registry", "dojo/on", "dojo/dom", "aplanaHh/xhr/get", "aplanaHh/utils/listItemTransition", "aplanaHh/xhr/cache", "aplanaHh/utils/fields", "aplanaHh/xhr/post"],
	function(declare, has, ListItem, EdgeToEdgeStoreList, FilteredListMixin, registry, on, dom, xhrGet, listItemTransition, xhrCache, utilFields, xhrPost){
		var viewId="", deleteUri="", myApprovedUri="", myForApproveUri="", myDraftUri="", myRejectedUri="", forApproveUri="", cache="", cacheKey="", view=null;
		return {
			init: function() {
				// Параметры берем из настроек
				viewId=this.name;
				view=this;
				deleteUri=this.app.views[viewId].deleteUri;
				myApprovedUri=this.app.views[viewId].myApprovedUri;
				myForApproveUri=this.app.views[viewId].myForApproveUri;
				forApproveUri=this.app.views[viewId].forApproveUri;
				myDraftUri=this.app.views[viewId].myDraftUri;
				myRejectedUri=this.app.views[viewId].myRejectedUri;
				cache=this.app.views[viewId].cache;
				cacheKey=this.app.views[viewId].cacheKey;
				// Подключаем пункты меню
				//listItemTransition("menuVacationCalcItem","vacationCalc");
				//listItemTransition("menuAddVacation","vacationDetail");
			},
			connectDeleveVacation: function(listDomNode){
				var w=null;
				dojo.query("a.deleteVacation",listDomNode).forEach(function(inp) {
					var wInp=utilFields.dijitByNode(inp);
					if(wInp){
						w=wInp;
					}
				});
				if(w){
					var handle=dojo.connect(w, 'onDeleteVacation', function(id,json) {
						view.deleteVacation(json);
					});
					return handle;
				}
			},
			deleteVacation: function(json) {
			 	xhrPost({uri:deleteUri,
			 		jsonObject: json,
			 		progress: view.nls.deleteProgress,
			 		viewId: viewId,
			 		load: function(data){
			 			if(data.success){
							xhrCache.clear(cacheKey);
							view.refreshLists();
			 			}
			 	    },
			 	    error: function(error){
			 			console.debug(error);
			 	    }});
			},
			refreshLists: function() {
				if(view.handleForApprove){
					dojo.disconnect(view.handleForApprove);
				}
				if(!xhrCache.is(cacheKey,forApproveUri,cache)) {
					xhrGet({uri:forApproveUri,
						domNode: this.domNode,
						progress: view.nls.progress,
				 		viewId: viewId,
		 		 		load: function(data){
		 					// Уведомления
		 					view.forApprove._setVacationList(data.items);
		 					view.handleForApprove=view.connectDeleveVacation(view.forApprove.domNode);
		 					// Кеш
							xhrCache.add(cacheKey,forApproveUri);
		 		 		},
		 		 	    error: function(error){
		 		 	    }});
				}
				if(view.handleMyApproved){
					dojo.disconnect(view.handleMyApproved);
				}
				if(!xhrCache.is(cacheKey,myApprovedUri,cache)) {
					xhrGet({uri:myApprovedUri,
						domNode: this.domNode,
						progress: view.nls.progress,
				 		viewId: viewId,
		 		 		load: function(data){
		 					// Уведомления
		 					view.myApproved._setVacationList(data.items);
		 					view.handleMyApproved=view.connectDeleveVacation(view.myApproved.domNode);
		 					// Кеш
							xhrCache.add(cacheKey,myApprovedUri);
		 		 		},
		 		 	    error: function(error){
		 		 	    }});
				}
				if(view.handleMyForApprove){
					dojo.disconnect(view.handleMyForApprove);
				}
				if(!xhrCache.is(cacheKey,myForApproveUri,cache)) {
					xhrGet({uri:myForApproveUri,
						domNode: this.domNode,
						progress: view.nls.progress,
				 		viewId: viewId,
		 		 		load: function(data){
		 					// Уведомления
		 					view.myForApprove._setVacationList(data.items);
		 					view.handleMyForApprove=view.connectDeleveVacation(view.myForApprove.domNode);
		 					// Кеш
							xhrCache.add(cacheKey,myForApproveUri);
		 		 		},
		 		 	    error: function(error){
		 		 	    }});
				}
				if(view.handleMyDraft){
					dojo.disconnect(view.handleMyDraft);
				}
				if(!xhrCache.is(cacheKey,myDraftUri,cache)) {
					xhrGet({uri:myDraftUri,
						domNode: this.domNode,
						progress: view.nls.progress,
				 		viewId: viewId,
		 		 		load: function(data){
		 					// Уведомления
		 					view.myDraft._setVacationList(data.items);
		 					view.handleMyDraft=view.connectDeleveVacation(view.myDraft.domNode);
		 					utilFields.fieldVisible(view.listDraft,(data.items && data.items.length>0));
		 					// Кеш
							xhrCache.add(cacheKey,myDraftUri);
		 		 		},
		 		 	    error: function(error){
		 		 	    }});
				}
				if(view.handleMyRejected){
					dojo.disconnect(view.handleMyRejected);
				}
				if(!xhrCache.is(cacheKey,myRejectedUri,cache)) {
					xhrGet({uri:myRejectedUri,
						domNode: this.domNode,
						progress: view.nls.progress,
				 		viewId: viewId,
		 		 		load: function(data){
		 					// Уведомления
		 					view.myRejected._setVacationList(data.items);
		 					view.handleMyRejected=view.connectDeleveVacation(view.myRejected.domNode);
		 					utilFields.fieldVisible(view.listRejected,(data.items && data.items.length>0));
		 					// Кеш
							xhrCache.add(cacheKey,myRejectedUri);
		 		 		},
		 		 	    error: function(error){
		 		 	    }});
				}
			},
			beforeActivate: function(){
				view.refreshLists();
			}
		};
});