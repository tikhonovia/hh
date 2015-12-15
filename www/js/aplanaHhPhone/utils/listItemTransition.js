// we use 'define' and not 'require' to workaround Dojo build system
// limitation that prevents from making of this file a layer if it
// using 'require'
define("aplanaHh/utils/listItemTransition",["dojo/query","dojo/dom","dojo","dojo/html", "dojo/on", "dojox/mobile/bookmarkable"],
	function(query,dom,dojo,dojo_html,on,bookmarkable){

		var func=function(itemId,toViewId,fromViewId) {
			var item=dom.byId(itemId);
			console.debug(item);
			on(item,"click",function(){
				aplanaHh.transitionToView(item, {
		            target: toViewId
		        });
				console.debug(bookmarkable);
			});
		};
		
		
		// this.addTransitionInfo(this.id, detail.moveTo, {transitionDir:detail.transitionDir, transition:detail.transition});
	
		return func;
});
