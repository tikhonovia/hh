// we use 'define' and not 'require' to workaround Dojo build system
// limitation that prevents from making of this file a layer if it
// using 'require'
define("aplanaHh/utils/currentUser",["dojo/query","dojo/dom","dojo","dojo/html","dojo/date/locale", "aplanaHh/xhr/get", "aplanaHh/xhr/cache"],
	function(query,dom,dojo,dojo_html,locale, xhrGet, xhrCache){
		var funcs={};
		 
		funcs.get=function(viewId,domNode,progress,onLoad) {
			var cacheKey=aplanaHh.params.constants.currentUser.userInfoCacheKey;
			var uri=aplanaHh.params.constants.currentUser.userInfoUri;
			var cache=aplanaHh.params.constants.currentUser.userInfoCache;
			if(!xhrCache.is(cacheKey,uri,cache)) {
				xhrGet({uri:uri,
					domNode: domNode,
					progress: progress,
			 		viewId: viewId,
	 		 		load: function(data){
	 		 			// Информация о пользователе
	 		 			aplanaHh.params.user = data.data;
	 					onLoad(aplanaHh.params.user);
	 					// Кеш
						xhrCache.add(cacheKey,uri);
	 		 		},
	 		 	    error: function(error){
	 		 	    }});
			}
			else {
				onLoad(aplanaHh.params.user);
			}
		
		};
	 
		return funcs;
});
