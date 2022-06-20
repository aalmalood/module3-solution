(function () {
    'use strict';
    
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    //.directive('foundItems', foundItemsDirective)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com/menu_items.json");
 
    /*function foundItemsDirective() {
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
      }*/
    

    NarrowItDownController.$inject = ['$scope','MenuSearchService'];
    function NarrowItDownController($scope,MenuSearchService) {
      var list = this;
        
      
      list.getItems = function (searchT) {
        var promise = MenuSearchService.getMatchedMenuItems();
        //console.log(promise);
         promise.then(function (response) {
         //response.data;
        // console.log(searchTerm, "searchTerm");
         list.found = MenuSearchService.searchTermFilter(response.data.menu_items , searchT);
        console.log(list.found);
         })
        /*.catch(function (error) {
            console.log("Nothing found.");
        });*/
      };

      list.removeItem = function (itemIndex) {
        //console.log("'this' is: ", this);
        found.splice(itemIndex,1);
       // this.title = origTitle + " (" + list.items.length + " items )";
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

  service.searchTermFilter = function (data ,searchTerm) {
    var filterData = [];
    console.log(searchTerm, "searchTerm");
    for(var i = 0 ; i < data.length ; i++){
        //console.log(data[i]);
        if(data[i].description.includes(searchTerm)){
            filterData.push(data[i]);
        }
    }
    console.log("filterData " ,filterData , " searchTerm", searchTerm);
    return filterData;
  }
  //console.log("XXX" , service);
}

})();
