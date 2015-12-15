// we use 'define' and not 'require' to workaround Dojo build system
// limitation that prevents from making of this file a layer if it
// using 'require'
define("aplanaHh/xhr/post",["dojo/request/xhr","aplanaHh/dialogs/progress","aplanaHh/utils/messages"],
	function(xhr,dlgProgress,messages){
		/**
		 * jsonObject - объект, который надо передать в виде JSON
		 * uri - часть пути
		 * load - обработка успешного ответа
		 * error - обработка ошибки
		 * viewId - ID формы
		 * progress - текст сообщения
		 */
		var func=function(xhrArgs) {
			var jsonObject = xhrArgs.jsonObject||{};
			jsonObject.ajax=true;
			xhrArgs.headers={"Content-Type":"application/json;charset=utf-8"/*,"X-Requested-With": null*/};
			xhrArgs.postData = dojo.toJson(jsonObject);
			delete xhrArgs.jsonObject;
			if(xhrArgs.uri){
				xhrArgs.url=aplanaHh.params.serverUrl+xhrArgs.uri+"?ajax=true&json=true";
				delete xhrArgs.uri;
			}
			xhrArgs.handleAs="json";
			var xhr = null;
			var closeDlg=null;
			if(xhrArgs.progress){
				closeDlg=dlgProgress({text:xhrArgs.progress,onCancel:function(){if(xhr){xhr.cancel();}}});
			}
			var onLoad=xhrArgs.load;
			delete xhrArgs.load;
			// Очистка сообщений
			messages.clearAll(xhrArgs.viewId);
			//
			xhrArgs.load = function(data){
	 			if (closeDlg) {closeDlg();}
	 			if(data.success===false){
	 				if(!xhrArgs.disableErrors) {
		 				if(data.error){
		 					messages.addErrors(xhrArgs.viewId,data.error);
		 				}
		 				else if(data.errors){
		 					messages.addErrors(xhrArgs.viewId,data.errors);
		 				}
	 				}
	 				if(data.onError && data.onError.authAjax===true) {
 		 				if(!xhrArgs.domNode){
 		 					console.log("НЕ УКАЗАН NODE для перехода на страницу логина");
 		 				}
 		 				aplanaHh.transitionToView(xhrArgs.domNode, {
	                        target: "login"
	                    });
	 				}
	 			}
	 			else {
		 			if(onLoad){
		 				onLoad(data);
		 			}
	 			}
	 	    };
			var onError=xhrArgs.error;
			delete xhrArgs.error;
			xhrArgs.error = function(error){
	 			if (closeDlg) {closeDlg();}
	 			var message=error.message?error.message:"Произошла ошибка при обращении к серверу";
	 			if(message.startsWith("Unable to load")) {
	 				message = "Недоступен сервер. Проверьте подключение к интернету";
	 			}
				messages.addErrors(xhrArgs.viewId,message);
	 			if(onError){
	 				onError(error);
	 			}
	 	    };
			xhr = dojo.xhrPost(xhrArgs);
			return xhr;
		};
		return func;
});
