// we use 'define' and not 'require' to workaround Dojo build system
// limitation that prevents from making of this file a layer if it
// using 'require'
define("aplanaHh/utils/messages",["dojo/query","dojo/dom","dojo","dojo/html"],
	function(query,dom,dojo,dojo_html){
		var funcs={};
		 
		// Работа с сообщениями
		funcs.clearMessages = function( id ) {
		  if ( id ) {
		    var m = dom.byId( id );
		    if (!m) {
		    	m = dom.byId( id + "-messages");
		    }
		    if ( m ) {
				query("div.place-messages",m).forEach(function(div) {
					dojo_html.set(div, "");
		        	dojo.addClass(div, "hidden");
				});
		    }
		  }
		};
		funcs.addMessages = function( id, values ) {
			if ( id ) {
		    var m = dojo.byId( id );
		    if (!m) {
		    	m = dom.byId( id + "-messages");
		    }
		    if ( m ) {
			  dojo.query("div.place-messages",m).forEach(function(div) {
				var html="";
				if ((typeof values == "object") && (values instanceof Array)) {for(i in values) {html += "<div class='message'>"+values[i]+"</div>";}}
				else {html += "<div class='message'>"+values+"</div>";}
				dojo_html.set(div, html);
				dojo.removeClass(div, "hidden");
			  });
		    }
		  }
		};
		// Работа с ошибками
		funcs.clearErrors = function( id ) {
		  if ( id ) {
		    var m = dojo.byId( id );
		    if (!m) {
		    	m = dom.byId( id + "-messages");
		    }
		    if ( m ) {
				dojo.query("div.place-errors",m).forEach(function(div) {
					dojo_html.set(div, "");
		        	dojo.addClass(div, "hidden");
				});
		    }
		  }
		};
		// Работа с ошибками
		funcs.addErrors = function( id, values ) {
		  if (id) {
		    var m = dojo.byId( id );
		    if (!m) {
		    	m = dom.byId( id + "-messages");
		    }
		    if ( m ) {
				dojo.query("div.place-errors",m).forEach(function(div) {
		            e="<div class='errors'>";
		            if ((typeof values == "object") && (values instanceof Array)) {for(i in values) {e+="<li>"+values[i]+"</li>";}}
		            else {e += "<li>"+values+"</li>";}
		            dojo_html.set(div, e+"</div>");
		            dojo.removeClass( div, "hidden" );
				});
		    }
		  }
		};
		funcs.clearAll = function(id) {
			funcs.clearMessages(id);
			funcs.clearErrors(id);
		};
	 
		return funcs;
});
