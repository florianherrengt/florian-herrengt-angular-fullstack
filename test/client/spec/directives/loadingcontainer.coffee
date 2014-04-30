'use strict'

describe 'Directive: loadingContainer', () ->

  # load the directive's module
  beforeEach module 'florianHerrengtApp'

  scope = {}

  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()

  it 'should make hidden element visible', inject ($compile) ->
    element = angular.element '<loading-container></loading-container>'
    element = $compile(element) scope
    expect(element.text()).toBe 'this is the loadingContainer directive'
