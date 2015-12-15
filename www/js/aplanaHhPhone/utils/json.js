// we use 'define' and not 'require' to workaround Dojo build system
// limitation that prevents from making of this file a layer if it
// using 'require'
define("aplanaHh/utils/json",["dojo/query","dojo/dom","dojo","dojo/html","dojo/date/locale","dojo/dom-form","dojo/_base/lang"],
	function(query,dom,dojo,dojo_html,locale,domForm,lang){
		var funcs={};
		
		funcs.formToJsonObject=function(formId) {
			var formData = domForm.toObject(formId);
			return funcs.objectToJsonObject(formData);
		};
		funcs.objectToJsonObject=function(data) {
			var formJson = {};
			for(var key in data){
			  lang.setObject(key,data[key],formJson);
			}
			funcs.jsonObjectCorrect(formJson);
			return formJson;
		};
		funcs.jsonObjectCorrect=function(formJson){
			for(var key in formJson){
				if(key){
					var value=formJson[key];
					var arKey=key.split(/[\[\]]+/);
					if(arKey.length>1){
						var newKey=arKey[0];
						if(formJson[newKey]==null || formJson[newKey]==undefined){
							formJson[newKey]=[];
						}
						formJson[newKey].push(value);
						delete formJson[key];
					}
					if(value !== null && typeof value === 'object') {
						funcs.jsonObjectCorrect(value);
					}
				}
			}
		};
	 
		return funcs;
});
