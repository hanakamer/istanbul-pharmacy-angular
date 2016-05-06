import {app} from '../app/app'
import slug from 'slug'

export let pharmacyOnDuty = function($http){
    let getPharmacies = function(district){
      return $http.get("http://pharmacy.emre.sh/api/v1/istanbul/" + slug(district.toLowerCase()))
                  .then(function(response){
                    return response.data;
                  })
    };

    return {
      getPharmacies: getPharmacies
    }
  }

  //just giving a ref to the module, not creating a new one
  let module = angular.module("pharmApp");
  module.factory("pharmacyOnDuty", pharmacyOnDuty )
