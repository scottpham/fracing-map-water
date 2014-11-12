var wellLayer= L.geoJson(wellLocations, {
  style: wellStyle,
  onEachFeature: onEach60day,
  pointToLayer: function(feature,latlng){
    return L.circleMarker(latlng, null); //null options.  used style instead
  }
});

//sets map to mountain view
var map = L.map('map', {
	scrollWheelZoom: false,
	layers: [wellLayer]
	}).setView([35.1, -118.7], 9);
	
	
//map tile from mapbox
// L.mapbox.tileLayer('nbclocal.ibn9m1lj', {
// attribution: 'Tiles from MapBox| Data from FracFocus.'
// }).addTo(map);

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
    radius: 10,
    //fillColor: getColor(feature.properties),
    fillColor: "steelblue",
    color:"black",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.75
  };
  
}

//bind click function to layer
function onEach60day(feature, layer) {
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

//reset
function reset60Day(e) {
  console.log("reset60Day fired");
  console.log(wellLayer);
  day60Layer.resetStyle(wellLayer);
}

//updating the control
info.update = function(props) {
	this._div.innerHTML = '<h4>Wells</h4>' + (props ? "<p><strong>Well ID: </strong>" + props.feature.id + "</p>" : "<h5>Click a circle marker</h5>");
};


//old template
	// this._div.innerHTML = '<h4>Wells</h4>' + (props ? "<p><strong>Company: </strong>" + props.feature.properties.Company +"</p><p><strong> Well Name: </strong>" + props.feature.properties.Well + "</p><p><strong>Date Tapped: </strong>" + props.feature.properties.Job_Start + "</p>" + (props.feature.properties.URL ? 


	// 	"<p><em>More info on <a href = '" + props.feature.properties.URL + "' target='_blank'>DOGGR.</a></em>": "<p><em>Well not recorded by DOGGR.</em></p>") + '<p><small>Accurate as of May 20th, 2014.</small></p>': "<h5>Click a circle marker</h5>"); 
//instantiating the control
info.addTo(map);


 //end control code//////////


function findlocation(e) {
	console.log("The lat and long is " + e.latlng);
} 

//instantiate helper finder function
map.on('click', findlocation);

//legend start//
// var legend = L.control({position: 'topright'});

// legend.onAdd = function(map) {
// var div = L.DomUtil.create('div', 'info legend');
// div.innerHTML = '<i style="background: green;"></i>' + '= On DOGGR' + '<br/> <i style="background: yellow;"></i> = Missing from DOGGR';
// 	return div; 
// };

//legend.addTo(map);