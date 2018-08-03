
//***************** Start Initializion and view of the app *****************


var myApp = new Framework7({
    picker: {
        rotateEffect: true,
        openIn: 'popover',
    }});
var $$ = Dom7;
var mainView = myApp.views.create('.view-main');


    //***************** End Initializion and view of the app *****************


    //---------------------------------------start cordova actions----------------------------------------------

(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
      
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
       
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
})();

//window.open("geo:38.897096,-77.036545");


             //---------------------------------------end cordova actions----------------------------------------------

            //########################################## start data continers of app ##########################################
var contry_key = [{ name: 'مصر', key: 'EG' },
                    { name: 'الإمارات', key: 'AE' },
                    { name: 'العراق', key: 'IQ' },
                    { name: 'الجزائر', key: 'DZ' },
                    { name: 'قطر', key: 'QA' },
                    { name: 'الكويت', key: 'KW' },
                    { name: 'المغرب', key: 'MA' },
                    { name: 'عمان', key: 'OM' },
                    { name: 'ليبيا', key: 'LY' },
                    { name: 'السودان', key: 'SD' },
                    { name: 'سوريا', key: 'SY' },
                    { name: 'تونس', key: 'TN' },
                    { name: 'لبنان', key: 'LB' },
                    { name: 'اليمن', key: 'YE' },
                    { name: 'الأردن', key: 'JO' },
                    { name: 'البحرين', key: 'BH' },
                    { name: 'فلسطين', key: 'PS' },
                    { name: 'باكستان', key: 'PK' },
                    { name: 'الهند', key: 'IN' },
                    { name: 'انجلترا', key: 'GB' },
                    ];
var pickerDevice = myApp.picker.create({
    inputEl: '#contery_choose_picker',
    cols: [
        {
            textAlign: 'center',
            values: ['الإمارات', 'مصر', 'العراق', 'الجزائر', 'قطر', 'المغرب', 'عمان', 'ليبيا', 'السودان', 'سورية', 'تونس','لبنان']
        }
    ]
});

var status;


var locat = {
   
    

}
 $(document).ready(function()
 {
 var url="https://elshahawy1231.000webhostapp.com/bus_read.php";
 
   $.get(url, function(data, status){
        //alert("Data: " + data + "\nStatus: " + status);
        locat=JSON.parse(data);
    });
})


 var markers = [
     {
         coords: null,
         iconImage: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
         content: '<h1>bus</h1>'
     },
     {
         coords: null,
        // iconImage:'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png',
         content: '<h1>me</h1>'
     }
     
 ];



var found_location;
var all_code;
$$(document).on("click", "#user_search_screen_Button", function () {
    var code=$$('#bus_code').val();
     var contry=$$('#contery_choose_picker').val();
    
    for (var i = 0; i < contry_key.length; i++) {
        if (contry_key[i].name==contry) {
            found_location_contry_key = contry_key[i].key;
             all_code = found_location_contry_key + '_' + code;
        }
    }

   



for (var i = 0; i < locat.length; i++) {
        if (locat[i].bus_code==all_code) {
            found_location=locat[i];
        }
    }
 console.log(locat);
   
   

  
 if (found_location) {
    $$('#bus_code').val("");
    $$('#contery_choose_picker').val("");
      build_search_result_screen();
  } else {
      myApp.dialog.alert('لا يوجد باص بهذا الرقم',"اسف");
  }

});

var build_search_result_screen = function () {

    status = found_location.status;
    if (status == 'static') {
        status = "لا يتحرك";

    } else {
        status = 'يتحرك الان ويتجه الي ' + found_location.destination
    }



    cordnait = found_location.cordinates;

    $$(".user_search_screen").css('display', 'none');
   

    var search_result_screen =
        '<div class="search_result">'
        + '<h5>كود الباص : ' + found_location.bus_code+'</h5>'
        + '<p>الوضع الحالي : ' + status + '</p>'
        + '<p id="dist"> </p>'
        
        + '<div id="result_map"></div>'
        +'<button id="new_search_btn">بحث جديد</button>'
        + '</div>';


    var x = parseInt(found_location.lat), y = parseInt(found_location.lng);
    var myLatLng1 = { lat: x, lng: y };
    markers[0].coords = myLatLng1;
console.log(x)
    $$('.the_big_boss').append(search_result_screen);

    function initMap() {
        var myLatLng={lat: x, lng: y}

        var map = new google.maps.Map(document.getElementById('result_map'), {
            zoom: 15,
            center: myLatLng
        });

        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map
           
        });
    }

   // initMap();
    getPosition();
  
   // watchPosition();
}






$$(document).on("click", "#new_search_btn", function () {

    $('.search_result').remove();
    $$(".user_search_screen").css('display', 'block');
});






function getPosition() {
    var options = {
        enableHighAccuracy: true,
        maximumAge: 3600000
    }
    var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
   

  //  getPlaces(Latitude, Longitude)
    function onSuccess(position) {
    my_Latitude = position.coords.latitude;
     my_Longitude = position.coords.longitude;
     console.log(my_Latitude);
     var x = parseInt(found_location.lat), y = parseInt(found_location.lng);
     distance(my_Latitude, my_Longitude, x, y, "k");
     console.log(my_Latitude, my_Longitude, x, y);
     var x = my_Latitude, y = my_Longitude;
     var myLatLng2 = { lat: x, lng: y };
     markers[1].coords = myLatLng2;
     console.log(markers[1].coords)
     resultMap();

    };

    function onError(error) {
        alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
    }
}
/*
function watchPosition() {
    var options = {
        maximumAge: 3600000,
        timeout: 3000,
        enableHighAccuracy: true,
    }
    var watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);

    function onSuccess(position) {
        alert('Latitude: ' + position.coords.latitude + '\n' +
            'Longitude: ' + position.coords.longitude + '\n' +
            'Altitude: ' + position.coords.altitude + '\n' +
            'Accuracy: ' + position.coords.accuracy + '\n' +
            'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
            'Heading: ' + position.coords.heading + '\n' +
            'Speed: ' + position.coords.speed + '\n' +
            'Timestamp: ' + position.timestamp + '\n');
    };

    function onError(error) {
        alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
    }
}*/

var distance = function (lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1 / 180
    var radlat2 = Math.PI * lat2 / 180
    var theta = lon1 - lon2
    var radtheta = Math.PI * theta / 180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
        dist = 1;
    }
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515
    if (unit == "K") { dist = dist * 1.609344 }
    if (unit == "N") { dist = dist * 0.8684 }
    dist = dist / 0.62137;
    console.log(dist.toFixed(2) + 'k');

    $('#dist').text("يبعد مسافة: " + dist.toFixed(2)+"كم")
}




var resultMap=function () {
    // Map options
    var options = {
        zoom: 8,
        center: markers[0].coords
    }

    // New map
    var map = new google.maps.Map(document.getElementById('result_map'), options);

    // Listen for click on map
    google.maps.event.addListener(map, 'click', function (event) {
        // Add marker
        addMarker({ coords: event.latLng });
    });

    /*
    // Add marker
    var marker = new google.maps.Marker({
      position:{lat:42.4668,lng:-70.9495},
      map:map,
      icon:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
    });

    var infoWindow = new google.maps.InfoWindow({
      content:'<h1>Lynn MA</h1>'
    });

    marker.addListener('click', function(){
      infoWindow.open(map, marker);
    });
    */

    // Array of markers
   

    // Loop through markers
  
        // Add marker
    addMarker(markers[1]);
    addMarker(markers[0]);
    

   

    // Add Marker Function
    function addMarker(props) {
        var marker = new google.maps.Marker({
            position: props.coords,
            map: map,
            //icon:props.iconImage
        });

        // Check for customicon
        if (props.iconImage) {
            // Set icon image
            marker.setIcon(props.iconImage);
        }

        // Check content
        if (props.content) {
            var infoWindow = new google.maps.InfoWindow({
                content: props.content
            });

            marker.addListener('click', function () {
                infoWindow.open(map, marker);
            });
        }
    }
}





