// Name: Andrei Birsan
// Course month: 05.2013
// File Purpose: Basic Start-up Template


//#homePage starts here
$(document).on('pagebeforeshow', '#homePage', function(){
	
	//Checks to see if the localStorage is empty
	if (localStorage.length == 0) {
		
		//If is empty asks the user to add pre-loaded entries
		confirm("Local Storage is empty. Do you want to load default data?");
		
		//Ajax call 
		if (confirm) {
			$.ajax ({
				url: "xhr/JSONFile.json",
				type: "GET",
				dataType: "json",
				success: function(response) {
					console.log(response);
					
					//1. Get the lenght of the localStorage
					var localStL = response.length;
					
					console.log(response.length);

					$('#container').empty();
						
					//Create a <ul> filter that holds all the <li>
					var ulListView0 = $('#container').append('<ul data-role = "listview" data-filter="true" data-inset = "true" data-corners = "true" id = "ulListView"></ul>');
						
					for ( var i = 0, j = localStL; i < j; i ++) {
						
						var nameItem = response[i].name;	
						var _id = Math.floor(Math.random() * 10000001);
						var mediaChoice = response[i].mediaType;
						var genreItem = response[i].genreItem;
						var lengthItem = response[i].lengthItem;
						var pubDate = response[i].pubDate;
						var purchaseDate = response[i].purchaseDate;
						var notes = response[i].notes;
						console.log (response[i].mediaType);
						
						//Create a <li> tag that holds the localStorage object
						var insideLi0 = $('#ulListView').append('<li id = "'+_id+'" data-entryname ="'+nameItem+'" data-mediatype ="'+mediaChoice+'" data-genre ="'+genreItem+'" data-length = "'+lengthItem+'" data-rldate = "'+pubDate+'" data-prdate = "'+purchaseDate+'" data-notes = "'+notes+'"><a href="#detailsPage" data-transition = "slide"><img src = "images/'+filterImage(mediaChoice)+'" class="ui-li-icon ui-corner-none"/><span><p><strong>'+nameItem+'</strong></p></span><p class = "ui-li-aside">'+mediaChoice+'</p></a></li>');
					
						//This line refreshes the listview attribute in jqm (there are some issues in the #homePage with the way they display)
						insideLi0.listview().listview('refresh');
					
					} // here ends for loop
				
				} // here ends first ajax call success
				
			}); //here ends first ajax call
			
			$.ajax ({
				url: "xhr/XMLFile.xml",
				type: "GET",
				dataType: "xml",
				success: function(response1) {
					console.log(response1);
					
					//Create a <ul> filter that holds all the <li>
					var ulListView1 = $('#container').append('<ul data-role = "listview" data-filter="true" data-inset = "true" data-corners = "true" id = "ulListView"></ul>');
						
					$(response1).find('element').each(function() {
						
						var nameItem1 = $(this).find('name').text();	
						var _id1 = Math.floor(Math.random() * 10000001);
						var mediaChoice1 = $(this).find('mediaType').text();
						var genreItem1 = $(this).find('genreItem').text();
						var lengthItem1 = $(this).find('lengthItem').text();
						var pubDate1 = $(this).find('pubDate').text();
						var purchaseDate1 = $(this).find('purchaseDate').text();
						var notes1 = $(this).find('notes').text();
						console.log (pubDate1);
						
						//Create a <li> tag that holds the localStorage object
						var insideLi1 = $('#ulListView').append('<li id = "'+_id1+'" data-entryname ="'+nameItem1+'" data-mediatype ="'+mediaChoice1+'" data-genre ="'+genreItem1+'" data-length = "'+lengthItem1+'" data-rldate = "'+pubDate1+'" data-prdate = "'+purchaseDate1+'" data-notes = "'+notes1+'"><a href="#detailsPage" data-transition = "slide"><img src = "images/'+filterImage(mediaChoice1)+'" class="ui-li-icon ui-corner-none"/><span><p><strong>'+nameItem1+'</strong></p></span><p class = "ui-li-aside">'+mediaChoice1+'</p></a></li>');
					
						//This line refreshes the listview attribute in jqm (there are some issues in the #homePage with the way they display)
						insideLi1.listview().listview('refresh');
					
					}); // here ends for loop
				
				} // here ends second ajax call success
				
			}); //here ends second ajax call
		
		} // here ends confirm check
	
	} // here ends localStorage check
	
	else {
		//call outputData function
		outputData();
	
		//Gets the id of <li> and displays it into an alert
		$('#ulListView').off('click', 'li').on('click', 'li', function(){
		
			//call displayDetails function with the obj.that was clicked on as argument
			displayDetails(this);
			
		});
	}
	
});//here ends #homePage

$(document).on('pageinit', '#homePage', function(){

});

//genRandomId function creates a random number and returns it to be caught by the validator 
var genRandomId = function(){
	var randomId = Math.floor(Math.random() * 10000001);
	return randomId;
};

//outputData function outputs the localStorage on the '#homePage'
var outputData = function(){
	//1. Get the lenght of the localStorage
	var localStL = localStorage.length;

	$('#container').empty();
	
	//2. Create a <ul> filter that holds all the <li>
	var ulListView = $('#container').append('<ul data-role = "listview" data-filter="true" data-inset = "true" data-corners = "true" id = "ulListView"></ul>');

	//3. Loop through the length of localStorage
	for(var i = 0, j = localStL; i < j; i ++) {

		//3.1. Get key-value pare
		var storedKey = localStorage.key(i); //get the key to refference for the value
		var storedObj = localStorage.getItem(storedKey); //get the value under the specified key

		//3.2. Parse data back into an obj. to be able to access properties.
		var parsedObj = JSON.parse(storedObj);

		//3.3. Add the id property to parsedObj for future refference
		parsedObj.id = storedKey;

		//3.4. Create a <li> tag that holds the localStorage object
		var insideLi = $('#ulListView').append('<li id = "'+parsedObj.id+'" data-entryname ="'+parsedObj[1].value+'" data-mediatype ="'+parsedObj[0].value+'" data-genre ="'+parsedObj[2].value+'" data-length = "'+parsedObj[3].value+'" data-rldate = "'+parsedObj[4].value+'" data-prdate = "'+parsedObj[5].value+'" data-notes = "'+parsedObj[6].value+'"><a href="#detailsPage" data-transition = "slide"><img src = "images/'+filterImage(parsedObj[0].value)+'" class="ui-li-icon ui-corner-none"/><span><p><strong>'+parsedObj[1].value+'</strong></p></span><p class = "ui-li-aside">'+parsedObj[0].value+'</p></a></li>');

		//This line refreshes the listview attribute in jqm (there are some issues in the #homePage with the way they display)
		insideLi.listview().listview('refresh');

		//3.5. Check if a devider with the object's '<optgroup label> already exists, if not create one ["audio", "video", "data", "other"]

		//3.6. Add the localStorage object under the above category using the html format refferenced below (make sure the bbj. has an idea to target it later).

	} //the for loops ends here

};

/*filterImage is in charge of figuring out what type of image we display in the <li>. 
  It returns a file name based on the obj. parameter it receives*/
var filterImage = function(input) {
	//1. if the input is audio output smAudio.png
	if (input.indexOf("Audio") == 0) {
		
		return "smAudio.png";
	}
	else if(input.indexOf("Video") == 0) {
	
		return "smVideo.png";
	}
	else if(input.indexOf("Data") == 0) {
		
		return "smData.png";
	}
	else if(input.indexOf("eBook") == 0) {
		
		return "smBook.png";
	}
	else if(input.indexOf("eDoc") == 0) {
		
		return "smDocument.png";
	}
	else if(input.indexOf("MemoryStick") == 0) {
		
		return "smMemoryStick.png";
	}
	
};



