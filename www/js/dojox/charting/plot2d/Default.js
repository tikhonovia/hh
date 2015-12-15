//>>built
define("dojox/charting/plot2d/Default","dojo/_base/lang dojo/_base/declare dojo/_base/array dojo/has ./CartesianBase ./_PlotEvents ./common dojox/lang/functional dojox/lang/functional/reversed dojox/lang/utils dojox/gfx/fx".split(" "),function(r,D,n,K,L,M,w,N,O,x,P){var Q=O.lambda("item.purgeGroup()");return D("dojox.charting.plot2d.Default",[L,M],{defaultParams:{lines:!0,areas:!1,markers:!1,tension:"",animate:!1,enableCache:!1,interpolate:!1},optionalParams:{stroke:{},outline:{},shadow:{},fill:{},
filter:{},styleFunc:null,font:"",fontColor:"",marker:"",markerStroke:{},markerOutline:{},markerShadow:{},markerFill:{},markerFont:"",markerFontColor:""},constructor:function(g,a){this.opt=r.clone(r.mixin(this.opt,this.defaultParams));x.updateWithObject(this.opt,a);x.updateWithPattern(this.opt,a,this.optionalParams);this.animate=this.opt.animate},createPath:function(g,a,c){var f;this.opt.enableCache&&0<g._pathFreePool.length?(f=g._pathFreePool.pop(),f.setShape(c),a.add(f)):f=a.createPath(c);this.opt.enableCache&&
g._pathUsePool.push(f);return f},buildSegments:function(g,a){for(var c=this.series[g],f=a?Math.max(0,Math.floor(this._hScaler.bounds.from-1)):0,n=a?Math.min(c.data.length,Math.ceil(this._hScaler.bounds.to)):c.data.length,h=null,r=[];f<n;f++)if(null!=c.data[f]&&(a||null!=c.data[f].y))h||(h=[],r.push({index:f,rseg:h})),h.push(a&&c.data[f].hasOwnProperty("y")?c.data[f].y:c.data[f]);else if(!this.opt.interpolate||a)h=null;return r},render:function(g,a){if(this.zoom&&!this.isDataDirty())return this.performZoom(g,
a);this.resetEvents();this.dirty=this.isDirty();var c;this.dirty&&(n.forEach(this.series,Q),this._eventSeries={},this.cleanGroup(),this.getGroup().setTransform(null),c=this.getGroup(),N.forEachRev(this.series,function(e){e.cleanGroup(c)}));for(var f=this.chart.theme,s,h,x=this.events(),y=this.series.length-1;0<=y;--y){var b=this.series[y];if(!this.dirty&&!b.dirty)f.skip(),this._reconnectEvents(b.name);else if(b.cleanGroup(),this.opt.enableCache&&(b._pathFreePool=(b._pathFreePool?b._pathFreePool:[]).concat(b._pathUsePool?
b._pathUsePool:[]),b._pathUsePool=[]),b.data.length){var k=f.next(this.opt.areas?"area":"line",[this.opt,b],!0),d,E=this._hScaler.scaler.getTransformerFromModel(this._hScaler),F=this._vScaler.scaler.getTransformerFromModel(this._vScaler),D=this._eventSeries[b.name]=Array(b.data.length);c=b.group;for(var z=n.some(b.data,function(e){return"number"==typeof e||e&&!e.hasOwnProperty("x")}),A=this.buildSegments(y,z),u=0;u<A.length;u++){var m=A[u];d=z?n.map(m.rseg,function(e,b){return{x:E(b+m.index+1)+a.l,
y:g.height-a.b-F(e),data:e}},this):n.map(m.rseg,function(e){return{x:E(e.x)+a.l,y:g.height-a.b-F(e.y),data:e}},this);if(z&&this.opt.interpolate)for(;u<A.length;)u++,(m=A[u])&&(d=d.concat(n.map(m.rseg,function(e,b){return{x:E(b+m.index+1)+a.l,y:g.height-a.b-F(e),data:e}},this)));var p=this.opt.tension?w.curve(d,this.opt.tension):"";if(this.opt.areas&&1<d.length){var v=this._plotFill(k.series.fill,g,a),q=r.clone(d);this.opt.tension?b.dyn.fill=c.createPath(p+" "+("L"+q[q.length-1].x+","+(g.height-a.b)+
" L"+q[0].x+","+(g.height-a.b)+" L"+q[0].x+","+q[0].y)).setFill(v).getFill():(q.push({x:d[d.length-1].x,y:g.height-a.b}),q.push({x:d[0].x,y:g.height-a.b}),q.push(d[0]),b.dyn.fill=c.createPolyline(q).setFill(v).getFill())}if(this.opt.lines||this.opt.markers)s=k.series.stroke,k.series.outline&&(h=b.dyn.outline=w.makeStroke(k.series.outline),h.width=2*h.width+s.width);this.opt.markers&&(b.dyn.marker=k.symbol);var B=null,G=null,H=null;if(s&&k.series.shadow&&1<d.length){var t=k.series.shadow,v=n.map(d,
function(b){return{x:b.x+t.dx,y:b.y+t.dy}});this.opt.lines&&(b.dyn.shadow=this.opt.tension?c.createPath(w.curve(v,this.opt.tension)).setStroke(t).getStroke():c.createPolyline(v).setStroke(t).getStroke());this.opt.markers&&k.marker.shadow&&(t=k.marker.shadow,H=n.map(v,function(e){return this.createPath(b,c,"M"+e.x+" "+e.y+" "+k.symbol).setStroke(t).setFill(t.color)},this))}if(this.opt.lines&&1<d.length){var C;h&&(b.dyn.outline=this.opt.tension?c.createPath(p).setStroke(h).getStroke():c.createPolyline(d).setStroke(h).getStroke());
b.dyn.stroke=this.opt.tension?(C=c.createPath(p)).setStroke(s).getStroke():(C=c.createPolyline(d)).setStroke(s).getStroke();C.setFilter&&k.series.filter&&C.setFilter(k.series.filter)}p=null;if(this.opt.markers){var l=k,B=Array(d.length),G=Array(d.length);h=null;l.marker.outline&&(h=w.makeStroke(l.marker.outline),h.width=2*h.width+(l.marker.stroke?l.marker.stroke.width:0));n.forEach(d,function(e,a){if(this.opt.styleFunc||"number"!=typeof e.data){var d="number"!=typeof e.data?[e.data]:[];this.opt.styleFunc&&
d.push(this.opt.styleFunc(e.data));l=f.addMixin(k,"marker",d,!0)}else l=f.post(k,"marker");d="M"+e.x+" "+e.y+" "+l.symbol;h&&(G[a]=this.createPath(b,c,d).setStroke(h));B[a]=this.createPath(b,c,d).setStroke(l.marker.stroke).setFill(l.marker.fill)},this);b.dyn.markerFill=l.marker.fill;b.dyn.markerStroke=l.marker.stroke;!p&&this.opt.labels&&(p=B[0].getBoundingBox());x?n.forEach(B,function(e,a){var c={element:"marker",index:a+m.index,run:b,shape:e,outline:G[a]||null,shadow:H&&H[a]||null,cx:d[a].x,cy:d[a].y};
z?(c.x=a+m.index+1,c.y=b.data[a+m.index]):(c.x=m.rseg[a].x,c.y=b.data[a+m.index].y);this._connectEvents(c);D[a+m.index]=c},this):delete this._eventSeries[b.name]}if(this.opt.labels){var I=p?p.width:2,J=p?p.height:2;n.forEach(d,function(a,b){if(this.opt.styleFunc||"number"!=typeof a.data){var d="number"!=typeof a.data?[a.data]:[];this.opt.styleFunc&&d.push(this.opt.styleFunc(a.data));l=f.addMixin(k,"marker",d,!0)}else l=f.post(k,"marker");this.createLabel(c,m.rseg[b],{x:a.x-I/2,y:a.y-J/2,width:I,height:J},
l)},this)}}b.dirty=!1}else b.dirty=!1,f.skip()}K("dojo-bidi")&&this._checkOrientation(this.group,g,a);this.animate&&(s=this.getGroup(),P.animateTransform(r.delegate({shape:s,duration:1200,transform:[{name:"translate",start:[0,g.height-a.b],end:[0,0]},{name:"scale",start:[1,0],end:[1,1]},{name:"original"}]},this.animate)).play());this.dirty=!1;return this}})});
//# sourceMappingURL=Default.js.map