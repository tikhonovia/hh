// we use 'define' and not 'require' to workaround Dojo build system
// limitation that prevents from making of this file a layer if it
// using 'require'
define(["dojo/sniff", "dojo/json",
	"dojo/text!aplanaHhPhone/aplanaHh.json", "dojox/app/main", "dojo/data/ItemFileReadStore"],
	function(has, json, conf, Application, fileReadStore){

	 has.add("html5history", !has("ie") || has("ie") > 9);
	 var config=json.parse(conf);
	 Application(config);
	 //
	 /*
	 aplanaHh.xhr={serverUrl:config.serverUrl};
	 aplanaHh.xhr.get=function(xhrArgs) {
		 xhrArgs.headers={"X-Requested-With": null};
		 xhrArgs.content=xhrArgs.content||{};
		 xhrArgs.content.ajax=true;
		 if(xhrArgs.uri){
			 xhrArgs.url=aplanaHh.xhr.serverUrl+xhrArgs.uri;
			 delete xhrArgs.uri;
		 }
		 dojo.xhrGet(xhrArgs);
	 };
	 */
});

if (typeof String.prototype.endsWith != 'function') {
    String.prototype.endsWith = function(suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
}
if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function (str){
    return this.indexOf(str) == 0;
  };
}

if (typeof Date.prototype.addHours != 'function') {
	Date.prototype.addHours= function(h){
	    var copiedDate = new Date(this.getTime());
	    copiedDate.setHours(copiedDate.getHours()+h);
	    return copiedDate;
	};
}
if (typeof Date.prototype.addMinutes != 'function') {
	Date.prototype.addMinutes= function(m){
	    var copiedDate = new Date(this.getTime() + (m*60*1000));
	    return copiedDate;
	};
}
