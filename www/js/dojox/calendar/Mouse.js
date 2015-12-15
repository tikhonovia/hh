//>>built
define("dojox/calendar/Mouse","dojo/_base/array dojo/_base/declare dojo/_base/event dojo/_base/lang dojo/_base/window dojo/dom-geometry dojo/mouse dojo/on dojo/keys".split(" "),function(l,m,f,c,g,n,h,e,p){return m("dojox.calendar.Mouse",null,{triggerExtent:3,postMixInProperties:function(){this.inherited(arguments);this.on("rendererCreated",c.hitch(this,function(a){var b=a.renderer.renderer;this.own(e(b.domNode,"click",c.hitch(this,function(a){f.stop(a);this._onItemClick({triggerEvent:a,renderer:b,
item:b.item._item})})));this.own(e(b.domNode,"dblclick",c.hitch(this,function(a){f.stop(a);this._onItemDoubleClick({triggerEvent:a,renderer:b,item:b.item._item})})));this.own(e(b.domNode,"contextmenu",c.hitch(this,function(a){this._onItemContextMenu({triggerEvent:a,renderer:b,item:b.item._item})})));b.resizeStartHandle&&this.own(e(b.resizeStartHandle,"mousedown",c.hitch(this,function(a){this._onRendererHandleMouseDown(a,b,"resizeStart")})));b.moveHandle&&this.own(e(b.moveHandle,"mousedown",c.hitch(this,
function(a){this._onRendererHandleMouseDown(a,b,"move")})));b.resizeEndHandle&&this.own(e(b.resizeEndHandle,"mousedown",c.hitch(this,function(a){this._onRendererHandleMouseDown(a,b,"resizeEnd")})));this.own(e(b.domNode,"mousedown",c.hitch(this,function(a){this._rendererMouseDownHandler(a,b)})));this.own(e(a.renderer.container,h.enter,c.hitch(this,function(a){b.item&&!this._editingGesture&&(this._setHoveredItem(b.item.item,b),this._onItemRollOver(this.__fixEvt({item:b.item._item,renderer:b,triggerEvent:a})))})));
this.own(e(b.domNode,h.leave,c.hitch(this,function(a){b.item&&!this._editingGesture&&(this._setHoveredItem(null),this._onItemRollOut(this.__fixEvt({item:b.item._item,renderer:b,triggerEvent:a})))})))}))},_onItemRollOver:function(a){this._dispatchCalendarEvt(a,"onItemRollOver")},onItemRollOver:function(a){},_onItemRollOut:function(a){this._dispatchCalendarEvt(a,"onItemRollOut")},onItemRollOut:function(a){},_rendererMouseDownHandler:function(a,b){f.stop(a);this.selectFromEvent(a,b.item._item,b,!0);
this._setTabIndexAttr&&this[this._setTabIndexAttr].focus()},_onRendererHandleMouseDown:function(a,b,k){f.stop(a);this.showFocus=!1;var d=b.item.item;this.isItemBeingEdited(d)||(this._isEditing&&this._endItemEditing("mouse",!1),this.selectFromEvent(a,b.item._item,b,!0),this._setTabIndexAttr&&this[this._setTabIndexAttr].focus(),this._edProps={editKind:k,editedItem:d,rendererKind:b.rendererKind,tempEditedItem:d,liveLayout:this.liveLayout},this.set("focusedItem",this._edProps.editedItem));b=[];b.push(e(g.doc,
"mouseup",c.hitch(this,this._editingMouseUpHandler)));b.push(e(g.doc,"mousemove",c.hitch(this,this._editingMouseMoveHandler)));d=this._edProps;d.handles=b;d.eventSource="mouse";d.editKind=k;this._startPoint={x:a.screenX,y:a.screenY}},_editingMouseMoveHandler:function(a){var b=this._edProps;if(this._editingGesture)this._autoScroll(a.pageX,a.pageY,!0)||this._moveOrResizeItemGesture([this.getTime(a)],"mouse",a);else if(Math.abs(this._startPoint.x-a.screenX)>=this.triggerExtent||Math.abs(this._startPoint.y-
a.screenY)>=this.triggerExtent)this._isEditing||this._startItemEditing(b.editedItem,"mouse"),b=this._edProps,this._startItemEditingGesture([this.getTime(a)],b.editKind,"mouse",a)},_editingMouseUpHandler:function(a){var b=this._edProps;this._stopAutoScroll();this._isEditing?(this._editingGesture&&this._endItemEditingGesture("mouse",a),this._endItemEditing("mouse",!1)):l.forEach(b.handles,function(a){a.remove()})},_autoScroll:function(a,b,c){if(!this.scrollable||!this.autoScroll)return!1;var d=n.position(this.scrollContainer,
!0);a=c?b-d.y:a-d.x;c=c?d.h:d.w;if(0>a||a>c)return this._startAutoScroll(Math.floor((0>a?a:a-c)/2)/3),!0;this._stopAutoScroll();return!1}})});
//# sourceMappingURL=Mouse.js.map