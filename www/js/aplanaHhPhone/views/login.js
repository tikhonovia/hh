define(["dojo/on","dijit/registry","dojo/dom-form", "aplanaHh/xhr/get", "aplanaHh/xhr/post","aplanaHh/dialogs/progress","aplanaHh/utils/messages","dojox/mobile/TransitionEvent","dojo/keys"],
	function(on,registry,domForm, xhrGet, xhrPost,dlgProgress,messages,TransitionEvent,keys){
		var viewId="", uri="", cache="", view=null;
		return {
			init: function() {
				// Параметры берем из настроек
				viewId=this.name;
				view=this;
				uri=this.app.views[viewId].uri;
				// Обработка подключения
				on(view.loginButton,"click",view.doLogin);
				on(view.loginUsername,"keypress",view.keypressDoLogin);
				on(view.loginPassword,"keypress",view.keypressDoLogin);
			},
			beforeActivate: function(){
			},
			keypressDoLogin: function(evt){
				switch(evt.keyCode){
			      case keys.ENTER:
			    	  view.doLogin();
			    	  break;
			    }
			},
			doLogin: function(){
				var formObj = domForm.toObject("loginForm");
			 	xhrPost({uri:uri,
			 		domNode: view.loginButton.domNode,
			 		jsonObject: formObj,
			 		progress: view.nls.progress,
			 		viewId: viewId,
			 		load: function(data){
	 		 			if(data.success===true) {
				 			aplanaHh.transitionToView(view.loginButton.domNode, {
		                        target: "menu"
		                    });
	 		 			}
			 	    },
			 	    error: function(error){
			 			console.debug(error);
			 	    }});
			}
		};
});