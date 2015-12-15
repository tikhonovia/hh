//>>built
define("dijit/layout/_ContentPaneResizeMixin","dojo/_base/array dojo/_base/declare dojo/dom-class dojo/dom-geometry dojo/dom-style dojo/_base/lang dojo/query dojo/sniff ../registry ../Viewport ./utils".split(" "),function(p,h,g,e,q,f,k,r,l,m,n){return h("dijit.layout._ContentPaneResizeMixin",null,{doLayout:!0,isLayoutContainer:!0,startup:function(){if(!this._started){var a=this.getParent();this._childOfLayoutWidget=a&&a.isLayoutContainer;this._needLayout=!this._childOfLayoutWidget;this.inherited(arguments);
this._isShown()&&this._onShow();this._childOfLayoutWidget||this.own(m.on("resize",f.hitch(this,"resize")))}},_checkIfSingleChild:function(){var a=[],b=!1;k("\x3e *",this.containerNode).some(function(c){var d=l.byNode(c);d&&d.resize?a.push(d):!/script|link|style/i.test(c.nodeName)&&c.offsetHeight&&(b=!0)});this._singleChild=1==a.length&&!b?a[0]:null;g.toggle(this.containerNode,this.baseClass+"SingleChild",!!this._singleChild)},resize:function(a,b){this._resizeCalled=!0;this._scheduleLayout(a,b)},_scheduleLayout:function(a,
b){this._isShown()?this._layout(a,b):(this._needLayout=!0,this._changeSize=a,this._resultSize=b)},_layout:function(a,b){delete this._needLayout;!this._wasShown&&!1!==this.open&&this._onShow();a&&e.setMarginBox(this.domNode,a);var c=this.containerNode;if(c===this.domNode){var d=b||{};f.mixin(d,a||{});if(!("h"in d)||!("w"in d))d=f.mixin(e.getMarginBox(c),d);this._contentBox=n.marginBox2contentBox(c,d)}else this._contentBox=e.getContentBox(c);this._layoutChildren()},_layoutChildren:function(){this.doLayout&&
this._checkIfSingleChild();if(this._singleChild&&this._singleChild.resize){var a=this._contentBox||e.getContentBox(this.containerNode);this._singleChild.resize({w:a.w,h:a.h})}else for(var a=this.getChildren(),b,c=0;b=a[c++];)b.resize&&b.resize()},_isShown:function(){if(this._childOfLayoutWidget)return this._resizeCalled&&"open"in this?this.open:this._resizeCalled;if("open"in this)return this.open;var a=this.domNode,b=this.domNode.parentNode;return"none"!=a.style.display&&"hidden"!=a.style.visibility&&
!g.contains(a,"dijitHidden")&&b&&b.style&&"none"!=b.style.display},_onShow:function(){this._wasShown=!0;this._needLayout&&this._layout(this._changeSize,this._resultSize);this.inherited(arguments)}})});
//# sourceMappingURL=_ContentPaneResizeMixin.js.map