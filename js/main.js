/* 
    Live Trains Mac OS X Widget
    (c) National Rail Enquiries, 2010
    Developed by Jon Chong / @jonathanchong
 */

var debug = false;
var delay = 300000; // how often widget refreshes
var delayLimit = 5; // service delay threshold 5 minutes
var feedURL = 'http://realtime.nationalrail.co.uk/LDBWS/ldb2.asmx';
// var feedURL = 'http://staging.livedepartureboards.co.uk/LDBWS/ldb2.asmx';
var showCRS = false;
var	timer = false;
var tokenValue = '5309573E-1ACB-46B9-A702-690D38DD4098';
var userAgent = 'NRE OS X Widget';
var updateURL = 'http://www.nationalrail.co.uk/system/osxwidgetversion.xml';
var version = '1.02';
// ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + 

//
// Function: load()
// Called by HTML body element's onload event when the widget is ready to start
//
function load()
{
	dashcode.setupParts();
	var online = window.navigator.onLine;

	if (online)
	{
		showFront();
	}
	else
	{
		$('p.message').empty();
		$('p.message').append('Unable to connect to the Internet.');
	}
}

function getDepartureBoard(crs, filterCrs, filterType, numRecs)
{
	var onloadHandler = function() { xmlLoaded(requestObject); };

	if (crs)
	{
		requestObject = new XMLHttpRequest();

		if (debug)
		{
            $('p.message').empty();
			$('p.message').append('Building webservice request...');
		}

        $('p.loading').show();

		requestObject.onload = onloadHandler;
		requestObject.open("POST", feedURL, true);
		requestObject.setRequestHeader("User-Agent", userAgent);
		requestObject.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
		requestObject.setRequestHeader("Cache-Control", "no-cache");
		requestObject.setRequestHeader("SOAPAction", "http://thalesgroup.com/RTTI/2008-02-20/ldb/GetDepartureBoard");
		requestObject.send(
		"<?xml version=\"1.0\" encoding=\"utf-8\"?><soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">" + 
		"<soap:Header><AccessToken><TokenValue>" + tokenValue +  "</TokenValue></AccessToken></soap:Header><soap:Body><GetDepartureBoardRequest xmlns=\"http://thalesgroup.com/RTTI/2008-02-20/ldb/types\">" + 
		"<userAgent>" + userAgent + "</userAgent><numRows>" + numRecs + "</numRows><crs>" + crs + "</crs><filterCrs>" + filterCrs + "</filterCrs><filterType>" + filterType + "</filterType></GetDepartureBoardRequest></soap:Body></soap:Envelope>");
	}

	clearInterval(timer);

	return false;
}

function getServiceDetails(serviceID)
{
	var onloadHandler = function() { serviceXmlLoaded(requestObject); };

	if (serviceID)
	{
		requestObject = new XMLHttpRequest();

		if (debug)
		{
            $('p.message').empty();
			$('p.message').append('Building webservice request...');
		}

        $('p.loading').show();

		requestObject.onload = onloadHandler;
		requestObject.open("POST", feedURL, true);
		requestObject.setRequestHeader("User-Agent", userAgent);
		requestObject.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
		requestObject.setRequestHeader("Cache-Control", "no-cache");
		requestObject.setRequestHeader("SOAPAction", "http://thalesgroup.com/RTTI/2008-02-20/ldb/GetServiceDetails");
		requestObject.send(
		"<?xml version=\"1.0\" encoding=\"utf-8\"?><soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">" + 
		"<soap:Header><AccessToken><TokenValue>" + tokenValue + "</TokenValue></AccessToken></soap:Header><soap:Body><GetServiceDetailsRequest xmlns=\"http://thalesgroup.com/RTTI/2007-10-10/ldb/types\">" + 
		"<userAgent>" + userAgent + "</userAgent><serviceID>" + serviceID + "</serviceID></GetServiceDetailsRequest></soap:Body></soap:Envelope>");
    }

	clearInterval(timer);

	return false;
}

function submitForm()
{
	var from = getCRS(document.getElementById('train-from').value);
	var to = getCRS(document.getElementById('train-to').value);

	$('p.message').empty();

    if (!from)
    {
		$('p.message').append('Please choose a station before continuing.');
    }

    if ((from && to) && (from == to))
	{
		$('p.message').append('There are no direct services between these stations.');
	}

    saveSettings();
    showFront();
}

//
// Function: showBack(event)
// Called when the info button is clicked to show the back of the widget
//
// event: onClick event from the info button
//
function showBack(event)
{
    var front = document.getElementById('front');
    var back = document.getElementById('back');
    var from = getSetting('from');
    var to = getSetting('to');
    var num = getSetting('num');

	clearInterval(timer);

    $('label.faded').append(' (optional)');
    $('label#to').addClass('faded');
    $('select#to').addClass('faded');

	widget.prepareForTransition("ToBack");;
    front.style.display = 'none';
    back.style.display = 'block';
	setTimeout('widget.performTransition()', 0);

	if (num)
	{
		$('input#num > value').replaceWith(num);
	}
}

//
// Function: showFront(event)
// Called when the done button is clicked from the back of the widget
//
// event: onClick event from the done button
//
function showFront(event)
{
    var front = document.getElementById('front');
    var back = document.getElementById('back');
    var service = document.getElementById('service');

    $('#picker').removeClass('sp-visible');

	// get preferences, otherwise load defaults	
    var from = getCRS(document.getElementById('train-from').value);
    var to = getCRS(document.getElementById('train-to').value);
    var num = getSetting('num');

	if (to)
	{
		$(to).slice(-4, 1);
	}

	if (!from)
	{
		from = getSetting('from');
	}

	if (!to)
	{
		to = getSetting('to');
	}

	if (!num)
	{
		num = document.getElementById('num').value;
	}

	widget.prepareForTransition("ToFront");
    front.style.display = 'block';
    back.style.display = 'none';
    service.style.display = 'none';
	setTimeout('widget.performTransition()', 0);

	if (from && (from != to))
	{
		timer = setInterval('updateWidget();', delay);
		getDepartureBoard(from, to, 'to', num);
	}
	else
	{
		showBack();
	}

	checkVersion();
}

function showServiceDetail(serviceID)
{
    var front = document.getElementById('front');
	var service = document.getElementById('service');

	widget.prepareForTransition("ToBack");;
    service.style.display = 'block';
    front.style.display = 'none';
	setTimeout('widget.performTransition()', 0);

	getServiceDetails(serviceID);
}

// Called when an XMLHttpRequest loads a feed; works with the XMLHttpRequest setup snippet
function xmlLoaded(xmlResponse)
{
	if (xmlResponse.readyState == 4)
	{
		if (xmlResponse.status == 200)
		{
			if (debug)
			{
				$('p.message').empty();
				$('p.message').append('Got result from webservice');
			}

			$('p.loading').hide();

			printServices(xmlResponse);
		}
		else
		{
			$('p.message').empty();
			$('p.message').append('Sorry, we could not retrieve a result. Please try again');
			showBack();
		}
	}
}

// Called when an XMLHttpRequest loads a feed; works with the XMLHttpRequest setup snippet
function serviceXmlLoaded(xmlResponse)
{
	if (xmlResponse.readyState == 4)
	{
		if (xmlResponse.status == 200)
		{
			if (debug)
			{
				$('p.message').empty();
				$('p.message').append('Got result from webservice');
			}

			$('p.loading').hide();

			printServiceDetails(xmlResponse);
		}
		else
		{
			$('p.message').empty();
			$('p.message').append('Sorry, we could not retrieve a result. Please try again');
			showBack();
		}
	}
}

function printServices(xmlResponse)
{
	var html = '';
    var responseText = xmlResponse.responseText;
	var origin = getStationName(responseText);
	var originCRS = getStationCRS(responseText);
	var destination = $(responseText).find('filterLocationName:first').text();
	var destinationCRS = $(responseText).find('filtercrs:first').text();

	widget.prepareForTransition("ToFront");
	setTimeout('widget.performTransition()', 0);

    $('h2.station').empty();
    $('h2.station').append((!destination) ? origin + ' [' + originCRS + ']' : origin + ' [' + originCRS + '] to ' + destination + ' [' + destinationCRS + ']');

	$('p.message').empty();

    $('p span.last_updated_time').empty();
    $('p span.last_updated_time').append(getLastUpdated($(responseText).find('generatedAt').text()));

	$('table.trains').empty();

	if ($(responseText).find('nrccMessages > message').length)
	{
		var nrccMessage = $(responseText).find('nrccMessages > message:first').text();
		nrccMessage = nrccMessage.replace(/(<.*?>)/ig, '');
		$('p.message').append(nrccMessage);
	}

	if (responseText.indexOf('<location>') > 0)
	{
		$(responseText).find('service').each(function()
		{
			var origin = $(this).find('origin').find('locationName').text();
			var originCRS = $(this).find('origin').find('crs').text();
			var nDestinations = $(this).find('destination').children();
			var n = nDestinations.length;
			var destination = '';

			if (n > 1)
			{
				if (showCRS)
				{
					destination = $(this).find('destination > location > locationName:first').text() + ' [' + $(this).find('destination > location > crs:first').text() + '] &amp; ' + $(this).find('destination > location > locationName:last').text() + ' [' + $(this).find('destination > location > crs:last').text() + ']';
				}
				else
				{
					destination = $(this).find('destination > location > locationName:first').text();
					
					if ($(this).find('destination > location > via:first').length)
					{
						destination += ' ' + $(this).find('destination > location > via:first').text();
					}
					
					destination += ' &amp; ' + $(this).find('destination > location > locationName:last').text();

					if ($(this).find('destination > location > via:last').length)
					{
						destination += ' ' + $(this).find('destination > location > via:last').text();
					}
				}
			}
			else
			{
				destination = $(this).find('destination > location > locationName:first').text();

				if (showCRS)
				{
					destination += ' [' + $(this).find('destination > location > crs:first').text() + ']';
				}
			}

			var platform = $(this).find('platform').text();
			var operator = $(this).find('operator').text();
			var std = $(this).find('std').text();
			var etd = $(this).find('etd').text();
			var serviceID = $(this).find('serviceID').text();
			
			html += '<tr><th scope="row" id="' + serviceID + '"><a onclick="showServiceDetail(\'' + serviceID + '\', event);" href="#' + serviceID + '">' + destination + '</a></th>';
			html += '<td>' + std + '</td>';

			if (/On time|Starts|No report/i.test(etd))
			{
				html += '<td class="report" nowrap="nowrap">' + etd + '</td>';
			}
			else if (/Cancelled|Delayed/i.test(etd))
			{
				html += '<td class="delayed" nowrap="nowrap">' + etd + '</td>';
			}
			else
			{
				html += (convertMinutes(HMStoSec1(etd + ':00') - HMStoSec1(std + ':00')) > delayLimit) ? '<td class="delayed">e ' + etd + '</td>' : '<td>e ' + etd + '</td>';
			}

            html += '<td nowrap="nowrap">';

            if (platform)
            {
                html += 'Plat ' + platform;
            }

			if (/bus/i.test($(this).parent().get(0).tagName))
			{
				html += 'Bus';
			}
			else if (/ferry/i.test($(this).parent().get(0).tagName))
			{
				html += 'Ferry';
			}

			html += '</td></tr>';
		})

		$('table.trains').empty();
		$('table.trains').append(html);
	}
	else
	{
		$('p.message').empty();
		$('p.message').append((!destination) ? 'There are no services running from this station' : 'There are no direct services for this route');
	}
}

function printServiceDetails(xmlResponse)
{
	var html = '';
    var responseText = xmlResponse.responseText;
	var origin = $(responseText).find('previousCallingPoints > callingPointList > callingPoint > locationName:first').text() ? $(responseText).find('previousCallingPoints > callingPointList > callingPoint > locationName:first').text() : getStationName(responseText);
	var originCRS = $(responseText).find('previousCallingPoints > callingPointList > callingPoint > crs:first').text() ? $(responseText).find('previousCallingPoints > callingPointList > callingPoint > crs:first').text() : getStationCRS(responseText);
	var destination = $(responseText).find('subsequentCallingPoints > callingPointList > callingPoint > locationName:last').text();
	var destinationCRS = $(responseText).find('subsequentCallingPoints > callingPointList > callingPoint > crs:last').text();
	var route = '<a onclick="" href="#">' + origin + '</a> [' + originCRS + '] to <a onclick="" href="#">' + destination + '</a> [' + destinationCRS + ']';
	var toc = getTOC(responseText);
	var serviceType = $(responseText).find('serviceType').text();

    $('h2.route').empty();
    $('h2.route').append(route);

    $('h3.toc').empty();
    $('h3.toc').append(toc + ' service');

	$('p.message').empty();
	$('table.trains').empty();

	if (responseText.indexOf('<GetServiceDetailsResult>') > 0)
	{
		$(responseText).find('previousCallingPoints > callingPointList > callingPoint').each(function()
		{
			var platform = $(this).find('platform').text();
			var destination = $(this).find('locationName').text();
			var destinationCRS = $(this).find('crs').text();
			var st = $(this).find('st').text();
			var at = $(this).find('at').text();
			var et = $(this).find('et').text();

			html += '<tr><th scope="row">' + destination + '</th>';
			html += '<td>' + st + '</td>';

			if (at)
			{
				if (/On time|Starts|No report/i.test(at))
				{
					html += '<td class="report" nowrap="nowrap">' + at  + '</td>';
				}
				else if (/Cancelled|Delayed/i.test(at))
				{
					html += '<td class="delayed" nowrap="nowrap">' + at + '</td>';
				}
				else
				{
					html += (convertMinutes(HMStoSec1(at + ':00') - HMStoSec1(st + ':00')) > delayLimit) ? '<td class="delayed">d ' + at + '</td>' : '<td>d ' + at + '</td>';
				}
			}
			else if (et)
			{
				if (/On time|Starts|No report/i.test(et))
				{
					html += '<td class="report" nowrap="nowrap">' + et  + '</td>';
				}
				else if (/Cancelled|Delayed/i.test(et))
				{
					html += '<td class="delayed" nowrap="nowrap">' + et + '</td>';
				}				
				else
				{
					html += (convertMinutes(HMStoSec1(et + ':00') - HMStoSec1(st + ':00')) > delayLimit) ? '<td class="delayed">e ' + et + '</td>' : '<td>e ' + et + '</td>';
				}
			}

            html += '<td nowrap="nowrap">';

            if (platform)
            {
                html += 'Plat ' + platform;
            }

			if (/bus/i.test(serviceType))
			{
				html += 'Bus';
			}
			else if (/ferry/i.test(serviceType))
			{
				html += 'Ferry';
			}

			html += '</td></tr>';
		})

		var st = $(responseText).find('std:first').text();
		var et = $(responseText).find('etd:first').text();
		var platform = $(responseText).find('platform:first').text();

		html += '<tr class="location"><th scope="row">' + getStationName(responseText) + '</th>';
		html += '<td>' + st + '</td>';

		if (/On time|Starts|No report/i.test(et))
		{
			html += '<td class="report" nowrap="nowrap">' + et + '</td>';
		}
		else if (/Cancelled|Delayed/i.test(et))
		{
			html += '<td class="delayed" nowrap="nowrap">' + et + '</td>';
		}
		else
		{
			html += (convertMinutes(HMStoSec1(et + ':00') - HMStoSec1(st + ':00')) > delayLimit) ? '<td class="delayed">e ' + et + '</td>' : '<td>e ' + et + '</td>';
		}

		html += '<td nowrap="nowrap">';

		if (platform)
		{
			html += 'Plat ' + platform;
		}

		if (/bus/i.test(serviceType))
		{
			html += 'Bus';
		}
		else if (/ferry/i.test(serviceType))
		{
			html += 'Ferry';
		}

		html += '</td></tr>';

		$(responseText).find('subsequentCallingPoints > callingPointList > callingPoint').each(function()
		{
			var platform = $(this).find('platform').text();
			var destination = $(this).find('locationName').text();
			var destinationCRS = $(this).find('crs').text();
			var st = $(this).find('st').text();
			var et = $(this).find('et').text();

			html += '<tr><th scope="row">' + destination + '</th>';
			html += '<td>' + st + '</td>';

			if (/On time|Starts|No report/i.test(et))
			{
				html += '<td class="report" nowrap="nowrap">' + et + '</td>';
			}
			else if (/Cancelled|Delayed/i.test(et))
			{
				html += '<td class="delayed" nowrap="nowrap">' + et + '</td>';
			}
			else
			{
				html += (convertMinutes(HMStoSec1(et + ':00') - HMStoSec1(st + ':00')) > delayLimit) ? '<td class="delayed">e ' + et + '</td>' : '<td>e ' + et + '</td>';
			}

            html += '<td nowrap="nowrap">';

            if (platform)
            {
                html += 'Plat ' + platform;
            }

			if (/bus/i.test(serviceType))
			{
				html += 'Bus';
			}
			else if (/ferry/i.test(serviceType))
			{
				html += 'Ferry';
			}

			html += '</td></tr>';
		})

		$('table.trains').empty();
		$('table.trains').append(html);
	}
	else
	{
		$('p.message').empty();
		$('p.message').append('Unable to retrieve service details');
	}
}

function getStationName(responseText)
{
	return $(responseText).find('locationName:first').text();
}

function getStationCRS(responseText)
{
	return $(responseText).find('crs:first').text();
}

function getTOC(responseText)
{
	return $(responseText).find('operator:first').text();
}

function getTOCcode(responseText)
{
	return $(responseText).find('operatorCode:first').text();
}

function getLastUpdated(timestamp)
{
	var timestamp = new Date();
	hhmm = timestamp.format('h:i A');

	return hhmm;
}

function unFade()
{
    $('label.faded').empty();
    $('label.faded').append('to');
    $('label.faded').removeClass('faded');
    $('select.faded').removeClass('faded');
}

//
// save settings
//
function saveSettings()
{
    var from = getCRS(document.getElementById('train-from').value);
    var to = getCRS(document.getElementById('train-to').value);
    var num = document.getElementById('num').value;

    widget.setPreferenceForKey(from, 'from');
    widget.setPreferenceForKey(to, 'to');
    widget.setPreferenceForKey(num, 'num');
}

function getSetting(key)
{
	return widget.preferenceForKey(key);
}

function checkVersion()
{
	update = false;

	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", updateURL, true);

	$('p.messageUpdate').empty();

	xmlhttp.onreadystatechange = function()
	{
		if (xmlhttp.readyState == 4)
		{
			if (xmlhttp.status == 200)
			{
				try
				{
					sidebarTag = xmlhttp.responseXML.getElementsByTagName('widget');
					var name = sidebarTag[0].getAttribute('version');
					var latestVersion = sidebarTag[0].getAttribute('version');
					var updateMessage = sidebarTag[0].getAttribute('updatemessage');
					var updateURL = sidebarTag[0].getAttribute('updateurl');
					var stationFileNewVersion = false;

					if (latestVersion > version)
					{
					    var updateBox = document.getElementById("update");

						$('p.messageUpdate').append('<a onclick="widget.openURL(\'' + updateURL + '\')" href="#">' + updateMessage + '</a>');
						update = true;
					}

					xmlhttp.abort();
				}
				catch (err)
				{
					// error
				}
			}
			else
			{
				// might want to do something local here
			}
		}
	}

	xmlhttp.send(null);

	return update;
}

function getCRS(str)
{
	return str.replace(/(^.*\[|\].*$)/g, '');
}

if (window.widget)
{
	widget.onremove = remove;
	widget.onhide = hide;
	widget.onshow = show;
	widget.onsync = sync;
}

//
// Function: remove()
// Called when the widget has been removed from the Dashboard
//
function remove()
{
	// Stop any timers to prevent CPU usage
	// Remove any preferences as needed

	clearInterval(timer);

	widget.setPreferenceForKey(null, dashcode.createInstancePreferenceKey('from'));
	widget.setPreferenceForKey(null, dashcode.createInstancePreferenceKey('to'));
	widget.setPreferenceForKey(null, dashcode.createInstancePreferenceKey('num'));
}

function updateWidget()
{
	var online = window.navigator.onLine;

	if (online)
	{
		showFront();
	}
	else
	{
		$('p.message').empty();
		$('p.message').append('Unable to connect to the Internet.');
	}
}

//
// Function: hide()
// Called when the widget has been hidden
//
function hide()
{
	// Stop any timers to prevent CPU usage

	clearInterval(timer);
}

//
// Function: show()
// Called when the widget has been shown
//
function show()
{
	load();
}

//
// Function: sync()
// Called when the widget has been synchronized with .Mac
//
function sync()
{
    // Retrieve any preference values that you need to be synchronized here
    // Use this for an instance key's value:
    // instancePreferenceValue = widget.preferenceForKey(null, dashcode.createInstancePreferenceKey("your-key"));
    //
    // Or this for global key's value:
    // globalPreferenceValue = widget.preferenceForKey(null, "your-key");
}

Date.prototype.format=function(format){var returnStr='';var replace=Date.replaceChars;for(var i=0;i<format.length;i++){var curChar=format.charAt(i);if(replace[curChar]){returnStr+=replace[curChar].call(this);}else{returnStr+=curChar;}}return returnStr;};Date.replaceChars={shortMonths:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],longMonths:['January','February','March','April','May','June','July','August','September','October','November','December'],shortDays:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],longDays:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],d:function(){return(this.getDate()<10?'0':'')+this.getDate();},D:function(){return Date.replaceChars.shortDays[this.getDay()];},j:function(){return this.getDate();},l:function(){return Date.replaceChars.longDays[this.getDay()];},N:function(){return this.getDay()+1;},S:function(){return(this.getDate()%10==1&&this.getDate()!=11?'st':(this.getDate()%10==2&&this.getDate()!=12?'nd':(this.getDate()%10==3&&this.getDate()!=13?'rd':'th')));},w:function(){return this.getDay();},z:function(){return"Not Yet Supported";},W:function(){return"Not Yet Supported";},F:function(){return Date.replaceChars.longMonths[this.getMonth()];},m:function(){return(this.getMonth()<9?'0':'')+(this.getMonth()+1);},M:function(){return Date.replaceChars.shortMonths[this.getMonth()];},n:function(){return this.getMonth()+1;},t:function(){return"Not Yet Supported";},L:function(){return(((this.getFullYear()%4==0)&&(this.getFullYear()%100!=0))||(this.getFullYear()%400==0))?'1':'0';},o:function(){return"Not Supported";},Y:function(){return this.getFullYear();},y:function(){return(''+this.getFullYear()).substr(2);},a:function(){return this.getHours()<12?'am':'pm';},A:function(){return this.getHours()<12?'AM':'PM';},B:function(){return"Not Yet Supported";},g:function(){return this.getHours()%12||12;},G:function(){return this.getHours();},h:function(){return((this.getHours()%12||12)<10?'0':'')+(this.getHours()%12||12);},H:function(){return(this.getHours()<10?'0':'')+this.getHours();},i:function(){return(this.getMinutes()<10?'0':'')+this.getMinutes();},s:function(){return(this.getSeconds()<10?'0':'')+this.getSeconds();},e:function(){return"Not Yet Supported";},I:function(){return"Not Supported";},O:function(){return(-this.getTimezoneOffset()<0?'-':'+')+(Math.abs(this.getTimezoneOffset()/60)<10?'0':'')+(Math.abs(this.getTimezoneOffset()/60))+'00';},P:function(){return(-this.getTimezoneOffset()<0?'-':'+')+(Math.abs(this.getTimezoneOffset()/60)<10?'0':'')+(Math.abs(this.getTimezoneOffset()/60))+':'+(Math.abs(this.getTimezoneOffset()%60)<10?'0':'')+(Math.abs(this.getTimezoneOffset()%60));},T:function(){var m=this.getMonth();this.setMonth(0);var result=this.toTimeString().replace(/^.+ \(?([^\)]+)\)?$/,'$1');this.setMonth(m);return result;},Z:function(){return-this.getTimezoneOffset()*60;},c:function(){return this.format("Y-m-d")+"T"+this.format("H:i:sP");},r:function(){return this.toString();},U:function(){return this.getTime()/1000;}};

var secondsPerMinute = 60;
var minutesPerHour = 60;

function convertSecondsToHHMMSS(intSecondsToConvert) {
	var hours = convertHours(intSecondsToConvert);
	var minutes = getRemainingMinutes(intSecondsToConvert);
	minutes = (minutes == 60) ? "00" : minutes;
	var seconds = getRemainingSeconds(intSecondsToConvert);
	return hours+":"+minutes;
}

function convertHours(intSeconds) {
	var minutes = convertMinutes(intSeconds);
	var hours = Math.floor(minutes/minutesPerHour);
	return hours;
}
function convertMinutes(intSeconds) {
	return Math.floor(intSeconds/secondsPerMinute);
}
function getRemainingSeconds(intTotalSeconds) {
	return (intTotalSeconds%secondsPerMinute);
}
function getRemainingMinutes(intSeconds) {
	var intTotalMinutes = convertMinutes(intSeconds);
	return (intTotalMinutes%minutesPerHour);
}

function HMStoSec1(T) { // h:m:s
	var A = T.split(/\D+/) ; return (A[0]*60 + +A[1])*60 + +A[2]
}