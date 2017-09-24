'use strict';

angular.module('myApp').factory('AuthService' ,
  function ($rootScope, $http, $location) {

        $rootScope.lineups2 = ['Jarred', 'Jacob', 'Johna!'];
        $rootScope.storesAvailable = ['BestBuy', 'Kmart', 'Target', 'Zehrs'];
        $rootScope.peopleLine = ['Marcus', 'Dom', 'Brain'];
        $rootScope.lineNumber = [1, 2, 3];


        return ({
          loginExample2: loginExample2,
          RegisterExample: RegisterExample,
          logout: logout,
          confirm: confirm
        });



    function loginExample2(email, password){

        console.log('email' + email);
        console.log('password' + password);

        $http.post('/login', {email : email, password : password} )
           .success(function( data) {
              console.log (data);
              $location.path('/profile');

              console.log(data.user.local);
              console.log(data.user.local.email);
              console.log(data.user.local.password);

              $rootScope.userdata = data;
              //Its refered to as local because its stored in the database as local:
              $rootScope.userInfo= data.user.local;

              $rootScope.userEmail = data.user.local.email;

              $rootScope.userPassword = data.user.local.password;


              }, function(posts) {});

    }


    function RegisterExample(email, password){

          console.log('firstname' + email);
          console.log('lastname' + password);

            $http.post('/signup', {email : email, password : password} )
            .success(function( data) {
              console.log (data);
              $location.path('/profile');
              console.log(data.user.local);
              console.log(data.user.local.email);
              console.log(data.user.local.password);

              $rootScope.userdata = data;

              $rootScope.userName = data.user.local;
              console.log('This is the username in $rootScope: ' + $scope.userName);

              }, function(posts) {});

    }


    function logout() {

          //  console.log("THIS IS USERDATA: " + $scope.userdata);

            $rootScope.userdata = null;

            $rootScope.useremail = null;
            $rootScope.username = null;
            $rootScope.userid = null;
            $rootScope.usertoken = null;

            $http.get('/logout')
              // handle success
              .success(function (data) {
                console.log('LOGGED OUT!');
              })
              // handle error
              .error(function (data) {
              });

            //console.log("THIS IS USERDATA AFTER ITS DELETED: " + $scope.userdata);

            $location.path('/home');


    }


  function confirm() {

      $http.get('/confirm-login')
      .success(function (data) {
                    if (data) {

              console.log("FFFFFFFFFFFFFFFFFFFFFFF"+data.username);
              console.log(data);

              $rootScope.userdata = data;

              $rootScope.useremail = data.facebook.email;
              $rootScope.username = data.facebook.name;
              $rootScope.userid = data.facebook.id;
              $rootScope.usertoken = data.facebook.token;

              console.log("email"+data.facebook.email);

                  }
              else {
                console.log("Not logged in yet!");
              }
                          });
      }



//  $scope.lineups2.push('Dog');


    $rootScope.grabStorename = 'Walmart';

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

    return People;
});
