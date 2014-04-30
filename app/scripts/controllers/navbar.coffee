'use strict'

angular.module('florianHerrengtApp')
  .controller 'NavbarCtrl', ($rootScope, $scope, $location, $http, $timeout, Auth) ->
    $scope.menu = [
      title: 'Home'
      link: '/'
    ]
    # if $rootScope.currentUser.role is 'admin'
    if Auth.isLoggedIn()
      $scope.isAdmin = if $rootScope.currentUser.role is 'admin' then true else false
    # else

    # $http.get('/api/users/me').success (me) ->
    #   $timeout(->
    #     if me.role is 'admin'
    #       $scope.isAdmin = true
    #   , 500)

    $scope.logout = ->
      Auth.logout().then ->
        $location.path "/login"

    $scope.isActive = (route) ->
      route is $location.path()
