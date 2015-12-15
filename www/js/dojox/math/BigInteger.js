//>>built
define("dojox/math/BigInteger",["dojo","dojox"],function(q,v){function l(a,b,c){null!=a&&("number"==typeof a?this._fromNumber(a,b,c):!b&&"string"!=typeof a?this._fromString(a,256):this._fromString(a,b))}function m(){return new l(null)}function z(a,b,c,d,f,e){for(;0<=--e;){var g=b*this[a++]+c[d]+f;f=Math.floor(g/67108864);c[d++]=g&67108863}return f}function A(a,b,c,d,f,e){var g=b&32767;for(b>>=15;0<=--e;){var h=this[a]&32767,l=this[a++]>>15,k=b*h+l*g,h=g*h+((k&32767)<<15)+c[d]+(f&1073741823);f=(h>>>
30)+(k>>>15)+b*l+(f>>>30);c[d++]=h&1073741823}return f}function B(a,b,c,d,f,e){var g=b&16383;for(b>>=14;0<=--e;){var h=this[a]&16383,l=this[a++]>>14,k=b*h+l*g,h=g*h+((k&16383)<<14)+c[d]+f;f=(h>>28)+(k>>14)+b*l;c[d++]=h&268435455}return f}function w(a){var b=m();b._fromInt(a);return b}function u(a){var b=1,c;if(c=a>>>16)a=c,b+=16;if(c=a>>8)a=c,b+=8;if(c=a>>4)a=c,b+=4;if(c=a>>2)a=c,b+=2;a>>1&&(b+=1);return b}function y(a){this.m=a}function x(a){this.m=a;this.mp=a._invDigit();this.mpl=this.mp&32767;
this.mph=this.mp>>15;this.um=(1<<a._DB-15)-1;this.mt2=2*a.t}q.getObject("math.BigInteger",!0,v);q.experimental("dojox.math.BigInteger");var p;"Microsoft Internet Explorer"==navigator.appName?(l.prototype.am=A,p=30):"Netscape"!=navigator.appName?(l.prototype.am=z,p=26):(l.prototype.am=B,p=28);var r=[],n,k;n=48;for(k=0;9>=k;++k)r[n++]=k;n=97;for(k=10;36>k;++k)r[n++]=k;n=65;for(k=10;36>k;++k)r[n++]=k;q.extend(y,{convert:function(a){return 0>a.s||0<=a.compareTo(this.m)?a.mod(this.m):a},revert:function(a){return a},
reduce:function(a){a._divRemTo(this.m,null,a)},mulTo:function(a,b,c){a._multiplyTo(b,c);this.reduce(c)},sqrTo:function(a,b){a._squareTo(b);this.reduce(b)}});q.extend(x,{convert:function(a){var b=m();a.abs()._dlShiftTo(this.m.t,b);b._divRemTo(this.m,null,b);0>a.s&&0<b.compareTo(l.ZERO)&&this.m._subTo(b,b);return b},revert:function(a){var b=m();a._copyTo(b);this.reduce(b);return b},reduce:function(a){for(;a.t<=this.mt2;)a[a.t++]=0;for(var b=0;b<this.m.t;++b){var c=a[b]&32767,d=c*this.mpl+((c*this.mph+
(a[b]>>15)*this.mpl&this.um)<<15)&a._DM,c=b+this.m.t;for(a[c]+=this.m.am(0,d,a,b,0,this.m.t);a[c]>=a._DV;)a[c]-=a._DV,a[++c]++}a._clamp();a._drShiftTo(this.m.t,a);0<=a.compareTo(this.m)&&a._subTo(this.m,a)},mulTo:function(a,b,c){a._multiplyTo(b,c);this.reduce(c)},sqrTo:function(a,b){a._squareTo(b);this.reduce(b)}});q.extend(l,{_DB:p,_DM:(1<<p)-1,_DV:1<<p,_FV:Math.pow(2,52),_F1:52-p,_F2:2*p-52,_copyTo:function(a){for(var b=this.t-1;0<=b;--b)a[b]=this[b];a.t=this.t;a.s=this.s},_fromInt:function(a){this.t=
1;this.s=0>a?-1:0;0<a?this[0]=a:-1>a?this[0]=a+_DV:this.t=0},_fromString:function(a,b){var c;if(16==b)c=4;else if(8==b)c=3;else if(256==b)c=8;else if(2==b)c=1;else if(32==b)c=5;else if(4==b)c=2;else{this._fromRadix(a,b);return}this.s=this.t=0;for(var d=a.length,f=!1,e=0;0<=--d;){var g;8==c?g=a[d]&255:(g=r[a.charCodeAt(d)],g=null==g?-1:g);0>g?"-"==a.charAt(d)&&(f=!0):(f=!1,0==e?this[this.t++]=g:e+c>this._DB?(this[this.t-1]|=(g&(1<<this._DB-e)-1)<<e,this[this.t++]=g>>this._DB-e):this[this.t-1]|=g<<
e,e+=c,e>=this._DB&&(e-=this._DB))}8==c&&0!=(a[0]&128)&&(this.s=-1,0<e&&(this[this.t-1]|=(1<<this._DB-e)-1<<e));this._clamp();f&&l.ZERO._subTo(this,this)},_clamp:function(){for(var a=this.s&this._DM;0<this.t&&this[this.t-1]==a;)--this.t},_dlShiftTo:function(a,b){var c;for(c=this.t-1;0<=c;--c)b[c+a]=this[c];for(c=a-1;0<=c;--c)b[c]=0;b.t=this.t+a;b.s=this.s},_drShiftTo:function(a,b){for(var c=a;c<this.t;++c)b[c-a]=this[c];b.t=Math.max(this.t-a,0);b.s=this.s},_lShiftTo:function(a,b){var c=a%this._DB,
d=this._DB-c,f=(1<<d)-1,e=Math.floor(a/this._DB),g=this.s<<c&this._DM,h;for(h=this.t-1;0<=h;--h)b[h+e+1]=this[h]>>d|g,g=(this[h]&f)<<c;for(h=e-1;0<=h;--h)b[h]=0;b[e]=g;b.t=this.t+e+1;b.s=this.s;b._clamp()},_rShiftTo:function(a,b){b.s=this.s;var c=Math.floor(a/this._DB);if(c>=this.t)b.t=0;else{var d=a%this._DB,f=this._DB-d,e=(1<<d)-1;b[0]=this[c]>>d;for(var g=c+1;g<this.t;++g)b[g-c-1]|=(this[g]&e)<<f,b[g-c]=this[g]>>d;0<d&&(b[this.t-c-1]|=(this.s&e)<<f);b.t=this.t-c;b._clamp()}},_subTo:function(a,
b){for(var c=0,d=0,f=Math.min(a.t,this.t);c<f;)d+=this[c]-a[c],b[c++]=d&this._DM,d>>=this._DB;if(a.t<this.t){for(d-=a.s;c<this.t;)d+=this[c],b[c++]=d&this._DM,d>>=this._DB;d+=this.s}else{for(d+=this.s;c<a.t;)d-=a[c],b[c++]=d&this._DM,d>>=this._DB;d-=a.s}b.s=0>d?-1:0;-1>d?b[c++]=this._DV+d:0<d&&(b[c++]=d);b.t=c;b._clamp()},_multiplyTo:function(a,b){var c=this.abs(),d=a.abs(),f=c.t;for(b.t=f+d.t;0<=--f;)b[f]=0;for(f=0;f<d.t;++f)b[f+c.t]=c.am(0,d[f],b,f,0,c.t);b.s=0;b._clamp();this.s!=a.s&&l.ZERO._subTo(b,
b)},_squareTo:function(a){for(var b=this.abs(),c=a.t=2*b.t;0<=--c;)a[c]=0;for(c=0;c<b.t-1;++c){var d=b.am(c,b[c],a,2*c,0,1);if((a[c+b.t]+=b.am(c+1,2*b[c],a,2*c+1,d,b.t-c-1))>=b._DV)a[c+b.t]-=b._DV,a[c+b.t+1]=1}0<a.t&&(a[a.t-1]+=b.am(c,b[c],a,2*c,0,1));a.s=0;a._clamp()},_divRemTo:function(a,b,c){var d=a.abs();if(!(0>=d.t)){var f=this.abs();if(f.t<d.t)null!=b&&b._fromInt(0),null!=c&&this._copyTo(c);else{null==c&&(c=m());var e=m(),g=this.s;a=a.s;var h=this._DB-u(d[d.t-1]);0<h?(d._lShiftTo(h,e),f._lShiftTo(h,
c)):(d._copyTo(e),f._copyTo(c));d=e.t;f=e[d-1];if(0!=f){var k=f*(1<<this._F1)+(1<d?e[d-2]>>this._F2:0),p=this._FV/k,k=(1<<this._F1)/k,q=1<<this._F2,t=c.t,n=t-d,s=null==b?m():b;e._dlShiftTo(n,s);0<=c.compareTo(s)&&(c[c.t++]=1,c._subTo(s,c));l.ONE._dlShiftTo(d,s);for(s._subTo(e,e);e.t<d;)e[e.t++]=0;for(;0<=--n;){var r=c[--t]==f?this._DM:Math.floor(c[t]*p+(c[t-1]+q)*k);if((c[t]+=e.am(0,r,c,n,0,d))<r){e._dlShiftTo(n,s);for(c._subTo(s,c);c[t]<--r;)c._subTo(s,c)}}null!=b&&(c._drShiftTo(d,b),g!=a&&l.ZERO._subTo(b,
b));c.t=d;c._clamp();0<h&&c._rShiftTo(h,c);0>g&&l.ZERO._subTo(c,c)}}}},_invDigit:function(){if(1>this.t)return 0;var a=this[0];if(0==(a&1))return 0;var b=a&3,b=b*(2-(a&15)*b)&15,b=b*(2-(a&255)*b)&255,b=b*(2-((a&65535)*b&65535))&65535,b=b*(2-a*b%this._DV)%this._DV;return 0<b?this._DV-b:-b},_isEven:function(){return 0==(0<this.t?this[0]&1:this.s)},_exp:function(a,b){if(4294967295<a||1>a)return l.ONE;var c=m(),d=m(),f=b.convert(this),e=u(a)-1;for(f._copyTo(c);0<=--e;)if(b.sqrTo(c,d),0<(a&1<<e))b.mulTo(d,
f,c);else var g=c,c=d,d=g;return b.revert(c)},toString:function(a){if(0>this.s)return"-"+this.negate().toString(a);if(16==a)a=4;else if(8==a)a=3;else if(2==a)a=1;else if(32==a)a=5;else if(4==a)a=2;else return this._toRadix(a);var b=(1<<a)-1,c,d=!1,f="",e=this.t,g=this._DB-e*this._DB%a;if(0<e--){if(g<this._DB&&0<(c=this[e]>>g))d=!0,f="0123456789abcdefghijklmnopqrstuvwxyz".charAt(c);for(;0<=e;)g<a?(c=(this[e]&(1<<g)-1)<<a-g,c|=this[--e]>>(g+=this._DB-a)):(c=this[e]>>(g-=a)&b,0>=g&&(g+=this._DB,--e)),
0<c&&(d=!0),d&&(f+="0123456789abcdefghijklmnopqrstuvwxyz".charAt(c))}return d?f:"0"},negate:function(){var a=m();l.ZERO._subTo(this,a);return a},abs:function(){return 0>this.s?this.negate():this},compareTo:function(a){var b=this.s-a.s;if(b)return b;var c=this.t;if(b=c-a.t)return b;for(;0<=--c;)if(b=this[c]-a[c])return b;return 0},bitLength:function(){return 0>=this.t?0:this._DB*(this.t-1)+u(this[this.t-1]^this.s&this._DM)},mod:function(a){var b=m();this.abs()._divRemTo(a,null,b);0>this.s&&0<b.compareTo(l.ZERO)&&
a._subTo(b,b);return b},modPowInt:function(a,b){var c;c=256>a||b._isEven()?new y(b):new x(b);return this._exp(a,c)}});q._mixin(l,{ZERO:w(0),ONE:w(1),_nbi:m,_nbv:w,_nbits:u,_Montgomery:x});v.math.BigInteger=l;return v.math.BigInteger});
//# sourceMappingURL=BigInteger.js.map