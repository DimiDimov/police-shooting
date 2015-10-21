// Function to draw your map

	var dataSet;
    var whiteFemaleCount = 0;
    var otherFemaleCount = 0;
    var whiteMaleCount = 0;
    var otherMaleCount = 0;
    var white = new L.LayerGroup();
    var unknown = new L.LayerGroup();
    var african = new L.LayerGroup([]);
    var asian = new L.LayerGroup([]);
    var indian = new L.LayerGroup([]);
    var islander = new L.LayerGroup([]);
    var allLayers = {
	  "whiteLayer" : white,
	  "unknownLayer" : unknown,
	  "africanLayer" : african,
	  "asianLayer" : asian,
	  "indianLayer" : indian,
	  "islanderLayer" : islander
	 }
    var map;

var drawMap = function() {

  // Create map and set view
 
	map = L.map('mapDiv').setView([38.152, -95.625], 4);
     //Create a tile layer variable using the appropriate url
   var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');
    // Add the layer to your map
   layer.addTo(map);
  // Create a tile layer variable using the appropriate url
  // Add the layer to your map
 // Execute your function to get data
 	getData();
}

// Function for getting data
var getData = function() {
        $.getJSON("data/response.json").then(function (data) {
        dataSet = data;
    })
    .done(function() {
        customBuild(dataSet);

    })
}

  // Execute an AJAX request to get the data in data/response.js


  // When your request is successful, call your customBuild functiom

// Loop through your data and add the appropriate layers and points
var customBuild = function(data) {

    //alert("customBuild");
    for (var j = 0; j < data.length; j++) {
        getTableData(data[j]);
        sortCircles(data[j]);
    }
	// Be sure to add each layer to the map
	document.getElementById('otherMale').textContent = otherMaleCount;
	document.getElementById('otherFemale').textContent = otherFemaleCount;
	document.getElementById('whiteMale').textContent = whiteMaleCount;
	document.getElementById('whiteFemale').textContent = whiteFemaleCount;
	white.addTo(map);
	unknown.addTo(map);
	african.addTo(map);
	asian.addTo(map);
	indian.addTo(map);
	islander.addTo(map);

	L.control.layers(null, allLayers).addTo(map);
	alert("done");


	// Once layers are on the map, add a leaflet controller that shows/hides layers
  
}

function getTableData(dataPoint) {
        if(dataPoint["Victim's Gender"] == "Male") {
            if (dataPoint.Race == "White") {
                whiteMaleCount++;
            } else {
                otherMaleCount++;
            }
        } else {
            if (dataPoint.Race == "White") {
                whiteFemaleCount++;
            } else {
                otherFemaleCount++;
            }
        }      
}

function sortCircles(dataPoint) {
        
        if(dataPoint.Race == "White") {
        	var circle = new L.circleMarker([dataPoint.lat, dataPoint.lng], {color: 'orange'});
        	circle.addTo(white);
        } else if(dataPoint.Race == "Unknown") {
        	var circle = new L.circleMarker([dataPoint.lat, dataPoint.lng], {color: 'red'});
        	circle.addTo(unknown);
        } else if(dataPoint.Race == "Black or African American") {
        	var circle = new L.circleMarker([dataPoint.lat, dataPoint.lng], {color: 'black'});
        	circle.addTo(african);
        } else if(dataPoint.Race == "Asian") {
        	var circle = new L.circleMarker([dataPoint.lat, dataPoint.lng], {color: 'yellow'});
        	circle.addTo(asian);
        } else if(dataPoint.Race == "American Indian or Alaska Native") {
        	var circle = new L.circleMarker([dataPoint.lat, dataPoint.lng], {color: 'brown'});
        	circle.addTo(indian);
        } else {
        	var circle = new L.circleMarker([dataPoint.lat, dataPoint.lng], {color: 'blue'});
        	circle.addTo(islander);
        }
        circle.bindPopup(dataPoint.Summary);
}







