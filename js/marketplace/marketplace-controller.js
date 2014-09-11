'use strict';

(function() {
  var app = angular.module('portal.marketplace.controller', []);

  app.controller('MarketplaceController', [ '$http', '$scope','marketplaceService', function($http, $scope, marketplaceService) {
    var store = this;
    store.portlets = [];
    store.count = 0;
    $scope.searchTerm = marketplaceService.getInitialFilter();
    marketplaceService.initialFilter("");

    $http.get('/portal/api/marketplace/entries.json')
      .success(function(data) {
        store.portlets = data.portlets;
        store.count = store.portlets.length;
      }).error(function(data) {
    });

    this.addToHome = function addToHomeFunction(index, portlet) {
      var fname = portlet.fname;
      var tabName = "UW Bucky Home";
      $.ajax({
              url: "/portal/api/layout?action=addPortlet&fname=" + fname +"&tabName=" + tabName,
              type: "POST",
              data: null,
              dataType: "json",
              async: true,
              success: function (request, text){
                $('.fname-'+fname).html('Added Successfully').prop('disabled',true).removeClass('btn-add');

              },
              error: function(request, text, error) {
                $('.fname-'+fname).parent().append('<span>Issue adding to home, please try again later</span>');
              }
          });
    };



  } ]);
})();
