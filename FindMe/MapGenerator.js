//Create map 
var map = L.map('map', {
    crs: L.CRS.Simple,
    fullscreenControl: true,
    fullscreenControlOptions: {
    position: 'topleft'
    }
});

//creates latlng bounds for waldo1. maybe read from text to lower script lines
//TODO make class to return multiple values for waldo_bounds
function Cornify(page_value) {
    var corner1 = '';
    var corner2 = '';
    //waldo2 doesnt have a waldo and I think that's funny
    switch(page_value) {
        case 1: 
            corner1 = L.latLng(143, 160);
            corner2 = L.latLng(162, 174);
            break;
        case 3:
            corner1 = L.latLng(658, 618);
            corner2 = L.latLng(608, 639);
            break;
        case 4: 
            corner1 = L.latLng(159, 125);
            corner2 = L.latLng(138, 137);
            break;
        case 5:
            corner1 = L.latLng(883, 372);
            corner2 = L.latLng(858, 384);
            
    }

    let waldo_bounds = L.latLngBounds(corner1, corner2);
    return waldo_bounds;
}

//Function for dynamic map selection
function Page_Me(image, page) {
    image.remove(map);
    let waldo_images = `/FindMe/waldos_whereabouts/waldo${page}.jpg`;
    let image2 = L.imageOverlay(waldo_images, bounds).addTo(map);
    return image2;
}

//Set outer bounds of map dimensions
var bounds = [[0,0], [1000,1000]];
let page = 1;

//Click for coordinates plugin
var c = new L.Control.Coordinates();
c.addTo(map);
map.on('click', function(e) {
c.setCoordinates(e);
});

//Default map overlay behavior
var number = 1;
let waldo_images = `/FindMe/waldos_whereabouts/waldo${number}.jpg`;
map.fitBounds(bounds);
let image = L.imageOverlay(waldo_images, bounds).addTo(map);
marker = L.marker();


$("li").on("click", (e)=> {
    page = parseInt(e.target.id);
    Page_Me(image, page);
    $("#congration").hide();
    return page;
});

//Create marker on click and change position
map.on('click', function(e) {
    $("#btn-map-waldo").show();
    marker.remove();
    let mouse = e.latlng;
    marker.setLatLng(mouse);
    marker.addTo(map);
    //When marker added, add submission box

});

//marker determination
$("#btn-map-waldo").on('click', ()=> {
    console.log(Cornify(page));
    console.log(marker.getLatLng());
    if (Cornify(page).contains(marker.getLatLng())) {
        //draw congration
        $("#congration").show();
    }
});
