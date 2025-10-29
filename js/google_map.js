
var google;

function init() {
    // Coordenadas para Cúcuta, Colombia - Colegio Campestre Comfaoriente
    // Ubicación aproximada: Calle 10 #15-20, Cúcuta
    var myLatlng = new google.maps.LatLng(7.8939, -72.5078);
    
    var mapOptions = {
        // Nivel de zoom apropiado para mostrar la ciudad
        zoom: 15,

        // Centrar el mapa en Cúcuta
        center: myLatlng,

        // Configuraciones del mapa
        scrollwheel: false,
        mapTypeControl: true,
        navigationControl: true,
        streetViewControl: true,
        styles: [
            {
                "featureType": "administrative.land_parcel",
                "elementType": "all",
                "stylers": [{"visibility": "off"}]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "all",
                "stylers": [{"visibility": "off"}]
            },
            {
                "featureType": "poi",
                "elementType": "labels",
                "stylers": [{"visibility": "off"}]
            },
            {
                "featureType": "road",
                "elementType": "labels",
                "stylers": [{"visibility": "simplified"}, {"lightness": 20}]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [{"hue": "#f49935"}]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels",
                "stylers": [{"visibility": "simplified"}]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [{"hue": "#fad959"}]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels",
                "stylers": [{"visibility": "off"}]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [{"visibility": "simplified"}]
            },
            {
                "featureType": "road.local",
                "elementType": "labels",
                "stylers": [{"visibility": "simplified"}]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [{"visibility": "off"}]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [{"hue": "#a1cdfc"}, {"saturation": 30}, {"lightness": 49}]
            }
        ]
    };

    // Obtener el elemento HTML que contendrá el mapa
    var mapElement = document.getElementById('map');

    // Verificar que el elemento existe antes de crear el mapa
    if (mapElement) {
        // Crear el mapa de Google usando el elemento y opciones definidas
        var map = new google.maps.Map(mapElement, mapOptions);
        
        // Crear marcador para Colegio Campestre Comfaoriente
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: 'Colegio Campestre Comfaoriente - Comfainteracciones',
            icon: 'images/loc.png',
            animation: google.maps.Animation.DROP
        });

        // Crear ventana de información
        var infoWindow = new google.maps.InfoWindow({
            content: '<div style="padding: 10px;">' +
                     '<h4 style="margin: 0 0 10px 0; color: #f89c1c;">Colegio Campestre Comfaoriente</h4>' +
                     '<p style="margin: 0; font-size: 14px;"><strong>Dirección:</strong> Calle 10 #15-20, Cúcuta</p>' +
                     '<p style="margin: 5px 0 0 0; font-size: 14px;"><strong>Teléfono:</strong> 5748880 ext. 2001</p>' +
                     '<p style="margin: 5px 0 0 0; font-size: 14px;"><strong>Email:</strong> Colegio.campestre@comfaoriente.com</p>' +
                     '</div>'
        });

        // Abrir ventana de información al hacer clic en el marcador
        marker.addListener('click', function() {
            infoWindow.open(map, marker);
        });

        // Abrir automáticamente la ventana de información
        infoWindow.open(map, marker);
    } else {
        console.error('Elemento del mapa no encontrado');
    }
}

// Inicializar el mapa cuando la página esté completamente cargada
if (typeof google !== 'undefined' && google.maps) {
    google.maps.event.addDomListener(window, 'load', init);
} else {
    // Fallback si Google Maps no está disponible
    window.addEventListener('load', function() {
        var mapElement = document.getElementById('map');
        if (mapElement) {
            mapElement.innerHTML = '<div style="padding: 50px; text-align: center; background-color: #f5f5f5; color: #666;">' +
                                  '<h4>Mapa no disponible</h4>' +
                                  '<p>Colegio Campestre Comfaoriente<br>' +
                                  'Calle 10 #15-20, Cúcuta<br>' +
                                  'Teléfono: 5748880 ext. 2001</p>' +
                                  '</div>';
        }
    });
}