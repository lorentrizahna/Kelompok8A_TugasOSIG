//cutom js - By Kelompok 8A Otomasi Sistem Informasi Geografis


//======== highlightLayer ========//
var highlightLayer;
function highlightFeature(e) {
    highlightLayer = e.target;

    if (e.target.feature.geometry.type === 'LineString') {
      highlightLayer.setStyle({
        color: '#ffff00',
      });
    } else {
      highlightLayer.setStyle({
        fillColor: '#ffff00',
        fillOpacity: 1
      });
    }
    highlightLayer.openPopup();
}

//======== map ========//
var map = L.map('map', {
    zoomControl:true, maxZoom:28, minZoom:1,
    zIndex:0,
});


//======== hash map ========//
var hash = new L.Hash(map);

//======== attributionControl ========//
map.attributionControl.setPrefix('Leaflet &copy; ' + "<a href='http://openstreetmap.org'>OpenStreetMap</a>" + ', contribution');

//======== auto linker ========//
var autolinker = new Autolinker({truncate: {length: 30, location: 'smart'}});
L.control.locate({locateOptions: {maxZoom: 19}}).addTo(map);

//======== measure control ========//
var measureControl = new L.Control.Measure({
    position: 'topleft',
    primaryLengthUnit: 'meters',
    secondaryLengthUnit: 'kilometers',
    primaryAreaUnit: 'sqmeters',
    secondaryAreaUnit: 'hectares'
});
measureControl.addTo(map);
document.getElementsByClassName('leaflet-control-measure-toggle')[0]
.innerHTML = '';
document.getElementsByClassName('leaflet-control-measure-toggle')[0]
.className += ' fas fa-ruler';

//======== bounds group ========//
var bounds_group = new L.featureGroup([]);
function setBounds() {
    if (bounds_group.getLayers().length) {
        map.fitBounds(bounds_group.getBounds());
    }
}

// esri light grey //-->
var cartodbUrl="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png";
var cartodb=L.tileLayer(cartodbUrl, { attribution: '', minZoom: 1, maxZoom: 25, zIndex:0, });
cartodb;
map.addLayer(cartodb);



//======== base map OpenStreetMap ========//
map.createPane('pane_OpenStreetMap_2');
map.getPane('pane_OpenStreetMap_2').style.zIndex = 0;
var layer_OpenStreetMap_2 = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    pane: 'pane_OpenStreetMap_2',
    opacity: 1.0,
    attribution: '',
    minZoom: 1,
    maxZoom: 28,
    minNativeZoom: 0,
    maxNativeZoom: 19,
});
layer_OpenStreetMap_2;




//======== base map google Satellite ========//
map.createPane('pane_GoogleSatellite_0');
map.getPane('pane_GoogleSatellite_0').style.zIndex = 0;
var layer_GoogleSatellite_0 = L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    pane: 'pane_GoogleSatellite_0',
    opacity: 1.0,
    attribution: '',
    minZoom: 1,
    maxZoom: 28,
    minNativeZoom: 0,
    maxNativeZoom: 18,
});
layer_GoogleSatellite_0;


//======== base map google Hybrid ========//
map.createPane('pane_GoogleHybrid_1');
map.getPane('pane_GoogleHybrid_1').style.zIndex = 0;
var layer_GoogleHybrid_1 = L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
    pane: 'pane_GoogleHybrid_1',
    opacity: 1.0,
    attribution: '',
    minZoom: 1,
    maxZoom: 28,
    minNativeZoom: 0,
    maxNativeZoom: 18,
});
layer_GoogleHybrid_1;



//======== pop up penginapan ========//
function pop_penginapan_wgs_3(feature, layer) {
    layer.on({
        mouseout: function(e) {
            for (i in e.target._eventParents) {
                e.target._eventParents[i].resetStyle(e.target);
            }
            if (typeof layer.closePopup == 'function') {
                layer.closePopup();
            } else {
                layer.eachLayer(function(feature){
                    feature.closePopup()
                });
            }
        },
        mouseover: highlightFeature,
    });
    //======== popupContent table layer ========//
    var popupContent = '<table>\
            <tr>\
                <th scope="row">Name</th>\
                <td>' + (feature.properties['Nama'] !== null ? autolinker.link(feature.properties['Name'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Harga/mlm</th>\
                <td>' + (feature.properties['Harga_per'] !== null ? autolinker.link(feature.properties['Harga_per'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Fasilitas</th>\
                \
            </tr>\
            <tr>\
                <th scope="row">Internet</th>\
                <td>' + (feature.properties['Internet'] !== null ? autolinker.link(feature.properties['Internet'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Services</th>\
                <td>' + (feature.properties['Services'] !== null ? autolinker.link(feature.properties['Services'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Parking</th>\
                <td>' + (feature.properties['Parking'] !== null ? autolinker.link(feature.properties['Parking'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Food and Drink</th>\
                <td>' + (feature.properties['Food_and_D'] !== null ? autolinker.link(feature.properties['Food_and_D'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Pools</th>\
                <td>' + (feature.properties['Pools'] !== null ? autolinker.link(feature.properties['Pools'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Water Heat</th>\
                <td>' + (feature.properties['Water_Heat'] !== null ? autolinker.link(feature.properties['Water_Heat'].toLocaleString()) : '') + '</td>\
            </tr>\
                <th scope="row">Ratings</th>\
                <td>' + (feature.properties['Kualitas_P'] !== null ? autolinker.link(feature.properties['Kualitas_P'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Koordinat X</th>\
                <td>' + (feature.properties['x_wgs'] !== null ? autolinker.link(feature.properties['x_wgs'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Koordinat Y</th>\
                <td>' + (feature.properties['y_wgs'] !== null ? autolinker.link(feature.properties['y_wgs'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Alamat</th>\
                <td>' + (feature.properties['Alamat'] !== null ? autolinker.link(feature.properties['Alamat'].toLocaleString()) : '') + '</td>\
            </tr>\
        </table>';
    layer.bindPopup(popupContent, {maxHeight: 400});
}

//======== icon red marker ========//
function style_penginapan_wgs_3_0() {
    return {
        pane: 'pane_penginapan_wgs_3',
rotationAngle: 0.0,
rotationOrigin: 'center center',
icon: L.icon({
    iconUrl: 'markers/red-marker.svg',
    iconSize: [50, 50]
}),
        interactive: true,
    }
}

//======== layer penginapan ========//
map.createPane('pane_penginapan_wgs_3');
map.getPane('pane_penginapan_wgs_3').style.zIndex = 403;
map.getPane('pane_penginapan_wgs_3').style['mix-blend-mode'] = 'normal';
var layer_penginapan_wgs_3 = new L.geoJson(json_penginapan_wgs_3, {
    attribution: '',
    interactive: true,
    dataVar: 'json_penginapan_wgs_3',
    layerName: 'layer_penginapan_wgs_3',
    pane: 'pane_penginapan_wgs_3',
    onEachFeature: pop_penginapan_wgs_3,
    pointToLayer: function (feature, latlng) {
        var context = {
            feature: feature,
            variables: {}
        };
        return L.marker(latlng, style_penginapan_wgs_3_0(feature));
    },
});

//======== cluster penginapan ========//
var cluster_penginapan_wgs_3 = new L.MarkerClusterGroup({showCoverageOnHover: false,
    spiderfyDistanceMultiplier: 2});
cluster_penginapan_wgs_3.addLayer(layer_penginapan_wgs_3);
//======== bounds_group ========//
bounds_group.addLayer(layer_penginapan_wgs_3);
cluster_penginapan_wgs_3.addTo(map);

//======== pop up undip ========//
function pop_undip_wgs_4(feature, layer) {
    layer.on({
        mouseout: function(e) {
            for (i in e.target._eventParents) {
                e.target._eventParents[i].resetStyle(e.target);
            }
            if (typeof layer.closePopup == 'function') {
                layer.closePopup();
            } else {
                layer.eachLayer(function(feature){
                    feature.closePopup()
                });
            }
        },
        mouseover: highlightFeature,
    });
    //======== popupContent undip ========//
    var popupContent = '<table>\
            </tr>\
            <tr>\
                <th scope="row">Nama</th>\
                <td>' + (feature.properties['Nama'] !== null ? autolinker.link(feature.properties['Nama'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">X</th>\
                <td>' + (feature.properties['X'] !== null ? autolinker.link(feature.properties['X'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Y</th>\
                <td>' + (feature.properties['Y'] !== null ? autolinker.link(feature.properties['Y'].toLocaleString()) : '') + '</td>\
              </tr>\
        </table>';
    layer.bindPopup(popupContent, {maxHeight: 400});
}

//======== icon blue marker ========//
function style_undip_wgs_4_0() {
    return {
        pane: 'pane_undip_wgs_4',
rotationAngle: 0.0,
rotationOrigin: 'center center',
icon: L.icon({
    iconUrl: 'markers/blue-marker.svg',
    iconSize: [50, 50]
}),
        interactive: true,
    }
}

//======== layer undip ========//
map.createPane('pane_undip_wgs_4');
map.getPane('pane_undip_wgs_4').style.zIndex = 404;
map.getPane('pane_undip_wgs_4').style['mix-blend-mode'] = 'normal';
var layer_undip_wgs_4 = new L.geoJson(json_undip_wgs_4, {
    attribution: '',
    interactive: true,
    dataVar: 'json_undip_wgs_4',
    layerName: 'layer_undip_wgs_4',
    pane: 'pane_undip_wgs_4',
    onEachFeature: pop_undip_wgs_4,
    pointToLayer: function (feature, latlng) {
        var context = {
            feature: feature,
            variables: {}
        };
        return L.marker(latlng, style_undip_wgs_4_0(feature));
    },
});

//======== cluster undip ========//
var cluster_undip_wgs_4 = new L.MarkerClusterGroup({showCoverageOnHover: false,
    spiderfyDistanceMultiplier: 2});
cluster_undip_wgs_4.addLayer(layer_undip_wgs_4);
//======== bounds_group undip ========//
bounds_group.addLayer(layer_undip_wgs_4);
cluster_undip_wgs_4.addTo(map);

//======== osm geocoder ========//
var osmGeocoder = new L.Control.Geocoder({
    collapsed: true,
    position: 'topleft',
    text: 'Search',
    title: 'Testing'
}).addTo(map);

//======== control geocoder ========//
document.getElementsByClassName('leaflet-control-geocoder-icon')[0]
.className += ' fa fa-search';
document.getElementsByClassName('leaflet-control-geocoder-icon')[0]
.title += 'Search for a place';




//======== baseMaps controler / layer kontrol ========//
var baseMaps = {};
L.control.layers(baseMaps,{
  '<img src="legend/undip_wgs_4.png" /> Universitas Diponegoro': cluster_undip_wgs_4,
  '<img src="legend/penginapan_wgs_3.png" /> Penginapan': cluster_penginapan_wgs_3,
  "Esri Light Grey": cartodb,
  "OpenStreetMap": layer_OpenStreetMap_2,
  "Google Hybrid": layer_GoogleHybrid_1,
  "Google Satellite": layer_GoogleSatellite_0,
  },
  {collapsed : true}
  ).addTo(map);
setBounds();

//======== control search ========//
map.addControl(new L.Control.Search({
    layer: layer_penginapan_wgs_3,
    initial: false,
    hideMarkerOnCollapse: true,
    propertyName: 'Name'}));
document.getElementsByClassName('search-button')[0].className +=
 ' fa fa-binoculars';

 //======== add scale bar to Map ========//
 L.control.scale({metric:true, imperial:false, maxWidth:100}).addTo(map);

//======== routing ========//
var carIcon = L.icon({
  iconUrl: 'images/car.png',
  iconSize: [30, 20],
})

var marker = L.marker([-7.051504031144492, 110.44015918693702], { icon: carIcon }).addTo(map);

 map.on('click', function (e) {
   console.log(e)
       var newMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
     L.Routing.control({
     waypoints: [
       L.latLng([-7.051504031144492, 110.44015918693702]),
       L.latLng([e.latlng.lat, e.latlng.lng])
       ]
     }).on('routesfound', function (e) {
       var routes = e.routes;
       console.log(routes);

     e.routes[0].coordinates.forEach(function (coord, index) {
       setTimeout(function () {
         marker.setLatLng([coord.lat, coord.lng]);
       }, 100 * index)
     })
   }).addTo(map);
 });
