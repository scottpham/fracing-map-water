var wellLayer= L.geoJson(wellLocations, {
  style: wellStyle,
  onEachFeature: onEachWell,
  pointToLayer: function(feature,latlng){
    return L.circleMarker(latlng, null); //null options.  used style instead
  }
});

//sets map to mountain view
var map = L.map('map', {
	scrollWheelZoom: false,
	layers: [wellLayer]
	}).setView([35.4, -118.7], 9);
	

L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
}).addTo(map);


//getcolor function
function getColor(d){
  return d.URL ? "green" : "yellow";
}


//day60Style
function wellStyle(feature) {
  return {
    radius: 8,
    //fillColor: getColor(feature.properties),
    fillColor: "steelblue",
    color:"black",
    weight: 1.5,
    opacity: 1,
    fillOpacity: 0.75
  };
  
}

//bind click function to layer
function onEachWell(feature, layer) {
	layer.on({
		click: clickToControl
	});
}

//begin control code//
var info = L.control();

info.onAdd = function (map) {
  this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
	this.update();
	return this._div;
};


//listeners

//sends click event to update control
function clickToControl(e) {
	var layer = e.target;
	wellLayer.setStyle({color: "black", fillOpacity: 0.5});
	e.target.popup
	layer.setStyle({color: "red", fillOpacity: 1}); //highlight color
	info.update(e.target);
}

// Cribbed from http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

//updating the control
info.update = function(data) {
	this._div.innerHTML = (data ? '<p>This well has injected <strong>' + numberWithCommas(data.feature.properties.water_injected) + "</strong> barrels of water into the ground.</p><p>It's an <strong>" + ((data.feature.properties.well_status == "I") ? "active" : "inactive") + "</strong> waste water disposal well.</p><p>It's leased by <strong>" + data.feature.properties.leasee + "</strong> and operated by <strong>" + data.feature.properties.operator + "</strong>.</p><p>The Department of Conservation's " + '"Well Finder" has <a href="' + data.feature.properties.url + '" target="blank">lots more info</a>.</p>' : "<h5>Click a circle marker</h5>");
};

info.addTo(map);


 //end control code//////////

function findlocation(e) {
	console.log("The lat and long is " + e.latlng);
} 

//instantiate helper finder function
map.on('click', findlocation);
