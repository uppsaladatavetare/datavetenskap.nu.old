
var ko_calendar = function ()
{
	var result = {};

	function log(message)
	{
		// if (typeof console == "object" && typeof console.log == "function")
		// {
			// console.log(message);
		// }
	}
	
	function error(message)
	{
		if (typeof console == "object" && typeof console.error == "function")
		{
			console.error(message);
		}
	}

	function buildDate(entry)
	{
		/* display the date/time */
		var dateString = ko_calendar_loc.all_day_event; //'All Day Event';

		/* if the event has a date & time, override the default text */
		var startTime = getStartTime(entry);
		var endTime = getEndTime(entry);

		if (startTime && endTime)
		{
			var startJSDate = startTime.getDate();
			var endJSDate = endTime.getDate();

			// If the start and end are dates (full day event)
			// then the end day is after the last day of the event (midnight that morning)
			var allDayEvent = false;
			if (startTime.isDateOnly() && endTime.isDateOnly())
			{
				endJSDate.setDate(endJSDate.getDate() - 1);

				if (endJSDate.getTime() == startJSDate.getTime()) 
				{
					// This is a one day event.
					allDayEvent = true;
				}
			}
			
			var oneDayEvent = false;
			{
				var startDay = new Date(startJSDate.getFullYear(), startJSDate.getMonth(), startJSDate.getDate());
				var endDay = new Date(endJSDate.getFullYear(), endJSDate.getMonth(), endJSDate.getDate());
				if (startDay.getTime() == endDay.getTime())
				{
					oneDayEvent = true;
				}
			}

			if (allDayEvent)
			{
				dateString = ko_calendar_loc.all_day_event; //'All Day Event';
			}
			else if (oneDayEvent)
			{
				dateString = startJSDate.toString("ddd, MMM d, yyyy");
				dateString += ', ';
				dateString += startJSDate.toString("h:mm tt");
				dateString += ' - ';
				dateString += endJSDate.toString("h:mm tt");
			}
			else
			{
				if (!startTime.isDateOnly())
				{
					dateString = startJSDate.toString("ddd, MMM d, yyyy h:mm tt");
				}
				else
				{
					dateString = startJSDate.toString("ddd, MMM d, yyyy");
				}
				dateString += ' - ';
				if (!endTime.isDateOnly())
				{
					dateString += endJSDate.toString("ddd, MMM d, yyyy h:mm tt");
				}
				else
				{
					dateString += endJSDate.toString("ddd, MMM d, yyyy");
				}
			}
		}
		var dateRow = document.createElement('div');
		dateRow.setAttribute('className','ko-calendar-entry-date-row');
		dateRow.setAttribute('class','ko-calendar-entry-date-row');

		/*dateLabel = document.createElement('div');
		dateLabel.appendChild(document.createTextNode('When: '));
		dateLabel.setAttribute('className','ko-calendar-entry-date-label');
		dateLabel.setAttribute('class','ko-calendar-entry-date-label');
		dateRow.appendChild(dateLabel);
		*/

		dateDisplay = document.createElement('div');
		//dateDisplay.appendChild(document.createTextNode(dateString));
		dateDisplay.innerHTML = dateString;
		dateDisplay.setAttribute('className','ko-calendar-entry-date-text');
		dateDisplay.setAttribute('class','ko-calendar-entry-date-text');
		dateRow.appendChild(dateDisplay);

		return dateRow;
	}

	function buildLocation(entry)
	{
		var locationDiv = document.createElement('div');
		var locationString = entry.location;
		if (locationString != null)
		{
			locationDiv.appendChild(document.createTextNode(locationString));
			locationDiv.setAttribute('className','ko-calendar-entry-location-text');
			locationDiv.setAttribute('class','ko-calendar-entry-location-text');
		}
		
		return locationDiv;
	}

	function formatEventDetails(titleFormat, event)
	{
		// titleFormat contains the format string from the user.
		// event is the calendar event.
		//
		// [TITLE] will be substituted with the event title.
		// [STARTTIME] will become the start time (or "All Day" if it is an all day event).
		// [ENDTIME] will become the end time (or blank if it is an all day event).
		//
		// Any extra characters included within the [] will be inserted if the value exists.
		// That is, [ENDTIME - ] will insert " - " after the end time, if and only if there is an end time.
		//
		// If an event is an all-day event, then [STARTTIME] will be replaced with "All Day" and
		// no [ENDTIME] will defined.
		//
		// Examples
		// "[STARTTIME] - [TITLE]"				becomes "6:00AM - Test Event" or "All Day - Test Event"
		// "[STARTTIME] - [ENDTIME - ][TITLE]"	becomes "6:00AM - 9:00AM - Test Event" or "All Day - Test Event"
		// "[STARTTIME][ - ENDTIME] : [TITLE]"	becomes "6:00AM - 9:00AM : Test Event" or "All Day : Test Event"

		var startTimeString = null;
		var endTimeString = null;

		var title = event.summary;
		var startDateTime = getStartTime(event);
		var endDateTime = getEndTime(event);
		
		if (startDateTime)
		{
			if (startDateTime.isDateOnly())
			{
				startTimeString = ko_calendar_loc.all_day; //"All Day";
			}
			else
			{
				startTimeString = startDateTime.getDate().toString("h:mm tt");
				if (endDateTime)
				{
					endTimeString = endDateTime.getDate().toString("h:mm tt");
				}
			}
		}

		function replaceTITLE(strMatchingString, strGroup1, strGroup2)
		{
			return title ? strGroup1 + title + strGroup2 : "";
		}

		function replaceSTARTTIME(strMatchingString, strGroup1, strGroup2)
		{
			return startTimeString ? strGroup1 + startTimeString + strGroup2 : "";
		}

		function replaceENDTIME(strMatchingString, strGroup1, strGroup2)
		{
			return endTimeString ? strGroup1 + endTimeString + strGroup2 : "";
		}
		
		var output = titleFormat.replace(/\[([^\]]*)TITLE([^\]]*)\]/g, replaceTITLE);
		output = output.replace(/\[([^\]]*)STARTTIME([^\]]*)\]/g, replaceSTARTTIME);
		output = output.replace(/\[([^\]]*)ENDTIME([^\]]*)\]/g, replaceENDTIME);
		
		return output;
	}

	function getTime(calendarTime)
	{
		result = {
			"getDate" : function()
			{
				if (calendarTime.dateTime)
				{
					return new Date(calendarTime.dateTime);
				}
				else if (calendarTime.date)
				{
					var date = new Date(calendarTime.date);
					// Since the date does not include any time zone information, Date() assumes that it is UTC.
					// But since it is just a date, it is midnight UTC, which is the day before in North America.
					// This will add the timezone offset to the date to convert the date into local time.
					date = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);
					return date;
				}
				return null;
			},
			"isDateOnly" : function()
			{
				return calendarTime.date != null
			}
		}
		
		return result;
	}
	
	function getStartTime(calendarEntry)
	{
		var result = null;

		if (calendarEntry != null)
		{
			result = getTime(calendarEntry.start);
		}

		return result;
	}
	
	function getEndTime(calendarEntry)
	{
		var result = null;

		if (calendarEntry != null)
		{
			result = getTime(calendarEntry.end);
		}

		return result;
	}

	/**
	 * Show or hide the calendar entry (as a <div> child of item) when the item is clicked.
	 * Initially this will show a div containing the content text.
	 * This could collect other information such as start/stop time
	 * and location and include it in the node.
	 *
	 * @param {div} HTML element into which we will add and remove the calendar entry details.
	 * @param {calendar entry} Google Calendar entry from which we will get the details.
	 */
	function createClickHandler(item, entry)
	{
		var descDiv = null;
		return function () 
		{
			if (descDiv == null)
			{
				descDiv = document.createElement('div');
				
				descDiv.appendChild(buildDate(entry));
				descDiv.appendChild(buildLocation(entry));
				
				bodyDiv = document.createElement('div');
				bodyDiv.setAttribute('className','ko-calendar-entry-body');
				bodyDiv.setAttribute('class','ko-calendar-entry-body');
				bodyDiv.innerHTML = Wiky.toHtml(entry.description != null ? entry.description : "");
				descDiv.appendChild(bodyDiv);

				item.appendChild(descDiv);
			}
			else
			{
				// Hide all the children of this node (which should be text we added above)
				item.removeChild(descDiv);
				descDiv = null;
			}
		}
	}

	/**
	 * Callback function for the Google data JS client library to call with a feed 
	 * of events retrieved.
	 *
	 * Creates an unordered list of events in a human-readable form.  This list of
	 * events is added into a div with the id of 'outputId'.  The title for the calendar is
	 * placed in a div with the id of 'titleId'.
	 *
	 * @param {json} feedRoot is the root of the feed, containing all entries 
	 */
	function createListEvents(titleId, outputId, maxResults, autoExpand, googleService, calendars, titleFormat)
	{
		function mergeFeeds(resultObject)
		{
			// This function merges the input arrays of feeds into one single feed array.
			// It is assumed that each feed is sorted by date.  We find the earliest item in
			// the lists by comparing the items at the start of each array.

			// Store all of the feed arrays in an an array so we can "shift" items off the list.
			var entries = new Array();
			
			for (var key in resultObject)
			{
				var entry = resultObject[key].result
				if (entry)
				{
					// Check for errors
					if (entry.error)
					{
						error("Error downloading Calendar " + key + " : " + entry.error.message);
					}
					else
					{
						log("Feed " + key + " has " + entry.items.length + " entries");
						entries.push(entry.items);
					}
				}
			}
			
			log("Merging " + entries.length + " feeds into " + maxResults + " results.");
			
			// Now look at the first element in each feed to figure out which one is first.
			// Insert them in the output in chronological order.
			var output = new Array();

			while(output.length < maxResults)
			{
				var firstStartTime = null;
				var firstStartIndex = null;
				for (var i=0; i < entries.length; i++)
				{
					var startTime = getStartTime(entries[i][0]);
					if (startTime != null)
					{
						var startDate = startTime.getDate();
						if (firstStartTime == null || startDate < firstStartTime)
						{
							//log( startDate + " from feed " + i + " is before " + firstStartTime + " from feed " + firstStartIndex);
							firstStartTime = startDate;
							firstStartIndex = i;
						}
					}
				}
				if (firstStartTime != null)
				{
					// Add the entry to the output and shift it off the input.
					var uid = entries[firstStartIndex][0].id;
					log("Pushing " + firstStartTime + " " + uid);
					var uniqueEntry = true;

					// Remove duplicate events.  They are events with the same start time and the same Uid.
					if (output.length > 0)
					{
						var lastOutput = output[output.length-1];
						var lastStartTime = getStartTime(lastOutput);
						var lastUid = lastOutput.id;

						if ((lastStartTime.getDate().getTime() == firstStartTime.getTime()) && (lastUid == uid))
						{
							// This is a duplicate.
							log("Duplicate event");
							uniqueEntry = false;
						}
					}

					if (uniqueEntry)
					{
						output.push(entries[firstStartIndex].shift());
					}
					else
					{
						entries[firstStartIndex].shift();
					}
				}
				else
				{
					// No new items were found, so we must have run out.
					break;
				}
			}

			return output;
		}

		function processFinalFeed(feedRoot) {
			// var entries = feedRoot.feed.getEntries();
			var entries = feedRoot;
			var eventDiv = document.getElementById(outputId);
	
			// Remove all the children of this node (should just be the loading gif)
			while (eventDiv.childNodes.length > 0) {
				eventDiv.removeChild(eventDiv.childNodes[0]);
			}

			/* set the ko-calendar-title div with the name of the calendar */
			//document.getElementById(titleId).innerHTML = feedRoot.feed.title.$t;

			/* loop through each event in the feed */
			var prevDateString = null;
			var eventList = null;
			var len = entries.length;
			for (var i = 0; i < len; i++) {
				var entry = entries[i];
				var title = entry.summary;
				var startDateTime = getStartTime(entry);
				var startJSDate = startDateTime ? startDateTime.getDate() : null;
				var entryLinkHref = null;
				if (entry.htmlLink != null) {
					entryLinkHref = entry.htmlLink;
				}
				dateString = startJSDate.toString('MMM dd');

				if (dateString != prevDateString) {

					// Append the previous list of events to the widget
					if (eventList != null) {
						eventDiv.appendChild(eventList);
					}

					// Create a date div element
					var dateDiv = document.createElement('div');
					dateDiv.setAttribute('className','ko-calendar-date');
					dateDiv.setAttribute('class','ko-calendar-date');
					dateDiv.appendChild(document.createTextNode(dateString));

					// Add the date to the calendar
					eventDiv.appendChild(dateDiv);

					// Create an div to add each agenda item
					eventList = document.createElement('div');
					eventList.setAttribute('className','ko-calendar-event-list');
					eventList.setAttribute('class','ko-calendar-event-list');
					
					prevDateString = dateString;
				}

				var li = document.createElement('div');
				
				/* if we have a link to the event, create an 'a' element */
				/*
				if (entryLinkHref != null) {
					entryLink = document.createElement('a');
					entryLink.setAttribute('href', entryLinkHref);
					entryLink.appendChild(document.createTextNode(title));
					li.appendChild(entryLink);
					//li.appendChild(document.createTextNode(' - ' + dateString));
				}
				else
				*/
				{				
					// Add the title as the first thing in the list item
					// Make it an anchor so that we can set an onclick handler and
					// make it look like a clickable link
					var entryTitle = document.createElement('a');
					entryTitle.setAttribute('className','ko-calendar-entry-title');
					entryTitle.setAttribute('class','ko-calendar-entry-title');
					entryTitle.setAttribute('href', "javascript:;");

					var titleString = formatEventDetails(titleFormat, entry);
					entryTitle.innerHTML = titleString;

					// Show and hide the entry text when the entryTitleDiv is clicked.
					entryTitle.onclick = createClickHandler(li, entry);

					li.appendChild(entryTitle);

					if (autoExpand)
					{
						entryTitle.onclick();
					}
				}

				eventList.appendChild(li);
			}
			
			if (eventList != null) {
				eventDiv.appendChild(eventList);
			}
		}

		var batch = gapi.client.newBatch();

		for (var calenderIndex=0; calenderIndex < calendars.length; calenderIndex++)
		{
			var idString = calendars[calenderIndex];

			// Skip blank calendars.
			if (idString != undefined && idString != '')
			{
				// Split the url by ',' to allow more than just the 3 allowed by the 3 parameters.
				// TODO: Deprecate the extra calendar ids and eventually elminate them.
				var idArray = idString.split(',');
				for (var idIndex=0; idIndex < idArray.length; idIndex++)
				{
					var calendarId = idArray[idIndex];
					var timeMin = new Date().toISOString();
					var params = {
						'maxResults': maxResults, 
						'calendarId': calendarId,
						'singleEvents':true,
						'orderBy':'startTime',
						'timeMin': timeMin
					};

					batch.add(googleService.events.list(params), {'id': calendarId});
				}
			}
		}

		batch.then(function(resp){
			var finalFeed = mergeFeeds(resp.result);
			processFinalFeed(finalFeed);
		});
		
	}

	/**
	 * Uses Google data JS client library to retrieve a calendar feed from the specified
	 * URL.  The feed is controlled by several query parameters and a callback 
	 * function is called to process the feed results.
	 *
	 * @param {string} apiKey is the Google API key .
	 * @param {string} titleId is the id of the element in which the title could be written.
	 * @param {string} outputId is the id of the element in which the output is to be written.
	 * @param {string} calendarUrl is the URL for a public calendar feed
	 * @param {string} calendarUrl2 is the URL for a second public calendar feed
	 * @param {number} maxResults is the maximum number of results to be written to the output element.
	 * @param {string} titleFormat is a format string for the event details.
	 */  
	function loadCalendar(apiKey, titleId, outputId, maxResults, autoExpand, calendars, titleFormat)
	{
		if (typeof ko_calendar_loc === 'undefined')
		{
			// When running stand along without the wordpress localization
			// we need to supply the default loc text.
			ko_calendar_loc = {
				'all_day':'All Day',
				'all_day_event':'All Day Event'
			};
		}

		// Uncomment the following two lines for offline testing.
		//ko_calendar_test.testCalendar();
		//return;

		gapi.client.setApiKey(apiKey);
		gapi.client.load("calendar", "v3").then(function(result){
			if (result && result.error)
			{
				error("Error loading calendar client API (Could be due to an invalid API Key) : " + result.error.message );
			}
			else
			{
				createListEvents(titleId, outputId, maxResults, autoExpand, gapi.client.calendar, calendars, titleFormat);
			}
		});

	}

	
	/**
	 * addInitCallbacks + runInitCallbacks
	 * 
	 * These two functions are designed to handle unknown initialization order and time.
	 * Any function added with addInitCallbacks will be called when runInitCallbacks
	 * is called or immediately, if runInitCallbacks has already been called.
	 *
	 * This is so that we can safely schedule functions to be called from anywhere
	 * and be sure they will get executed at the right time.
	 */  
	var callbacks = []	
	function addInitCallback(func)
	{
		// If we are still waiting for the system to be initialized, then queue this for later.
		// Otherwise just run it.
		if (callbacks != null)
		{
			callbacks.push(func);
		}
		else
		{
			func();
		}
	}
	
	function runInitCallbacks()
	{
		// Run all the outstanding callbacks and then clear the array to stop new ones.
		if (callbacks != null)
		{
			for (var i=0; i < callbacks.length; i++)
			{
				callbacks[i]();
			}
			callbacks = null;
		}
	}
	
	result.loadCalendarDefered = function(apiKey, titleId, outputId, maxResults, autoExpand, calendarUrl, calendarUrl2, calendarUrl3, titleFormat)
	{
		var calendars = new Array();
		calendars.push(calendarUrl);
		calendars.push(calendarUrl2);
		calendars.push(calendarUrl3);

		addInitCallback(function(){loadCalendar(apiKey, titleId, outputId, maxResults, autoExpand, calendars, titleFormat)});
	}

	// Call this when the Google Client API is ready to use.
	result.init = function()
	{
		// It is now safe to run all the calendar loads
		runInitCallbacks();
	}

	return result;

} ();

// This should be used as the callback function in the google client.js query parameters.
// If it cannot be then ko_calendar.init() should be called from within the real one or after it is safe to use the API.
function ko_calendar_google_init()
{
	// The Google Client API is ready to be used.
	ko_calendar.init();
}