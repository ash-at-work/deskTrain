FC.vars = {
	slowSafari : ($.browser.safari && $.browser.version < 523),
	selectors: {
		ACCORDIAN: 'div.accordian',
		ACCORDIAN_TABLE: 'table.accordian-table',
		ADD_JOURNEY: 'a.add-journey',
		ADD_RAILCARDS: '.calculator a.add',
		AD_SEARCH_HOLDER: 'div.advanced-search-h',
		AD_SEARCH_BUTTON: 'a.adv-search',
		AD_SEARCH: 'div.advanced-search',
		ALERT_POPUP: '.alert-popup',
		AMBIGOUS_STATION_ERROR_TO: '#txtToSelect',
		AMBIGOUS_STATION_ERROR_FROM: '#txtFromSelect',
		CALLING_POINTS: 'tr.callingpoints',
		CHKBOX_BORDERS: '.checkbox-border',
		DATE_STATE: '#dateState',
		DATE_PICKER: 'div.date-picker',
		DATE_PICKER_CONTROL: 'a.date-picker-control',
		FARE_FIND: 'div.farefind',
		FARES_TAB: 'table.results th.fares-tab',
		FARES_MORE: 'table.results p.more-fares a',
		HOMEPAGE: 'div.homepage',
		HP_LIVE_TRAINS: 'div.homepage div.live-trains',
		INPUT_BORDERS: '.input-border',
		JP_TIMES: 'div.journey-planner-times',
		JP_WAYPOINTS: 'div.advanced-search-w',
		JP_WAYPOINT_ROUTE: 'div.advanced-search-route',
		JOURNEY_PLANNER: 'div.journey-planner',
		JOURNEY_DATES: '#txtDateRet',
		MINI_BASKET: 'div.miniBasket  div.ticket-total-padding',
		PT: 'div.pocket-timetable',
		RAILCARD_BUTTON: 'div.rcards button, div.rcards input',
		REGISTER_BUTTON: 'div.login .b-y',
		REGISTER_CLOSE: 'div.register p.close',
		REGISTER_PANEL: 'div.register-panel',
		REM_SEARCH_BUTTON: 'a.hide-search',
		RESULTS_TABLE: 'table.results',
		ROUTE_MAP: '#route-map',
		RTN_JOURNEY: 'div.journey-planner div.return',
		SEARCH_SUBMIT_BUTTON: 'div.button-holder button.fluid, div.button-holder span.fluid',
		SELECT_BORDERS: '.select-border',
		SHOW_MORE: 'div.show-more',
		SIDE_TABS: 'div.side-tabs',
		SMS_OPTIONS: '#alertSent',
		TICKER: 'div.ticker',
		TICKET_PROVIDER: 'div.ticket-provider',
		TIME_RANGE: 'div.time-range select',
		TIME_STATE: '#timeState',
		TOCS: 'div.operators div.TOC input:radio',
		TOOLTIP_HOLDER: 'div.tooltip, span.tooltip, li.tooltip',
		TRAIN_ACTION: '#train-action',
		TRAIN_ACTION_FIRST: '#train-action-first',
		TRAIN_ACTION_SECOND: '#train-action-second',
		TXTAREA_BORDERS: '.txtarea-border'	
	},
	paths: {
		CLEAR_GIF: 'images/clear.gif',
		TICKER_INFO: "http://nr-test.co.uk/dynjs/newsflash/newsflash_homepage.js",//'http://nationalrail.co.uk/dynjs/newsflash/newsflash_homepage.js',
		PREDICTIVE_FEED: 'javascript/stations-json.js'
	},
	messages: {
		MORE_FARES_ERROR: 'Error loading more fares',
		NO_STATIONS_ADDED: 'No stations added - please add stations below', //My account - stations tab
		CONFIRM_ACTION: 'Your changes will be lost.' //My account
	},
	links: {
		ADVANCE_INFO: 'Advance', //these vars will match the fare types on the fares page
		ADVANCE_INFO_LINK: '#Advance', //these links will need adding - links to fare info pages
		ANYTIME_INFO: 'Anytime',
		ANYTIME_INFO_LINK: '#Anytime',
		OFF_PEAK_INFO: 'Off Peak',
		OFF_PEAK_INFO_LINK: '#OffPeak'
	},
	ticker : {
		selectors: {
			newsType: ".ticker .update h2",
			newsUpdate: ".ticker .update",
			newsTypeValue: ["", "Live travel updates", "Service updates"],
			newsContainer: ".ticker .update p a",
			newsCounterText: ".ticker .functions p.counter",
			newsBack: "#back a",
			newsPause: "#pause a",
			newsForward: "#forward a",
			newsCounter: -1,
			newsLength: 0,
			newsInterval: 8000,
			newsTimer: 0,
			newsPauseBool: 0,
			newsCursor: "_",
			newsLetterCounter: 0,
			newsLetterTimer: 0,
			letters: 0
		}
	},
	clock : {
		TIME_SOURCE: "http://ojp.nationalrail.co.uk/currentTime",//"//ojp.nationalrail.co.uk/currentTime", 
		EMBED: "swf/clock/Clock-ad.swf"
	}
};

/*
 * Checks for an element then passes it to the relveant function
 * Pass variables via an array
 */
FC.presentPass = function(arr){
	var __NULL = null, __$ = $, // globals to locals
 		__$tmp, __o, __i = 0; // locals
	while (__o = arr[__i++]) 
		((__$tmp = __$(__o.test)) && __$tmp.length) ? __o.func(__$tmp, __o.args || __NULL) : __NULL;
	
	__$ = __$tmp = __o = __i = __NULL;
}

// EXTEND FC.vars WITH VARS SET ELSEWHERE
FC.extend = function(obj, defaults) {
	for (var i in defaults) {
		if (!obj[i]) {
			obj[i] = defaults[i];
		} else {
			FC.extend(obj[i], defaults[i]);
		}
	}
};
	
	// *** AB 02/08/2010 ***
FC.formBorders = function($parent){ // cleaned up formBorders to remove .each() and remove possible memory leak
	var __SEL = FC.vars.selectors,
		__$inputs = $parent.find('input, select, textarea'),
		__invalidBorderLarge, __invalidBorder, __invalidDoubBorder;
		
	var focusHandler = function (e) {
		var __thisPar = this.parentNode, __thisParPar = __thisPar.parentNode, __thisParParPar = __thisParPar.parentNode,
			__rE1 = /hidden-border/, __rE2 = /invalid/, __rE3 = /invalid-large/;
		
		if (!__rE1.test(__thisPar.className)) {
			__invalidBorder = !!__rE2.test(__thisParPar.className);
			__invalidBorderLarge = !!__rE3.test(__thisParParPar.className);
			__invalidDoubBorder = !!__rE2.test(__thisParParPar.className) && !__invalidBorderLarge;
			__thisPar.style.backgroundColor = '#ffe155';
		}
	};
		
	var blurHandler = function (e) {
		var __thisPar = this.parentNode;
		
		if (__thisPar.className.indexOf('hidden-border') === -1 && (__invalidBorderLarge || __invalidBorder || __invalidDoubBorder)) {
			__thisPar.style.backgroundColor = '#ff0000';
		} else {
			__thisPar.style.background = 'none';
		}
	};
	
	(function () {
		var __j = __$inputs.length;
		while (__j--) $(__$inputs[__j]).bind('focus', focusHandler).bind('blur', blurHandler);
	})();
};


FC.presentPass([{
	test:FC.vars.selectors.SIDE_TABS,
	func:function($parent){
		var __doc = document, __$ = $,
			__docStyle = __doc.body.style,
			__$ul = $parent.children('ul'), 
			__$li = __$ul.children('li'),
			__$content = __$li.find('div.side-tab-content'),
			__j = __$content.length, __h,
			__$confirmContent,
			__rEFixed = /fixed/,
			__isFixed = !!__rEFixed.test($parent[0].className), 
			__liHeight = 0, __hasChanged, __liLength = __$li.length,
			__uA = navigator.userAgent.toLowerCase(),
			
	// methods
			onYesClickHandler = function(e){
				if (FC.hasLteIE6) {
					$("iframe.hideSelect").remove();
					__docStyle.height = "auto";
					__docStyle.width = "auto";
					__doc.documentElement.style.overflow = "";
				}
				
				$("div.modal-popup").remove();
				$("div.overlay").remove();
				e.data.callback(true); // ??????
				return false;
			},
			
			onNoClickHandler = function(e){
				if (FC.hasLteIE6) {
					$("iframe.hideSelect").remove();
					__docStyle.height = "auto";
					__docStyle.width = "auto";
					__doc.documentElement.style.overflow = "";
				}
				
				$("div.modal-popup").remove();
				$("div.overlay").remove();
				e.data.callback(false);
				return false;
			},
			
			confirmAction = function(callback){
			 	var __rEMac = /mac/, __rEFF = /firefox/;
				
			 	try {
					if (FC.hasLteIE6) {//if IE 6
						__docStyle.height = "100%";
						__docStyle.width = "100%";
						__doc.documentElement.style.overflow = "hidden";
						if ($('iframe.hideSelect').length === 0) {//iframe to hide select elements in ie6
							$("body").append('<iframe class="hideSelect"></iframe><div class="overlay"></div><div class="box-8 box-8-short modal-popup"><div class="b8-t"><div class="b8-tr">&nbsp;</div></div><div class="b8-m"><div class="b8-p clear"><h3 class="sifr">Are you sure you want to proceed?</h3><p class="popup-text"></p></div></div><div class="b8-b"><div class="b8-br">&nbsp;</div></div></div>');
						}
					} else {//all others
						if (!document.getElementById("overlay")) {
							$("body").append('<div class="overlay"></div><div class="box-8 box-8-short modal-popup"><div class="b8-t"><div class="b8-tr">&nbsp;</div></div><div class="b8-m"><div class="b8-p clear"><h3 class="sifr">Are you sure you want to proceed?</h3><p class="popup-text"></p></div></div><div class="b8-b"><div class="b8-br">&nbsp;</div></div></div>');
						}
					}
					
					if (__rEMac.test(__uA) && __rEFF.test(__uA)) $("div.overlay").addClass("overlayMacFFBGHack");//use png overlay so hide flash
					else $("div.overlay").addClass("overlayBG");//use background and opacity
					
					$("p.popup-text").text(FC.vars.messages.CONFIRM_ACTION);
					
					$("div.modal-popup div.b8-p").append('<div class="buttons clear"><a class="b-b popup-no" href="#"><span>No</span></a><a class="b-b popup-yes" href="#"><span>Yes</span></a></div>');
					
					$("a.popup-yes").bind('click', {callback : callback}, onYesClickHandler).focus();
					$("a.popup-no").bind('click', {callback : callback}, onNoClickHandler);
				} 
				catch (e) {}		
			},
			
			changeTab = function (__this) {
				var __j = __liLength, __charAt, __liJ;
				while (__j--) {
					__liJ = __$li[__j];
					__liJ.className = __liJ.className.replace(/ selected/g, "");
				}
				__this[0].parentNode.parentNode.className += ' selected';
				
				if (__isFixed) {
					__listHeight = __$ul.height() - 40;
					__this.parent().siblings('div.side-tab-container').find('div.side-tab-content').height(__listHeight);
				} else {
					__listHeight = __this.parent().siblings('div.side-tab-container').height() - 52;
					__$ul.height(__listHeight);
				}
			},
			
			clickHandler = function(){
				var __$this = $(this), __inputs, __selects, __select, __k, __input, 
					__rESelected = /selected/, __rEConfirm = /confirmChange/,
					__liSelected = (function(){
						var __j = __liLength, __sel;
						while (__j--) {
							if ((__sel = __$li[__j]) && __rESelected.test(__sel.className)) {
								return __sel;
							}
						}
					})();
				
				if (__rEConfirm.test(__liSelected.className)) { // check if the form has been changed and alert before the user leaves
					__hasChanged = false;
					
					__inputs = __liSelected.getElementsByTagName('input');
					if (__inputs) {
						__k = __inputs.length;
						while (__k--) {
							__input = __inputs[__k];
							if (__input.type === 'radio') {
								if (__input.checked !== __input.defaultChecked) {
									__hasChanged = true;
									break;
								}
							} else if (__input.value !== __input.defaultValue) {
								__hasChanged = true;
								break;
							}
						}
					}
					
					if (!__hasChanged) {
						__selects = __liSelected.getElementsByTagName("select");
						if (__selects) {
							__k = __selects.length;
							while(__k--){
								__select = __selects[__k];
								if (!__select.options[__select.selectedIndex].defaultSelected) {
									__hasChanged = true;
									break;
								}
							}
						}
					}
					
					if (__hasChanged) {
						confirmAction(function(r){
							var __m, __i = 0;
							if (r) {
								if(__inputs){
									__k = __inputs.length;
									while (__k--) {
										__input = __inputs[__k];
										if (__input.type === 'radio') __input.checked = __input.defaultChecked;
										else __input.value = __input.defaultValue;
									}
								}
								
								if (__selects || (__selects = __liSelected.getElementsByTagName("select"))) {
									__k = __selects.length;
									while(__k--){
										__select = __selects[__k];
										__m = __select.length;
										for (;__i < __m; __i++) {
											if (__select.options[__i].defaultSelected) {
												__select.options[__i].selected = "selected";
												break;
											}
										}
									}
								}
								
								changeTab(__$this);
							}
						});
					} else  changeTab(__$this);		   
				} else changeTab(__$this);
				
				return false;
			};
		
	// init
		__$li.find('div.tab a').unbind().bind('click', clickHandler);
		
		if (__isFixed) { // ????? should be hard-coded height
			while (__j--) {
				__h = $(__$content[__j]).height();
				if (__h > __liHeight) __liHeight = __h
			}
			
			if (__$ul.height() < __liHeight) __$ul.height(__liHeight);
			else {
				__listHeight = __$ul.height() - 40;
				__j = __$content.length;
				while (__j--) $(__$content[__j]).height(__listHeight);
			}
		} else 
			__$(__$li[0]).find('div.tab a').trigger('click');
		
		
		__$confirmContent = __$li.filter('.confirmChange').find('div.side-tab-content');
		__$confirmContent.find('div.error-message a').unbind();
		__$confirmContent.find('button').unbind();
	}
}]);

FC.tooltip = function(tooltipHolder, __$parent){ /* removed the each and replaced with a while loop AB 09/08/2010 */
	var __$ = $, __FC = FC;
	var __$tgts = __$parent ? __$parent.find(tooltipHolder) : $(tooltipHolder);
	var __this, __$tgt, __class, __j = __$tgts.length-1, __$trs, __$par, __$next, __allTr = [], __$allTrs, __pos, __inner,
		__rEChanges = /changestip/, __rEStat = /\bstatus\b/, __rEStatus = /statustip/, __rEType = /typetip/, 
		__rEAdd = /addinfotip/, __rEFacilities = /facilitiestip/,
		__content, __classname, __control,
		__isClassFree, __isAFirst;
		
	var onClickKeypressHandler = function(e){
		var __$this = $(this), __tooltip = this.parentNode, 
			__rEPersist = /persist/,
			__data = __$.data(__tooltip, "vars"), 
			__$toolTop = __data.$toolTop, __toolTop = __$toolTop[0], 
			__slowerTrains = __data.slowerTrains;
			
		switch (e.keyCode) {
			case 9: case 16: case 18: case 17:
				return;
			default:			
				if (__rEPersist.test(__toolTop.className)) {
					__$toolTop.removeClass('persist').find('.close').css('display', 'none').unbind('click keypress');
					if (__FC.hasIE) {
					   __tooltip.style.zIndex = 100;								
						if(__slowerTrains)__slowerTrains.style.zIndex = 0;// Reverse IE 7/6 z-index bug workaround
						
						__toolTop.style.display = "none";
					} else { 
						__$toolTop.stop().animate({"opacity": 0}, 200, function(){
							__tooltip.style.zIndex = 100;
							this.style.display = "none";
						});
					}
				} else {
					__$toolTop.addClass('persist').find('.close').css('display', 'block').bind('click keypress', function(e){
						switch (e.keyCode) {
							case 9: case 16: case 18: case 17:
								return;
							default:
								__$(this).unbind('click keypress')
								__$(__tooltip).find('a')[0].focus();
								this.style.display = 'none';
								
								if (__FC.hasIE) {
									__toolTop.className = __toolTop.className.replace(/persist/, "");
									__tooltip.style.zIndex = 100;
									__toolTop.style.display = "none";
								} else {
									__$toolTop.removeClass('persist').stop().animate({"opacity": 0}, 200, function(){
										__toolTop.style.display = "none";
										__tooltip.style.zIndex = 100;
									});
								}
								
								return false;
						}
					});
					
					__FC.hasIE ? 
						__toolTop.style.display = "block" : 
						__$toolTop.stop().css("display", "block").animate({"opacity": 1}, 400);
						
					if(__$this.parents('.jp-acc').length) {
						__tooltip.style.zIndex = 10000; // Make sure tooltip overlaps form fields in the compact Journey Planner used within the accordion control
						if(__FC.hasIE && __slowerTrains) __slowerTrains.style.zIndex = 10000;// Work around z-index bug in IE 7 and 6
					} else __tooltip.style.zIndex = 110;
					
					if ($.fn.bgiframe) __$toolTop.bgiframe(); /* TODO - Remove this if possible */
				}
				return false;
		} // end switch
	};
		
	var onMouseEnterHandler = function(e){
		var win = window, doc = document, // globals
			$$this = $(this), __data = __$.data(this, "vars"), __$toolTop = __data.$toolTop, __slowerTrains = __data.slowerTrains;
		
		if($$this.parents('.jp-acc').length) {
			$$this.css('z-index', '10000');
			if(__FC.hasIE && __slowerTrains) __slowerTrains.style.zIndex = 10000;// Work around z-index bug in IE 7 and 6
		} else $$this.css('z-index', '110');
			
		if(__FC.hasIE) __$toolTop.css("display", "block");
		else __$toolTop.stop().css("display", "block").animate({"opacity": 1}, 400);
		
		var windowHeight = win.innerHeight || doc.documentElement.clientHeight || doc.body.clientHeight,
			scrollTop = doc.body.scrollTop;
			
		if (scrollTop == 0){
			if (win.pageYOffset) scrollTop = win.pageYOffset;
			else scrollTop = (doc.body.parentElement) ? doc.body.parentElement.scrollTop : 0;
		}
		
		var offset = __$toolTop.offset().top;
		var height = __$toolTop.height();
		
		if(windowHeight < offset - scrollTop + height)__$toolTop.addClass('tooltip-flip');
		
		if ( $.fn.bgiframe )__$toolTop.bgiframe();
	};
	
	var onMouseLeaveHandler = function(e){
		var __$this = $(this), __data = __$.data(this, "vars"),
			__rEPersist = /persist/,
			__$toolTop = __data.$toolTop, __toolTop = __$toolTop[0], __slowerTrains = __data.slowerTrains;
		
		if (!__rEPersist.test(__toolTop.className)) {
			if (__FC.hasIE) {
				__$this.css('z-index', '100');
				if(__slowerTrains) __slowerTrains.style.zIndex = 0;// Reverse IE 7/6 z-index bug workaround
				
				__toolTop.style.display = "none";
				__toolTop.className = __toolTop.className.replace(/tooltip-flip/g, "");
			} else {
				__$toolTop.stop().animate({"opacity": 0}, 200, function(){
					this.style.display = "none";
					$(this).parent().css('z-index', '100');
					__$this.find('.tooltip-flip').removeClass('tooltip-flip');
				});
			}
		}
	};
	
	while (__this = __$tgts[__j--]){
		__$this = __$(__this); __$trs = __$this.parents('tr'); __class = __this.className; __isClassFree = false;  
		
		if (__rEChanges.test(__class)) {
			__isAFirst = true; 
			__$next = __$trs.next('.changes');
			__content = '<div class="infodesc"><h4>Change information</h4></div>' + __$next.find('.changestext').html();
			
		} else if (__rEStatus.test(__class)) {
			__isAFirst = true;
			__$allTrs = (__$allTrs && __$allTrs[0].parentNode == __$trs[0].parentNode) ? __$allTrs : __$trs.parent().children('tr');
			__pos = __$allTrs.index(__$trs[0]);
			
			if (__$allTrs[++__pos] && __rEStat.test(__$allTrs[__pos].className) || __$allTrs[++__pos] && __rEStat.test(__$allTrs[__pos].className)) {
				__$next = __$(__$allTrs[__pos]);
			} 
			
			__content = (__inner = __$.find('.statustext', __$next[0])[0]) ? __inner.innerHTML : null;
			
		} else if (__rEType.test(__class)) {
			__isAFirst = true;
			__$par = __$this.parent();
			__$next = __$par.siblings('.typeDesc')
			__content = '<div>' + __$next.html() + '</div>';
			
		} else if (__rEAdd.test(__class)) {
			__classname = __$this.parents('li')[0].className;
			__$next = __$trs.next('.addinforow');
			__content = "<div class='" + __classname + "'>" + (__inner = __$.find('.'+__classname, __$next[0])[0]) ? __inner.innerHTML : null + "</div>";
			__$this.find('a').removeAttr('title');
			if (__allTr[__allTr.length-1] != __$next[0]) {
				__allTr[__allTr.length] = __$next[0]
			}
			
		} else if (__rEFacilities.test(__class)) {
			__content = $('.facilitiestip-content')[__j + 1].innerHTML;
			$($('.facilitiestip-content')[__j + 1]).remove();
		} else {
			__isClassFree = true;
			__content = (__$.find('img', __this).length) ? 
				'<p>' + __$this.find('img').attr('alt') + '</p>' : 
				'<p>' + __$this.find('a').attr('title') + '</p>';
			__$this.find('a').removeAttr('title');
		}
		
		if (__isAFirst && __$next[0]) {			
			__$next[0].text = "&nbsp;";
			if(__$next[0].parentNode) __$next[0].parentNode.removeChild(__$next[0]);
			delete __$next[0]
		}
		
		__$this.append('<div class="tooltip-top" style="display:none"><div class="tooltip-bottom clear"><div class="padding clear"><a href="#" class="close" style="display:none">close</a>' + __content + '</div></div></div>');
		
		if (!__FC.hasIE) __$this.find(".tooltip-top").css("opacity", "0");
		
		if (!__isClassFree) {
			if (__isAFirst) __control = __$this.find('a:first');
			else {
				__control = $('<a href="#' + __this.id + '" class="factip-ctl">' + __$this.find('h3').html() + '</a>');
				__$this.prepend(__control);
			}
			
			__control.bind('click keypress', onClickKeypressHandler);
		} else __$this.find('a:first').bind('click', function(e){return false;});
		
		$.data(__this, "vars", {
			slowerTrains : __$this.parents(".slower-trains")[0] || null,
			$toolTop : __$this.find(".tooltip-top")
		});
		
		__$this.bind('mouseenter', onMouseEnterHandler).bind('mouseleave', onMouseLeaveHandler);
	}
	
	__j = __allTr.length;
	
	while (__j--) { 
		__allTr[__j].text = "&nbsp;"; /* ETW - InnerHTML causes runtime error in IE6 */
		__allTr[__j].parentNode.removeChild(__allTr[__j]);
		delete __allTr[__j];
	}
	
};

/* AB 11/08/2010 rewrite of accordianTable */
FC.accordianTable = function($parent){
	/* start variable initialisation */
	var __$ = $, __doc = document, __isOldSafari = FC.vars.slowSafari,
		__rEExpanded = /expanded/,
		__$tgts = $parent.find('tr.accordian-header'), __tgt, __$tgt, __j = __$tgts.length,
		__$arrowContainer, __$tdA, __$content,
		__dF = __doc.createDocumentFragment(), __a = __doc.createElement("A"), __img = __doc.createElement("IMG"),
		__isExpanded,
	/* end variable initialisation */
	
	/* start event handlers */	
	__onFocusHandler = function (e) {
		var __rEHlt = /hlt/;
		if (!__rEHlt.test(this.className)) this.className += ' hlt'
	},
	
	__onBlurHandler = function  (e) {
		this.className = this.className.replace(/ hlt/g, "")
	}, 
	
	__onClickHandler = function (e){
		var __data, __$this, __rEExpanded;
		
		if (e.keyCode && e.keyCode !== 13) return;
		
		__$this = __$(this); __data = $.data(this, "vars"), __rEExpanded = /expanded/;
		
		if (__rEExpanded.test(this.className)) {
			__data.img.alt = 'expand ' + __data.title + ' panel';
			
			__isOldSafari ? //older versions of safari can't cope with sliding this element
				__data.$content.hide().removeClass('expanded-content') :
				__data.$content.slideUp(300).removeClass('expanded-content');
				
			this.className = this.className.replace(/ expanded/g, "" );
		} else {
			__data.img.alt = 'collapse ' + __data.title + ' panel';

			__isOldSafari ? //older versions of safari can't cope with sliding this element
				__data.$content.show().addClass('expanded-content') : 
				__data.$content.slideDown(500).addClass('expanded-content');
				
			this.className += ' expanded';
		}
		return false;
	};
	/* end event handlers */	
	
	/* start node population */	
	__img.width = "26"; __img.height = "26";
	__img.src = "images/clear.gif";
	__a.appendChild(__img);
	__a.href = "#";
	__dF.appendChild(__a);
	/* end node population */
	
	/* start process content */
	while (__j--) {
		__tgt = __$tgts[__j];
		__$tgt = __$(__tgt);

		__$arrowContainer = __$tgt.find('td.last');
		__$content = __$tgt.next('tr.acc-c').find('.exp-c');
		
		__title = __$tgt.find('td.first').text();
		
		__img.alt = (__rEExpanded.test(__tgt.className)) ? "collapse " + __title + " panel" : __img.alt = "expand " + __title + " panel";
			
		__$arrowContainer[0].innerHTML = "";
		__$arrowContainer[0].appendChild(__dF.cloneNode(true));
		
		__$anchor = __$arrowContainer.find('a');
		
		(function () {
			__$tgt
				.bind('mouseover focusin', __onFocusHandler)
				.bind('mouseout focusout', __onBlurHandler)
				.bind('click', __onClickHandler)
				.bind('keypress', __onClickHandler);
		})();

		$.data(__tgt, "vars", {
			title : __title,
			$arrowContainer :__$arrowContainer,
			img : __$anchor.find('img')[0],
			$content : __$content
		});
	}
	/* end process content */
	
	/* start clean-up */
	while (__dF.firstChild) {
		__dF.firstChild.innerHTML = "";
		__dF.removeChild(__dF.firstChild);
	}
	/* end clean-up */
};

/* AB 09/08/2010 rewrite of accordian */
FC.accordian = function($parents){	
	/* start variable initialisation */
	var __$ = $, __doc = document, __isOldSafari =  FC.vars.slowSafari, // global
		__rEReturn = /return/, __rEOutward = /outward/, __rEExpanded = /expanded/,
		__tgt, __$tgt, __multiOpen,
		__dF = __doc.createDocumentFragment(), __a = __doc.createElement("A"), __img = __doc.createElement("IMG"), __span = __doc.createElement("SPAN"),
		__$parent, __parent, __j = $parents.length,
		__$anchor, __$content,
		__title, __$headArrows, __headArrow, __isExpanded,
	/* end variable initialisation */
	
	/* start event handlers */	
	__onFocusHandler = function (e) {
		var __rEHlt = /\bhead-hlt\b/g;
		if (!__rEHlt.test(this.className)) this.className += ' head-hlt'
	},
	
	__onBlurHandler = function  (e) {
		this.className = this.className.replace(/\bhead-hlt\b/g, "")
	}, 
	
	__onClickHandler = function (e){
		var __this = this, __$this, __data,
			__rEHead = /head/, __rEExpanded = /expanded/,
			__title, __multiOpen, __a, __img;
		
		if (!__rEHead.test(__this.className)) return; // if this is not a .head div, then return the function
		if (e.keyCode && e.keyCode !== 13) return; // if this is from a keypress but not Enter then return

		__$this = __$(__this); __data = $.data(__this, "vars");
		__img = __data.img; __multiOpen = __data.multiOpen;
		
		if (!__rEExpanded.test(__this.className)) { // if the this is not already expanded
			__img.alt = 'expand ' + __data.title + ' panel';
				
			if (__isOldSafari) { //older versions of safari can't cope with sliding this element
				if (!__multiOpen) __data.$contentSiblings.hide().removeClass('expanded-content');
				__data.$next.show().addClass('expanded-content');
			} else {
				if (!__multiOpen) __data.$contentSiblings.filter('.expanded-content').slideUp(200).removeClass('expanded-content');
				__data.$next.slideDown(300).addClass('expanded-content');
			}
			
			if (!__multiOpen)  __data.$headSiblings.removeClass('expanded');
			
			__this.className += ' expanded';
		} else { // only do if the this is already expanded				
			__img.alt = 'collapse ' + __data.title + ' panel';
  
			__isOldSafari ? //older versions of safari can't cope with sliding this element
				__data.$next.hide().addClass('expanded-content'):
				__data.$next.slideUp(300).addClass('expanded-content');
			
			__this.className = __this.className.replace(/\bexpanded\b/g, "");
		}
		return false
	}
	/* end event handlers */	
	
	/* start node population */	
	__img.width = "26"; __img.height = "26";
	__img.src = "images/clear.gif";
	__a.appendChild(__span);
	__a.appendChild(__img);
	__a.href = "#";
	__a.className = "arrow";
	__dF.appendChild(__a);
	/* end node population */
	
	/* start process content */
	while (__j--){
		__parent = $parents[__j];
		__$parent = __$(__parent);
		
		// go through div.head and add events
		__$contentSiblings = __$parent.find('div.acc-c');
		__$tgts = __$parent.find(".head"); __k = __$tgts.length;
		while (__k--) {
			__tgt = __$tgts[__k]
			__$tgt = __$(__tgt);
			
			__title = __$tgt.find('h2').length ? __$tgt.find('h2').text() : __$tgt.find('h3').text();
			__headArrow = __$tgt.find('div.head-arrow')[0]; 
			
			if (__rEOutward.test(__headArrow.className)) __span.innerHTML = "Outward journey details";
			else if(__rEReturn.test(__headArrow.className)) __span.innerHTML = "Return journey details";
			
			__img.alt = (__rEExpanded.test(__tgt.className)) ? "collapse " + __title + " panel" : "expand " + __title + " panel"; 
			
			//__headArrow.innerHTML = "";
			__headArrow.appendChild(__dF.cloneNode(true));
			
			__$anchor = __$tgt.find("a");
			
			(function(){
				__$tgt
					.bind('mouseenter focusin', __onFocusHandler)
					.bind('mouseleave focusout', __onBlurHandler)
					.bind('keypress', __onClickHandler)
					.bind('click', __onClickHandler);
			})();

			$.data(__tgt, "vars", {
				multiOpen : !!/multi-open/.test(__parent.className),
				title : __title,
				$arrowContainer : __headArrow,
				img : __$anchor.find('img')[0],
				$next : __$tgt.next('div.acc-c'),
				$headSiblings : __$tgts,
				$contentSiblings : __$contentSiblings
			});
		}
	}
	/* end process content */
	
	/* start clean-up */
	while (__dF.firstChild) {
		__dF.firstChild.innerHTML = "";
		__dF.removeChild(__dF.firstChild)
	}
	/* end clean-up */
};

FC.onScriptReceived = function () {
	var __SEL = FC.vars.ticker.selectors, __$ = $,
	
	tickerAnim = function(){
		var container = __SEL.newsContainer;
		if (__SEL.newsLetterCounter < __SEL.letters.length) {
			$(container).append(__SEL.letters[__SEL.newsLetterCounter]);
			__SEL.newsLetterCounter = __SEL.newsLetterCounter + 1;
			__SEL.newsLetterTimer = setTimeout(arguments.callee, 20);
		}
		else {
			clearTimeout(__SEL.newsLetterTimer);
		}
	};
	
	loadNews = function(dir){ /* added local variable to hold FC.vars.ticker.selectors AB 09/08/2010 */
		var __num, __infoArr, newsText, newsUrl;
			
		clearTimeout(__SEL.newsLetterTimer);
		clearTimeout(__SEL.newsTimer);
		
		__SEL.newsLetterCounter = 0;
		
		if (dir === 0) {
			if (__SEL.newsCounter <= 0) {
				__SEL.newsCounter = __SEL.newsLength;
			}
			__SEL.newsCounter--;
		} else {
			__SEL.newsCounter++;
			if (__SEL.newsCounter >= __SEL.newsLength) {
				__SEL.newsCounter = 0;
			}
		}
		
		var __$container = __$(__SEL.newsContainer);
		__infoArr = tickerData[__SEL.newsCounter];
		newsText = __infoArr[1];
		newsUrl = __infoArr[2];
		__SEL.letters = [];
		
		for (i = 0; i < newsText.length; i++) {
			__SEL.letters.push(newsText.substring(i, i + 1));
		}
		
		__num = __SEL.newsCounter + 1;
		$(__SEL.newsCounterText).empty().append("(" + __num + " of " + __SEL.newsLength + ")");
		
		__$container.empty();
		
		__SEL.newsLetterTimer = setTimeout(tickerAnim, 20);
		
		(__infoArr[3] == 1) ? __$container.attr('href', newsUrl): __$container.removeAttr('href');
		
		$(__SEL.newsType).empty().append(__SEL.newsTypeValue[__infoArr[0]]);
		$(__SEL.newsType).attr("class", "alert");
		
		if (__SEL.newsPauseBool === 0) {
			__SEL.newsTimer = setTimeout(loadNews, __SEL.newsInterval);
		}
	};
	
	onClickHandler = function (e) {
			loadNews(e.data ? e.data.dir : null);
			return false;
	},
	
	onToggleIn = function(){
		clearTimeout(__SEL.newsTimer);
		clearTimeout(__SEL.newsLetterTimer);
		$(__SEL.newsPause).parent().css({
			'background-position': '-48px 0'
		});
		__SEL.newsPauseBool = 1;
	},
	
	onToggleOut = function(){
		__SEL.newsTimer = setTimeout(loadNews, __SEL.newsInterval);
		__SEL.newsLetterTimer = setTimeout(tickerAnim, 200);
		$(__SEL.newsPause).parent().css({
			'background-position': '-23px 0'
		});
		__SEL.newsPauseBool = 0;
	};
	__SEL.newsLength = tickerData.length;
	
	if(__SEL.newsLength){
		$(__SEL.newsContainer).empty(); //Create header
		$("div.functions p.counter") //Create controls
			.after("<ul><li id='back'><a href='#'><img src='images/spacer.gif' height='24' width='23' alt='' /><span class='accessibility'>Back</span></a></li><li id='pause'><a href='#'><img src='images/spacer.gif' height='24' width='26' alt='' /><span class='accessibility'>Pause</span></a></li><li id='forward'><a href='#'><img src='images/spacer.gif' height='24' width='20' alt='' /><span class='accessibility'>Forward</span></a></li></ul>");
		loadNews();//Initialise
	   
		// bind news controls
		$(__SEL.newsBack).unbind().bind("click", {dir : 0}, onClickHandler);
		$(__SEL.newsPause).toggle(onToggleIn, onToggleOut);
		$(__SEL.newsForward).unbind().bind("click", onClickHandler);
	}
};

FC.tickerInit = function(){
	$.getScript(FC.vars.paths.TICKER_INFO, FC.onScriptReceived);
};

/*
 * ETW - Minor opt to this function
 */

FC.clearFields = function(parent){ 

	var __$parent = parent ? $(parent) : $('body');
	
	var selectFields = __$parent.find("select"),
		textFields = __$parent.find("input[type=text]"),
		textareas = __$parent.find("textarea");
	
	selectFields.css({"color": "#666666"});
	textFields.css({"color": "#666666"});
	
	selectFields.bind("focus", function(){
		if (this.value === this.defaultValue) this.style.color = "#404040";
	});
	
	textareas.bind("focus", function(){
		var __rE = /noclear/;
		if (!__rE.test(this.className)) {
			if (this.value == this.defaultValue) {
				this.value = "";
				this.style.color = "#404040";
			}
		}
	});
	
	textFields.bind("focus", function(){ /* rewritten AB 09/08/2010 to be less jQ dependent */
		var __$tgt = $(this);
		
		if (!this.className.match(/noclear/g)) {
			if (this.value == this.defaultValue) {
				this.value = "";
				this.style.color = "#404040";
			}
		}
		
	});
	
	//Firefox check if the field is not equal to the default value when first loaded.
	
	/* AB would be better if form had an autocomplete attribute set to 'off' */
	textFields.each(function(){
		if (this.value != this.defaultValue) {
			this.style.color = "#404040"
		}
	});
	textareas.each(function(){
		if (this.value != this.defaultValue) {
			this.style.color = "#404040"
		}
	});
};


FC.setFutureDate = function(id, days){
	//Set high range date
	/* TODO - Figure this out */
	var cal = datePickerController.getDatePicker(id),
		d = new Date(),
		date = d.getDate();
		
	d.setDate(date + days);
	
	var fDay = d.getDate(),
		fMonth = d.getMonth() + 1,
		fYear = "" + d.getFullYear();
	
	if (fDay < 10) fDay = "0" + fDay;
	else fDay = fDay.toString();
	
	if (fMonth < 10) fMonth = "0" + fMonth;
	else fMonth = fMonth.toString();
	
	cal.setRangeHigh(fYear + fMonth + fDay);
};

FC.showSels = function(){ /* rewritten AB 09/08/2010 to use hasLteIE6 */
	if (FC.hasLteIE6) { //Show selects for IE6
		$("select").css({
			"visibility": "visible"
		});
	}
};

FC.hideSels = function(){ /* rewritten AB 09/08/2010 to use hasLteIE6 */
	if (FC.hasLteIE6) { //Show selects for IE6
		$("select").css({
			"visibility": "hidden"
		});
	}
};

//TRAVEL ALERTS - RESULTS TABLE ROLLOVER 
FC.resultsTable = function(sel){
	var tr = $(sel).find("tr");
	tr.bind("mouseover", function(){
		$(this).addClass("selected");
	});
	tr.bind("mouseout", function(){
		var checkbox = $(this).find(".alert input[type=checkbox]");
		if (checkbox.attr("checked") !== true) {
			$(this).removeClass("selected");
		}
	});
};

//GENERIC TABLE ROLLOVER 
FC.tableRollover = function(table, css){
	var __$ = $, tr = __$.find(table + ' tr'),
		onMouseOver = function(e){__$(this).addClass(e.data.a)},
		onMouseOut = function(e){__$(this).removeClass(e.data.a)};
	
	(function (j) {
		while(j--) __$(tr[j]).bind("mouseover",{a:css},onMouseOver).bind("mouseout",{a:css},onMouseOut)
	})(tr.length);
};

//GENERIC TABLE ROLLOVER WITH RADIO BUTTON
FC.tableRolloverRadio = function(row, css){
	var table = $(row);
	var tr = table.find("tr");
	var radios = table.find("input[type=radio]");
	tr.bind("mouseover", function(){
		$(this).addClass(css);
	});
	tr.bind("mouseout", function(){
		var radio = $(this).find("input[type=radio]");
		if (radio.attr("checked") !== true) {
			$(this).removeClass(css);
		}
	});
	radios.bind("click", function(){
		tr.removeClass("selected");
		$(this).parents("tr").addClass("selected");
	});
	
};

/*
 * ETW * Only called once * Very brief opt
 */
FC.showMore = function(sel){
	$(sel).each(function(){
		$this = $(this);
		$this.before('<a href="#" class="show-more-link">Find out more about topic</a>');
		function showMoreClick(__clicked){
			var safriCheck =  FC.vars.slowSafari;
			if ($(__clicked).next().hasClass('show-more-expanded')) {
				$(__clicked).removeClass('show-more-link-expanded');
				//older versions of safari can't cope with sliding this element
				safriCheck ? $(__clicked).next().removeClass('show-more-expanded').hide() : $(__clicked).next().removeClass('show-more-expanded').slideUp(200); 
			}
			else {
				$(__clicked).addClass('show-more-link-expanded');
				//older versions of safari can't cope with sliding this element
				safriCheck ? $(__clicked).next().addClass('show-more-expanded').show() : $(__clicked).next().addClass('show-more-expanded').slideDown(400);
			}
		}
		$this.prev().bind('click', function(e){
			showMoreClick(this);
			return false;
		}).bind('keypress', function(e){
			if(e.keyCode == 13) {
				showMoreClick(this);
				return false;
			}
		});
	});
};

//HOME PAGE REGISTER FLYOUT
/*
 * Shows an iFrame on Let's Go button click.
 * candidate for more opt as this is a key page.
 */
FC.registerFlyout = function(button){
		
	var FCSelectors = FC.vars.selectors;
	var register = $(FCSelectors.REGISTER_PANEL);
	var iframe = $('iframe', FCSelectors.REGISTER_PANEL);
	var journeyplanner_inputs = $("div.journey-planner div.button-holder");
	
	button = $(button);
	
	button.toggle(function(){
						   
		button.parents(".top-section").css({"z-index":"10"})				   
						   
		register.css({
			"display": "block"
		});
		register.animate({
			opacity: 1
		}, 250, function(){
			//Add a close button
			register.append("<p class='close'><a href='#'>Close</a></p>");
			$("p.close", register).bind("click", function(){button.trigger('click');})
		});
		journeyplanner_inputs.css({
			"display": "none"
		});
		return false;
	}, function(){
		
		button.parents(".top-section").css({"z-index":"2"})
		
		register.animate({
			opacity: 0
		}, 250, function(){
			register.css({
				"display": "none"
			});
			journeyplanner_inputs.css({
				"display": "block"
			});
			$("p.close", register).remove();
		});
		return false;
	});
	
};

//HOMEPAGE TRAIN ACTION
FC.trainAction = function(){
	var action = $(FC.vars.selectors.TRAIN_ACTION);
	var first = $(FC.vars.selectors.TRAIN_ACTION_FIRST);
	var second = $(FC.vars.selectors.TRAIN_ACTION_SECOND);
	
	action.bind("change", function(){
	
		if (action.val() == "Arriving") {
			first.text("at");
			second.text("from");
		}
		else {
			first.text("from");
			second.text("to");
		}
		
	});
	
};

//ADVANCED SEARCH
/*
 * ETW - Only called once - Minor opt.
 * candidate for more opt as this is a key page.
 */
FC.advancedSearch = function($adHolder){

	var adSearch = $adHolder.find(FC.vars.selectors.AD_SEARCH);
	var adButton = $(FC.vars.selectors.AD_SEARCH_BUTTON);
	var adHolder = $adHolder;
	var remButton = $(FC.vars.selectors.REM_SEARCH_BUTTON);
	var subButton = $(FC.vars.selectors.SEARCH_SUBMIT_BUTTON);
	
	adButton.addClass("active").attr("title","");
	remButton.addClass("active").attr("title","");
	
	var subButtonBottom = subButton.css('bottom');
	
	if (FC.vars.slowSafari) {
		subButton.css({
			"bottom": "auto",
			"top": "11px"
		});
	} else {
		if (!FC.hasIE) {
			adHolder.css({
				"opacity": 0
			});
		} else {
			$('div.advanced-search-p', adHolder).css({
				"visibility": "hidden"
			});
		}
	}
	
	adButton.bind("click", function(){
		openAdvanced();
		return false;
	});
	
	function justShowAdvanced(){
		adButton.parent().hide();
		adHolder.show();
		remButton.unbind('click').bind("click", function(){
			closeAdvanced();
			return false;
		});
		if(!$("#journey-planner-replan").length) $('div.advanced-search-p a.hide-search').focus();
	}
	
	function openAdvanced(){
		if (FC.vars.slowSafari) {
			justShowAdvanced();
		}
		else 
			if (FC.hasIE) {
				adButton.css({
					"visibility": "hidden"
				});
				adButton.parent().hide(400);
				subButton.animate({
					"bottom": "2px"
				}, 600);
				adHolder.slideDown(600, function(){
					$('div.advanced-search-p', $(this)).css({
						"visibility": "visible"
					});
					remButton.unbind('click').bind("click", function(){
						closeAdvanced();
						return false;
					});
					$('div.advanced-search-p a.hide-search').focus();
				});
			}
			else {
				subButton.animate({
					"bottom": "2px"
				}, 250);
				adButton.parent().animate({
					"opacity": 0
				}, 250, function(){
					$(this).hide(400);
					adHolder.slideDown(600, function(){
						$(this).animate({
							"opacity": 1
						}, 250, function(){
							remButton.unbind('click').bind("click", function(){
								closeAdvanced();
								return false;
							});
							$('div.advanced-search-p a.hide-search').focus();
						});
					});
				});
			}
		$('#jpState').val($('#jpState').val() + 'Advanced');
	}
	
	function closeAdvanced(){
		if (FC.vars.slowSafari) {
			adButton.parent().show();
			adHolder.hide();
			adButton.unbind('click').bind("click", function(){
				openAdvanced();
				return false;
			});
			$('ul.jpActions a.adv-search').focus();
		}
		else 
			if (FC.hasIE) {
				adHolder.find('.advanced-search-p').css({
					"visibility": "hidden"
				});
				adButton.parent().show(400, function(){
					adButton.css({
						"visibility": "visible"
					});
				});
				subButton.animate({
					"bottom": subButtonBottom
				}, 600);
				adHolder.slideUp(600, function(){
					adButton.unbind('click').bind("click", function(){
						openAdvanced();
						return false;
					});
					$('ul.jpActions a.adv-search').focus();
				});
			}
			else {
				adHolder.animate({
					"opacity": 0
				}, 250, function(){
					adButton.parent().show(400);
					$(this).slideUp(600, function(){
						subButton.animate({
							"bottom": subButtonBottom
						}, 250);
						adButton.parent().animate({
							"opacity": 1
						}, 250, function(){
							adButton.unbind('click').bind("click", function(){
								openAdvanced();
								return false;
							});
							$('ul.jpActions a.adv-search').focus();
						});
					});
				});
			}
		$('#jpState').val($('#jpState').val().replace('Advanced', ''));
	}
	
	
	if (($('#jpState').val() == 'returnAdvanced') || ($('#jpState').val() == 'singleAdvanced')) {
		if (!FC.hasIE) {
			adButton.parent().css({
				"opacity": 0
			});
			adHolder.css({
				"opacity": 1
			});
		}
		else {
			$('div.advanced-search-p', adHolder).css({
				"visibility": "visible"
			});
		}
		justShowAdvanced();
	}
};


//HOMEPAGE ADD JOURNEY
/*
 * Minimal opt. candidate for more opt as this is a key page.
 */
FC.addJourney = function(){

	if ($('#jpState').val() === '') {
		$('#jpState').val('single');
	}
	var ret = $("div.journey-planner div.return");
	
	var type = "replace";
	
	if ($.find("div.return-prepend").length) {
		ret.prepend($('<ul></ul>').addClass('actions clear').append($('<li></li>').append($('<a></a>').addClass('remove-journey').attr('href', '#').text('Remove return journey'))));
		type = "showhide";
	}
	else 
		if ($.find("div.return-append").length) {
			ret.append($('<ul></ul>').addClass('actions clear').append($('<li></li>').append($('<a></a>').addClass('remove-journey').attr('href', '#').text('Remove return journey'))));
			type = "showhide";
		}
	
	var add = $(FC.vars.selectors.ADD_JOURNEY);
	var removeRet = $("div.journey-planner a.remove-journey");
	var subButton = $(FC.vars.selectors.SEARCH_SUBMIT_BUTTON);
	var subButtonBottom = subButton.css('bottom');
	var slowerTrainsCheckboxInAccordion = $(".jp-acc .slower-trains");
	
	add.addClass("active").attr("title","");
	removeRet.addClass("active").attr("title","");
	
	if (FC.vars.slowSafari) {
		subButton.css({
			"bottom": "auto"
		}).css({
			"top": "11px"
		});
	} else if (!FC.hasIE) {
		ret.css({
			"opacity": 0
		});
	} else {
		ret.children().css({
			"visibility": "hidden"
		});
	}
	ret.hide();
	
	add.bind("click", function(){
		openReturn();
		return false;
	});
	
	function updateZoom(){
		subButton.css({
			"zoom": "0"
		});
		subButton.css({
			"zoom": "1"
		});
	}
	
	function justShow(){
		if (type == "showhide") {
			add.parent().hide();
			ret.show();
			removeRet.unbind('click').bind("click", function(){
				closeReturn();
				return false;
			});
		}
		else {
			ret.show();
			add.attr("class", "remove-journey").empty().append("Remove return journey").unbind('click').bind("click", function(){
				closeReturn();
				return false;
			});
			add.parent().css({
				"opacity": 1
			});
		}
		if(!$("#journey-planner-replan").length) $('a.remove-journey').focus();
	}
	
	function resetValues(){
		$('select', ret).each(function(){
			this.selectedIndex = 0;
		});
		$('input', ret).each(function(){
			$(this).val('dd/mm');
		});
	}
	
	function openReturn(){
		FC.journeyDates(true);
		if (FC.vars.slowSafari) {
			justShow();
		} else if (FC.hasIE) {
			add.css({"visibility": "hidden"});
			if (type == "showhide") {
				$('a.date-picker-control', ret).css({"visibility": "hidden"});
				add.parent().hide(400, function(){
					ret.slideDown(400, function(){
						ret.addClass('return-open');// Add class to allow space to be added above the 'Remove return journey control' so that the slower trains checkbox can appear above it. Only used when the Journey Planner appears within the accordian on template 1.1.3
						ret.children().css({
							"visibility": "visible"
						});
						ret.find('a.date-picker-control').css({
							"visibility": "visible"
						});
						removeRet.unbind('click').bind("click", function(){
							closeReturn();
							return false;
						});
						updateZoom();
						$('a.remove-journey').focus();
					});
					slowerTrainsCheckboxInAccordion.animate({'top': '-3em'}, 400);// Move â€œInclude slower trainsï¿½? checkbox above the â€œRemove return journeyï¿½? control, but only when the Journey Planner is used within the accordian on template 1.1.3
				});
			} else {
				$('a.date-picker-control', ret).css({"visibility": "hidden"});
				ret.slideDown(400, function(){
					ret.addClass('return-open');// Add class to allow space to be added above the â€œRemove return journey controlï¿½? so that the slower trains checkbox can appear above it. Only used when the Journey Planner appears within the accordian on template 1.1.3
					ret.children().css({"visibility": "visible"});
					$('a.date-picker-control', ret).css({"visibility": "visible"});
					add.attr("class", "remove-journey").empty().append("Remove return journey").unbind('click').bind("click", function(){
						closeReturn();
						return false;
					});
					add.css({"visibility": "visible"});
					updateZoom();
					$('a.remove-journey').focus();
				});
				slowerTrainsCheckboxInAccordion.animate({'top': '-3em'}, 400);// Move â€œInclude slower trainsï¿½? checkbox above the â€œRemove return journeyï¿½? control, but only when the Journey Planner is used within the accordian on template 1.1.3
			}
		} else {
			ret.stop();
			add.parent().animate({"opacity": 0}, 250, function(){
				if (type == "showhide") {
					$(this).hide(400, function(){
						ret.show(400, function(){
							ret.addClass('return-open');// Add class to allow space to be added above the â€œRemove return journey controlï¿½? so that the slower trains checkbox can appear above it. Only used when the Journey Planner appears within the accordian on template 1.1.3
							ret.animate({"opacity": 1}, 250, function(){
								removeRet.unbind('click').bind("click", function(){
									closeReturn();
									return false;
								});
								$('a.remove-journey').focus();
							});
						});
						slowerTrainsCheckboxInAccordion.animate({'top': '-3em'}, 400);// Move â€œInclude slower trainsï¿½? checkbox above the â€œRemove return journeyï¿½? control, but only when the Journey Planner is used within the accordian on template 1.1.3
					});
				} else {
					ret.show(400, function(){
						ret.addClass('return-open');// Add class to allow space to be added above the â€œRemove return journey controlï¿½? so that the slower trains checkbox can appear above it. Only used when the Journey Planner appears within the accordian on template 1.1.3
						ret.animate({"opacity": 1}, 250, function(){
							add.attr("class", "remove-journey").empty().append("Remove return journey").unbind('click').bind("click", function(){
								closeReturn();
								return false;
							});
							add.parent().animate({"opacity": 1}, 250);
							$('a.remove-journey').focus();
						});
						slowerTrainsCheckboxInAccordion.animate({'top': '-3em'}, 400);// Move â€œInclude slower trainsï¿½? checkbox above the â€œRemove return journeyï¿½? control, but only when the Journey Planner is used within the accordian on template 1.1.3
					});
				}
			});
		}
		$('#jpState').val($('#jpState').val().replace('single', 'return'));
	}
	
	function closeReturn(){
		FC.journeyDates();
		if ( FC.vars.slowSafari) {
			ret.removeClass('return-open');//Remove class used to leave space for the slower trains checkbox on template 1.1.3 (see comments above)
			ret.hide();
			slowerTrainsCheckboxInAccordion.animate({'top': '0'}, 400);//Move slower trains checkbox back down to its normal position (see comments above)
			if (type == "showhide") {
				add.parent().show();
				add.unbind('click').bind("click", function(){
					openReturn();
					return false;
				});
				updateZoom();
				resetValues();
				$('a.add-journey').focus();
			}
			else {
				add.attr("class", "add-journey").empty().append("Add a return journey").unbind('click').bind("click", function(){
					openReturn();
					return false;
				});
				updateZoom();
				resetValues();
				$('a.add-journey').focus();
			}
		}
		else 
			if (FC.hasIE) {
				ret.removeClass('return-open');//Remove class used to leave space for the slower trains checkbox on template 1.1.3 (see comments above)
				ret.children().css({
					"visibility": "hidden"
				});
				ret.find('.date-picker-control').css({
					"visibility": "hidden"
				});
				ret.slideUp(400, function(){
					if (type == "showhide") {
						add.parent().show(400, function(){
							add.css({
								"visibility": "visible"
							});
							$('a.add-journey').focus();
						});
						add.unbind('click').bind("click", function(){
							openReturn();
							return false;
						});
						updateZoom();
						resetValues();
					}
					else {
						add.attr("class", "add-journey").empty().append("Add a return journey").unbind('click').bind("click", function(){
							openReturn();
							return false;
						});
						updateZoom();
						resetValues();
						$('a.add-journey').focus();
					}
				});
				slowerTrainsCheckboxInAccordion.animate({'top': '0'}, 400);//Move slower trains checkbox back down to its normal position (see comments above)
			}
			else {
				ret.stop();
				ret.animate({
					"opacity": 0
				}, 250, function(){
					ret.removeClass('return-open');//Remove class used to leave space for the slower trains checkbox on template 1.1.3 (see comments above)
					ret.hide(400, function(){
						if (type == "showhide") {
							add.parent().show(400, function(){
								$(this).animate({
									"opacity": 1
								}, 250);
								$('a.add-journey').focus();
							});
							add.unbind('click').bind("click", function(){
								openReturn();
								return false;
							});
							resetValues();
						}
						else {
							add.parent().animate({
								"opacity": 0
							}, 250, function(){
								add.attr("class", "add-journey").empty().append("Add a return journey").unbind('click').bind("click", function(){
									openReturn();
									return false;
								});
								add.parent().animate({
									"opacity": 1
								}, 250);
								$('a.add-journey').focus();
							});
							resetValues();
						}
						
					});
					slowerTrainsCheckboxInAccordion.animate({'top': '0'}, 400);//Move slower trains checkbox back down to its normal position (see comments above)
				});
			}
		$('#jpState').val($('#jpState').val().replace('return', 'single'));
	}
	
	if (($('#jpState').val() == 'return') || ($('#jpState').val() == 'returnAdvanced')) {
		if (!FC.hasIE) {
			add.parent().css({
				"opacity": 0
			});
			ret.css({
				"opacity": 1
			});
		}
		else {
			ret.children().css({
				"visibility": "visible"
			});
		}
		justShow();
	}
	
};

//HOMEPAGE LIVE TRAINS

FC.liveDelay = function(){
	liveTrains = liveTrainsDemo;
	liveTrains = tr[tr.length] = Demo;
};

// LIVE TRAIN DEPARTURES
(function($) {
	$.fn.liveTrains = function(options) {
		var opts = $.extend({}, $.fn.liveTrains.defaults, options);
		
		return this.each(function() {
			var $self = $(this);
			
			/*
			 * Set variables for plugin
			 */
			var $from = $self.find("#train-from");  // From station field
			var $to = $self.find("#train-to"); // To station field
			var $arr = $self.find("li.arriving"); // Arriving button
			var $dep = $self.find("li.departing"); // Departing button
			var $labelOne = $self.find("#train-action-first"); // From station label
			var $labelTwo = $self.find("#train-action-second"); // To station label
			var $form = $self.find("form"); // Form element
			var $updateLink = $self.find("div.timetable-progress a.update"); // Array of all update links
			var $results = $self.find("div.results"); // Array of all result tables (to be turned into results object)
			var $btnRefresh = $self.parent().find("a.refresh-link"); // Auto refresh button
			var $myStations = false;
			var resetComplete = 0;	// Reset result tables counter
			var intRefresh = '';	// Auto refresh interval
			var departing = true; // Direction of travel
			
			/* etw - service updates */
			var serviceUpdatesContainer = $(".disruptions")[0];
			
			var resultsAry = []; // Array of results objects
			
			/*
			 * Results functions (private)
			 */
			
			/*
			 * Initialise plugin instance
			 */
			liveTrainsInit = function() {
				
				// Create each result table object and populate resultsAry
				$results.each(function() {
					resultsAry.push(resultObj($(this)));
				});
				
				// Bind events
				// Update button
				$updateLink.each(function() {
					$(this).bind("click", function(e) {
						e.preventDefault();
						prepareResults();
						return false;
					});
				});
				
				// Arriving button
				$arr.bind("click", function(e){
					e.preventDefault();
					departing = false;
					for(i=0;i<resultsAry.length;i++) {
						resultsAry[i].removeTimes();
					};
					$dep.removeClass("active");
					$arr.addClass("active");
					$(this).find("a").replaceWith("<span>Arriving</span>");
					$('span', $dep).replaceWith("<a href='#'>Departing</a>");
					$labelOne.empty().append("at");
					$labelTwo.empty().append("from");
					//Change table header to ORIGIN - etw 28-04-10 - NREOJPTEST-1411
					$results.find("th.destination").text("Origin");
					prepareResults();
					return false;
				});
				
				// Departing button
				$dep.bind("click", function(e){
					e.preventDefault();
					departing = true;
					for(i=0;i<resultsAry.length;i++) {
						resultsAry[i].removeTimes();
					};
					$arr.removeClass("active");
					$dep.addClass("active");
					$(this).find("a").replaceWith("<span>Departing</span>");
					$('span', $arr).replaceWith("<a href='#'>Arriving</a>");
					$labelOne.empty().append("from");
					$labelTwo.empty().append("to");
					//Change table header to DESTINATION - etw 28-04-10 - NREOJPTEST-1411
					$results.find("th.destination").text("Destination");
					prepareResults();
					return false;
				});
				
				/*
				 * Auto-refresh
				 */
				if ($btnRefresh.hasClass('do-refresh')) {
					autoRefresh();
				}
				
				$btnRefresh.bind("click", (function(e) {
					e.preventDefault();
					if ($btnRefresh.hasClass('do-refresh')) {
						$btnRefresh.html('<span>Automatically refresh this page</span>');
						$.ajax({ 
							type: 'get',
							url: document.location.href,
							dataType: 'html',
							success: function(){
							}
						});
						clearInterval(intRefresh);
						$btnRefresh.removeClass('do-refresh');
					} else {
						$btnRefresh.html('<span>Stop automatic refresh</span>');
						$.ajax({
							type: 'get',
							url: document.location.href,
							dataType: 'html',
							error: '',
							success: function(){
							}
						});
						autoRefresh();
						$btnRefresh.addClass('do-refresh');
					}
					return false;
				}));
				
				/*
				 * Set trains on load
				 * TODO: Test this out
				 */
				if ($from.val() === '' && stationPicker.active ) {
					if(stationPicker.getFavorites()) {
						$from.val = stationPicker.getFavorites()[0][1];
					}
					
				}
				if ($from.val() !== '') {
					prepareResults();
				}
			}
			
			/*
			 * 
			 */
			autoRefresh = function() {
				intRefresh = setInterval('prepareResults()',opts.refreshTime);
			}
			
			/*
			 * Prepare results tables for loading ajax call
			 */
			prepareResults = function() {
				
				// Remove any existing errors
				$('div.error-message', $form).remove();
				$($from, $to).parents('.invalid').removeClass('invalid').addClass('valid');
				
				// etw - service updates
				clearServiceUpdatesContainer();
				
				// Create waiting graphic
				/*
				var wait = document.createElement("img");
				wait.src = "images/waiting.gif";
				wait.width = "220";
				wait.height = "19";
				wait.className = "waiting";
				wait.id = "waiting";				
				*/
				// Reset each results table
				for(i=0;i<resultsAry.length;i++) {
					resultsAry[i].resetResults();
				};
			};
			
			callAjax = function() {
				$.ajax({
						type: "get",
						url: opts.dataUrl,
						dataType: 'json',
						data: ({departing : departing, liveTrainsFrom : ($from.val()), liveTrainsTo : ($to.val())}),
						error: function(a,b,c){
							//console.log(a);							
							//console.log(b);
							//console.log(c);
						},
						success: function(liveTrains,b,c){
							
							if (liveTrains.error == "false") {
								if(opts.type === "departureDetails"){
									resultsAry[0].loadDepResults(liveTrains);
								} else {
									for(x=0;x<resultsAry.length;x++) {
										resultsAry[x].loadResults(liveTrains);
									}
								}
								/* etw - status updates */
								writeStatusUpdates(liveTrains.updates);
								
							} else {
								//$self.find("img.waiting").remove();
								
								$form.before($('<div class="error-message"><div class="error-message-padding"><h3>Error message:</h3><ol><li><a href="#' + liveTrains.errorField + '">' + liveTrains.errorMsg + '</a></li></ol></div></div>'));
								$self.find('#' + liveTrains.errorField).parents('.valid').removeClass('valid').addClass('invalid');
							}
							
						}
					});
			};
			
			/* etw service updates */
			writeStatusUpdates = function(dataObj) {
				
				var suc = $(serviceUpdatesContainer);
				var li;
				
				//Check for parent container
				if(!serviceUpdatesContainer) { return false }
				
				//Check for data, show or hide container depending.
				if(typeof(dataObj) !== "object" || dataObj.length === 0) { hideServiceUpdatesContainer();return false } else {showServiceUpdatesContainer()}
				
				//trim data to max of four as in spec
				dataObj = dataObj.slice(0,4);
				
				//loop data & append to UL
				for(var i in dataObj) {			
					li = $("<li>");
					if(i == dataObj.length -1) { li.addClass("last")}
					li.html(dataObj[i].text.replace(/&#034;/g,'"').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>'));
					suc.find("ul.disruption-ul").append(li);
				}
				
			};
			
			clearServiceUpdatesContainer = function() {
				$(serviceUpdatesContainer).find(".disruption ul").empty();
			};
						
			hideServiceUpdatesContainer = function() {				
				$(serviceUpdatesContainer).css("display","none");
			};
			
			showServiceUpdatesContainer = function() {				
				$(serviceUpdatesContainer).css("display","block");
			};
			/* end etw service updates */
			
			
			loadDepatureDetails = function(liveTrains) {
				// Insert Departure details table insertion here
				
			}
			
			/*
			 * Result table constructor
			 * @constructor
			 */
			resultObj = function($obj) {
				// Set variables
				var $that = {
					$tbody: $obj.find("div.tbl-cont table tbody"), // Results body
					$divEarlier: $obj.find("div.earlier"), // Earlier button
					$earlier: $obj.find("div.earlier div.prog-int a.earlier"),
					$later: $obj.find("div.later div.prog-int a.later"),
					$res: $obj,
					$time: $obj.find("div.later li.first"),
					$anim: '',
					$cont: $obj.find("div.tbl-cont"),
					$table: $obj.find("div.tbl-cont table"),
					$thead: $obj.find("div.tbl-cont table thead"),
					
					$tableTop: $obj.find("div.timetable-progress"),
					$tableBottom: $obj.find("div.timetable-progress-b-off"),
					$rows: '',
					
					type: $obj.attr('class').replace('results ',''),
					height: 0,
					currentScroll: 0,
					maxScroll: '',
					scrolling: false
				};
				
				/*
				 * Private methods
				 */
				// Initialise result instance
				resultInit = function() {
					// Set $anim to $tbody
					$that.$anim = $that.$tbody;
					// If IE set $anim to $cont
					if (FC.hasIE === true || $.browser.safari) {
						$that.$anim = $that.$cont;
						$that.$cont.css({
							'overflow': 'hidden'
						});
					}
					
					// Bind events
					// Earlier trains link event
					$that.$earlier.bind("click", function(e){
						e.preventDefault();
						if ($that.scrolling === false) {
							$that.scrolling = true;
							if ($that.currentScroll === $that.maxScroll) {
								$that.$later.show().css({"opacity": 0});
							}
							$that.currentScroll = $that.currentScroll - opts.rows;
							if ($that.currentScroll >= 0) {
								$that.$anim.scrollTo('tr:eq(' + $that.currentScroll + ')', 600, {
									axis: 'y',
									onAfter: function(){
												$that.scrolling = false;
											 }
								});
								$that.$later.animate({
									"opacity": 1
								}, 500);
								if ($that.currentScroll === 0) {
									$that.$earlier.animate({
										"opacity": 0			  
									}, 500, function() {
										$that.$earlier.parent().height($that.$earlier.outerHeight()).width($that.$earlier.outerWidth()).end().hide();
									});
								}
							}
							else {
								prepareResults();
							}
						}
						return false;
					});
					
					// Later trains link event
					$that.$later.bind("click", function(e){
						e.preventDefault();
						if ($that.scrolling === false) {
							$that.scrolling = true;
							if ($that.currentScroll === 0) {
								$that.$earlier.show().css({"opacity": 0});
							}
							$that.currentScroll = $that.currentScroll + opts.rows;
							if ($that.currentScroll <= $that.$rows.length) {
								$that.$earlier.animate({
									"opacity": 1
								}, 500);
								var hackCurrentScroll = FC.hasIE ? $that.currentScroll : $that.currentScroll - 1;
								$that.$anim.scrollTo('tr:eq(' + hackCurrentScroll + ')', 600, {
									axis: 'y',
									onAfter: function(){
												$that.scrolling = false;
											 }
								});
								if ($that.currentScroll === $that.maxScroll) {
									$that.$later.animate({
										"opacity": 0			  
									}, 500, function(){
										$that.$later.parent().height($that.$later.outerHeight()).width($that.$later.outerWidth()).end().hide();										
									});
								}
							}
							else {
								prepareResults();
							}
						}
						return false;
					});
				};
				
				/*
				 * Public methods
				 */
				
				//Empty trains
				$that.removeTimes = function() {
					$that.$tbody.empty();
					$that.$earlier.css({
						"opacity": 0,
						"display": "none"
					});
					$that.$later.css({
						"opacity": 0,
						"display": "none"
					});
				};
				
				// ResetResults
				$that.resetResults = function(wait) {
					$that.$cont.stop();
					//Show table and links
					$that.$res.css({
						"display": "block"
					});
					$that.$tableBottom.attr("class", "timetable-progress-b");
										
					//Remove any current times
					$that.removeTimes();
					
					// Show result table
					$that.$res.animate({
						"opacity": "1"
					}, 250, function(){
						$that.$divEarlier.append(wait);
						resetComplete = resetComplete + 1;
						if (resetComplete === (resultsAry.length)) {
							resetComplete = 0;
							callAjax();
						}
					});
				}
				
				$that.loadDepResults = function(liveTrains){
					//$that.$res.find("img.waiting").remove();
					
					$that.currentScroll = 0;
					$that.height = 0;
					
					//Find current height of table
					$that.height = $that.height + $that.origHeight;
										
					var liveTrainsAry = liveTrains[$that.type];
					var tr = [];

					//Write out table results
					for (i = 0; i < liveTrainsAry.length; i++) {
																	
						tr[tr.length] = '<tr class="';
						
						if (i % 2 === 0) {
							tr[tr.length] =  'alt ';
						}
						
						if (liveTrainsAry[i][0] === 'd') {
							tr[tr.length] =  'delayed ';
						}
						
						/* e.webb - 06/04/10 -  Drop shdow and txt highlight changes */
						if(i===0) {tr[tr.length] =  'first '}
						if(i===liveTrainsAry.length-1) {tr[tr.length] =  'last '}

						if(liveTrainsAry[i][6]) {tr[tr.length] =  ' '+liveTrainsAry[i][6]+' '}
				
						//etw - from & to
						if(liveTrainsAry[i][9] === "to" || liveTrainsAry[i][9] === "from") {tr[tr.length] =  "station"}
												
						tr[tr.length] =  '">'
						
						tr[tr.length] =  '<td>' + liveTrainsAry[i][1] + '</td>'; //time
						
						if (liveTrainsAry[i][7] === "branch") {
							tr[tr.length] =  '<td class="station">' + liveTrainsAry[i][2] + '<div class="callingpointdesc">Train divides here with a portion going to ' + liveTrainsAry[i][8][liveTrainsAry[i][8].length - 1][2] + '</div></td>'; //dest
						} else if (liveTrainsAry[i][7] === "merge") { // etw - 28-04-10 - Added MERGE support NREOJPTEST-1403
							tr[tr.length] =  '<td class="station">' + liveTrainsAry[i][2] + '<div class="callingpointdesc">Train merges here with traffic from ' + liveTrainsAry[i][8][liveTrainsAry[i][8].length - 1][2] + '</div></td>'; //dest
						} else {
							tr[tr.length] =  '<td class="station">' + liveTrainsAry[i][2] + '</td>'; //dest
						}					
						
						tr[tr.length] =  '<td><span>' + liveTrainsAry[i][3] + '</span><br/><span class="unbold">' + liveTrainsAry[i][4] + '</span></td>' //status
						tr[tr.length] =  '<td>' + liveTrainsAry[i][5] + '</td>'; //platform
						if (i === 0) {	
							tr[tr.length] =  '<td class="start' + liveTrainsAry[i][6] + '">'; //progress
						}
						else 
							if (i === (liveTrainsAry.length - 1)) {
								tr[tr.length] =  '<td class="end' + liveTrainsAry[i][6] + '">'; //progress
							}
							else 
								if (liveTrainsAry[i][6] === '') {
									tr[tr.length] =  '<td class="progress">'; //progress
								}
								else {
									tr[tr.length] =  '<td class="' + liveTrainsAry[i][6] + '">'; //progress
								}
						
						if (liveTrainsAry[i][6] == "atstation" || liveTrainsAry[i][6] == "inmotion") {
							tr[tr.length] =  '<div class="current"><span>Train last reported</span></div>'; //progress content
						}
						
						tr[tr.length] =  '</td></tr>';
						
						if (liveTrainsAry[i][7] === "branch" || liveTrainsAry[i][7] === "merge") {
							//Removed THEAD to match designs
							tr[tr.length] =  '<tr class="callingpoints"><td colspan="5"><div class="callingpointslide" style="display: none"><table cellspacing="0" cellpadding="0" border="1" class="innertable"><tbody>';
							
							for (j = 0; j < liveTrainsAry[i][8].length; j++){
								((j % 2 === 0) ? "alt" : null ) 
								if (liveTrainsAry[i][8][j][0] === 'd') {
									tr[tr.length] =  '<tr class="delayed '+ ((j % 2 === 0) ? "alt" : null ) +'">';
								} else {
									tr[tr.length] =  '<tr class="'+ ((j % 2 === 0) ? "alt" : null ) +'">';
								}
								tr[tr.length] =  '<td class="calling-points">' + liveTrainsAry[i][8][j][1] + '</td>'; //time
								tr[tr.length] =  '<td class="station">' + liveTrainsAry[i][8][j][2] + '</td>'; //dest
								tr[tr.length] =  '<td><span>' + liveTrainsAry[i][8][j][3] + '</span><br/><span class="unbold">' + liveTrainsAry[i][8][j][4] + '</span></td>' //status
								tr[tr.length] =  '</tr>';
							}
							
							tr[tr.length] =  '</tbody></table></div></td></tr>';
							
						}
					}
					
					$that.$tbody.html(tr.join(""));
					
					$that.$table.append($that.$tbody);
					
					$that.$rows.length < opts.rows ? j = $that.$rows.length : j = opts.rows;
						
					for (i = 0; i < j; i++) {
						$that.height += $($that.$rows[i]).height();
					}
					$that.height = $that.height + "px";
					
					//Add time stamp
					$that.$time.empty().append("Last updated: <strong>" + liveTrains.time + "</strong>");
					FC.callingPoints(true);	
				}
				
				$that.loadResults = function(liveTrains, liveTrainsType) {
					//$that.$res.find("img.waiting").remove();
					
					$that.currentScroll = 0;
					$that.height = 0;
					
					//Find current height of table
					//$that.height = $that.height + $that.origHeight;
						
					var liveTrainsAry = liveTrains[$that.type];
					
					/* ETW: If there are no results then hide the top-lvl div */
					if(liveTrainsAry.length) {
						$that.$res.css("display","block")
					} else {
						$that.$res.css("display","none")
					}
					
					//Write out table results
					for (i = 0; i < liveTrainsAry.length; i++) {
						var trainResults = '';						
						
						if (i % 2 === 0) {
							trainResults += '<tr class="alt '
						} else {
							trainResults += '<tr class="'
						}
						
						if (i === liveTrainsAry.length - 1) {
							trainResults += ' last ' 
						}
						if (i === 0) {
							trainResults += ' first ' 
						}
						
						if (liveTrainsAry[i][0] == "d") {
							trainResults += ' delayed ';
						}
						
						trainResults += '">';
						
						if (liveTrainsAry[i][0] == 'd') {
							trainResults += '<td class="delayed">' + liveTrainsAry[i][1] + '</td>'; //time
						} else {
							trainResults += '<td>' + liveTrainsAry[i][1] + '</td>'; //time
						}
						trainResults += '<td class="destination">' + liveTrainsAry[i][2] + '</td>'; //dest
						if (liveTrainsAry[i][3] == "On time") {
							//switched to img rather than table BG: trainResults += '<td class="status on-time">' + liveTrainsAry[i][3] + '</td>'; //due
							if(opts.homepage) {
								trainResults += '<td class="status delayed"><img src="images/icon-tick.png" alt="' + liveTrainsAry[i][3] + '" /></td>'; //due
							} else {
								trainResults += '<td class="status">' + liveTrainsAry[i][3] + '</td>'; //due
							}
						}
						else if(liveTrainsAry[i][0] == "d"){
							var dueArray =  liveTrainsAry[i][3].split("<br/>");	
							if(dueArray.length === 1) dueArray[1] = "&nbsp;";
							if(opts.homepage) {
								trainResults += '<td class="status delayed">' + dueArray[0] + '</td>'; //due
							}	else {
								trainResults += '<td class="status delayed">' + dueArray[0] + '<br/><span class="unbold">' + dueArray[1] + '</span></td>'; //due
							}											
						}
						else {
							trainResults += '<td class="status">' + liveTrainsAry[i][3] + '</td>'; //due
						}
						trainResults += '<td>' + liveTrainsAry[i][4] + '</td>'; //platform
						trainResults += '<td><a href="' + liveTrainsAry[i][5] + '">' + (options.homepage ?  'View' : 'Details') +'</a></td>'; //details
												
						trainResults += '</tr>';
						
						$that.$tbody.append(trainResults);
					}

					$that.$table.append($that.$tbody);
					
					//Find height of first four rows
					$that.$rows = $that.$table.find("tbody tr");
					
					//Add empty rows
					
					var am = $that.$rows.length % opts.rows;
					
					if (am !== 0) {
						am = opts.rows - am;
					}
					
					/* ETW: Why add empty rows? 
					var tr = '';
					for (i = 0; i < am; i++) {
						
						tr += '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>';
						
					}
					
					$that.$tbody.append(tr);
					*/
					
					//Set max scroll for "later" link									
					$that.maxScroll = Math.floor($that.$rows.length / opts.rows);
					
					if (am === 0) {
						$that.maxScroll = $that.maxScroll - 1;
					}
					
					$that.maxScroll = $that.maxScroll * opts.rows;
					
					if (FC.hasIE === true) {
					 	$that.height += $that.$thead.find("tr:first-child").height();
					}
					if(FC.hasLteIE7) {
						$that.height += opts.rows;
					}
					
					$that.$rows.length < opts.rows ? j = $that.$rows.length : j = opts.rows;
						
					for (i = 0; i < j; i++) {
						$that.height += $($that.$rows[i]).height();
					}
					$that.height = $that.height + "px";
					
					//Add time stamp
					$that.$time.empty().append("Last updated: <strong>" + liveTrains.time + "</strong>");	   

					
					$that.$anim.animate({
						"height": $that.height
					}, 1, function(){
						$that.animateRows(-1, $that.$rows.length);
					});
					
					if ($that.$rows.length > opts.rows) {
						$that.$later.show().css({"opacity": 1});
					}
					
				};
				
				// Animation callback
				$that.animateRows = function(counter, total) {
					/* Not sure what this is doing. etw
					$that.$rows = $that.$table.find("tbody tr");
					counter = counter + 1;					
					if (counter < opts.rows) {
						$($that.$rows[counter]).animate({
							"opacity": 1
						}, 350, function(){
							$that.animateRows(counter, total);
						});
						
					} else {
						if (counter < total) {
							$($that.$rows).animate({
								"opacity": 1
							}, 0);
						}
					}
				   */
					if (counter === opts.rows && total > opts.rows) {
						$that.$later.show().css({"opacity": 0}).animate({
							"opacity": 1
						}, 1);
					}
				};
				
				// Run intialise function
				resultInit();
				
				// Return object
				return $that;
			};
			
			liveTrainsInit();


		});
	};
	//
	// public functions
	//
	
	//
	// plugin defaults
	//
	$.fn.liveTrains.defaults = {
		rows: 4,
		refreshTime: 120000,
		dataUrl: "javascript/livetrains.js",
		type: 'departureBoard'
	};
})(jQuery);


//show hide on the jp purchase include
FC.chooseTOC = function(){
	$('div.ticket-provider').hide();
	$('div.ticket-provider-btn').hide();
	
	$('p.change-provider').append('<a href="#" class="arrowlink-dark">Buy from another ticket provider</a>');
	
	$('p.change-provider a').bind('click', function(){
		$('p.change-provider').hide();
		$('div.ticket-provider').show();
		return false;
	});
	
	$('select.sltProvider').change(function(){
		if ($(this).val() != 'null') {
			var toc = ($(this).val());
			$('div.operator-price img').attr('src', 'images/logo-toc-' + toc + '.gif').attr('alt', toc);
			/*var tocName = 'from ' + ($('select.sltProvider :selected').text());
			// if tocname is too long to fit into the button properly - truncate it and end with ellipses
			if (tocName.length > 24) {
				var myArray = tocName.split("");
				var shortTocName = "";
				for (i = 0; i < 22; i++) {
					shortTocName = shortTocName + myArray[i];
				}
				shortTocName = shortTocName + "...";
				tocName = shortTocName;
			}
			
			$('div.btnBuyNow strong').text(tocName);
			*/
		}
	});
};

// GENERIC SHOW/HIDE
// usage s=element to show on click;  h=element to hide (but will be visible by default); e=element that is clicked to effect toggle
// f1 is the element to focus on with the first toggle, f2 is the element to focus on with the second toggle
FC.showHide = function(s, h, e, f1, f2){
	$(s).hide();
	$(e).bind('click', function(){
		// if there's inputs, then clear them on the toggle						
		$(h).find('input').attr('value', "");
		$(h).hide();
		$(s).show();
		$(f1).focus();
		
		// switch the two
		var temp = h;
		h = s;
		s = temp;
		var temp2 = f1;
		f1 = f2;
		f2 = temp2;
		
		return false;
	});
};

FC.showHideSli = function(s, h, e, f1, f2){
	$(s).addClass("sliderHide");
	$(e).bind('click', function(){
		// if there's inputs, then clear them on the toggle						
		$(h).find('input').attr('value', "");
		$(h).addClass("sliderHide");
		$(s).removeClass("sliderHide");
		$(f1).focus();
		
		// switch the two
		var temp = h;
		h = s;
		s = temp;
		var temp2 = f1;
		f1 = f2;
		f2 = temp2;
		
		return false;
	});
};




FC.fareStates = function(){

	if ($(FC.vars.selectors.DATE_STATE).val() == 'multiple') {
		FC.showHide('div.single-date', 'div.multiple-dates', 'a.toggle-date', '#travel-date-1', '#travel-date'); //used on 7.0 CFF - dates section
	}
	else {
		FC.showHide('div.multiple-dates', 'div.single-date', 'a.toggle-date', '#travel-date-1', '#travel-date'); //used on 7.0 CFF - dates section
	}
	
	if ($(FC.vars.selectors.TIME_STATE).val() == 'specific') {
		FC.showHideSli('div.time-range', 'div.specific-time', 'a.toggle-time', '#txtHrs', '#fd-slider-handle-outboundTimeband'); //used on 7.0 CFF - time section
	}
	else {
		FC.showHideSli('div.specific-time', 'div.time-range', 'a.toggle-time', '#txtHrs', '#fd-slider-handle-outboundTimeband'); //used on 7.0 CFF - time section
	}
	
	$('a.toggle-date').bind('click keypress', function(){
		if ($(FC.vars.selectors.DATE_STATE).val() == 'multiple') {
			$(FC.vars.selectors.DATE_STATE).val('specific');
		}
		else {
			$(FC.vars.selectors.DATE_STATE).val('multiple');
		}
	});
	
	$('a.toggle-time').bind('click keypress', function(){
		if ($(FC.vars.selectors.TIME_STATE).val() == 'specific') {
			$(FC.vars.selectors.TIME_STATE).val('range');
		}
		else {
			$(FC.vars.selectors.TIME_STATE).val('specific');
		}
	});
	
};

//Slider Time update (Cheapest Fare Finder slider callback from plugin (referenced on the class name for the slider))
function updateTime(){
	var sel = $(FC.vars.selectors.TIME_RANGE);
	var times = $("div.time-range li.times");
	times.empty().append(sel.val());
}


//Slider setup
FC.timeRange = function(){

	var sel = $(FC.vars.selectors.TIME_RANGE);
	
	sel.before("<ul class='clear'><li class='earlier'><a href='#'>earlier</a></li><li class='later'><a href='#'>later</a><li class='times'>12:00-16:00</li></li></ul>");
	
	sel.after("<ul class='time-labels clear'><li class='step1'>Night</li><li class='step2'>Morning</li><li class='step3'>Afternoon</li><li class='step4'>Evening</li><li class='step5'>Night</li></ul>");
	
	
	var times = $("div.time-range li.times");
	
	times.empty().append(sel.val());
	
	
	var earlier = $("div.time-range li.earlier a");
	var later = $("div.time-range li.later a");
	
	var currentSel = sel.attr("selectedIndex");
	
	
	earlier.bind("click", function(){
		currentSel = sel.attr("selectedIndex");
		if (currentSel > 0) {
			currentSel--;
			sel.attr("selectedIndex", currentSel);
			if (FC.hasIE === true) {
				sel[0].fireEvent("onchange");
			}
			else {
				var e = document.createEvent("UIEvents");
				e.initUIEvent("change", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
				sel[0].dispatchEvent(e);
			}
		}
		return false;
	});
	
	later.bind("click", function(){
		currentSel = sel.attr("selectedIndex");
		if (currentSel < sel.find("option").length - 1) {
			currentSel++;
			sel.attr("selectedIndex", currentSel);
			if (FC.hasIE === true) {
				sel[0].fireEvent("onchange");
			}
			else {
				var e = document.createEvent("UIEvents");
				e.initUIEvent("change", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
				sel[0].dispatchEvent(e);
			}
		}
		return false;
	});
};

//NUMBER INCREMENTER
FC.increment = function(_id){

	var id = $(_id);
	var label = id.parent().prev('label').text();
	
	//Test to see fi there are incrementors already:
	if(id.parent().parent().find("ul").length==0){
	
		id.parent().after("<ul class='actions clear'><li><a href='#'><img src='images/icon-add-journey.png' width='22' height='30' alt='Add " + label.replace(/:/, "") + "' /></a></li><li><a href='#'><img src='images/icon-remove.png' width='22' height='30' alt='Remove " + label.replace(/:/, "") + "' /></a></li></ul>");
	
	}
	
	var field = id.parents("div.field");
	var input = $(field).find("input");
	var add = $(field).find("ul.actions li:eq(0) a");
	var minus = $(field).find("ul.actions li:eq(1) a");
	var currentVal;
	
	var count;
	
	//if the value is more than 0 then set the 'active' colour style
	id.val() === 0 ? id.css({
		"color": "#A2A2A2"
	}) : id.css({
		"color": "#404040"
	});   
	
	id.bind("blur", function(){
		if (!$(this).val()) {
			id.attr('id') == 'adults' ? id.val(1) : id.val(0);
			id.css({
				"color": "#A2A2A2"
			});
		}
		else 
			if ($(this).val() === 0) {
				id.css({
					"color": "#A2A2A2"
				});
			}
			else 
				if ($(this).val() > 8) {
					id.val(8);
				}
				else {
					id.css({
						"color": "#404040"
					});
				}
	});
	
	add.unbind("click").bind("click", function(){
		count = 0;
		currentVal = input.val();
		if (currentVal !== "") {
			count = currentVal;
		}
		if (count < 8) {
			count++;
			id.val(count);
			id.css({
				"color": "#404040"
			});
		}
		return false;
		
	});
	
	minus.unbind("click").bind("click", function(){
		count = 0;
		currentVal = input.val();
		if (currentVal !== "") {
			count = currentVal;
		}
		if (count > 0) {
			count--;
			id.val(count);
			id.css({
				"color": "#404040"
			});
		}
		if (count === 0) {
			id.css({
				"color": "#A2A2A2"
			});
		}
		return false;
		
	});
};

//REVEAL ADD RAILCARDS
FC.addRailcards = function(){
	var button = $(FC.vars.selectors.ADD_RAILCARDS);
	var lyr = $("div.rcards");
	button.bind("click", clickHandler);
	function clickHandler(e) {
		lyr.css({
			"display": "block"
		});
		$("#rcards", lyr).focus();
		button.remove();
		return false;
	}
};

//CHEAPEST FARE FINDER ADD RAILCARDS
FC.rcards = function(){
	var __FC = this, __SEL = this.vars.selectors, // globals
		__$lyr = $("div.rcards"), __$sel = __$lyr.find('select#rcards'), __$fieldset = __$lyr.find("fieldset"), __$button = $(__SEL.RAILCARD_BUTTON),
		__height = 200;
	
	function initCardType(thisVal){
		//Remove row if value is set to 0
		var minus = $("#field-" + thisVal + " .actions li:eq(1) a");
		var card = $("#field-" + thisVal + " input#card-" + thisVal);
		minus.bind("click", function(){
			if (card.val() == 0) {
				__$fieldset.find("div#field-" + thisVal).fadeOut(250, function(){
					$(this).remove();
				});
			}
		});
	}
	
	if (__$fieldset.find('div.card').length) {
		$(__SEL.ADD_RAILCARDS).remove();
		
		__$lyr.css({"display": "block"});
		
		__$fieldset.find('div.card').css({"opacity": 1});
		
		__$fieldset.find('div.card input').each(function(){
			FC.increment(this);
			thisVal = this.id.split('-');
			initCardType(thisVal[1]);
		});
	}
	else {
		this.addRailcards();
	}
	
	// *** AB 02/08/2010 ***
	__$button.bind("click", function(){ // first run at cleaning up string concat and append
		
		var __val = __$sel.val(), 
			__str = ["<div id='field-",
					undefined,
					"' class='card'><div class='field clear'><label for='card-",
					undefined,
					"'>",
					undefined,
					"<span class='accessibility'> - enter number of passengers</span>:</label><div class='input-border'><input type='text' class='text' id='card-",
					undefined,
					"' value='1' /></div></div></div>"];
			//__df = document.createDocumentFragment(); // removed
		
		//Create the new photocard row
		if (__val !== "" && $("div#field-" + __val).length === 0) {
			__str[1] = __val;
			__str[3] = __val;
			__str[5] = __$sel.find("option:selected").text();
			__str[7] = __val;
			
			//__df.innerHTML = __str.join(''); removed
			// __$fieldset.append("<div id='field-" + sel.val() + "' class='card'><div class='field clear'><label for='card-" + __val + "'>" + sel.find("option:selected").text() + "<span class='accessibility'> - enter number of passengers</span>:</label><div class='input-border'><input type='text' class='text' id='card-" + __val + "' value='1' /></div></div></div>");
			__$fieldset.append(__str.join(''));
			
			__FC.formBorders(__$fieldset); // parent value added
			
			//Add incrementer
			__FC.increment("#card-" + __val + "");
			
			__$fieldset.find("#field-" + __val).animate({"opacity": 1}, 250, function(){
				initCardType(__val);
			});
			
		}  
		return false;  
	});
 
};


//TOCS
FC.tocs = function(){
	var tocs = $("div.TOC input");
	var labels = $("div.TOC label");
	
	tocs.bind("click keypress", function(){
		var current = this;
		
		if (current.checked) {
			tocs.parent().removeClass("selected");
			tocs.parent().removeClass("active");
			$(current).parent().addClass("selected");
			$(current).parent().addClass("active");
		}
		
	}).bind("keyup", function(e){
		switch (e.keyCode) {
			case 9:
				$(this).parents('div.operators').find('input').css({
					'left': '-3px'
				}).css({
					'top': '0'
				});
				return;
			default:
				return;
		}
	}).bind("keydown", function(e){
		switch (e.keyCode) {
			case 9:
				$(this).parents('div.operators').find('input').css({
					'left': '-500em'
				}).css({
					'top': 'auto'
				});
				return;
			default:
				return;
		}
	});
	
	labels.bind("mouseover", function(){
		$(this).parent().addClass("active");
		
	}).bind("mouseout", function(){
	
		if ($(this).parent().hasClass("selected") === false) {
			$(this).parent().removeClass("active");
		}
		
	}).bind("click", function(){
	
		tocs.parent().removeClass("selected");
		tocs.parent().removeClass("active");
		
		$(this).parent().addClass("selected");
		$(this).parent().addClass("active");
		
		$(this).parent().find("input").attr("checked", "checked");
		
		return false;
	});
};

FC.callingPoints = function(switched){
	var isSwitched = switched;
	$(FC.vars.selectors.CALLING_POINTS).each(function(){
		var $this = $(this);
		if (isSwitched) {
			$this.prev().find('div.callingpointdesc').append($('<a></a>').attr('href', '#').addClass('callingpointplus').text('show calling points'));
			
			$this.prev().find('a.callingpointplus')
				.bind('click', function(){
					var target = $(this).parents('tr').next().find('div.callingpointslide');
					if (target.css('display') == 'none') {
						$(this).text('hide calling points').removeClass('callingpointplus').addClass('callingpointminus');
						if (FC.vars.slowSafari) target.show();
						else target.slideDown(400);
					}
					else {
						$(this).text('show calling points').removeClass('callingpointminus').addClass('callingpointplus');
						if (FC.vars.slowSafari) target.hide();
						else target.slideUp(400);
					}
					return false;
				}).bind('keypress', function(){
					switch (e.keyCode) {
						case 9:
						case 16:
						case 18:
						case 17:
							return;
						default:
							var target = $(this).parents('tr').next().find('div.callingpointslide');
							if (target.css('display') == 'none') {
								$(this).text('hide calling points').removeClass('callingpointplus').addClass('callingpointminus');
								if (FC.vars.slowSafari) target.show();
								else target.slideDown(400);
							} else {
								$(this).text('show calling points').removeClass('callingpointminus').addClass('callingpointplus');
								if ( FC.vars.slowSafari) target.hide();
								else target.slideUp(400);
							}
							return false;
					}
				});
		} else {
			$this.next().find('div.callingpointdesc').append($('<a></a>').attr('href', '#').addClass('callingpointplus').text('show calling points'));
			
			$this.next().find('a.callingpointplus').bind('click', function(){
				var target = $(this).parents('tr').prev().find('div.callingpointslide');
				if (target.css('display') == 'none') {
					$(this).text('hide calling points').removeClass('callingpointplus').addClass('callingpointminus');
					if (FC.vars.slowSafari) {
						target.show();
					}
					else {
						target.slideDown(400);
					}
				}
				else {
					$(this).text('show calling points').removeClass('callingpointminus').addClass('callingpointplus');
					if (FC.vars.slowSafari) {
						target.hide();
					}
					else {
						target.slideUp(400);
					}
				}
				return false;
			}).bind('keypress', function(){
				switch (e.keyCode) {
					case 9:
					case 16:
					case 18:
					case 17:
						return;
					default:
						var target = $(this).parents('tr').prev().find('div.callingpointslide');
						if (target.css('display') == 'none') {
							$(this).text('hide calling points').removeClass('callingpointplus').addClass('callingpointminus');
							if (FC.vars.slowSafari) {
								target.show();
							} else {
								target.slideDown(400);
							}
						} else {
							$(this).text('show calling points').removeClass('callingpointminus').addClass('callingpointplus');
							if ($.browser.safari && $.browser.version < 523) {
								target.hide();
							} else {
								target.slideUp(400);
							}
						}
						return false;
					break;
				}
			});
		}
	});
};

FC.routeMap = function(img){
	var rel;
	var src;
	
	$('ul.companies a').bind('mouseover focus', function(){
		rel = $(this).attr('rel');
		alt = $(this).text();
		
		$(img).attr({
			src: "images/map-" + rel + ".jpg",
			alt: alt
		});
	});
};

FC.smsOptions = function(sel){

	var opts = $(sel);
	var lyr = $(".more-options");
	
	if (opts.val() == 3) {
		lyr.css({
			"display": "block"
		});
	}
	else {
		lyr.css({
			"display": "none"
		});
	}
	
	opts.bind("change", function(){
	
		if (opts.val() == 3) {
			lyr.css({
				"display": "block"
			});
		}
		else {
			lyr.css({
				"display": "none"
			});
		}
		
	});
	
};

/*
 * Tuesday 27th July
 * Edwin Webb
 * CR 00503
 * Have return journey dates match outward jounrney
 */
FC.journeyDates = function(openingReturn) {
	
	//set selectors
	var outwardSelectors = {
		date : "txtDate",
		hours: "sltHours"
	};
	
	var returnSelectors = {
		date : "txtDateRet",
		hours: "sltHoursRet"
	};
	
	if(openingReturn === true) {
		document.getElementById(returnSelectors.date).value = document.getElementById(outwardSelectors.date).value;
		setHours(document.getElementById(outwardSelectors.hours).value)
	}
	
	//listen for changes
	var $outwardDate = $("#" + outwardSelectors.date).bind("change", dateChangeHandler);
	var $outwardHours = $("#" + outwardSelectors.hours).bind("change", timeChangeHandler);
	
	function dateChangeHandler(e) {		
		var el = document.getElementById(returnSelectors.date);
		
		el.value = this.value;
		el = null;
		
		if($.find(".return-open").length) {
			$outwardDate.unbind("change");
			$outwardDate = null;
		}
	}
	
	function timeChangeHandler(e) {
		
		setHours(this.value);
				
		if ($.find(".return-open").length) {
			$outwardHours.unbind("change");
			$outwardHours = null;
		}
		
		element = null;
	}
	
	function setHours(time) {
		var element = document.getElementById(returnSelectors["hours"]);
		var offset = 2;
		var time = parseFloat(time) + offset;
		
		if(time < 10) {
			element.value = "0" + time.toString();
		} else {
			element.value = time;
		}
		element = null;
	}
	
};
/*
 * Edwin Webb Jul 29, updated Oct-6th 2010.
 * http://thalesjira.co.uk/jira/browse/NREOJPcb-120
 * P:\ATOC\5245 - NRE SR11\project-management\Agreed-proposal\client CRs\00520 - Stuck with unknown station following disambiguation.doc
 * Swap out a SELECT with a INPUT
 */
FC.resetUnknownStation = function($select) {
	var type = $select[0].id.indexOf("To") > 0 ? "To" : "From";
	var $input = $("#txt"+type) ;
	var $link = $("#hideSelect"+type);
	
	 $select.bind("change",function(e){
	 	e.preventDefault();
		if(this.value == "HIDE") swap();
	 });
	 
	 $link.bind("click",function(e){
	 	e.preventDefault();
		swap();
	 });
	 
	 function swap() {
	 	$select.hide();
		$input.show();
		$input.focus();
	 }
}

/*
 * Pocket Timetable
 * NRE-20.2-Pocket-timetable.shtml
 * PT = div.pocket-timetable
 * TODO - This is throwing errors in IE6
 */
FC.PT = function($PT){

    //Stations
    var fromField = $("div.from div.field div.clear:first");
    var fromAdd = $("div.from a.add");
    var toField = $("div.to div.field div.clear:first");
    var toAdd = $("div.to a.add");
    var fromCount = 0;
    var toCount = 0;
    
    var removes = $("a.remove-station");
	
	
	//Station Picker
	stationPicker.init();
	stationPicker.addInputSet({from: $("#txtFromPT"),useDLRLU:false,useGroups:true});
	stationPicker.addInputSet({from: $("#txtToPT"),useDLRLU:false,useGroups:true});
	stationPicker.addInputSet({from: $("#txtViaAvDest"),useGroups:true});
	stationPicker.addInputSet({from: $("#txtCallingStn"),useGroups:true});
    stationPicker.testForFocus();
    
    removes.bind("click", function(){
    
        $(this).parent().remove();
        return false;
        
    });
    
    fromAdd.bind("click", function(){
        if ($.find("div.from input").length < 3) {
            var newFrom = fromField.clone();
            newFrom.addClass("morefrom");
            $('input', newFrom).attr("id", "txtFrom" + fromCount);
            $('input', newFrom).val($('input', newFrom)[0].defaultValue);
            $('label', newFrom).attr("for", "txtFrom" + fromCount);
			//$('span', newFrom)[0].className = "sp-icon-holder";
            $('.input-border', newFrom).css({
                'background': 'none'
            });
            $(newFrom).removeClass('invalid').addClass('valid');
            fromAdd.before(newFrom);
            if(stationPicker)  stationPicker.addInputSet({from: $('input', newFrom),useDLRLU:false,useGroups:true});
            FC.formBorders(newFrom);  // parent value added
            FC.clearFields(newFrom);
            $('a.remove-station', newFrom).bind('click', function(){
                $(this).parent().remove();
                return false;
            });
            fromCount++;
        }
        return false;
    });
    
    
    toAdd.bind("click", function(){
        if ($.find("div.to input").length < 3) {
            var newTo = toField.clone();
            newTo.addClass("moreto");
            $('input', newTo).attr("id", "txtTo" + toCount);
            $('input', newTo).val($('input', newTo)[0].defaultValue);
            $('label', newTo).attr("for", "txtTo" + toCount);
            toAdd.before(newTo);
            if(stationPicker)  stationPicker.addInputSet({from: $('input', newTo),useDLRLU:false,useGroups:true});
            FC.formBorders(newTo);  // parent value added
            FC.clearFields(newTo);
            $('a.remove-station', newTo).bind('click', function(){
                $(this).parent().remove();
                return false;
            });
            toCount++;
        }
        return false;
    });
    
    
    var advSearchL = $("a.adv-search");
    var advSearch = $("div.advanced-search");
    
    if ($('#jpState', 'div.pocket-timetable').val() == 'advanced') {
        advSearch.removeClass("search-closed").addClass("search-open");
        advSearchL.addClass("hide-search");
    }
    
    advSearchL.bind('click', function(){
        if (advSearchL.hasClass("hide-search")) {
            $('#jpState', 'div.pocket-timetable').val('');
            advSearch.removeClass("search-open").addClass("search-closed");
            advSearchL.removeClass("hide-search");
            return false;
        }
        else {
            $('#jpState', 'div.pocket-timetable').val('advanced');
            advSearch.removeClass("search-closed").addClass("search-open");
            callingPoints();
            advSearchL.addClass("hide-search");
            return false;
        }
    });
    
    // advanced search options - pocket timetable - show/hide the calling points input box
    
    function callingPoints(){
        if ($('#sltIntCalling').val() != "showMe") {
            $('#txtCallingStn').attr('disabled', 'disabled');
            $('div.btn-callingpoint').hide();
        }
        $('#sltIntCalling').change(function(){
            var opt = ($(this).val());
            if (opt == "showMe") {
                $('div.btn-callingpoint').show();
                $('#txtCallingStn').attr('disabled', '');
            }
            else {
                $('#txtCallingStn').attr('disabled', 'disabled');
                $('div.btn-callingpoint').hide();
            }
        });
    }
};


// GENERIC POPUP - attaches a popup event to a class which uses the HREF of the link for the link destination
// c = class, h=height, w=width
FC.popup = function(sel,args){
	
	var c = args[0];
	var w = args[1];
	var h = args[2];

	var myLink = $('a' + c);
	
	myLink.bind("click", function(){
		myLinkLocation = $(this).attr('href');
		window.open(myLinkLocation, 'windowname1', 'width=' + w + ', height=' + h + ', scrollbars=1');
		return false;
		
	});
	
};
/*
 * EW: Candidate for optimisation
 */
FC.faresTabs = function(){
	$(FC.vars.selectors.FARES_TAB).each(function(){
		__text = $('div.price-from div.inner', $(this).siblings('th.fares-tab')).html();
		$('div.price-from', $(this)).after('<div class="price-from-other"><div class="inner"><a href="#">' + __text + '</a></div></div>');
		
		$('div.price-from-other div.inner', $(this)).bind('click keypress', function(e){
			var __parent = $(this).parents('div.timetable');
			switch (e.keyCode) {
				case 9:
				case 16:
				case 18:
				case 17:
					return;
				default:
					if ($(this).parents(FC.vars.selectors.FARES_TAB).hasClass('fares-single')) {
						$('th.fares-return', __parent).show();
						$('input:radio', $('th.fares-return', __parent)).removeAttr('disabled');
						$('input:radio', $('th.fares-single', __parent)).attr('disabled', 'disabled');
						$('th.fares-single', __parent).hide();
						$('table.results', __parent).removeClass('show-single').addClass('show-return');
					}
					else {
						$('th.fares-single', __parent).show();
						$('input:radio', $('th.fares-single', __parent)).removeAttr('disabled');
						$('input:radio', $('th.fares-return', __parent)).attr('disabled', 'disabled');
						$('th.fares-return', __parent).hide();
						$('table.results', __parent).removeClass('show-return').addClass('show-single');
												
					}
					return false;
			}
		});
	});
	
	$('th.fares-single input', $('table.show-return')).attr('disabled', 'disabled');
	$('th.fares-return input', $('table.show-single')).attr('disabled', 'disabled');
};

FC.faresMore = function(){
	var reCall = false;
	$(FC.vars.selectors.FARES_MORE).each(function(){
		
		function updateSelected(__clicked){
			__parent = $(__clicked).parents('td.fares');
			__list = $('div.more-fares-list ul', __parent);
			__oldID = $('input', $('span.selectedFare', __parent)).attr('id');
			__oldSplit = __oldID.split('-');
			__newPos = parseInt(__oldSplit[1], 10);
			__newPos--;
			__trParent = $(__clicked).parents('tr');
			__tbodyParent = $(__clicked).parents('tbody');
			__checked = $('div.more-fares-list ul input:checked', __parent);
			
			if (__checked.length) {
				$('li:eq(' + __newPos + ')', __list).before($('<li class="clear"></li>').append($('span.selectedFare', __parent).contents()));
				$('span.selectedFare', __parent).empty();
				/* NREOJPTEST-1778 : IE7 Hack to make sure just one radio is returned */ 
				__checked.eq(__checked.length-1).each(function(){
					$(this).parents('li').remove().contents().appendTo($('span.selectedFare', __parent));
					$('span.selectedFare input:first', __parent).attr('tabindex', 0).attr('checked', 'checked');
				});
				
				$('input:radio', __parent).unbind().bind('click change', function(e){
					FC.updateBasket();
				});
				FC.tooltip($('span.selectedFare .tooltip', __parent));
			}		
			
		}
		/*
		 * Quick opt on Â£clicked here ETW
		 */
		function moreFares(__clicked){
			var $clicked = $(__clicked);
			__id = $('input:first', $clicked.parents('td.fares')).attr('id');
			__id = '#' + __id.substring(0, __id.length - 2);
			__url = $clicked.attr('href');
			__parent = $clicked.parents('td.fares');
			__trParent = $clicked.parents('tr');
			__tbodyParent = $clicked.parents('tbody');
			__tableParent = $clicked.parents('table');
			__idSelected = $('input:checked', __parent).attr('id');
			$('span.selectedFare input:radio', __parent).focus();
			hideOthers();
			$('input:checked', __tableParent).removeAttr('checked');
			$clicked.text('Hide fares').parent().removeClass('more-fares').addClass('hide-fares');
			$clicked.parents('.fares').addClass('show-more-fares');
			$('div.more-fares-container', __parent).append('<div class="more-fares-list"><div class="more-fares-list-top"><div class="more-fares-list-top-right"></div></div><div class="shadow-right"><div class="inner"><div class="loading"><img src="images/waiting.gif" alt="loading"/></div></div></div></div>');
			
			$.ajax({
				cache: false,
				dataType: 'html',
				type: 'get',
				url: __url,
				error: function(){
					alert(FC.vars.messages.MORE_FARES_ERROR);
				},
				success: function(data){
					__faresList = $('div.inner', $(__id, $(data)));
					$('div.more-fares-list div.inner').remove();
					$('div.more-fares-list div.shadow-right', __parent).html(__faresList);
					$('input:radio', __parent).unbind().bind('click change', function(e){
						FC.updateBasket();
					});
					$('input:radio', __parent).each(function(){
						if($(this).attr('id') == __idSelected){
							$(this).attr('checked', 'checked');
						}
					});
					if ($(data).find("p.see-all").length) {
						$('div.more-fares-list div.inner p.see-all a', __parent).unbind().bind('click', function(e){
							e.preventDefault();
							allFaresClick(this, __id);
						});
					}
					var moreFaresList = $('div.more-fares-list div.inner ul li', __parent);
					$('div.more-fares-list div.inner p', __parent).show();
					$('div.more-fares-list div.inner ul', __parent).show();
					FC.tooltip($('div.more-fares-list div.inner'), __parent);
					FC.cheapestFare($('div.more-fares-list div.inner'),true);
				}
				
			});
		}
		
		function hideFares(__clicked){
			
			__parent = $(__clicked).parents('.fares');
			$('div.more-fares-list', __parent).hide();
			$('p.hide-fares a', __parent).text('More fares').parent().removeClass('hide-fares').addClass('more-fares');
			$(__parent).removeClass('show-more-fares');
			updateSelected(__clicked);
			
			//Remove all existing fares
			$('div.more-fares-list').remove();
		}
		
		function hideOthers(){
			$('div.more-fares-list', 'td.fares').remove();
			$('p.hide-fares a', 'td.fares').text('More fares').parent().removeClass('hide-fares').addClass('more-fares');
			$('td.fares').removeClass('show-more-fares');
		}
		
		function faresClick(__clicked){
			if ($(__clicked).parent().hasClass('more-fares')) moreFares(__clicked);
			else hideFares(__clicked);
		}
		
		function allFaresClick(__clicked, __id){
			var __$clicked = $(__clicked);
				__url = __$clicked.attr("href"),
				__$parent = __$clicked.parents('td.fares'),
				__idSelected = __$parent.find('input')[0].id,
				__onError = function(){
					alert(FC.vars.messages.MORE_FARES_ERROR);
				},
				__onSuccess = function(data){
					var __allFaresList = $('div.inner', $(__id, $(data))),
						__$moreFaresList = __$parent.find('div.more-fares-list'),
						__$inner = __$moreFaresList.find('div.inner');
					__$inner.remove();
					__$moreFaresList.find('div.shadow-right').html(__allFaresList);
					__$parent.find('input:radio')
						.unbind()
						.bind('click change', function(e){
							FC.updateBasket();
						}).each(function(){
							if(this.id == __idSelected)this.checked = "checked";
						});
					__$inner.find('ul li').show();
					FC.tooltip(__$inner, __$parent);
					FC.cheapestFare($('div.more-fares-list div.inner'),true);
				};
				
			__$clicked.parent().remove();
			__$parent.find('div.inner').empty().append('<div class="loading"><img src="images/waiting.gif" alt="loading"/></div>');
			
			$.ajax({ //Make ajax call to non JS page
				cache: false,
				dataType: 'html',
				type: 'get',
				url: __url,
				error: __onError,
				success: __onSuccess
			});
		}
		
		$(this).bind('click', function(){
			faresClick(this);
			return false;
		});
	});
};

FC.updateBasket = function(){
	var __$basket = $(FC.vars.selectors.MINI_BASKET),
		__miniBasketNone = __$basket.find('tbody.miniBasketNone'),
		__miniBasketSingleFareOutward = __$basket.find('tbody.miniBasketSingleFareOutward'),
		__miniBasketSingleFareReturn = __$basket.find('tbody.miniBasketSingleFareReturn'),
		__miniBasketReturnFare = __$basket.find('tbody.miniBasketReturnFare'),
		__miniBasketSingleFare = __$basket.find('tbody.miniBasketSingleFare'),
		__$ticketTotal = __$basket.find('div.ticket-total'),
		
		__L = FC.vars.links,
		__singleFareOutwardTotal = 0,
		__singleFareReturnTotal = 0,
		__returnFareTotal = 0,
		__fareTotal = 0,
		__returnAdded = 0,
		__fareInfoLink,
		__multiTicket;
	
	__miniBasketNone.find('th').text('Please select your journey')
	__miniBasketNone.show();
	__miniBasketSingleFareOutward.hide();
	__miniBasketSingleFareReturn.hide();
	__miniBasketReturnFare.hide();
	__miniBasketSingleFare.hide();
	__$basket.find('tr.miniBasketFare').remove();
	__$ticketTotal.find('span.price').html('&pound;0.00');
	__$ticketTotal.find('a.remove').hide();
	
	/* this fires four times for each check >_< */
	$('.more-fares-container input:checked').each(function(){
		var __input = $(this);
		if (__input.parents('td').hasClass('fares-return')) {
			__returnAdded++;
		}
				
		__input.parent().siblings('.fare-breakdown').find('input').each(function(){
			
			fareArray = $(this).val().split('|');
			
			if (typeof fareArray[7] !== 'undefined' && fareArray[7] === 'true') __multiTicket = true;
			
			switch (fareArray[3]) {
				case FC.vars.links.ADVANCE_INFO:
					__fareInfoLink = __L.ADVANCE_INFO_LINK;
					break;
				case FC.vars.links.ANYTIME_INFO:
					__fareInfoLink = __L.ANYTIME_INFO_LINK;
					break;
				case FC.vars.links.OFF_PEAK_INFO:
					__fareInfoLink = __L.OFF_PEAK_INFO_LINK;
					break;
				default:
					__fareInfoLink = '#';
					break;
			}
			
			fareStr = '<tr class="miniBasketFare"><td><strong>' + fareArray[1] + ' x ' + fareArray[2] + '</strong> - <a href="' + __fareInfoLink + '">' + fareArray[3] + '</a>';
			if (fareArray[4] !== '') fareStr += '<span class="type">(' + fareArray[4] + ')</span>';
			
			if (fareArray[6] !== '') fareStr += '<strong class="saving">Saving &pound;' + fareArray[6] + '</strong>';
			
			fareStr += '</td><td class="price">&pound;' + fareArray[5] + '</td></tr>';
			
			if (fareArray[0] === 'SingleFare') {
				__miniBasketNone.hide();
				$('tr.sub-total', __miniBasketSingleFare).before(fareStr);
				__miniBasketSingleFare.show();
				__returnFareTotal += parseFloat(fareArray[5]);
				$('tr.sub-total td.price', __miniBasketSingleFare).html('&pound;' + __returnFareTotal.toFixed(2));
				
			} else if (fareArray[0] === 'SingleFareOutward') {
				if ($('tr.miniBasketFare', __miniBasketSingleFareReturn).length === 0 && $('tr.miniBasketFare', __miniBasketReturnFare).length === 0) {
					$('th', __miniBasketNone).text('Please select return journey');
				} else __miniBasketNone.hide();
				
				$('tr.sub-total', __miniBasketSingleFareOutward).before(fareStr);
				__miniBasketSingleFareOutward.show();
				__singleFareOutwardTotal += parseFloat(fareArray[5]);
				$('tr.sub-total td.price', __miniBasketSingleFareOutward).html('&pound;' + __singleFareOutwardTotal.toFixed(2));
				
			} else if (fareArray[0] == 'SingleFareReturn') {
				if ($('tr.miniBasketFare', __miniBasketSingleFareOutward).length === 0 && $('tr.miniBasketFare', __miniBasketReturnFare).length === 0) {
					$('th', __miniBasketNone).text('Please select outward journey');
				} else __miniBasketNone.hide();
				
				$('tr.sub-total', __miniBasketSingleFareReturn).before(fareStr);
				__miniBasketSingleFareReturn.show();
				__singleFareReturnTotal += parseFloat(fareArray[5]);
				$('tr.sub-total td.price', __miniBasketSingleFareReturn).html('&pound;' + __singleFareReturnTotal.toFixed(2));
				
			} else if (fareArray[0] == 'ReturnFare') {
				if (__returnAdded < 2) {
					if (__input.attr('name') == 'fareOutward') {
						$('th', __miniBasketNone).text('Please select return journey');
					} else if ($('tr.miniBasketFare', __miniBasketSingleFareOutward).length === 0 && __input.attr('name') == 'fareReturn') {
							$('th', __miniBasketNone).text('Please select outward journey');
					} else __miniBasketNone.hide();
					
					$('tr.sub-total', __miniBasketReturnFare).before(fareStr);
					__miniBasketReturnFare.show();
					__returnFareTotal += parseFloat(fareArray[5]);
					$('tr.sub-total td.price', __miniBasketReturnFare).html('&pound;' + __returnFareTotal.toFixed(2));
				} else __miniBasketNone.hide();
			}
			
			if (__returnAdded < 2) __fareTotal += parseFloat(fareArray[5]);
			
			$('span.price', __$ticketTotal).html('&pound;' + __fareTotal.toFixed(2));
			$('a.remove', __$ticketTotal).show();
						
		});
		
		$('.ticket-total .multiple-ticket').remove();
		
		if (__multiTicket) $('.ticket-total .total').after('<p class="note multiple-ticket" style="clear:both;">You need to buy multiple tickets for this journey</p>');
		__multiTicket = false;
	});  
};

FC.cheapestFare = function($parent,additions) {
	var tcl = "selected-fare";
	var $radios;
	
	$parent.find("input[type=radio]").click(function(e) {
		var $radio = $(this);
		var $td = $radio.parents("td");
		var cheapest =  $td.find("span.cheapest-fare-label").length > 0 && $radio.parent().parent().hasClass("selectedFare");
		
		$td.parents("table").find("td."+ tcl).removeClass(tcl);
		$td.addClass(tcl);
		var cStr = cheapest? "cheapest " : "";
		
		setTimeout(function(){
			updateButton(cStr)
		},200);
	});
	
	function updateButton(c) {
		var fareTotal = $("span.price").text();
		
		if(FC.hasIE6) {
			$("div.journey-planner-times").find("span.b-y-lrg input").eq(0).val("Buy "+ c +"for "+ fareTotal); 
		} else {
			$("div.journey-planner-times").find("button span").eq(0).html("Buy "+ c +"for "+ fareTotal); 
		}
	}
}
/*
 * Controls form behavior for buttons and summary links on 1.1.3 tempaltes
 */
FC.viewSummary = function($parent){
	
	var anchor = $parent.eq($parent.index(this)), 
		id = anchor.attr('data-formid'),			
		form = $('#' + id),
		buttons = $("button[type=submit]", form);
		
	if(FC.hasIE6) buttons = $("input[type=submit]", form);

	// view-summary links : show and attach click event handler to submit form
    if (form.length) {
        $parent.click(function(){
            form.submit();
            return false;
        });
        
        /* Add click event to buy now button */
        buttons.click(function(e){
            e.preventDefault();
            form.attr("target", "_blank");
            $("#jp-button-pressed").val(this.value);
            form.submit();
            form.attr("target", "");
        });
			
    }
	
};

FC.printButton = function(){
	$(".multi-button ul").prepend("<li class='first'><a class='print' href='javascript:window.print()'><span class='border'><span class='image'>Print</span></span></a></li>");
};

FC.miniBasket = function(){
	var __basket = $(FC.vars.selectors.MINI_BASKET),
		__total = __basket.find('div.ticket-total'),
		__insert,
		resetTotals = function (){
			$('tbody.miniBasketSingleFareOutward td.price', __basket).html('&pound;0.00');
			$('tbody.miniBasketSingleFareReturn td.price', __basket).html('&pound;0.00');
			$('tbody.miniBasketReturnFare td.price', __basket).html('&pound;0.00');
			$('tbody.miniBasketSingleFare td.price', __basket).html('&pound;0.00');
			$('span.price', __total).html('&pound;0.00');
		};
	
	function init(){
		__basket.prepend('<table cellpadding="0" cellspacing="0" border="1" class="tickets"><thead><tr><th scope="col"><span class="title">Tickets</span></th><th scope="col" class="price">Price</th></tr></thead></table>');
		
		__insert = '<tbody class="miniBasketSingleFareOutward"><tr class="first"><th colspan="2" scope="rowgroup" class="scope-rowgroup">Single Fare - Outward journey</th></tr><tr class="last sub-total"><th scope="row" class="scope-row">Outward total</th><td class="price">&pound;0.00</td></tr></tbody>';
		__insert += '<tbody class="miniBasketNone"><tr class="first"><th colspan="2" scope="rowgroup" class="scope-rowgroup">Please select your journey</th></tr></tbody>';
		__insert += '<tbody class="miniBasketReturnFare"><tr class="first"><th colspan="2" scope="rowgroup" class="scope-rowgroup">Return Fare</th></tr><tr class="last sub-total"><th scope="row" class="scope-row">Total</th><td class="price">&pound;0.00</td></tr></tbody>';
		__insert += '<tbody class="miniBasketSingleFareReturn"><tr class="first"><th colspan="2" scope="rowgroup" class="scope-rowgroup">Single Fare - Return journey</th></tr><tr class="last sub-total"><th scope="row" class="scope-row">Return total</th><td class="price">&pound;0.00</td></tr></tbody>';
		__insert += '<tbody class="miniBasketSingleFare"><tr class="first"><th colspan="2" scope="rowgroup" class="scope-rowgroup">Single Fare</th></tr><tr class="last sub-total"><th scope="row" class="scope-row">Total</th><td class="price">&pound;0.00</td></tr></tbody>';
		
		__basket.find('table').append(__insert);
		
		$('tbody.miniBasketSingleFareOutward, tbody.miniBasketSingleFareReturn, tbody.miniBasketReturnFare, tbody.miniBasketSingleFare', __basket).hide();
		
		__total.prepend('<p class="total">Total <span class="price" id="total-price">&pound;0.00</span></p>');
		
		if($('.more-fares-container input:checked').length){
			FC.updateBasket();
		}
	}
	
	$('div.more-fares-container input:radio').bind('click change', function(e){
		FC.updateBasket();
	});
	
	init();
};

FC.fares = function(){
	var shiftDown, 
		onKeyHandler = function (e) {
			if (e.keyCode == 16) shiftDown = (e.type === 'keyup') ? false : true;
			e.stopPropagation();
		};
	
	$(FC.vars.selectors.RESULTS_TABLE).bind('keydown keyup', onKeyHandler);
		
	$('label', 'td.fares span.selectedFare').each(function(){
		$(this).attr('tabindex', 0)
			.bind('keydown', function(e){
				if(e.keyCode == 9 && shiftDown) {
					$('a', $(this).parents('td').prev('td.detail')).focus();
					return false;
				}
			});
	});
};

$('#register-panel iframe').ready(function(){
	//REGISTER CLOSE BUTTON
	FC.registerClose = function(){
		$(FC.vars.selectors.REGISTER_CLOSE).bind("click", function(){
		   $(FC.vars.selectors.REGISTER_BUTTON).trigger('click');
			return false;
		});
	};
});


/*
 * Opens a popup on the HP when talking to lisa
 */
FC.askLisa = function(form){
    form.bind("submit", function(){
        var url = $(this).attr("action");
        window.open(url, "askLisa", "width=330,height=550");
        return false;
    });
};

FC.clockLoad = function(){
	var __C = FC.vars.clock,
		flashvars = {timeSource: __C.TIME_SOURCE},
		params = {menu: "false",wmode: "transparent"};
	
	swfobject.embedSWF(__C.EMBED, "myContent", "194", "105", "9.0.0", "swf/clock/swfobject/expressInstall.swf", flashvars, params);
}

FC.spOne = function($from) {
	stationPicker.init();
	stationPicker.addInputSet({
        from: $from,
        to: $("#txtTo"),
		useGroups: true,
		useDLRLU: true,
		userStations: (typeof(fnr) === "undefined" ? undefined : fnr )
    });
	
	stationPicker.addInputSet({
        from: $("#txtViaAvDest"),
		useGroups: true
    });
	
    stationPicker.testForFocus();
		
}

FC.spTwo = function($from) {
	stationPicker.init();	
	stationPicker.addInputSet({
        from: $from,
        to: $("#train-to")
    });
	
    stationPicker.testForFocus();
}

FC.spThree = function($station) {
	stationPicker.init();
	stationPicker.addInputSet({from: $station});
    stationPicker.testForFocus();
}

FC.spFour = function($from){
	stationPicker.init();
	stationPicker.addInputSet({
		from: $from,
		to: $("#txtToCFF"),
		useGroups: true
	});
	stationPicker.testForFocus();
}

FC.editJourneyLink = function($link) {
	$link.click(function(e) {
		var $n2 = $("#num2");
		if(!$n2.hasClass("expanded")) $n2.click();
	});
}

/*
FC.spCFF = function($from) {
	stationPicker.init();
	stationPicker.addInputSet({
        from: $from,
        to: $("#txtToCFF"),
		useGroups: true
    });
}
*/

$(function($){
	var __FC = FC, __SEL = __FC.vars.selectors; //globals to locals
	__FC.clearFields();
	
	//Homepage
	if ($.find(__SEL.HOMEPAGE).length) {
		$(window).bind('load', __FC.tickerInit);

		if ($.find(__SEL.HP_LIVE_TRAINS).length) {
			$('div.timetable').liveTrains({rows: 4, homepage: true});
		}
		if ($.find(__SEL.TRAIN_ACTION).length) {
			__FC.trainAction();
		}
	}
	
	// Live departure board
	$('#live-departure-board').liveTrains({rows: 10});
	
	// Live departure details
	// Use this function to call liveTrains plugin to and process different data 
	$('#live-departure-details').liveTrains({type: 'departureDetails', dataUrl: 'javascript/departure-details.js'});
		
	
	/*
	 * The following are in the PresentPass structure
	 */
	//Register Flyout - Header Let's Go Button
	//Pocket Timetable- unoptimised, single page. change to spit this function out.	#
	//Times
	//ToolTip
	//Accordian
	//Accordian Table (hNRE-3.1-Service-Disruptions.shtml)
	//Show More (what?)
	//SMS Options 
	//Route Map
	//Alert popup
	//Side Tabs
	
	__FC.presentPass([{
		test: __SEL.REGISTER_BUTTON,
		func: __FC.registerFlyout
	},{
		test: __SEL.JP_TIMES,
		func: __FC.callingPoints
	}, {
		test: __SEL.TOOLTIP_HOLDER,
		func: __FC.tooltip
	}, {
		test: __SEL.ACCORDIAN,
		func: __FC.accordian
	}, {
		test: __SEL.ACCORDIAN_TABLE,
		func: __FC.accordianTable
	}, {
		test: __SEL.SHOW_MORE,
		func: __FC.showMore
	}, {
		test: __SEL.SMS_OPTIONS,
		func: __FC.smsOptions
	}, {
		test: __SEL.ALERT_POPUP,
		func: __FC.popup,
		args: ['.alert-popup', '668', '500']
	},  {
		test: __SEL.INPUT_BORDERS,
		func: __FC.formBorders
	}, {
		test: __SEL.SELECT_BORDERS,
		func: __FC.formBorders
	}, {
		test: __SEL.TXTAREA_BORDERS,
		func: __FC.formBorders
	}, {
		test: __SEL.CHKBOX_BORDERS,
		func: __FC.formBorders
	}, {
		test: __SEL.AMBIGOUS_STATION_ERROR_TO,
		func: __FC.resetUnknownStation
	}, {
		test: __SEL.AMBIGOUS_STATION_ERROR_FROM,
		func: __FC.resetUnknownStation
	}, {
		test: __SEL.JOURNEY_DATES,
		func: __FC.journeyDates
	},{
		test: "#txtFrom", /* Full SP */
		func: __FC.spOne
	},{
		test: "#train-from", /* LDB SP */
		func: __FC.spTwo
	},{
		test: "#station", /* Single LDB */
		func: __FC.spThree
	},{
		test: "#txtFromCFF", /* Single LDB */
		func: __FC.spFour
	},{
		test: "div.journey-planner-times",
		func: __FC.cheapestFare 
	},{
		test: "#ask_lisa_form",
		func: __FC.askLisa
	},{
		test: 'a.view-summary',
		func: __FC.viewSummary
	},{
		test: __SEL.ROUTE_MAP,
		func: __FC.routeMap 
	},{
		test: "#edit_ur_jorney_btn", /* Edit your jorney link in 1.1.3 */
		func: __FC.editJourneyLink
	}]);	
	
	
	/* this throws errors in IE6 */
	if($.find(__SEL.PT).length){
		__FC.PT();
	}
	
	//Journey Planner
	if ($.find(__SEL.JOURNEY_PLANNER).length) {
		__FC.addJourney();
		FC.presentPass([{
			test: __SEL.AD_SEARCH_HOLDER,
			func: __FC.advancedSearch
		}]);
	}
	
	//FareFinder
	if ($.find(__SEL.FARE_FIND).length) {
		__FC.timeRange();
		__FC.rcards();
		__FC.tocs();
		__FC.miniBasket();
		__FC.fareStates();
		__FC.increment('#adults');
		__FC.increment('#children');
		
		__FC.presentPass([{
			test: __SEL.TICKET_PROVIDER,
			func: __FC.chooseTOC
		}, {
			test:__SEL.RESULTS_TABLE,
			func: __FC.resultsTable
		}]);
	}
		
	//Fares	
	if ($.find(__SEL.RESULTS_TABLE).length) {
		if (!$.find(__SEL.JP_TIMES).length)__FC.callingPoints(); // AB 01/09/2010 is called earlier on the JP_TIMES trigger
		__FC.printButton();
		__FC.faresTabs();
		__FC.fares();
		__FC.rcards();
		__FC.faresMore();
	}
}(jQuery));
/*BG iFRAME plugin for Tooltip and datepicker (maybe) */
(function($){$.fn.bgIframe=$.fn.bgiframe=function(s){if(FC.hasIE&&/6.0/.test(navigator.userAgent)){s=$.extend({top:'auto',left:'auto',width:'auto',height:'auto',opacity:true,src:'javascript:false;'},s||{});var prop=function(n){return n&&n.constructor==Number?n+'px':n;},html='<iframe class="bgiframe"frameborder="0"tabindex="-1"src="'+s.src+'"'+'style="display:block;position:absolute;z-index:-1;'+(s.opacity!==false?'filter:Alpha(Opacity=\'0\');':'')+'top:'+(s.top=='auto'?'expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+\'px\')':prop(s.top))+';'+'left:'+(s.left=='auto'?'expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+\'px\')':prop(s.left))+';'+'width:'+(s.width=='auto'?'expression(this.parentNode.offsetWidth+\'px\')':prop(s.width))+';'+'height:'+(s.height=='auto'?'expression(this.parentNode.offsetHeight+\'px\')':prop(s.height))+';'+'"/>';return this.each(function(){if($('> iframe.bgiframe',this).length==0)this.insertBefore(document.createElement(html),this.firstChild);});}return this;};})(jQuery);