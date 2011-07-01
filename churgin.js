/* custom drop down page script
Custom Images Date Selector Drop Down w/ jQuery
Author: John Lomma
Twitter: http://twitter.com/lommaj
Description: This code is part of dropDown.js. This code can be used in conjunction with that script
as either an external file or on the page level.
NOTE: This javascript is flexible and can be changed by altering the array 'm'. You may 
You may want to place this code on the page level rather than externally for a
greater level of customization.
------------------------------------*/

function dropdowns () {
	// read DD's from the global var the form field adds to (workaround in server-side DD class because DD/$ aren't loaded yet)
	if (window['FF_DD_N'] != undefined){
		$(FF_DD_N).each(function(index, dd){
			var bla = CreateDropDown($('#'+dd[0]), dd[1], dd[2], dd[3], dd[4], $('#'+dd[0]+'-hidden'));
			// and init their values:
			$('#'+dd[0]+'-hidden').val($('#'+dd[0]).children('.data').attr('rel'));
		});
	}	
}
function stateFieldsAlternate () {
	// to handle the list of states vs a free textbox for international province, etc.
	$('#field_state ul li').click(function(){
		if ($(this).attr('rel') == 'Other'){
			$('#field_state').hide();
			$('#field_state_free').val('');
			$('#field_state_free').show();
			$('#state-back').show();
		}
	});
	if ($('#field_state ul li.highlight').attr('rel') == 'Other'){	// page-load check:
		$('#field_state').hide();
		//$('#field_state_free').val('');	// might have a default
		$('#field_state_free').show();
		$('#state-back').show();
	}
	$('#state-back').click(function(){
		$(this).hide();
		$('#field_state_free').val('');
		$('#field_state_free').hide();
		$('#field_state').show();
		$('#field_state ul li[rel="0"]').click();
	});
}