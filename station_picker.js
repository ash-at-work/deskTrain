var stationPicker = {
	
	//Setup Vars
	keyDownTimeout : 1,
	maxItems : 15,
	defaultFeed: "http://ojp.nationalrail.co.uk/find/stations/",
	defaultDLRLUFeed: "http://ojp.nationalrail.co.uk/find/stationsDLRLU/",
	
	//Global Vars
	currentInput : null,
	inputMatrix : {p:0,k:0},
	currentInputOptions : [],
	currentInputIndex : 0,
	currentListIndex : 0,
	keyDownTimer: "",
	blurTimer : "",
	inList : false,
	useCache: true,
	
	//Private Elements
	$picker : null,
	
	//public
	init: function() {
		//console.log("INIT");
		this.$picker = $("#picker");
		
		$("#picker").click(function(event){
			//console.log("PICKER CLICK");
			
			var msie = $.browser.msie;
			var pn = msie ? event.target.parentElement : event.target.parentNode;
			var pn_name = msie ? pn.tagName : pn.localName;
			
			//Selects the Li even if click target is a child node.
			if(pn_name.toLowerCase() === "li") {
				stationPicker.selectItem(pn);
			} else if(pn_name.toLowerCase() === "ul") {
				stationPicker.selectItem(event.target);
			} 
		});
		
		//Add window events
		$(window).bind("blur", function(e){
			//console.log("WINDOW BLUR");
			this.sp = stationPicker;
			if(this.sp.$picker.hasClass("sp-visible")) this.sp.listSelect("CLEAR");
			this.sp = null;
		});
	},
	
	//public
	addInputSet: function(options) {
		//console.log("ADD PICKER");
		
		//check for valid input
		if(!options.from.length) return false;
		
		//Set up at least 1 input
		options.from.data("inputOptionsIndex",this.currentInputOptions.length);
		this.setUpInput(options.from);
		
		//to too?
		if(!options.to) {
			options.single = true;
		} else {
			options.single = false;
			options.to.data("inputOptionsIndex",this.currentInputOptions.length)
			this.setUpInput(options.to);
		}
		
		//Check feed
		if(!options.dataURL) {
			options.dataURL = options.useDLRLU ? this.defaultDLRLUFeed : this.defaultFeed;
		}

		//Check faves n recents etc
		options.useUserStations = typeof(options.userStations) === "object";
		//console.log(options.useUserStations)
		
		//save options
		this.currentInputOptions[this.currentInputOptions.length] = options;
		
		//turn off caching for multiple input sets
		this.useCache = this.currentInputOptions.length === 1;
		//console.log(options)
		
		//closure
		options = null;
		
	},
	
	//public
	getFavorites: function() {
		var opt = this.getCurrentInput("OPTIONS")
		if(typeof(opt) === "undefined" || typeof(opt.userStations) === "undefined") {
			return false;
		} else {
			return opt.userStations;
		}
	},
	
	// public
	testForFocus: function(){
		$('form input[isfocused^="t"]').trigger('focus').trigger('keydown');
	},
	
	//private from here
	setUpInput: function(inputElement) {
		var that = this;
		var stype = inputElement.attr("stype");
		//console.log("SETUP INPUT");
		
		//Turn off broswer auto complete and spell checking
		inputElement.attr("autocomplete","off").attr("spellcheck","false");
		
		//had a lot of trouble matching the height via CSS. So do it via JS >_<
		if(inputElement.outerHeight()) inputElement.next("span").css("height", (inputElement.outerHeight() - 2 ).toString() + "px");
		
		//Check if an icon needs to be added
		if(stype) {
			var size = 16;
			if(stype == "dlrlu") size = 40;
			if(stype == "dlr") size = 22;
			that.setIcon(inputElement,inputElement.attr("stype"),size) 
		}
		
		//Focus
		inputElement.focus(function(e){
			//console.log("FOCUS EVENT");
			var inputPosition = inputElement.offset();
			
			//local vars
			this.sp = that;
			this.inputElement = inputElement;
			
			//clear the blur timer
			clearTimeout(this.sp.blurTimer);
				
			//reset the previous list		
			if (this.sp.currentInput) this.sp.listSelect("CLEAR");
			
			//Reset the pervious element
			if (this.sp.currentInput) this.sp.currentInput.parent().removeClass("sp-hasfocus");
						
			//set the current input set
			this.sp.currentInputIndex = inputElement.data("inputOptionsIndex");
			
			//set the current input
			this.sp.currentInput = this.inputElement;
			this.sp.inputMatrix.p = this.inputElement[0].id === this.sp.getCurrentInput("FROM")[0].id ? 1 : 2;
						
			//position current list
			this.sp.$picker.css("top",(inputPosition.top + inputElement.height() + 7).toString() + "px");
			this.sp.$picker.css("left",(inputPosition.left - 1).toString() + "px");
			this.sp.$picker.css("min-width",(inputElement.parent().width() - 20).toString() + "px");
			if(this.sp.getCurrentInput("OPTIONS".useDLRLU))	this.sp.$picker.find("#je").css("max-width",(inputElement.parent().width() - 20).toString() + "px");
			inputPosition = null;
			
			//reset list style
			this.sp.$picker[0].className = "sp-visible loading";

			//Add the focus effect to the border
			this.inputElement.parent().addClass("sp-hasfocus");
			
			//first focus
			if(!this.inputElement.data("focused")) {
				//console.log("FIRST FOCUS");
				//Clear Text & icon
				//this.inputElement.val("");
				that.removeIcon(that.currentInput)
				//store value
				this.inputElement.data("focused",true);
				//show the defaults
				this.sp.$picker[0].className = "sp-visible";
			} else {
				//console.log("REFOCUS");
				//Element is refocused
				if(this.inputElement.val().length < 1) {
					//show the defaults
					this.sp.$picker[0].className = "sp-visible";
				} else {
					if(this.sp.useCache && stationPicker.getCurrentList().attr("term") == this.sp.currentInput.val()) {
						//console.log("SHOW CACHE")
						this.sp.setPickerClass();
					} else {
						clearTimeout(this.sp.keyDownTimer);					
						this.sp.keyDownTimer = setTimeout(this.sp.keyDownTimerHandler,this.sp.keyDownTimeout)
					}
				}
			}
			//close local vars
			this.sp = null;
			this.inputElement = null;
		});
		//blur event
		inputElement.blur(function(e){
			//console.log("BLUR EVENT");
			this.sp = that;
			this.sp.blurTimer = setTimeout(this.sp.blurTimerHandler,150,[this.sp.currentInput]);
			this.sp.currentListIndex = 0;
			this.sp = null;
		});
		
		//Key down/press event
		inputElement.bind("keydown",function(e) {
			//console.log("KEY DOWN EVENT");
			
			//local vars
			this.sp = that;
			
			switch(e.keyCode) {
				case 38: //UP ARW
					e.preventDefault();
					this.sp.deselectItem();
					this.sp.listSelect("UP");
				break;
				
				case 40: //DOWN ARW
					//move down
					e.preventDefault();
					this.sp.deselectItem();
					this.sp.listSelect("DOWN");
				break;
				
				case 9: // TAB
					//Select
					if (this.sp.inList) {
						this.sp.listSelect("SELECT");
					} else if(this.sp.currentInput.val().length > 0) {
						this.sp.listSelect("AUTO-SELECT");
					} 
				break;
				
				case 13: // ENTER
					//Select
					e.preventDefault();
					if (this.sp.inList) {
						this.sp.listSelect("SELECT");
					} else if(this.sp.currentInput.val().length > 0) {
						this.sp.listSelect("AUTO-SELECT");
					}
				break;
				
				case 27: //ESC
					//hide 
					this.sp.$picker[0].className = "";
				break;
				
				default: //OTHER
					//console.log("DEFAULT KEY")
					//reset timer
					this.sp.deselectItem();
					clearTimeout(this.sp.keyDownTimer);					
					this.sp.keyDownTimer = setTimeout(this.sp.keyDownTimerHandler,this.sp.keyDownTimeout)
				break;
			}
			//local closure
			this.sp = null;
		})		
	},
	
	blurTimerHandler: function(el) {
		//console.log("BLUR TIMER HANDLER")
		this.sp = stationPicker;
		//Hide the box
		if(!this.sp.$picker.hasClass("j-error")) {
			//console.log("J ERROR NO");
			this.sp.$picker[0].className = "";
		} 
		//remove style
		if(this.sp.currentInput) this.sp.currentInput.parent().removeClass("sp-hasfocus");
		//No input
		this.sp.currentInput = false;
		//closeure
		this.sp = null;
	},

	keyDownTimerHandler: function() {	
		//console.log("KEY  TIMER HANDLER")
		
		this.sp = stationPicker;
		
		//return if..
		if(!this.sp.currentInput) return false;
		
		var val = this.sp.currentInput.val();
		var currentInputOptions = this.sp.getCurrentInput("OPTIONS");
		
		//set picker matrix
		this.sp.inputMatrix.k = val.length > 20 ? 20 : val.length;
		
		//New list so reset current selected list item
		this.sp.listSelect("CLEAR");
		
		//Checks on length
		if(val.length === 0) {
			//show list
			this.sp.$picker[0].className = "sp-visible";
		} else if(this.sp.useCache && this.sp.getCurrentList().attr("term") === val) {
			//cached list is present
			this.sp.setPickerClass();
		} else {
			//new term
			this.sp.sendOjpRequest(val);
		}
		this.sp = null;
	},
	
	listSelect: function(type) {
		//console.log("LIST SELECT / NAV");
		
		var $currentList,
			currentListChildren,
			currentListLength;
		
		if(this.currentInput && this.currentInput.val().length > 0) {
			$currentList = this.getCurrentList();
		} else {
			$currentList = $("#d");
		}
		
		currentListChildren = $currentList.children();
		currentListLength = currentListChildren.length;
		
		//turn off old
		if(this.hasAnyClass(currentListChildren.get(this.currentListIndex))) {
			if(currentListChildren.get(this.currentListIndex).className === "sel") 
				currentListChildren.get(this.currentListIndex).className = "";
		}
		
		//Check there is a need to navigate
		if(currentListChildren.length === 0) return false;
		
		//Advance the list item
		switch(type) {
			case "UP":
				if(this.inList) {
					this.currentListIndex--;
					if (this.hasAnyClass(currentListChildren.get(this.currentListIndex))) this.currentListIndex--;
					if (this.currentListIndex < 0) this.currentListIndex = currentListLength - 1;	
					if (this.hasAnyClass(currentListChildren.get(this.currentListIndex))) this.currentListIndex--;
				} else {
					this.inList = true;
					this.currentListIndex = currentListLength - 1;
					if (this.hasAnyClass(currentListChildren.get(this.currentListIndex))) this.currentListIndex--;
				}
				currentListChildren.get(this.currentListIndex).className = "sel";
			break;
			
			case "DOWN":
			    if(this.inList) {
					this.currentListIndex++;
					if (this.hasAnyClass(currentListChildren.get(this.currentListIndex))) this.currentListIndex++;
					if (this.currentListIndex > currentListLength - 1) this.currentListIndex = 0;
					if (this.hasAnyClass(currentListChildren.get(this.currentListIndex))) this.currentListIndex++;
				} else {
					this.inList = true;
					this.currentListIndex = 0;
					if(this.hasAnyClass(currentListChildren.get(this.currentListIndex))) this.currentListIndex++;
				}
				currentListChildren.get(this.currentListIndex).className = "sel";
			break;
				
			case "SELECT":
				//console.log("SELECT");
				//select item
				this.selectItem(currentListChildren.get(this.currentListIndex));
				//reset
				currentListChildren.get(this.currentListIndex).className = "";
				this.currentListIndex = 0;
			    this.inList = false;
			break;
				
			case "AUTO-SELECT":
				if (this.hasAnyClass(currentListChildren.get(this.currentListIndex))) this.currentListIndex++;
				if (!this.hasAnyClass(currentListChildren.get(this.currentListIndex))) {
					/* Check the text typed matches the selected item */
					var selectedItem = currentListChildren.get(this.currentListIndex);
					var selectedItemText = document.all ? selectedItem.innerText : selectedItem.textContent;
					if(selectedItemText.toLowerCase().indexOf(this.currentInput[0].value.toLowerCase()) > -1) this.selectItem(selectedItem);
				} 
			break;
				
			case "CLEAR":
				for (var i = currentListChildren.length - 1; i >= 0; i--){
					if(this.hasAnyClass(currentListChildren[i])) {
						if(currentListChildren[i].className === "sel") {
							currentListChildren[i].className = "";
						}
					}
				};
				this.currentListIndex = 0;
				this.inList = false;
			break;
		}
	},
	
	sendOjpRequest: function(term){
		//console.log("AJAX REQUEST")
		var currentInputOptions = this.getCurrentInput("OPTIONS");
		var mURL = "";
		
		/* BUILD URL */
		if(currentInputOptions.single || !currentInputOptions.useDLRLU) {
			mURL = currentInputOptions.dataURL + term;
		} else {
			if(this.currentInput[0].id === currentInputOptions.from[0].id) {
				//In FROM && its default value
				if(currentInputOptions.to.val() === currentInputOptions.to[0].defaultValue) {
					mURL = currentInputOptions.dataURL + term;
				} else {
					mURL = currentInputOptions.dataURL + term + "/" + currentInputOptions.to.val();
 				}
			} else {
				//in TO
				if(currentInputOptions.from.val() === currentInputOptions.from[0].defaultValue) {
					mURL = currentInputOptions.dataURL + term;
				} else {
					mURL = currentInputOptions.dataURL + term + "/" + currentInputOptions.from.val();
 				}
			}
		}
		
		//console.log(mURL);
		
		//Send the ajax request
		$.ajax({
			dataType:"jsonp",
			url: mURL,
			success: this.processAjaxData,
			error: this.showServiceError
		});
		mURL = null;
	},
	
	processAjaxData: function(d) {
		/*
		 * Response Array Keys for ojpServiceURL
		 * 0 = CRS Code [XYZ]
		 * 1 = Station Name 
		 * 2 = Classification
		 * 	0 = Normal station
		 * 	1 = Group Station
		 * 	2 = London station
		 *  3 = Non OJP Station
		 *  
		 *  Response Array Keys for dlrServiceURL
		 *  0 = CRS
		 *  1 = Name
		 *  2 = Classification
		 *   0 = Normal station including London
		 *   1 = Group staition 
		 *   2 = London Station
		 *   3 = Non OJP station
		 *   4 = Station is exclusive to DLR
		 *   5 = Station is exclusive London Undergroud
		 *   6 = Station is both DLR and LU and not NR
		 *  3 = Enabled (boolean) (OJP can plan this route)
		 */
		//console.log("PROCESS AJAX")
		
		//Global grab
		this.sp = stationPicker;
		
		//Identify Current Picker
		var currentValue = this.sp.currentInput.val();
		var currentInputOptions = this.sp.getCurrentInput("OPTIONS");
		
		//Ohter vars
		var dataLength;
		var useHeaders = false;
		var listItems = '';
		
		//no data
		if(d === null) {
			this.sp.showServiceError();
			return false;
		} else {
			dataLength = d.length;
		}
		
		//Check for data or faves
		if(!currentInputOptions.useUserStations && dataLength === 0) {
			this.sp.$picker[0].className = "sp-visible nothing";
			return false;
		}
		
		//Merge userStations into data on first keypress
		if(currentInputOptions.useUserStations) {
			var us = currentInputOptions.userStations;
            var usf = [];
			
			//Loop through the FNR and add them to the top of the list
			for(var x in us) {
					for (var i = us[x].length - 1; i >= 0; i--){
		                if(currentValue.toLowerCase() === us[x][i][1].slice(0,currentValue.length).toLowerCase()) usf[usf.length] = us[x][i];
		            }
					if(usf.length) {
						useHeaders = true;
						listItems += '<li class="h">'+x+'</li>';
						listItems += this.sp.makeList(usf,currentInputOptions,currentValue,useHeaders);
						listItems += '<hr />';
					}
					
				usf = [];
			}
		}
		//new HTML string build
		listItems += useHeaders ? '<li class="h">All</li>' : '';
		
		//check for CRS codes and shift it to the top of the array
		if(currentValue.length === 3) {
			for (var i = 0, j = d.length - 1; i <= j; i++) {
				if(d[i][0].toLowerCase() === currentValue.toLowerCase()) {
					d.unshift(d[i]);
					i++;
					d.splice(i,1);
					continue;
				}
			}
		} 
		
		//Loop through JSON max times and build list
		listItems += this.sp.makeList(d,currentInputOptions,currentValue,useHeaders);
										
		//strip HR if just CRS is matched
		if(listItems.slice(listItems.length - 2 , listItems.length) === "/>") listItems = listItems.slice(0, listItems.length - 21);
		
		//Strip out LIs above maxitems		
		while(listItems.split("</li>").length > this.sp.maxItems) {
			listItems = listItems.slice(0,listItems.lastIndexOf("<li"));
		}
				
		//Add MORE text if LEN > MAX
		if(dataLength > this.sp.maxItems) listItems += "<hr /><li class='more' title='...for "+ (dataLength - this.sp.maxItems) +" more stations'>Continue typing to see more results...</li>";
		
		//Inject LIs and set search term
		this.sp.getCurrentList()[0].innerHTML = listItems;
		this.sp.getCurrentList()[0].setAttribute("term",currentValue);

		//Check that the list has content and Set UL to show
		if (listItems === "") {
			this.sp.$picker[0].className = "sp-visible nothing";
		} else {
			this.sp.setPickerClass();
		}
		
		//closure
		this.sp = null;
		
	},
	
	selectItem : function(el) {
		//console.log("SELECT ITEM");
		
		if(el === undefined) return false;
		
		var text = document.all ? el.innerText : el.textContent;
		var type = el.getAttribute("stype");
		var sok = el.getAttribute("sok");
		var lu = /lu/;
		var dlr = /dlr/;
		var otherInput,a,b;
		
		if(this.getCurrentInput("OPTIONS").useDLRLU) {
			
			switch(type) {
				case "dlr":
					text = text.slice(0,text.length-3)
					this.setIcon(this.currentInput,"dlr", 22);
					break;
				case "lu":
					text = text.slice(0,text.length-3)
				    this.setIcon(this.currentInput,"lu", 16);
					break;
				case "dlrlu":
					text = text.slice(0,text.length-3)
				    this.setIcon(this.currentInput,"dlrlu", 40);
					break;
				default: 
					this.removeIcon(this.currentInput);
			}
			
			otherInput = this.getCurrentInput("TO")[0].id === this.currentInput[0].id ? this.getCurrentInput("FROM")[0] : this.getCurrentInput("TO")[0];
			
			if(!!otherInput.getAttribute("stype")) {
				a = otherInput.getAttribute("stype");
				b = this.currentInput[0].getAttribute("stype");
				
				if( (lu.test(a) || dlr.test(a)) && (lu.test(b) || dlr.test(b)) ) {
					sok = "false";
				}
			}
			
			if(this.currentInput.val().length > 1 && sok === "false") {
				//console.log("INVALID JOURNEY");
				//make red
				this.currentInput.parent().addClass("sp-error");
				this.$picker[0].className = "sp-visible j-error";
				this.$picker.find("#je").html([
					'<li class="no-sel no-pad">',
					'<p><span><img src="images/icon-',
					this.getCurrentInput("FROM")[0].getAttribute("stype"),
					'.png" alt="DLR" /> to <img src="images/icon-',
					this.getCurrentInput("TO")[0].getAttribute("stype"),
					'.png" />&nbsp;<strong>Sorry</strong></span></p>',
					'<p>Sorry, we can\'t plan this journey. Please pick a new destination.</p>',
					'</li>'
				].join(""));
			} else {
				this.currentInput.parent().removeClass("sp-error");
				this.$picker[0].className = "";
			}
			
		} else {
			//if NR only and you click a DLRLU
			if(type) {
				this.$picker[0].className = "sp-visible j-error";
			}
		}
		
		if(!stationPicker.hasAnyClass(el)) stationPicker.currentInput.val(stationPicker.formatSelection(text));
	},
	
	deselectItem : function() {
		//console.log("DESELECT ITEM");
		//clear any errors on DLR LU Icon
		if(this.currentInputOptions[this.currentInputIndex].useDLRLU) {
			this.currentInput.next("span")[0].className = "sp-icon-holder";
			this.removeIcon(this.currentInput);
			this.currentInput.parent().removeClass("sp-error"); 
		}
	},
	
	getCurrentInput: function(which) {
		//console.log("GET CURRENT INPUT")
		switch(which) {
			case "OPTIONS":
				return this.currentInputOptions[this.currentInputIndex];
				break;
			case "TO":
			   	return this.currentInputOptions[this.currentInputIndex].to;
				break;
			case "FROM":
			default: 
				return this.currentInputOptions[this.currentInputIndex].from;
				break;
		}
	},
	
	hasAnyClass: function(el) {
		//console.log("CHECK FOR CLASSES")
		if(el === undefined || el.className === null) {
			return false;
		} else {
			return (el.className.length > 0);
		}
	},
	/*
	 * Resize and apply an icon to the icon holder
	 */
	setIcon: function(currentInput,type,size) {
		//console.log("SET ICON SIZE")
		var span = currentInput.next("span");
		currentInput.parent().addClass("sp-has-icon");
		span[0].className = "sp-icon-holder sp-icon-" + type;
		currentInput.css("width","");
		currentInput.css("width",(currentInput.width() - size - 4).toString() + "px");
		currentInput[0].setAttribute("stype",type);
	},
	
	removeIcon: function(currentInput) {
		//console.log("REMOVE ICON SIZE")
		currentInput.parent().removeClass("sp-has-icon");
		currentInput.css("width","");
		currentInput[0].setAttribute("stype","");
	},
	
	formatSelection : function(txt) {
		//var crs = txt.slice(-5);
		//crs = crs.replace(/[^A-Za-z0-9-]/g, '');
		//return crs;

		//remove after CRS format and trim
		//var txt = txt.slice(0,txt.lastIndexOf("-"))
		//txt = txt.replace(/^\s+|\s+$/g, '');
		return txt;
	},
	
	makeList : function(d,currentInputOptions,currentValue,useHeaders) {
		
		var listItemsArray = [];
		var re = new RegExp(currentValue, "i");
		var highlight, CRSHighlight;
		var listItems = "";
		
		
		//console.log("useDLR")
		for (var i = 0, j = d.length - 1; i <= j; i++) {
		
			//skip groups
			if(!currentInputOptions.useGroups && d[i][0].length > 3)	continue;
			
			//highlight the typed letters
			highlight = d[i][1].replace(re,"<strong>$&</strong>");
			CRSHighlight = d[i][0].replace(re,"<strong>$&</strong>");
			
			//if headers are used set the margins
			listItemsArray[listItemsArray.length] = useHeaders ? '<li style="margin-left:85px"' : '<li ';
			
			//switch classification
			if(currentInputOptions.useDLRLU) {
				switch(d[i][2]) {
					case 4:
						listItemsArray[listItemsArray.length] =  'stype="dlr" sok="';
						listItemsArray[listItemsArray.length] =  (d[i][3] === 1);
						listItemsArray[listItemsArray.length] =  '"> ';
						listItemsArray[listItemsArray.length] =  highlight;
					    listItemsArray[listItemsArray.length] =  " - [<img src='images/icon-dlr.png' width='22' height='12' alt='DLR' />]";
						break;
					case 5:
						listItemsArray[listItemsArray.length] =  'stype="lu" sok="';
						listItemsArray[listItemsArray.length] =  (d[i][3] === 1);
						listItemsArray[listItemsArray.length] =  '"> ';
						listItemsArray[listItemsArray.length] =  highlight;
					    listItemsArray[listItemsArray.length] =  " - [<img src='images/icon-tube-sm.png' width='15' height='12' alt='Tube' />]";
						break;
					case 6:
						listItemsArray[listItemsArray.length] =  'stype="dlrlu" sok="';
						listItemsArray[listItemsArray.length] =  (d[i][3] === 1);
						listItemsArray[listItemsArray.length] =  '"> ';
						listItemsArray[listItemsArray.length] =  highlight;
					    listItemsArray[listItemsArray.length] =  " - [<img src='images/icon-dlrlu.png' width='40' height='12' alt='DLR Tube' />]";
						break;
					default: 
						listItemsArray[listItemsArray.length] =  'stype="nr" sok="';
						listItemsArray[listItemsArray.length] =  (d[i][3] === 1);
						listItemsArray[listItemsArray.length] =  '"> ';
						listItemsArray[listItemsArray.length] =  highlight;
						listItemsArray[listItemsArray.length] =  ' - [';
						listItemsArray[listItemsArray.length] =  CRSHighlight;
						listItemsArray[listItemsArray.length] =  ']';
				}
			} else {
				//Build HTML string
				listItemsArray[listItemsArray.length] = '>';
				listItemsArray[listItemsArray.length] = highlight;
				listItemsArray[listItemsArray.length] = ' - [';
				listItemsArray[listItemsArray.length] = d[i][0];
				listItemsArray[listItemsArray.length] = ']';
			}
		
			listItemsArray[listItemsArray.length] = '</li>';
		};
					
		return listItems + listItemsArray.join("");
		
	},
	
	getCurrentList : function() {
		//console.log("GET CURRENT LIST");
		/*
		 * Creates or selects a list for on page caching, only works with one SP pair on page.
		 */
		var len = this.currentInput.val().length;
		var elstr = "#p";elstr += this.inputMatrix.p;elstr += "k";
		var $el;
				
		if(len < 20) {
			elstr += len;
		} else {
			elstr += "20";
		}
		
		$el = $(elstr);
		
		if($el.length) {
			return $el;
		} else {
			$("#p" + this.inputMatrix.p).append($("<ul/>",{id:elstr.slice(1)}));
			return $(elstr);
		}
	},
	
	setPickerClass : function() {
		//console.log("SET PICKER CLASS");
		var len = this.currentInput.val().length > 20 ? 20 : this.currentInput.val().length;
		
		if(len > 0) {
			this.$picker[0].className = "sp-visible p"+ this.inputMatrix.p + " "+ "p" + this.inputMatrix.p + "k"  + len;
		} else {
			this.$picker[0].className = " sp-visible";
		}
		
	},
	
	showServiceError : function(e) {
		//console.log("SERVICE ERROR");
		this.$picker[0].className = "sp-visible error";
		this.$picker.find("#sp-s-e").html('<li class="no-sel no-pad"><strong>Service Error</strong><p>Sorry, please type your full station name.</p></li>');
	}
}