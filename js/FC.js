/* version 0.3.4 [12 August 2010] */

(function(){
	/** @id _FC */
	var _FC = (function(){
		var initializing = 0, 
			fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
		// create private static attributes and methods here
		var _isIE = /*@cc_on!@*/ !!0;
		var _xhr = window.XMLHttpRequest ? !!1 : !!0;
		
		var _isLteIE6 = /*@cc_on @*/ /*@if (@_jscript_version <= 5.6) !!1; /*@end @*/ !!0;
		var _isIE6 = /*@cc_on @*/ /*@if (@_jscript_version == 5.6) !!1; /*@end @*/ !!0;
		var _isLteIE7 = /*@cc_on @*/ /*@if (@_jscript_version <= 5.7) !!1; /*@end @*/ !!0;
		var _isIE7 = (_isLteIE7 && window.XMLHttpRequest) ? !!1 : !!0;
		
			_isIE6 = (_isLteIE7 && !window.XMLHttpRequest) ? !!1 : _isIE6;
			_isLteIE6 = (_isLteIE7 && !window.XMLHttpRequest) ? !!1 : _isLteIE6;
		
		//safari 2 detection
		var _detect = navigator.userAgent.toLowerCase();
		var _safari_2_x = (_detect.indexOf("safari") >=0 && _detect.indexOf("412") >= 0) ? !!1 : !!0; 
		
		var __appName = navigator.appName.toLowerCase();
		
		var _name = 'FC JavaScript Library.\n\n\u00A9 2009 Fortune Cookie UK';
			
		if (_isLteIE7) {// ie7 and below flicker fix
			try {document.execCommand('BackgroundImageCache', false, true);}catch(e){}	
		}
		
		return function(){
		// create private privileged properties and methods with 'this.'
		// create private private properties and methods with 'var' and 'function'
			/** @id hasIE */
			this.hasIE = (function(){return _isIE;})();
			/** @id hasLteIE6 */
			this.hasLteIE6 = (function(){return _isLteIE6})();
			/** @id hasIE6 */
			this.hasIE6 = (function(){return _isIE6})();
			/** @id hasLteIE7 */
			this.hasLteIE7 = (function(){return _isLteIE7})();
			/** @id hasIE7 */
			this.hasIE7 = (function(){return _isIE7})();
			/** @id hasSafari2 */
			this.hasSafari2 = (function(){return _safari_2_x})();
			/** @id FC */
			this.FC = (function(){return _name})();
			
			/** @id Class */
			// Nicked from John Resig and then refactored to namespace it
			this.Class = function(){};
			this.Class.subclass = function(prop){
				var _super = this.prototype;
				initializing = 1;
				var prototype = new this();
				initializing = 0;
	
				for (var name in prop) {
					prototype[name] = typeof prop[name] == "function" &&
					typeof _super[name] == "function" &&
					fnTest.test(prop[name]) ? (function(name, fn){
						return function(){
							var tmp = this._super;
							this._super = _super[name];
							var ret = fn.apply(this, arguments);
							this._super = tmp;
							
							return ret;
						};
					})(name, prop[name]) : prop[name];
				}
				
				function Class(){
					if (!initializing && this.init) 
						this.init.apply(this, arguments);
				}
				
				Class.prototype = prototype;
				Class.constructor = Class;
				Class.subclass = arguments.callee;
				
				return Class;
			};
			
			/** @id showChildren */
			this.showChildren = function (el) {
				var __str = "";
			
				for (var __j in el) {
					if (el.type || el.hasOwnProperty(__j)) {
						__str += __j + " = " + el[__j] + ", "
					}
				}
				
				//alert(__str); /*TODO put back */
			};
			
			/** @id commonEventObject */
			this.commonEventObject = function (e) {
				var __t;
					
				if (e.target) {
					__t = e.target;
				} else if (e.srcElement) {
					 __t = e.srcElement;
				}
				
				if (__t.nodeType == 3) {// defeat Safari bug
					__t = __t.parentNode;
				}
				
				return __t;
			};		
			
			/** @id stopReturn */
			this.stopReturn = function (e) {
				if (!e) {
					e = window.event;
				}
				(e.stopPropagation) ? e.stopPropagation() : e.cancelBubble = true;
				(e.preventDefault) ? e.preventDefault() : e.returnValue = false;
				return false;
			};
			
			/** @id clearTextNodes */
			this.clearTextNodes = function (n) {
				var __j = Number(n.length);
				while (__j--) if (n[__j].nodeType == 3) {
					n.removeChild(n[__j]);
				}
				return n;
			};
			
			/** @id clearNodes */	
			this.clearNodes = function (n) {
				while (n.firstChild) {
					n.removeChild(n.firstChild)
				}
				return n;
			};
			
			/** @id toDecimalString */
			this.toDecimalString = function (val) {
				__val = Number(val);
				return ((__val * 100) % 100) ? __val.toString() : __val + ".00";
			};
			
			/** @id getStyle */
			this.getStyle = function(el,styleProp) {
				var x = document.getElementById(el), y;
				if (x.currentStyle)
					y = x.currentStyle[styleProp];
				else if (window.getComputedStyle)
					y = document.defaultView.getComputedStyle(x,null).getPropertyValue(styleProp);
				return y;
			};
			
			/** @id getElementsByClassName */
			this.getElementsByClassName = function(cl) {
				var retnode = [], myclass = /'\\b' + cl + '\\b'/, elem = document.getElementsByTagName('*');
				var i = elem.length;
				while (i--) {
					if (myclass.test(elem[i].className)) retnode.push(elem[i]);
				}
				return (!retnode.length) ? null : retnode;
			};
			
			/** @id addEvent */	
			this.addEvent = function(obj, evt, fn){
				if (obj.addEventListener) obj.addEventListener(evt, fn, false);
				else if (obj.attachEvent) obj.attachEvent('on' + evt, fn);
				
				if (evt == "click" && obj.getAttribute) {
					if (obj.getAttribute('href')) {
						obj.onclick = function(){
							return false
						}
					} else if (obj.getAttribute('href') && !obj.getAttribute('onclick')) {
						var func = obj.onclick;
						obj.onclick = function(){
							func();
							return false;
						}
					}
				}	
			};
			
			/** @id removeEvent */
			this.removeEvent = function(obj, type, fn) {
				if (obj.removeEventListener)
					obj.removeEventListener(type,fn,false);
				else if (obj.detachEvent)
					obj.detachEvent('on'+type,fn);
			};
			
			/** @id toggle */
			this.toggle = function(el) {
				el.style.display = (el.style.display == 'none') ? 'block' : 'none';
			};
			
			/** @id setJS */
			this.setJS = function () {
				document.body.className = (document.body.className) ? document.body.className + " js" : "js";
			};
			
			/** @id setJQ */
			this.setJQ = function(){
				switch (__appName) {
					case 'playstation':
						break;
					default:
						document.body.className = (document.body.className) ? document.body.className + " jq" : "jq";
				}
			};
			
			/** @id checkChange */
			this.checkChange = function(str, o){ // receives a unique identifier (ie: an id) and an Object literal
				(o[str]) ? delete o[str] : o[str] = true;
				
				for (var __j in o) if (o.hasOwnProperty(__j)) {return true}
				
				return false;
			};
			
			/** @id beforeUnload */
			this.beforeUnload = function (str) {
				window.onbeforeunload = (str) ? function (e) {
					if (e) {
						e.returnValue = str; // required for FF
					}
					return str;
				} : null ;
			};
			
			/** @id resetForm */
			this.resetForm = function (form) {
				var __input = document.createElement('input');
				__input.setAttribute('type', 'reset')
				form.appendChild(__input);
				__input.click();
				form.removeChild(form.childNodes[form.childNodes.length]);
			};
			
			/** @id pngFix 
			 * Legacy
			 */
			this.pngFix = function(clear, parent){};
			
		};
	})();
	
	window.FC = new _FC();

})();