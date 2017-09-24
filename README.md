# Complete Guide to Node Authentication


       <h1 class="title bob3" style="font-size: 30px; ">Storenames Information</h1>

         <button class="button button-clear" ng-click="closestoremodal()">Close</button>

       <form ng-submit="doLogin()">
         <div class="list " style="width:400px; margin: 0 auto; ">


   <div class="card" >
    <div class="  bob3 item item-text-wrap" style="line-height: 100%;  font-size: 25px; ">
      This page will use your coordinates to determine if their are store nearby that
      are also using Shift. <br>

      <div class="card">
       <div class="bob3 item item-text-wrap" style="font-size: 25px; ">
         Please either: <br>
         1) Select a specified store  <br>
         2) Create another store  <br>
       </div>
      </div>


   <span style="font-size: 20px">   *Press and hold row to delete. </span>



   MODAL #2

   <div class="bob3 item item-text-wrap" style="font-size: 30px; ">
     This page shows the lines available in this store.

     <div class="card">
      <div class="bob3 item item-text-wrap" style="font-size: 25px; ">
        Please either: <br>
        1) Select a line  <br>
        2) Create another line
      </div>
     </div>
     <span style="font-size: 20px">   *Press and hold item to delete. </span>
   </div>



ALL YOU HAVE TO DO TO CREATE NAVIGATION LIKE MY IONIC APP:
MAKE TEXT THAT IT CLICKABLE, AND GET RID OF BOOTSTRAP NAVBAR.

## Instructions

Please Note:

-Using Grunt may not let you use curl requests to trigger backend
code. This could prove difficult testing things, as well as triggering
passport to work while testing.

/*

$http({
    url: 'http://localhost:8080/example/teste',
    dataType: 'json',
    method: 'POST',
    data: '',
    headers: {
        "Content-Type": "application/json"
    }

}).success(function(response){
    $scope.response = response;
}).error(function(error){
    $scope.error = error;
});


*/
