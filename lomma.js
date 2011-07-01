function dropdowns () {
	/* 
	Custom Images Date Selector Drop Down w/ jQuery
	Author: John Lomma
	Date: 08/2010
	Description: This code is part of dropDown.js. This code can be used in conjunction with that script
	as either an external file or on the page level.
	NOTE: This javascript is flexible and can be changed by alterting the array 'm'. You may 
	You may want to place this code on the page level rather than externally for a
	greater level of customization.
	------------------------------------*/

	$(document).ready(function () {

	    //var returnedDate = $('.todaysDate').val();
	    var m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	    var DD = new Date();
	    var DDday = CreateDropDown($("#AddAppointmentDay"), {}, "", "day", 0, $('#AptDay'));
	    var DDdate = CreateDropDown($("#AddDate"), {}, "", "date", 0, $('#Date'));
		var DDStartHour = CreateDropDown($("#AddStartHour"), {}, "", "hour", 0, $('#StartHour'));
		var DDEndHour = CreateDropDown($("#AddEndHour"), {}, "", "hour", 0, $('#EndHour'));
		var DDStartQuarter = CreateDropDown($("#AddStartQuarter"), {}, "", "quarter", 0, $('#StartQuarter'));
		var DDEndQuarter = CreateDropDown($("#AddEndQuarter"), {}, "", "quarter", 0, $('#EndQuarter'));
		var DDStartMeridian = CreateDropDown($("#AddStartMeridian"), {}, "", "meridian", 0, $('#StartMeridian'));
		var DDEndMeridian = CreateDropDown($("#AddEndMeridian"), {}, "", "meridian", 0, $('#EndMeridian'));
		var DDPostHour = CreateDropDown($("#AddPostHour"), {}, "", "hour", 0, $('#PostHour'));
		var DDPostQuarter = CreateDropDown($("#AddPostQuarter"), {}, "", "quarter", 0, $('#PostQuarter'));
		var DDPostMeridian = CreateDropDown($("#AddPostMeridian"), {}, "", "meridian", 0, $('#PostMeridian'));
	    var DDyear = CreateDropDown($("#AddAppointmentYear"), {}, "", "futureyear", 0, $('#AptYear'));
		var DDFrequency = CreateDropDown($("#AddFrequency"), {}, "", "frequency", 0, $('#Frequency'));
		var DDAge = CreateDropDown($("#AddAge"), {}, "", "age", 0, $('#Age'));
		var DDEventType = CreateDropDown($("#AddEventType"), {}, "", "eventType", 0, $('#EventType'));
		var DDFeaturedVenueOptions = CreateDropDown($("#AddFeaturedVenueOptions"), {}, "", "featuredVenueOptions", 0, $('#FeaturedVenueOptions'));
	    var DDState = CreateDropDown($("#AddState"), {}, "", "state", 0, $('#AddState'));
		var DDMonStartTime = CreateDropDown($("#AddMonStartTime"), {}, "", "time", 0, $('#MonStartTime'));
		var DDMonEndTime = CreateDropDown($("#AddMonEndTime"), {}, "", "time", 0, $('#MonEndTime'));
		var DDTueStartTime = CreateDropDown($("#AddTueStartTime"), {}, "", "time", 0, $('#TueStartTime'));
		var DDTueEndTime = CreateDropDown($("#AddTueEndTime"), {}, "", "time", 0, $('#TueEndTime'));
		var DDWedStartTime = CreateDropDown($("#AddWedStartTime"), {}, "", "time", 0, $('#WedStartTime'));
		var DDWedEndTime = CreateDropDown($("#AddWedEndTime"), {}, "", "time", 0, $('#WedEndTime'));
		var DDThuStartTime = CreateDropDown($("#AddThuStartTime"), {}, "", "time", 0, $('#ThuStartTime'));
		var DDThuEndTime = CreateDropDown($("#AddThuEndTime"), {}, "", "time", 0, $('#ThuEndTime'));
		var DDFriStartTime = CreateDropDown($("#AddFriStartTime"), {}, "", "time", 0, $('#FriStartTime'));
		var DDFriEndTime = CreateDropDown($("#AddFriEndTime"), {}, "", "time", 0, $('#FriEndTime'));
		var DDSatStartTime = CreateDropDown($("#AddSatStartTime"), {}, "", "time", 0, $('#SatStartTime'));
		var DDSatEndTime = CreateDropDown($("#AddSatEndTime"), {}, "", "time", 0, $('#SatEndTime'));
		var DDSunStartTime = CreateDropDown($("#AddSunStartTime"), {}, "", "time", 0, $('#SunStartTime'));
		var DDSunEndTime = CreateDropDown($("#AddSunEndTime"), {}, "", "time", 0, $('#SunEndTime'));
		var DDPriceRange = CreateDropDown($("#AddPriceRange"), {}, "", "priceRange", 0, $('#PriceRange'));
		var DDParkingPrice = CreateDropDown($("#AddParkingPrice"), {}, "", "price", 0, $('#ParkingPrice'));
		var DDMusicPrice = CreateDropDown($("#AddMusicPrice"), {}, "", "price", 0, $('#MusicPrice'));
		var DDBar = CreateDropDown($("#AddBar"), {}, "", "bar", 0, $('#Bar'));
		var DDHour = CreateDropDown($("#AddHour"), {}, "", "hour", 0, $('#Hour'));
		var DDVisitorType = CreateDropDown($("#AddVisitorType"), {}, "", "visitorType", 0, $('#VisitorType'));

	    var AddAppointmentButton = $('.appointment').children('.widgetBody').children('.widgetForm').children('.widgetButton').children('button');
	    AddAppointmentButton.click(function () {
	        var err, valid = true, msg = '';

	        //alert('('+DDday.val() +'-' +DDmonth.val() +'-' + DDyear.val() +'-'+DDtime.val()+')')

	        if (DDday.val() == "" || DDday.val() == "default") err = true;
	        if (DDmonth.val() == "" || DDmonth.val() == "default") err = true;
	        if (DDyear.val() == "" || DDyear.val() == "default") err = true;
	        if (DDtime.val() == "" || DDtime.val() == "default") err = true;
	        if (err == true) msg = "<div style='padding:10px 0;color:red;font-weight:Bold;'>All fields are required.</div>";
	        if (DDday.val() < 1 || DDday.val() > daysInMonth(DDmonth.val(), DDyear.val())) {
	            valid = false;
	            msg = "<div style='padding:10px 0;color:red;font-weight:Bold;'>Please enter a valid date.</div>";
	        }
	        if (err == true || valid == false) {
	            $(".AppointmentMessage").html(msg).show();
	            $(".BTXSAVED").hide();
	        } else {
	            AddAppointment(DDday.val(), DDmonth.val(), DDyear.val(), DDtime.val());
	            var theDate = DDmonth.val() + '-' + DDday.val() + '-' + DDyear.val();
	            modifyDataSource('appt', theDate, true, "", DDtime.val());
	        }
	        return false;
	    });

	    function AddAppointment(DDay, DMonth, DYear, DTime) {
	        var url = "data/updateAppointment.aspx?day=" + DDay + "&month=" + DMonth + "&year=" + DYear + "&time=" + DTime;
	        //alert(url);
	        var returnedAppointmentId;
	        $.ajax({
	            type: "GET",
	            url: url,
	            cache: false,
	            async: true,
	            dataType: "xml",
	            success: function (data) {
	                //alert(data);
	                returnedAppointmentId = $(data).find('AppointmentID').text();
	                //returnedAppointmentDate = $(data).find('DayDate')
	                theDate = DMonth + '-' + DDay + '-' + DYear;
	                //alert(theDate)
	                $.each(DateArray, function (i, item) {
	                    item.DayDate == theDate
	                    if (item.DayDate == theDate) {
	                        //alert(returnedAppointmentId.toSource());
	                        DateArray[i].AppointmentId = returnedAppointmentId;
	                        //alert(DateArray[i].toSource());
	                    }
	                });
	            },
	            complete: function () {
	                //DateArray.push(new TrackerDay(DMonth-DDay-DYear, true, 0))
	                var theDate = DMonth + '-' + DDay + '-' + DYear;
	                //$(".AppointmentTime").html('<br>'+months[DMonth-1]+' '+DDay+', '+DYear +' at '+DTime);
	                var calendarSelector = ".date-" + DMonth + "-" + DDay + "-" + DYear;
	                var trackerSelector = ".days > ul > li[rel=" + DMonth + "-" + DDay + "-" + DYear + "]";
	                //".days > ul > li[rel=" + d + "]";
	                var d = new Date(Date.parse(m[DMonth - 1] + ' ' + DDay + ', ' + DYear));
	                var t = new Date(); t.setHours(0); t.setMinutes(0); t.setSeconds(0); t.setMilliseconds(0);
	                var apt;
	                if (d.getTime() < t.getTime()) apt = "lastAppt";
	                else apt = "nextAppt";

	                $(calendarSelector).addClass(apt);
	                var html = '<div class="' + apt + '" rel="' + returnedAppointmentId + '" title="' + DTime + '"></div>';
	                $(trackerSelector).html(html);

	                $("#AddAppointmentDay").children(".data").html("Day");
	                $("#AddAppointmentMonth").children(".data").html("Month");
	                $("#AddAppointmentYear").children(".data").html("Year");
	                $("#AddAppointmentTime").children(".data").html("Time");
	                $('#AptDay').val("");
	                $('#AptMonth').val("");
	                $('#AptYear').val("");
	                $('#AptTime').val("");


	                $(".BTXMSG").hide();
	                $(".BTXSAVED").show();
	                //$(".AppointmentMessage").css("font-size", "14px");
	                var html = "<div style='padding:10px 0;'><div class='purple' style='white-space:nowrap;'>";
	                html += "Thank you, your appointment has been added.</div>This appointment will appear in your Tracker Calendar. ";
	                html += "You may edit your appointments at any time by clicking on the appropriate date in the Calendar.";
	                html += "</div>";
	                html += "<div class='btnClose red' style='cursor:pointer;font-weight:bold;' onclick=\"saveMessageClose()\">";
	                html += "<div style='width:16px;height:16px;background:url(images/theme/sprites.png) -400px -1000px;float:left; margin-right:3px;'></div>";
	                html += "Close Message</div>";
	                $(".AppointmentMessage").html(html).show();


	            }
	        });       //END AJAX
	    }

	});
}
