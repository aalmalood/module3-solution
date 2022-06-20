(function () {
    'use strict';
    
    angular.module('NarrowItDownApp', [])
	.service('MenuSearchService', MenuSearchService)
    .controller('NarrowItDownController', NarrowItDownController)
    .directive('foundItems', foundItemsDirective)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com/menu_items.json");
 
    function foundItemsDirective() {
        var ddo = {
			restrict: "E",
			templateUrl: 'template.html',
			scope: {
				foundItems: '<',
				myTitle: '@title',
				onRemove: '&'
			},
			controller: foundItemsDirectiveController,
			controllerAs: 'dctrl',
			bindToController: true
        };
      
        return ddo;
      }

    function foundItemsDirectiveController() {
        var dctrl = this;
		dctrl.isempty = function (){
        if (dctrl.foundItems.length === 0 && dctrl.foundItems !== 'undefined'){
            return true;
        }
        return false;
    };
      }
    

    NarrowItDownController.$inject = ['$scope','MenuSearchService'];
    function NarrowItDownController($scope,MenuSearchService) {
      var list = this;
      list.found = [];  
      list.searchTerm = '';
      list.getItems = function (searchT) {
        var promise = MenuSearchService.getMatchedMenuItems();

         promise.then(function (response) {

         list.found = MenuSearchService.searchTermFilter(response.data.menu_items , searchT);
		 console.log("list.found " , list.found);
         })
        .catch(function (error) {
            console.log("Nothing found.");
        });
      };

      list.removeItem = function (itemIndex) {
        list.found.splice(itemIndex , 1);
      };
		
    }   


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var  service = this;
  
  service.getMatchedMenuItems = function () {

    var response = $http({
      method: "GET",
      url: (ApiBasePath)
    });
    return response;
  };

  service.searchTermFilter = function (data ,searchTerm,foundItemsDirective) {
    var filterData = [];
    for(var i = 0 ; i < data.length ; i++){
    
        if(data[i].description.includes(searchTerm)){
			console.log("data" , data[i]);
            filterData.push(data[i]);
        }
    }
    return filterData;
  }
  
}


})();
