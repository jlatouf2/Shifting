angular.module('myApp').controller('firstController', ['$scope', '$location', '$http', 'AuthService', '$rootScope',
function($scope, $location, $http, AuthService, userdata, $rootScope) {

  $scope.myStyle = {
    "background-color" : "coral"
  }



        console.log($scope.lineups2);
        $scope.lineups2.push('Dog');


        console.log("THIS IS USERDATA AFTER ITS DELETED: " + $scope.userdata);

          //   $http.post('postedinfo', { username : $scope.SendUserData2, body: $scope.SendUserData3});


            $scope.socketData = function(){

            socket.emit('clientEvent', 'Sent an event from the client!');
          console.log("Pressed")
          }


              //Logout Function:

              $scope.logoutFunction = function(){
                AuthService.logout();

                }


      }]);






angular.module('myApp').controller('ExampleController', ['$scope', '$location', '$http', 'AuthService',
function($scope, $location, $http, AuthService) {

  /*
  1) could redirect to a seperate angular login controller and PAGE
  2) so in the facebook callback after success: it redirects to confirm page then goes to profile:
  ex:    1) res.redirect('/#/confirm');
         2) goes to profile page
  */

        //THIS CONFIRMS THE LOGIN FOR FACEBOOK
          AuthService.confirm();

//    $scope.authFacebook = function() { window.location="http://localhost:3000/facebook" }




          //ADD NAMES TO PAGE
              $scope.fname = function(){
                console.log($scope.firstname);
                console.log($scope.lastname);

                }


        //THIS PASSES JSON BACK AND FORTH
            myObj = { "name":"John", "age":30, "car":null };

              $scope.orangeData = function(){

                    $http.post('/orange', myObj   ).success(function( data)
                   {
                     console.log("Data is returned: " + data);
                     console.log("Data is returned name:: " + data.name);
                     $scope.countries = data;

                 }, function(posts) {});
                }




        //THIS PASSES JSON BACK AND SHOWS ON TABLE
                $scope.dateGrab = function(){
                      console.log("clicked!");
                      $http.post('/findDate').success(function(data)
                     {
                       console.log(data[0]._id);
                       console.log(data[0].username);
                       console.log(data[0].password);
                       console.log(data[0].date);

                       $scope.countries = data;



                       $scope._id = data[0]._id;
                       $scope.username = data[0].username;
                       $scope.password= data[0].password;
                       $scope.date = data[0].date;



                    }, function(posts) {});
                  }



                  //$http.post('/login', {username : $scope.username, password: $scope.password }).success(function( data)
                  //	 { console.log (data); }, function(posts) {});

        //THIS PASSES JSON BACK AND SHOWS ON TABLE
              $scope.bob = function(){
                  console.log('Clicked!');

                      $http.post('/red', {email : $scope.firstname }).success(function( data)
                     { console.log (data); }, function(posts) {});

                  }


        //THIS PASSES JSON BACK AND SHOWS ON TABLE

                  $scope.postedUsername = function() {

                      console.log('button pressed');

                    $http.post('/user/posted', {
                      username : $scope.SendUserData,
                      body : $scope.SendUserData4,
                    }).success(function() {
                      console.log('Post success');

                    }).error(function() {
                      console.log('Post failure');
                    });
                    $scope.SendUserData = '';

                  };



    }]);




angular.module('myApp').controller('ContactController', ['$scope', '$location', '$http', '$rootScope', 'AuthService',
function($scope, $location, $http, $rootScope, AuthService) {


  /* LOCATION DATA  */
    var x = document.getElementById("demo");

    $scope.getLocation = function() {
  //  function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    function showPosition(position) {
        x.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
    }

    /* LOCATION DATA  */



      // -d '{"email": "jarredl", "password": "paassword2"}' \

          //THIS WILL ADD THE CONTACTS LIST TO THE TABL

          var People = [
            {
              name: "Joe Watkins",
              position: "UX Developer",
              skills: "HTML CSS Javascript"
            },
            {
              name: "Jen Smithers",
              position: "Dev Ops",
              skills: "Alien Server Technology"
            },
            {
              name: "Paul Anderson",
              position: "Designer",
              skills: "UI & UX Design"
            },
            {
              name: "Samantha Barton",
              position: "Javascript Ninja",
              skills: "All things JS"
            }
          ];

          $scope.countries = People


          // AuthService.loginExample($scope.loginForm.username, $scope.loginForm.password)

          //THESE PASS TO SERVICES.JS
          $scope.ServiceFunction2 = function () {
            AuthService.loginExample2($scope.firstname,   $scope.lastname);
          };

          $scope.ServiceFunction3 = function () {
            AuthService.RegisterExample($scope.firstname,   $scope.lastname);
          };

    }]);



angular.module('myApp').controller('ProfileController', ['$scope', '$location', '$http', '$rootScope', 'AuthService',
function($scope, $location, $http, $rootScope, AuthService) {

        /*
        if ($scope.userdata == null) {
          $location.path('/home');

        }
        */

        console.log($scope.userdata);

  }]);


angular.module('myApp').controller('addController', ['$scope', '$location', '$http', '$rootScope', 'AuthService',
function($scope, $location, $http, $rootScope, AuthService) {




  }]);


angular.module('myApp').controller('StorenamesController', ['$scope', '$location', '$http', '$rootScope', 'AuthService',
function($scope, $location, $http, $rootScope, AuthService) {


          $("#myModal").modal("show");


  $http.post('/storeName', {email : $scope.firstname }).success(function( data)
 {
   console.log("Data is returned: " + data);
   console.log("Data is returned name:: " + data[0]._id);
   console.log("Data is returned name:: " + data[0].store);

   $scope.countries = data;

}, function(posts) {});


          $scope.getStores = function(){
              console.log('clicked');
                  $http.post('/storeName', {email : $scope.firstname }).success(function( data)
                 {
                   console.log("Data is returned: " + data);
                   console.log("Data is returned name:: " + data[0]._id);
                   console.log("Data is returned name:: " + data[0].store);

                   $scope.countries = data;

               }, function(posts) {});

            }


            $scope.addStore1 = function(){
              console.log('clicked');
              console.log($scope.postal);

              if ( $scope.storeName == undefined) {
                console.log('Please enter a name');
                  } else{
                    $http.post('/addStore', {store : $scope.storeName, postal: $scope.postal }).success(function( data)
                   {
                     console.log("Data is returned: " + data);
                    //    var successful = true;
                        $rootScope.successful = true;
                     //$scope.countries = data;
                console.log($scope.successful);
                 }, function(posts) {});
               }

              }


        /*
              NOTE: THIS IS NOT CONNECTED YET
                $scope.deleteStore = function(){
            console.log('clicked');
                        $http.post('/deleteStore', {store : $scope.storeName} ).success(function( data)
                       {
                         console.log("Data is returned: " + data);

                         //$scope.countries = data;

                     }, function(posts) {});

                  }
        */



        $(document).ready(function () {

  // wire up button click
  $('#go').click(function () {
    // test for presence of geolocation
    if(navigator && navigator.geolocation) {
      // make the request for the user's position
      navigator.geolocation.getCurrentPosition(geo_success, geo_error);
    } else {
      // use MaxMind IP to location API fallback
      printAddress(geoip_latitude(), geoip_longitude(), true);
    }
  });
});


function geo_success(position) {
  printAddress(position.coords.latitude, position.coords.longitude);
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);

}

function geo_error(err) {
  // instead of displaying an error, fall back to MaxMind IP to location library
//  printAddress(geoip_latitude(), geoip_longitude(), true);
console.log('DID NOT WORK!');
}

// use Google Maps API to reverse geocode our location
function printAddress(latitude, longitude, isMaxMind) {
    // set up the Geocoder object
    var geocoder = new google.maps.Geocoder();

    // turn coordinates into an object
    var yourLocation = new google.maps.LatLng(latitude, longitude);

    // find out info about our location
    geocoder.geocode({ 'latLng': yourLocation }, function (results, status) {
    if(status == google.maps.GeocoderStatus.OK) {
      if(results[0]) {
        $('#results').fadeOut(function() {
        // $(this).html('<p><b>Abracadabra!</b> My guess is:</p><p><em>' + results[0].formatted_address + '</em></p>').fadeIn();

          $(this).html('<p><b>Abracadabra!</b> This is postal code:</p><p><em>' + results[0].address_components[6].long_name + '</em></p>').fadeIn();
              console.log(results[0]);
              console.log(results[0].address_components[6].long_name);

              console.log(results);
              console.log(results[2].address_components);
              console.log('This is the correct postal code' + results[2].address_components[0].long_name);
              //SAVES POSTAL CODE TO PASS TO DB.
             $rootScope.postal = results[0].address_components[6].long_name;

        })
      } else {
        error('Google did not return any results.');
      }
    } else {
      error("Reverse Geocoding failed due to: " + status);
    }
  });

  // if we used MaxMind for location, add attribution link
  if(isMaxMind) {
    $('body').append('<p><a href="http://www.maxmind.com" target="_blank">IP to Location Service Provided by MaxMind</a></p>');
  }
}

function error(msg) {
  alert(msg);
}






        var x = document.getElementById("demo");

        $scope.getLocation = function() {
      //  function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            } else {
                x.innerHTML = "Geolocation is not supported by this browser.";
            }
        }


        function showPosition(position) {
            x.innerHTML = "Latitude: " + position.coords.latitude +
            "<br>Longitude: " + position.coords.longitude;

            console.log(position.coords.latitude);
            console.log(position.coords.longitude);
            console.log(position);

        }



        console.log('this worked');
        console.log($scope.storesAvailable);

        console.log("This is the saved name: "+ $scope.loginName);





          $scope.addStore = function(name) {
            var bob = $scope.storeName;
            console.log(bob);

            //EATHER OF THESE TWO IDEAS WILL WORK!
          //  $rootScope.loginName = bob;
          $rootScope.storesAvailable.push(bob);

          }


              $scope.removeName = function(name) {
            var i = $scope.storesAvailable.indexOf(name);

            $scope.storesAvailable.splice(name, 1);
            console.log($scope.storesAvailable);

          };

          /*
          You have to use $index to get the right number:
                //This one actually works!!
              $scope.removeName = function(name) {
                  var i = $scope.lineups2.indexOf(name);


                  $scope.lineups2.splice(name, 1);
                  console.log($scope.lineups2);

                };
          */


            //Grabs Storename to pass to next page
        	$scope.grabStuff = function(names){
        				console.log("Name of Store " + names);

        			$rootScope.grabStorename = names;
        			console.log ("Name of Store variable: " + $scope.grabStorename);
        			//THEREFORE USE $scope.grabLineIn to pass the vaariable to the next page:
        		};




    }]);

    angular.module('myApp').controller('StorelinesController', ['$scope', '$location', '$http', '$rootScope', 'AuthService',
    function($scope, $location, $http, $rootScope, AuthService) {

          $scope.grabLine = function(names){
        				console.log("Line Number " + names);

        			$rootScope.grabLineNumber = names;
        			console.log ("Name of Store variable: " + $scope.grabLineNumber);
        			//THEREFORE USE $scope.grabLineIn to pass the vaariable to the next page:
        		};



      }]);

      angular.module('myApp').controller('PeoplelineController', ['$scope', '$location', '$http', '$rootScope', 'AuthService',
      function($scope, $location, $http, $rootScope, AuthService) {


            $http.post('/peopleNames').success(function( data)
               {
                   console.log("Data is returned: " + data);
                   console.log("Data is returned name:: " + data[0]._id);
                   console.log("Data is returned name:: " + data.email);

                 $scope.people = data;

               }, function(posts) {});


        $scope.getNames = function(){
            console.log('clicked');
                $http.post('/peopleNames').success(function( data)
               {
                 console.log("Data is returned: " + data);
                 console.log("Data is returned name:: " + data[0]._id);
                 console.log("Data is returned name:: " + data.email);

                 $scope.people = data;

             }, function(posts) {});

          }



        }]);
