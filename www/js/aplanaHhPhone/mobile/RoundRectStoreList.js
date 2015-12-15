define([
	"dojo/_base/declare",
	"dojox/mobile/RoundRectStoreList",
	"dojo/_base/lang"
], function(declare, RoundRectStoreList, lang){

	// module:
	//		dojox/mobile/EdgeToEdgeStoreList

	return declare("aplanaHh.mobile.RoundRectStoreList", [RoundRectStoreList],{
		// summary:
		//		A dojo/store-enabled version of EdgeToEdgeList.
		// description:
		//		EdgeToEdgeStoreList is a subclass of EdgeToEdgeList which
		//		can generate ListItems according to the given dojo/store store.
		createListItem: function(/*Object*/item){
			this.processItem(item);
			// summary:
			//		Creates a list item widget.
			var it = lang.mixin({itemSource:{}},item);
			it.itemSource=item;
			// Если есть поле с ID, то его нужно переименовать, иначе будут проблемы с виджетами
			if(it.id) {
				delete it.id;
			}
			return new this.itemRenderer(this._createItemProperties(it));
		},
		processItem: function(item) {
			
		}
	});
});
