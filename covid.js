let myBasemap = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 19});

let mymap = L.map('map',{
    center:[30,20],
	
    zoom:7,
    layers:[myBasemap]
});


var Covido = []
var CovidPromise = fetch("https://coronavirus-tracker-api.herokuapp.com/v2/locations?fbclid=IwAR28SAQ2KjUx7eXyaFBM7nWhgcbV0n0G9GcwsDpYVBBe9JHdERRE5hay8_Q")
		.then(res=>res.json())
		.then(resFinal=>{
			console.log(resFinal);
	
		
var covid = resFinal.locations
console.log(resFinal.locations)
for (var index = 0; index < covid.length; index++) {
	Covido.push(
		{
			"type": "Feature",
            "properties": {
                "country":covid[index].country,
				"country_code" : covid[index].country_code,
				"coordinates" : covid[index].coordinates,
				"country_population":covid[index].country_population,
				"id":covid[index].id,
				"latest" : covid[index].latest,
			
			},
			"geometry": {
				"type": "Point",
				"coordinates": [
					covid[index].coordinates.longitude,
					covid[index].coordinates.latitude
					
				  
				]
		},
		"lastestData":{
			"type": "Feature",
			"latest" : [
				covid[index].latest.confirmed,
				covid[index].latest.deaths,
				covid[index].latest.recovered,

			]
		
		},
		

	
	
	
}




)
}
var covid19 = {
	"type":"FeatureCollection",
	"features":Covido
}
console.log(covid19);
let geoJason = L.geoJSON(covid19,{
	pointToLayer:function(geoJsonPoint, latlng){
		if(geoJsonPoint.properties.latest.confirmed <700000){

		return ( L.circleMarker(latlng,{
			
			fillColor:"red",
			stroke:false,
			fillOpacity:0.25
			
		} 

	
		)
		
		)}
		 
		else if (geoJsonPoint.properties.latest.confirmed < 1000000) { return ( L.circleMarker(latlng,{
			fillColor:"red",
			stroke:false,
			fillOpacity:0.5 
		}))}

		 else return (
			( L.circleMarker(latlng,{
				fillColor:"red",
				stroke:false,
				fillOpacity:1.0 }

		 
	
		
		
		
)))},
	onEachFeature:function (feature, layer) {
		console.log("feature",feature);
		console.log("layer",layer);
	   layer.bindPopup(	
		    	`<table id = "Table">
	    	<thead> 
	   	<tr> 
	   		<th>Name:</th>
	  		<th>Describtion</th>
   
	   	</tr>
	   	</thead>
   
	    	<tbody>
	    	 <tr>
	    		<td>Country:</td>
	   		<td>${feature.properties.country}</td>
   
	    	 </tr>
			 <tr>
	    		<td>Deaths:</td>
	   		<td>${feature.properties.latest.deaths}</td>
   
	    	 </tr>
			 <tr>
			 <td>confirmed:</td>
			<td>${feature.properties.latest.confirmed}</td>

		  </tr>
		  
		  <tr>
		  <td>recovered:</td>
		 <td>${feature.properties.latest.recovered}</td>
 
	      </tr>
	   
			 
			
	   
   
	    	</tbody>
   
	    </table>`
			  
	   	)}
	  }
).addTo(mymap)
		});


	var Data= [] 
	
	var get=function(){
		var httpreq = new XMLHttpRequest();
		httpreq.open("GET","https://coronavirus-tracker-api.herokuapp.com/v2/locations?fbclid=IwAR28SAQ2KjUx7eXyaFBM7nWhgcbV0n0G9GcwsDpYVBBe9JHdERRE5hay8_Q");
		httpreq.send();
		httpreq.onreadystatechange=()=>{
			if(httpreq.readyState==4 && httpreq.status==200){
				var data = httpreq.responseText;
				Data = JSON.parse(data);
				console.log(Data)
				var coronadata = document.getElementById("DIV")
				

				var coronadata = `<ul name ="coronad" id ="coronad" >` 
				coronadata = `<li class = "class" id="Confirmed"><label class = "coronadata">Confirmed</label><br>${Data.latest.confirmed}</li>
				<li class = "class" id="Deaths" ><label class = "coronadata">Deaths</label><br>${Data.latest.deaths}</li>
				<li class = "class" id="Recovered" ><label class = "coronadata">Recovered</label><br>${Data.latest.recovered}</li>
				`





			   


			var list = document.getElementById("List")
			
			var LISTDATA = `<ul name = "LISTDATA" id = "LISTDATA">`
			
			 for (let x = 0; x < Covido.length; x++) {
			 	LISTDATA +=`<div id = "divdata"><a  id = "FLYTO" onclick="mymap.flyTo([${Covido[x].geometry.coordinates[1]},${Covido[x].geometry.coordinates[0]}])">
				 <li value ="${Covido[x].properties.country}" id = "countryname"> ${Covido[x].properties.country}</li>
				 <li value ="${Covido[x].properties.country_population}">population: ${Covido[x].properties.country_population}</li>
				 <li value ="${Covido[x].properties.latest.recovered}">recovered : ${Covido[x].properties.latest.recovered}</li>
				 <li value ="${Covido[x].properties.latest.deaths}">deaths : ${Covido[x].properties.latest.deaths}</li>
				 </a></div>`
				
			 }
			 
      
			 LISTDATA+=`</ul>`
			 list.innerHTML=LISTDATA
			  DIV.innerHTML=coronadata}
			
	}}
			 
			 get();
			