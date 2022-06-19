(function () {
    'use strict';
    
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', foundItemsDirective)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com/menu_items.json");
 
    function foundItemsDirective() {
        var ddo = {
          templateUrl: 'loader/itemsloaderindicator.template.html',
          scope: {
            items: '<',
            onRemove: '&'
          },
          controller: foundItemsDirectiveController,
          controllerAs: 'list',
          bindToController: true
        };
      
        return ddo;
      }

      function foundItemsDirectiveController() {
        var list = this;
      }
    

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
      var list = this;
        
      
      var getItems = function (searchTerm) {
        var promise = MenuSearchService.getMatchedMenuItems();
        console.log(promise);
         promise.then(function (response) {
        list.found = response.data;
         })
        .catch(function (error) {
            console.log("Nothing found.");
        });
      };

      list.removeItem = function (itemIndex) {
        //console.log("'this' is: ", this);
        found.splice(itemIndex,1);
       // this.title = origTitle + " (" + list.items.length + " items )";
      };
    
    }   


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function () {

    var response = $http({
      method: "GET",
      url: (ApiBasePath)
    });
    //var data = response.data;
    //console.log("XXX" , response);
    //var searchTermData = searchTermFilter(data , searchTerm); 
    return response;
  };

  service.searchTermFilter = function (data ,searchTerm) {
    var filterData = [];
    for(var i = 0 ; i < data.size() ; i++){
        if(data[i].description.contains(searchTerm)){
            filterData.push(data[i]);
        }
    }

    return filterData;
  }
}

})();