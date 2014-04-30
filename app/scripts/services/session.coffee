'use strict'

angular.module('florianHerrengtApp')
  .factory 'Session', ($resource) ->
    $resource '/api/session/'
