
    var myApp = angular.module('myApp', ['ngRoute']);

    myApp.config(function ($routeProvider) {

            $routeProvider
            .when('/', {
              templateUrl: 'partials/home.html',
              controller: 'firstController'

             })
            .when('/examples', {
              templateUrl: 'partials/examples.html',
              controller: 'ExampleController'

            })
            .when('/page', {
              templateUrl: 'partials/page.html',
              controller: 'ContactController'

            })
            .when('/signup', {
              templateUrl: 'partials/signup.html',
              controller: 'ContactController'

            })
            .when('/login', {
              templateUrl: 'partials/login.html',
              controller: 'ContactController'
              })
            .when('/add', {
              templateUrl: 'partials/addContact.html',
              controller: 'addController'
              })

              .when('/profile', {
                templateUrl: 'partials/profile.html',
                controller: 'ProfileController'

            })
            .when('/storeNames', {
              templateUrl: 'partials/storeNames.html',
              controller: 'StorenamesController',
            })
            .when('/storelines', {
              templateUrl: 'partials/storelines.html',
              controller: 'StorelinesController',
            })
            .when('/peopleline', {
              templateUrl: 'partials/peopleinline.html',
              controller: 'PeoplelineController',
            })



      .otherwise({redirectTo: '/'});
    });
