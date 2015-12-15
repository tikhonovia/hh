// we use 'define' and not 'require' to workaround Dojo build system
// limitation that prevents from making of this file a layer if it
// using 'require'
define("aplanaHh/utils/fields",["dojo/query","dojo/dom","dojo","dojo/html","aplanaHh/utils/dates", "dijit/registry"],
	function(query,dom,dojo,dojo_html,utilDates,registry){
		var funcs={};
		
		funcs.getObjectValue=function(object,name) {
			var val=null;
			if(object && name){
				var keys=name.split(".");
				for(i in keys){
					var key=keys[i];
					object=object[key];
					if(object==null || object==undefined){
						break;
					}
				}
				if(object!=null && object!=undefined){
					val=object;
				}
			}
			return val;
		};
		funcs.setFieldByValue=function(field,val){
			if(field) {
				if(field.nodeName){
					field.value=val;				
				}
				else {
					field.set("value",val);
				}
			}
		};
		funcs.setFieldByObjectName=function(field,object,name){
			funcs.setFieldByValue(field,funcs.getObjectValue(object,name));
		};
		funcs.setDateFieldByObjectName=function(fieldId,fieldDate,object,name){
			var id=funcs.getObjectValue(object,name);
			var date=null;dateFmt=null;
			if(id){
				date=utilDates.datetime.create(id);
				if(date){
					dateFmt=utilDates.date.format(date);
				}
			}
			funcs.setFieldByValue(fieldId,id);
			funcs.setFieldByValue(fieldDate,dateFmt);
			return date;
		};
		funcs.fieldVisible=function(field,vis){
			if(vis){
				dojo.removeClass(field.nodeName?field:field.domNode,"hidden");
			}
			else {
				dojo.addClass(field.nodeName?field:field.domNode,"hidden");
			}
		};
		funcs.fieldCheck=function(field,object,name,checkValue) {
			var val=funcs.getObjectValue(object,name);
			field.set("checked",val==checkValue);
		};
		
		funcs.findFirstWidgetId=function(node) {
	    	if (node==null || node==undefined) {
	    		return null;
	    	}
	    	var widgetId=dojo.attr(node,"widgetid");
	    	if (widgetId==null || widgetId==undefined || widgetId=="") {
	    		return funcs.findFirstWidgetId(node.parentNode);
	    	}
	    	return widgetId;
	    };
	    funcs.dijitByNode=function(node) {
	    	var widgetId=funcs.findFirstWidgetId(node);
	    	if (widgetId) {
	    		return registry.byId(widgetId);
	    	}
	    	return null;
	    };
		 	 
		return funcs;
});
