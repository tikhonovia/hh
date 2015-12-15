define(["dojo/_base/declare", "dojo/has",
	"dojox/mobile/ListItem", "dojox/mobile/EdgeToEdgeStoreList",
	"dojox/mobile/FilteredListMixin", "dijit/registry", "dojo/on", "dojo/dom", "aplanaHh/xhr/get", "aplanaHh/utils/listItemTransition", "aplanaHh/xhr/cache"],
	function(declare, has, ListItem, EdgeToEdgeStoreList, FilteredListMixin, registry, on, dom, xhrGet, listItemTransition, xhrCache){
		var viewId="", openInformUri="", myUri="", cache="", cacheKey="", view=null;
		return {
			init: function() {
				// Параметры берем из настроек
				viewId=this.name;
				view=this;
				openInformUri=this.app.views[viewId].openInformUri;
				myUri=this.app.views[viewId].myUri;
				cache=this.app.views[viewId].cache;
				cacheKey=this.app.views[viewId].cacheKey;
				// Подключаем пункты меню
				//listItemTransition("menuAddSick","sickDetail");
			},
			beforeActivate: function(){
				if(!xhrCache.is(cacheKey,openInformUri,cache)) {
					xhrGet({uri:openInformUri,
						domNode: this.domNode,
						progress: view.nls.progress,
				 		viewId: viewId,
		 		 		load: function(data){
		 					// Уведомления
		 					view.openInform._setSickList(data.items);
		 					// Кеш
							xhrCache.add(cacheKey,openInformUri);
		 		 		},
		 		 	    error: function(error){
		 		 	    }});
				}
				if(!xhrCache.is(cacheKey,myUri,cache)) {
					xhrGet({uri:myUri,
						domNode: this.domNode,
						progress: view.nls.progress,
				 		viewId: viewId,
		 		 		load: function(data){
		 					// Уведомления
		 					view.my._setSickList(data.items);
		 					// Кеш
							xhrCache.add(cacheKey,myUri);
		 		 		},
		 		 	    error: function(error){
		 		 	    }});
				}
			}
		};
});