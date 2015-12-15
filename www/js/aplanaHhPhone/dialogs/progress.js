// we use 'define' and not 'require' to workaround Dojo build system
// limitation that prevents from making of this file a layer if it
// using 'require'
define("aplanaHh/dialogs/progress",[
                                    "dojo/_base/window",
                                    "dojo/dom-construct",
                                    "dojox/mobile/SimpleDialog",
                                    "dojox/mobile/ProgressIndicator",
                                    "dojox/mobile/Button"
                                  ],
	function(win, domConstruct, SimpleDialog, ProgressIndicator, Button){
	 var func=function(dlgArgs) {

		    var piIns = ProgressIndicator.getInstance();
		    var dlg = new SimpleDialog();

		    dlgArgs.close = function(){
			      piIns.stop();
			      dlg.hide();
			    };
		    
		    win.body().appendChild(dlg.domNode);
		    var msgBox = domConstruct.create("div",
		                                     {class: "mblSimpleDialogText",
		                                      innerHTML: dlgArgs.text?dlgArgs.text:"Идет выполнение..."},
		                                      dlg.domNode);
		    var piBox = domConstruct.create("div",
		                                    {class: "mblSimpleDialogText"},
		                                     dlg.domNode);
		    piBox.appendChild(piIns.domNode);
		    var cancelBtn = new Button({class: "mblSimpleDialogButton mblRedButton",
		                                innerHTML: "Cancel"});
		    cancelBtn.connect(cancelBtn.domNode, "click", function(e){
		    	dlgArgs.close();
		    	if(dlgArgs.onCancel){
		    		dlgArgs.onCancel();
		    	}
		    });
		    //cancelBtn.placeAt(dlg.domNode);
		    dlg.show();
		    piIns.start();
		    return dlgArgs.close;
	 };
	 return func;
});
