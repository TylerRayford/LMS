import { Component, OnInit } from "@angular/core";

declare const google: any;

interface Marker {
lat: number;
lng: number;
label?: string;
draggable?: boolean;
}

@Component({
  selector: "app-map",
  templateUrl: "map.component.html"
})
export class MapComponent implements OnInit {
  constructor() {}

  ngOnInit() {

    var myLatlng = new google.maps.LatLng(38.62161468392982, -90.28094884523898);
    var mapOptions = {
        zoom: 13,
        mapTypeControl: false,
        center: myLatlng,
        scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page

        styles: [{
            "elementType": "geometry",
            "stylers": [{
              "color": "#1d2c4d"
            }]
          },
          {
            "elementType": "labels.text.fill",
            "stylers": [{
              "color": "#8ec3b9"
            }]
          },
          {
            "elementType": "labels.text.stroke",
            "stylers": [{
              "color": "#1a3646"
            }]
          },
          {
            "featureType": "administrative.country",
            "elementType": "geometry.stroke",
            "stylers": [{
              "color": "#4b6878"
            }]
          },
          {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [{
              "color": "#64779e"
            }]
          },
          {
            "featureType": "administrative.province",
            "elementType": "geometry.stroke",
            "stylers": [{
              "color": "#4b6878"
            }]
          },
          {
            "featureType": "landscape.man_made",
            "elementType": "geometry.stroke",
            "stylers": [{
              "color": "#334e87"
            }]
          },
          {
            "featureType": "landscape.natural",
            "elementType": "geometry",
            "stylers": [{
              "color": "#023e58"
            }]
          },
          {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{
              "color": "#283d6a"
            }]
          },
          {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [{
              "color": "#6f9ba5"
            }]
          },
          {
            "featureType": "poi",
            "elementType": "labels.text.stroke",
            "stylers": [{
              "color": "#1d2c4d"
            }]
          },
          {
            "featureType": "poi.park",
            "elementType": "geometry.fill",
            "stylers": [{
              "color": "#023e58"
            }]
          },
          {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [{
              "color": "#3C7680"
            }]
          },
          {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [{
              "color": "#304a7d"
            }]
          },
          {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [{
              "color": "#98a5be"
            }]
          },
          {
            "featureType": "road",
            "elementType": "labels.text.stroke",
            "stylers": [{
              "color": "#1d2c4d"
            }]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [{
              "color": "#2c6675"
            }]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [{
              "color": "#9d2a80"
            }]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [{
              "color": "#9d2a80"
            }]
          },
          {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [{
              "color": "#b0d5ce"
            }]
          },
          {
            "featureType": "road.highway",
            "elementType": "labels.text.stroke",
            "stylers": [{
              "color": "#023e58"
            }]
          },
          {
            "featureType": "transit",
            "elementType": "labels.text.fill",
            "stylers": [{
              "color": "#98a5be"
            }]
          },
          {
            "featureType": "transit",
            "elementType": "labels.text.stroke",
            "stylers": [{
              "color": "#1d2c4d"
            }]
          },
          {
            "featureType": "transit.line",
            "elementType": "geometry.fill",
            "stylers": [{
              "color": "#283d6a"
            }]
          },
          {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [{
              "color": "#3a4762"
            }]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{
              "color": "#0e1626"
            }]
          },
          {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [{
              "color": "#4e6d70"
            }]
          }
        ]
    };
    
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var marker = new google.maps.Marker({
        position: myLatlng,
        title: "Hello World!"
    });
    new AutocompleteDirectionsHandler(myLatlng);

    // To add the marker to the map, call setMap();
    marker.setMap(map);
}
}

class AutocompleteDirectionsHandler {
  map: google.maps.Map;
  originPlaceId: string;
  destinationPlaceId: string;
  travelMode: google.maps.TravelMode;
  directionsService: google.maps.DirectionsService;
  directionsRenderer: google.maps.DirectionsRenderer;

  constructor(map: google.maps.Map) {
    this.map = map;
    this.originPlaceId = "";
    this.destinationPlaceId = "";
    this.travelMode = google.maps.TravelMode.WALKING;
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.directionsRenderer.setMap(map);

    const originInput = document.getElementById(
      "origin-input"
    ) as HTMLInputElement;
    const destinationInput = document.getElementById(
      "destination-input"
    ) as HTMLInputElement;
    const modeSelector = document.getElementById(
      "mode-selector"
    ) as HTMLSelectElement;

    const originAutocomplete = new google.maps.places.Autocomplete(originInput);

    // Specify just the place data fields that you need.
    originAutocomplete.setFields(["place_id"]);

    const destinationAutocomplete = new google.maps.places.Autocomplete(
      destinationInput
    );

    // Specify just the place data fields that you need.
    destinationAutocomplete.setFields(["place_id"]);

    this.setupClickListener(
      "changemode-walking",
      google.maps.TravelMode.WALKING
    );
    this.setupClickListener(
      "changemode-transit",
      google.maps.TravelMode.TRANSIT
    );
    this.setupClickListener(
      "changemode-driving",
      google.maps.TravelMode.DRIVING
    );

    this.setupPlaceChangedListener(originAutocomplete, "ORIG");
    this.setupPlaceChangedListener(destinationAutocomplete, "DEST");

    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(
      destinationInput
    );
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);
  }

  // Sets a listener on a radio button to change the filter type on Places
  // Autocomplete.
  setupClickListener(id: string, mode: google.maps.TravelMode) {
    const radioButton = document.getElementById(id) as HTMLInputElement;

    radioButton.addEventListener("click", () => {
      this.travelMode = mode;
      this.route();
    });
  }

  setupPlaceChangedListener(
    autocomplete: google.maps.places.Autocomplete,
    mode: string
  ) {
    autocomplete.bindTo("bounds", this.map);

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();

      if (!place.place_id) {
        window.alert("Please select an option from the dropdown list.");
        return;
      }

      if (mode === "ORIG") {
        this.originPlaceId = place.place_id;
      } else {
        this.destinationPlaceId = place.place_id;
      }

      this.route();
    });
  }

  route() {
    if (!this.originPlaceId || !this.destinationPlaceId) {
      return;
    }

    const me = this;

    this.directionsService.route(
      {
        origin: { placeId: this.originPlaceId },
        destination: { placeId: this.destinationPlaceId },
        travelMode: this.travelMode,
      },
      (response, status) => {
        if (status === "OK") {
          me.directionsRenderer.setDirections(response);
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  }
}

        // // To add the marker to the map, call setMap();
        // marker.setMap(map);

       /*  function initMap(): void {
          const map = new google.maps.Map(
            document.getElementById("map") as HTMLElement,
            {
              mapTypeControl: false,
              center: { lat: -33.8688, lng: 151.2195 },
              zoom: 13,
            }
          );
        
          new AutocompleteDirectionsHandler(map);
        }
        
        class AutocompleteDirectionsHandler {
          map: google.maps.Map;
          originPlaceId: string;
          destinationPlaceId: string;
          travelMode: google.maps.TravelMode;
          directionsService: google.maps.DirectionsService;
          directionsRenderer: google.maps.DirectionsRenderer;
        
          constructor(map: google.maps.Map) {
            this.map = map;
            this.originPlaceId = "";
            this.destinationPlaceId = "";
            this.travelMode = google.maps.TravelMode.WALKING;
            this.directionsService = new google.maps.DirectionsService();
            this.directionsRenderer = new google.maps.DirectionsRenderer();
            this.directionsRenderer.setMap(map);
        
            const originInput = document.getElementById(
              "origin-input"
            ) as HTMLInputElement;
            const destinationInput = document.getElementById(
              "destination-input"
            ) as HTMLInputElement;
            const modeSelector = document.getElementById(
              "mode-selector"
            ) as HTMLSelectElement;
        
            const originAutocomplete = new google.maps.places.Autocomplete(originInput);
        
            // Specify just the place data fields that you need.
            originAutocomplete.setFields(["place_id"]);
        
            const destinationAutocomplete = new google.maps.places.Autocomplete(
              destinationInput
            );
        
            // Specify just the place data fields that you need.
            destinationAutocomplete.setFields(["place_id"]);
        
            this.setupClickListener(
              "changemode-walking",
              google.maps.TravelMode.WALKING
            );
            this.setupClickListener(
              "changemode-transit",
              google.maps.TravelMode.TRANSIT
            );
            this.setupClickListener(
              "changemode-driving",
              google.maps.TravelMode.DRIVING
            );
        
            this.setupPlaceChangedListener(originAutocomplete, "ORIG");
            this.setupPlaceChangedListener(destinationAutocomplete, "DEST");
        
            this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
            this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(
              destinationInput
            );
            this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);
          }
        
          // Sets a listener on a radio button to change the filter type on Places
          // Autocomplete.
          setupClickListener(id: string, mode: google.maps.TravelMode) {
            const radioButton = document.getElementById(id) as HTMLInputElement;
        
            radioButton.addEventListener("click", () => {
              this.travelMode = mode;
              this.route();
            });
          }
        
          setupPlaceChangedListener(
            autocomplete: google.maps.places.Autocomplete,
            mode: string
          ) {
            autocomplete.bindTo("bounds", this.map);
        
            autocomplete.addListener("place_changed", () => {
              const place = autocomplete.getPlace();
        
              if (!place.place_id) {
                window.alert("Please select an option from the dropdown list.");
                return;
              }
        
              if (mode === "ORIG") {
                this.originPlaceId = place.place_id;
              } else {
                this.destinationPlaceId = place.place_id;
              }
        
              this.route();
            });
          }
        
          route() {
            if (!this.originPlaceId || !this.destinationPlaceId) {
              return;
            }
        
            const me = this;
        
            this.directionsService.route(
              {
                origin: { placeId: this.originPlaceId },
                destination: { placeId: this.destinationPlaceId },
                travelMode: this.travelMode,
              },
              (response, status) => {
                if (status === "OK") {
                  me.directionsRenderer.setDirections(response);
                } else {
                  window.alert("Directions request failed due to " + status);
                }
              }
            );
          }
        } */
