// we use 'define' and not 'require' to workaround Dojo build system
// limitation that prevents from making of this file a layer if it
// using 'require'
define("aplanaHh/utils/dates",["dojo/query","dojo/dom","dojo","dojo/html","dojo/date/locale"],
	function(query,dom,dojo,dojo_html,locale){
		var funcs={};
		
		funcs.datetime = {};
		funcs.date = {};
		 
		funcs.datetime.format=function(date) {
			if (date==null || date==undefined || isNaN(date)) {
				return "";
			}
			return locale.format(date,{datePattern:"dd.MM.yyyy"});
		};
		funcs.datetime.formatJson=function(date) {
			if (date==null || date==undefined || isNaN(date)) {
				return "";
			}
			return locale.format(date,{datePattern:"yyyy-MM-dd"});
		};
		funcs.datetime.json=function(str) {
			if (str==null || str==undefined || str=="") {
				return null;
			}
			var dt=str;
			if(typeof dt=="number") {
				dt = new Date(dt);
			}
			else if(typeof dt==="string") {
				dt = funcs.datetime.createRus(dt);
			}
			return funcs.datetime.formatJson(dt);		
		};
		funcs.datetime.parse=function(str) {
			if (str==null || str==undefined || str=="") {
				return null;
			}
			return locale.parse(str,{datePattern:"dd.MM.yyyy"});
		};
		funcs.datetime.create=function(str) {
			if(typeof str=="number") {
				return new Date(str);
			}
			var idx=str.indexOf("-");
			if (idx) {
				var a=str.split("T");
				var d=a[0].split("-");
				var t=[0,0,0];
				if (a[1]) {
					if(a[1].endsWith("Z")){
						a[1]=a[1].substring(0,a[1].length-1);
					}
					t=a[1].split(":");
				}
				return new Date(d[0],(d[1]-1),d[2],t[0],t[1],t[2]);
			}
			else {
				return new Date(str);
			}
		};
		funcs.datetime.createRus=function(str) {
			if(typeof str=="number") {
				return new Date(str);
			}
			var idx=str.indexOf(".");
			if (idx) {
				var a=str.split("T");
				var d=a[0].split(".");
				var t=[0,0,0];
				if (a[1]) {
					t=a[1].split(":");
				}
				return new Date(d[2],(d[1]-1),d[0],t[0],t[1],t[2]);
			}
			else {
				return new Date(str);
			}
		};
		funcs.date.format=function(date) {
			if (date==null || date==undefined || isNaN(date)) {
				return "";
			}
			return funcs.date.add0(date.getDate())+"."+funcs.date.add0(date.getMonth()+1)+"."+date.getFullYear();
			//return locale.format(date,{datePattern:"dd.MM.yyyy",timePattern:""});
		};
		funcs.date.formatFromStr=function(str) {
			if (str==null || str==undefined || str=="") {
				return "";
			}
			return funcs.date.format(funcs.datetime.create(str));
		};
		funcs.date.add0=function(src) {
			src=new String(src);
			if(src.length==1) {
				return "0"+src;
			}
			return src;
		};
	 
		return funcs;
});
