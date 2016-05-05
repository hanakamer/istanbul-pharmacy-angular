import '../app/style.css';

import angular from 'angular';
import 'angular-sanitize';
import 'lodash';
import 'angular-simple-logger';
import 'angular-google-maps';
import {app} from '../app/app'
import {pharmacyOnDuty} from '../app/ViewDistrict'

  let MainController = function( pharmacyOnDuty, $http, uiGmapGoogleMapApi, $log) {
    let self = this;

    self.map = {
      center: { latitude: 41.1, longitude:29 },
      zoom: 12,
    };
    let createMarker = function(info) {
      let marker = {
       id: info.id,
       coords: {
         latitude: info.coordinates[0],
         longitude: info.coordinates[1]
       },
       options: {
         title: info.name,
         labelContent: info.id,
         labelAnchor: "0 53",
         labelClass: "marker-labels"
       }
     };
     self.map.markers.push(marker);
    }

    let isUpToDate = function(date) {
      if (date == self.todaysDate) {
        return true;
      }
      return false
    }

    let addMarkers = function() {
      self.map.markers = [];
      for (let i in self.pharmacies) {
        self.pharmacies[i].id = parseInt(i) +1;
        createMarker(self.pharmacies[i])
      }
      self.map.center.latitude = self.pharmacies[0].coordinates[0]
      self.map.center.longitude = self.pharmacies[0].coordinates[1]
    }

    let onComplete = function(data){
      self.dataDate = data.date;
      self.district = data.name;
      self.slug = data.slug;
      self.pharmacies = data.pharmacies;
      self.error = null;
      addMarkers();
    }


    let onError = function(reason){
      self.error = "*Böyle bir ilçe yok."
    }

    self.search = function(district) {
      pharmacyOnDuty.getPharmacies(district)
                    .then(onComplete, onError)
      $log.info("searching for " + district)

  };

  self.todaysDate = new Date();
  self.slug = "kartal"
};

    app.controller("MainController", MainController )
