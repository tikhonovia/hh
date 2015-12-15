// we use 'define' and not 'require' to workaround Dojo build system
// limitation that prevents from making of this file a layer if it
// using 'require'
define("aplanaHh/xhr/cache",["dojo/request/xhr","aplanaHh/dialogs/progress","aplanaHh/utils/messages"],
	function(xhr,dlgProgress,messages){
		var funcs={};
		funcs.map=funcs.map||{};
		funcs.is=function(superkey,key,minutes) {
			var val=funcs.map[superkey];
			if(!val){
				funcs.map[superkey]={};
				val=funcs.map[superkey];
			}
			val=val[key];
			if(!val) {
				return false;
			}
			else {
				var cacheExpired=val.addMinutes(minutes);
				return cacheExpired>=new Date();
			}
		};
		funcs.add=function(superkey,key) {
			funcs.map[superkey]=funcs.map[superkey]||{};
			funcs.map[superkey][key]=new Date();
		};
		funcs.clear=function(superkey,key) {
			if(key){
				delete funcs.map[superkey][key];
			}
			else {
				funcs.map[superkey]={};
			}
			funcs.map[key]=new Date();
		};
		funcs.clearAll=function() {
			funcs.map={};
		};
		return funcs;
});
