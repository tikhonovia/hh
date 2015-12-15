define(["dojo/_base/declare", "dojo/has",
	"dojox/mobile/ListItem", "dojox/mobile/EdgeToEdgeStoreList",
	"dojox/mobile/FilteredListMixin", "aplanaHh/xhr/get", "dijit/registry", "dojo/on", "dojo/dom", "aplanaHh/xhr/cache", "dijit/_TemplatedMixin", "aplanaHh/utils/dates"],
	function(declare, has, ListItem, EdgeToEdgeStoreList, FilteredListMixin, xhrGet, registry, on, dom, xhrCache, TemplatedMixin, utilDates){
		var viewId="", uri="", cache="", cacheKey="";
		return {
			init: function() {
				// Параметры берем из настроек
				viewId=this.name;
				uri=this.app.views[viewId].uri;
				cache=this.app.views[viewId].cache;
				cacheKey=this.app.views[viewId].cacheKey;
			},
			beforeActivate: function() {
				var view=this;
				if(!xhrCache.is(cacheKey,uri,cache)) {
					xhrGet({uri:uri,
						domNode: this.domNode,
						progress: view.nls.progress,
						viewId: viewId,
		 		 		load: function(data){
		 		 			if(data.items) {
								aplanaHh.loadedStores.vacationMy.setData(data.items);
								view.list.refresh();
								xhrCache.add(cacheKey,uri);
		 		 			}
		 		 	    },
		 		 	    error: function(error){
		 		 			console.debug(error);
		 		 	    }});
				}
			}
		};
});