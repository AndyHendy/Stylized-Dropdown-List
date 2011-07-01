
/* =Custom Dropdowns (dropDown.js)
Custom Stylized Drop Down List w/ jQuery
Author: John Lomma
Twitter: http://twitter.com/lommaj
---------------------------------------------------------------*/

var _activeDropDown=null;

document.onclick = function(){
    checkForActiveDropDown();
};


function checkForActiveDropDown(){
	if (_activeDropDown!=null){
	    var addUL = $('#'+_activeDropDown).children(".DDButton").siblings('ul');
	    if (addUL.hasClass('open'))
	    {
	        addUL.removeClass('open');
	        addUL.hide();
	        addUL.siblings('.DDButton').removeClass('active');
			addUL.siblings('.data').css({
				'background':'#F9F9F9',
				'border':'1px solid #e7e6e6',
		        '-moz-box-shadow':'0 0 0',
		        '-webkit-box-shadow':'0 0 0',
		        'box-shadow':'0 0 0',
		        'outline':'none !important',
		        '-webkit-transition-duration':'0.2s, 0.2s',
		        '-webkit-transition-timing-function':'cubic-bezier(0, 0, 1, 1), cubic-bezier(0, 0, 1, 1)'
			});
	    }
	    _activeDropDown=null;
	}
}

function CreateDropDown(Element, DataDictionary, DefaultValue, Type, Width, HiddenField, onChangeFunc){
//create drop down  - John Lomma - 7/16/2010
//either pass a filled data dictionary with Type variable set to "custom" 
//or
//pass an empty {} for the DataDictionary and set the Type to "month", "day", "year", "numyears", "nummonths"
// added option to pass a onChangeFunction to simulate an onchange event per/dropdown - 7/19/10 (Chris Whalin)

	Element.addClass('DropDown');
	switch(Type)
	{
		case "month":
		    DataDictionary = {"0": "Month", "1": "01", "2": "02", "3": "03", "4": "04", "5": "05", "6": "06", "7": "07", "8": "08", "9": "09", "10": "10", "11": "11", "12": "12"};
		    DefaultValue = "Month";
		    Width = 128;
		break;
		case "day":
		    DataDictionary = {"0": "Day", "1": "1", "2": "2", "3": "3", "4": "4", "5": "5", "6": "6", "7": "7", "8": "8", "9": "9", "10": "10", "11": "11", "12": "12", "13": "13", "14": "14", "15": "15", "16": "16", "17": "17", "18": "18", "19": "19", "20": "20", "21": "21", "22": "22", "23": "23", "24": "24", "25": "25", "26": "26", "27": "27", "28": "28", "29": "29", "30": "30", "31": "31"};
		    DefaultValue = "Day";
		    Width = 100;
		break;
		case "year":
		    DataDictionary = { "0": "Year", "2010": "2010", "2009": "2009", "2008": "2008", "2007": "2007", "2006": "2006", "2005": "2005", "2004": "2004", "2003": "2003", "2002": "2002", "2001": "2001", "2000": "2000", "1999": "1999", "1998": "1998", "1997": "1997", "1996": "1996", "1995": "1995", "1994": "1994", "1993": "1993", "1992": "1992", "1991": "1991", "1990": "1990", "1989": "1989", "1988": "1988", "1987": "1987", "1986": "1986", "1985": "1985", "1984": "1984", "1983": "1983", "1982": "1982", "1981": "1981", "1980": "1980", "1979": "1979", "1978": "1978", "1977": "1977", "1976": "1976", "1975": "1975", "1974": "1974", "1973": "1973", "1972": "1972", "1971": "1971", "1970": "1970", "1969": "1969", "1968": "1968", "1967": "1967", "1966": "1966", "1965": "1965", "1964": "1964", "1963": "1963", "1962": "1962", "1961": "1961", "1960": "1960", "1959": "1959", "1958": "1958", "1957": "1957", "1956": "1956", "1955": "1955", "1954": "1954", "1953": "1953", "1952": "1952", "1951": "1951", "1950": "1950", "1949": "1949", "1948": "1948", "1947": "1947" };
		    DefaultValue = "Year";
		    Width = 80;
		break;
		case "futureyear":
		    var d = new Date();
		    var year = d.getFullYear(),yvar = year.toString();
		    var nyear = d.getFullYear()+1,nval = nyear.toString();
			var nnyear = d.getFullYear()+2,nval = nyear.toString();
			var nnnyear = d.getFullYear()+3,nval = nyear.toString();
			var nnnnyear = d.getFullYear()+4,nval = nyear.toString();
		    //DataDictionary = {"0": "Year", yval : year, nval : nyear};
		    DataDictionary = ["Year", year, nyear, nnyear, nnnyear, nnnnyear];
		    DefaultValue = "Year";
		    Width = 128;
		break;
		case "numyears":
		    DataDictionary = {"0": "Years", "1": ">1 year", "2": "1 year", "3": "2 years", "4": "3 years", "5": "4 years"};
		    DefaultValue = "Years";
		    Width = 98;	
		break;
		case "nummonths":
		    DataDictionary = {"0": "Months", "1": "1 month", "2": "2 months", "3": "3 months", "4": "4 months", "5": "5 months"};
		    DefaultValue = "Months";
		    Width = 120;	
		break;
        case "time":
            DataDictionary = { "default": "Time", "12:00 am": "12:00 am", "12:30 am": "12:30 am", "1:00 am": "1:00 am", "1:30 am": "1:30 am", "2:00 am": "2:00 am", "2:30 am": "2:30 am", "3:00 am": "3:00 am", "3:30 am": "3:30 am", "4:00 am": "4:00 am", "4:30 am": "4:30 am", "5:00 am": "5:00 am", "5:30 am": "5:30 am", "6:00 am": "6:00 am", "6:30 am": "6:30 am", "7:00 am": "7:00 am", "7:30 am": "7:30 am", "8:00 am": "8:00 am", "8:30 am": "8:30 am", "9:00 am": "9:00 am", "9:30 am": "9:30 am", "10:00 am": "10:00 am", "10:30 am": "10:30 am", "11:00 am": "11:00 am", "11:30 am": "11:30 am", "12:00 pm": "12:00 pm", "12:30 pm": "12:30 pm", "1:00 pm": "1:00 pm", "1:30 pm": "1:30 pm", "2:00 pm": "2:00 pm", "2:30 pm": "2:30 pm", "3:00 pm": "3:00 pm", "3:30 pm": "3:30 pm", "4:00 pm": "4:00 pm", "4:30 pm": "4:30 pm", "5:00 pm": "5:00 pm", "5:30 pm": "5:30 pm", "6:00 pm": "6:00 pm", "6:30 pm": "6:30 pm", "7:00 pm": "7:00 pm", "7:30 pm": "7:30 pm", "8:00 pm": "8:00 pm", "8:30 pm": "8:30 pm", "9:00 pm": "9:00 pm", "9:30 pm": "9:30 pm", "10:00 pm": "10:00 pm", "10:30 pm": "10:30 pm", "11:00 pm": "11:00 pm", "11:30 pm": "11:30 pm" };
            DefaultValue = "Time";
            Width = 110;
        break;
		case "gender":
		    DataDictionary = {"default": "Select", "male": "Male", "female": "Female"};
		    DefaultValue = "Select";
		    Width = 95;	
		break;
		case "state":
		    DataDictionary = {"default": "Select", "al": "AL", "ak": "AK", "az": "AZ", "ca": "CA", "co": "CO", "ct": "CT", "de": "DE", "fl": "FL", "ga": "GA", "hi": "HI", "id": "ID", "il":"IL", "in":"IN", "ia":"IA", "ks":"KS", "ky":"KY", "la":"LA", "me":"ME", "md":"MD", "ma":"MA", "mi":"MI","mn":"MN","ms":"MS", "mo":"MO", "mt":"MT", "ne":"NE", "nv":"NV", "nh":"NH", "nj":"NJ", "nm":"NM", "ny":"NY", "nc":"NC", "nd":"ND", "oh":"OH", "ok":"OK", "or":"OR", "pa":"PA", "ri":"RI", "sc":"SC", "sd":"SD", "tn":"TN", "tx":"TX", "ut":"UT", "vt":"VT", "va":"VA", "wa":"WA", "wv":"WV", "wi":"WI", "wy":"WY" };
		    DefaultValue = "Select";
		    Width = 85;	
		break;
		case "cctype":
		    DataDictionary = {"default": "Choose", "Amex": "Amex", "Visa": "Visa", "Mastercard": "Mastercard", "Discover": "Discover"};
		    DefaultValue = "Choose";
		    Width = 230;	
		break;
	}
	var selectedWidth = Width - 80;	
	var AppendingHTML = '<a href="#" class="DDButton"></a>';
	
    if (DataDictionary instanceof Array) {
    	// first, put the "default value" in. it may not be first.
        for (var key in DataDictionary) {
            if (key == "indexOf") continue; // gotta love IE.. 
		    if(DataDictionary[key] == DefaultValue){
			    AppendingHTML += '<div class="data" rel="' + DataDictionary[key] + '">' + DataDictionary[key] + '</div><ul>';
		    }
        }
        for (var key in DataDictionary) {
            if (key == "indexOf") continue; // gotta love IE.. 
		    if(DataDictionary[key] == DefaultValue){
			    AppendingHTML += '<li class="default highlight" rel="' + DataDictionary[key] + '">' + DataDictionary[key] + '</li>';
		    }else{
			    AppendingHTML += '<li rel="' + DataDictionary[key] + '">' + DataDictionary[key] + '</li>';
		    }
        }
    }
    else {
    	// first, put the "default value" in. it may not be first.
	    for (var key in DataDictionary) {
		    if(DataDictionary[key] == DefaultValue){
			    AppendingHTML += '<div class="data" rel="' + key + '">' + DataDictionary[key] + '</div><ul>';
		    }
	    }
	    for (var key in DataDictionary) {
		    if(DataDictionary[key] == DefaultValue){
			    //AppendingHTML += '<div class="data" rel="' + key + '">' + DataDictionary[key] + '</div><ul>';
			    AppendingHTML += '<li class="default highlight" rel="' + key + '">' + DataDictionary[key] + '</li>';
		    }else{
			    AppendingHTML += '<li rel="' + key + '">' + DataDictionary[key] + '</li>';
		    }
	    }
	}
	AppendingHTML += "</ul>";
	Element.html(AppendingHTML).width(Width);
	Element.children('.data').width(selectedWidth);
	Element.children('ul').width(Width);
	BindDropDowns(Element, HiddenField, onChangeFunc);
	return HiddenField;
}
function BindDropDowns(Element, HiddenField, onChangeFunc) {
//all events for drop downs
    Element.children(".DDButton").click(function (e) {
        $(this).blur().addClass('active');
		$(this).siblings('.data').css({'background':'#fff'}).glowOn();
        var ddUL = $(this).siblings('ul');
        if (ddUL.hasClass('open')) {
            ddUL.removeClass('open');
            ddUL.hide();
            $(this).removeClass('active');
			$(this).siblings('.data').css({ 'background':'#F9F9F9'}).glowOff();
        } else {
            ddUL.addClass('open');
            ddUL.show()/*.scrollbar()*/;
            $(this).addClass('active');
        }

        var ddId = $(this).parents(".DropDown").attr('id');

        if (_activeDropDown != ddId) checkForActiveDropDown();

        _activeDropDown = ddId;

        if (e.preventDefault()) {
            e.preventDefault();
            e.stopPropagation();
        }
        else {
            e.returnValue = false;
            e.cancelBubble = true;
        }
        return false;
    });
	/*
	Element.children(".DDButton").blur(function(){
		var ddUL = $(this).siblings('ul');
		ddUL.children('li:not(.selected)').hide();
		ddUL.removeClass('open');
	});
	*/
	
	
	Element.children('ul').children('li').click(function(e) {
	    if (e.preventDefault())
	    {
	        e.preventDefault();
	        e.stopPropagation();
	    }
	    else {
	        e.returnValue=false;
	        e.cancelBubble=true;
	    }
	    var thisValue = $(this).attr('rel');
	    var thisText = $(this).text();
	    $(this).siblings('.highlight').removeClass('highlight');
	    $(this).addClass('highlight');
	    Element.children('.data').attr('rel', thisValue).text(thisText);
	    HiddenField.val(thisValue);
	    Element.children('ul').hide();
	    Element.children('ul').removeClass('open');
	    Element.children('ul').siblings('.DDButton').removeClass('active');
		Element.children('.data').css({
			'background':'#F9F9F9',
			'border':'1px solid #e7e6e6',
	        '-moz-box-shadow':'0 0 0',
	        '-webkit-box-shadow':'0 0 0',
	        'box-shadow':'0 0 0',
	        'outline':'none !important',
	        '-webkit-transition-duration':'0.2s, 0.2s',
	        '-webkit-transition-timing-function':'cubic-bezier(0, 0, 1, 1), cubic-bezier(0, 0, 1, 1)'
		});
	    if (typeof(onChangeFunc) === 'function') {
	        (function(){onChangeFunc()})();
	    }
	    return false;
	});
}