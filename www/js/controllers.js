angular.module('mini-spotify.controllers', [])

.controller('SearchCtrl', function($scope, $http) {

  $scope.search = {}

  $scope.searchArtist = function() {

    if ($scope.search.query == "") {
      // If they clear the search bar, clear results
      $scope.artists = null; 
    } else {
      // If there's something in the bar, make a search
      $http.get('https://api.spotify.com/v1/search?q=' + $scope.search.query + '&type=artist').
        success(function(data, status, headers, config) {
          // Get data about artists who match query
          $scope.artists = data.artists.items;
        }).
        error(function(data, status, headers, config) {
          // Todo: handle API errors.
        });
      }
    }
    
  
})

.controller('ArtistCtrl', function($scope, $http, $stateParams) {

  // Get basic details about the artist
  $scope.getArtistDetails = function() {
    $http.get('https://api.spotify.com/v1/artists/' + $stateParams.spotifyID ).
      success(function(data, status, headers, config) {
        $scope.artist = data;
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
  }

  // Get top 10 tracks from the artist 
  $scope.getArtistTopTracks = function() {
    $http.get('https://api.spotify.com/v1/artists/' + $stateParams.spotifyID + '/top-tracks?country=US').
      success(function(data, status, headers, config) {
        $scope.tracks = data.tracks;
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
    }

  $scope.getArtistDetails();
  $scope.getArtistTopTracks();

})

