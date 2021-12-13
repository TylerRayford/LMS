import { JsonPipe } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { RouteConfigLoadEnd } from "@angular/router";
import { ConnectableObservable } from "rxjs";

declare const google: any;


interface Marker {
lat: number;
lng: number;
label?: string;
draggable?: boolean;
}

const directionsRenderer = new google.maps.DirectionsRenderer({
  draggable: true,
  panel: document.getElementById("panel") as HTMLElement,
});

directionsRenderer.addListener("directions_changed", () => {
  const directions = directionsRenderer.getDirections();

});



@Component({
  selector: "app-map",
  templateUrl: "googlemaps.component.html"
})
export class googlemapsComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {destinationAddress: string}) {}

  ngOnInit() {
    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
          zoom: 13,
          mapTypeControl: false,
          center: {lat: 38.62144134895371, lng: -90.28088448668753},
          scrollwheel: false,
  
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
        })


      // pass to directions function
      new AutocompleteDirectionsHandler(map, this.data.destinationAddress);
    }
  }

  class AutocompleteDirectionsHandler  {
    map: google.maps.Map;
    originPlaceId: string;
    destinationPlaceId: string;
    travelMode: google.maps.TravelMode;
    directionsService: google.maps.DirectionsService;
    directionsRenderer: google.maps.DirectionsRenderer;
    destinationAddres: string;
  
    constructor(map: google.maps.Map, destinationAddress: string) {
      this.map = map;
      this.originPlaceId = "";
      this.destinationPlaceId = "";
      this.destinationAddres = destinationAddress;
      this.travelMode = google.maps.TravelMode.DRIVING;
      this.directionsService = new google.maps.DirectionsService();
      this.directionsRenderer = new google.maps.DirectionsRenderer();
      this.directionsRenderer.setMap(map);
      this.directionsRenderer.setPanel(
        document.getElementById("sidebar") as HTMLElement
      )
      console.log('dest' + this.destinationAddres);
  
    this.route();
    }

    route() {
console.log('destinationaddress' + this.destinationAddres)
      let origin = "1625 Sublette Ave Saint Louis, MO 63110";
      let destination = this.destinationAddres;

      const me = this;

      
  
      this.directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: this.travelMode,
        },
        (response, status) => {
          console.log('response' + response);
          if (status === "OK") {
            me.directionsRenderer.setDirections(response);
            
          } else {
            window.alert("Directions request failed due to " + status);
          }
        }
      );
    }
  }
