//var express = require('express');
//var app = express();
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var express = require('express');

var path = require('path');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var flash    = require('connect-flash');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressSession = require('express-session');
var FacebookStrategy = require('passport-facebook').Strategy;

var Store   = require('./config/storelocation');
var Storeline = require('./config/storeline.js')
var Track = require('./config/trackPosition.js')

app.use(express.static(path.join(__dirname, '/')));
app.use(bodyParser.json());

// required for passport
//app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret

app.use(session({
    secret: 'ilovescotchscotchyscotchscotch',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());



      // 1) ADD REQUIRE MONGOOSE:
      var mongoose = require('mongoose');

      // 2) CONNECT MONGOOSE
      mongoose.connect('mongodb://localhost/myappANG' , { useMongoClient: true });
      //  mongoose.connect('mongodb://localhost/advisorDemoTestDB', { useMongoClient: true })

      // 3) SIMPLE CHECK TO SEE IF CONNECTED TO DB
      var db = mongoose.connection;
      db.on('error', console.error.bind(console, 'connection error:'));
      db.once('open', function() {
        // we're connected!
        console.log('Connected to DB!');
      });

      //sdfsd
      //This allows the code to work [ie. This is like the code is written in here.]
      require('./config/passport')(passport); // pass passport for configuration

      require('./routes/routes.js')(app, passport);







      //THIS IS THE SOCKET.IO CODE:

      io.on('connection', function(socket){
       io.sockets.emit('broadcast',{ description:' clients connected!'});


      //Use socket.on the get something from front end:
       socket.on('clientEvent', function () {
      console.log('worked')
                   });


      socket.on('passInfo', function () {
      console.log('this worked!')
      socket.emit('passInfoBack', { description: 'A custom event named testerEvent!'});
      //	socket.emit('testerEvent', { description: 'A custom event named testerEvent!'});
        });


      });





        //curl -X POST localhost:3000/blue


        //curl -X GET localhost:3000/findDate
        //curl -X POST -i -H "Content-type: application/json" -c cookies.txt -X POST http://localhost:3000/api/posts -d '
        //curl -v -H "Content-Type: application/json" -X POST --data "{\"username\":\"dickeyxxx\", \"body\":\"node rules!\"}" localhost:3000/api/posts
        //grunt curl -X POST localhost:3000/blue
        //curl -X POST -H 'Content-Type: application/json' -d '{"email":"davidwalsh","password":"something"}' http://localhost:3000/signup

        //curl -X POST -F 'username=davidwalsh22' -F 'password=something' http://localhost:3000/signup
        //curl -X POST -F 'email=davidwalsh' -F 'password=something' http://localhost:3000/login


        //curl -X POST -F 'username=davidwalsh' http://localhost:3000/posted



        //STORELOCATION DATA:

        //curl -X POST -H 'Content-Type: application/json' -d '{"store":"Zehrs"}' http://localhost:3000/storePostalcode

        app.post('/addStore', function (req, res, next) {
              var store = new Store({
              store: req.body.store,
              postal: req.body.postal
              })

              store.save(function (err, post) {
                if (err) { return next(err) }
               res.json(201, post)
            console.log(post);
            console.log('worked')
            })
        })


        //curl -X POST  http://localhost:3000/storeName

        app.post('/storeName', function (req, res, next) {
            Store.find( {postal: req.body.postal})
              .exec(function(err, posts) {
                if (err) { return next(err) }
                   var black = JSON.stringify(posts);

            res.send(posts)
            console.log("Data is returned name:: " + posts[0]._id);
            console.log("Data is returned name:: " + posts[0].store);
            console.log("Data is returned name:: " + posts._id);

            //res.json(posts)
            	console.log(black );
            	console.log(posts );

              })
        })


        //curl -X POST  http://localhost:3000/peopleNames

        app.post('/peopleNames', function (req, res, next) {
            User.find()
              .exec(function(err, posts) {
                if (err) { return next(err) }
               res.send(posts)
            //    console.log("Data is returned name:: " + posts[0]._id);
            	console.log(posts );

              })
        })

        //curl -X POST  http://localhost:3000/checkStore


        app.post('/checkStore', function (req, res, next) {
            Store.find({store: 'Bestbuy'})

              .exec(function(err, posts) {
                if (err) { return next(err) }
                   var black = JSON.stringify(posts);

            res.send(posts)
            	console.log(posts );

              })
        })


        //curl -X POST  http://localhost:3000/deleteStore

        app.post('/deleteStore', function (req, res, next) {
          //  Store.remove ({ store: req.body.store})
        //Info.remove ({ name : "Jacob Latouf22"})
        Store.remove ({ store: "Black"})

          .sort('-date')
          .exec(function(err, posts) {
            if (err) { return next(err) }
            //   var black = JSON.stringify(posts);

      //  res.send(black)
        //res.json(posts)
        	console.log(posts );

          })
        })


        //curl -X POST  http://localhost:3000/poststoreinfo


        app.post('/poststoreinfo', function (req, res, next) {
          var storeline = new Storeline({
        			    post_id: '1',
        			    linein: 'Line1',
        				line1 : '1',
        				line2 : '0',
        				line3 : '0',
        				store: 'Walmart'


          })
          storeline.save(function (err, post) {
            if (err) { return next(err) }
           // res.json(201, post)
        res.status(201).json(post);
        	console.log(post);

// res.json(status, obj): Use res.status(status).json(obj)
//res.status(400).json(json_response);

          })
        })






        //MONGODB INFO

      // grab the things we need
      var mongoose = require('mongoose');
      var Schema = mongoose.Schema;

      // create a schema
      var userSchema = new Schema({
        name: String,
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        admin: Boolean,
        location: String,
        date: { type: Date },

        meta: {
          age: Number,
          website: String
        },
        created_at: Date,
        updated_at: Date
      });


      // the schema is useless so far
      // we need to create a model using it
      var Usertwo = mongoose.model('Usertwo', userSchema);


      var User   = require('./config/user');

      //curl -X POST localhost:3000/poststoreinfo

      app.post('/poststoreinfo', function (req, res, next) {
        var newUser2 = Usertwo({
          name: 'Jacob Bobby44444',
          username: 'Jacob4343343',
          password: 'password15',
          date: '12/10/1990',
          admin: false
        });

        newUser2.save(function (err, post) {
          if (err) {
         return next(err) ;
      }
          //res.json(201, post);
      	console.log(post);

        });
      });




          //FACEBOOK LOGIN

      app.get('/auth/facebook', passport.authenticate('facebook', {scope:'email'}));


      app.get('/auth/facebook/callback',
              passport.authenticate('facebook', { failureRedirect: '/#/login' }),
              function(req, res, user) {

              //    user = req.data
                //  console.log("THIS IS THE DATA THAT WAS SENT BACK............................." + user)
                //res.json(201, user);

                user : req.user // get the user out of session and pass to template
      sess=req.session;
      sess.data=req.user;
      console.log("THIS IS THE USER STUFF"  + sess);
      console.log("THIS IS THE USER STUFF"  + sess.data);
      console.log("THIS IS THE USER _id"  + sess.data._id);
      console.log("THIS IS THE USER email"  + sess.data.email);
      console.log("THIS IS THE USER TOKEN"  + sess.data.token);

                  res.redirect('/#/examples');
              //    app.get('/confirm-login');


              });


              /*
               * to coordinate facebook login with regular login using passport (determine if use is logged in already)
               * just make sure that facebook login button checks for something like userId or name before going to the
               * href ="facebook/login" part of the link.....
               * THIS WILL WORK!
               */

      passport.use(new FacebookStrategy({
                  clientID: '1508673329451547',
                  clientSecret: 'c42fb352fa1a185823ddd34f6267551c',
                  callbackURL: "http://localhost:3000/auth/facebook/callback",
                  profileFields: ['id', 'displayName', 'link',  'photos', 'emails']

              },
              function(accessToken, refreshToken, profile, done) {
                  process.nextTick(function () {
                //     User.findOne({'facebook.id' : profile.id, 'facebook.name' : profile.name, 'facebook.email' : profile.email}, function (err, user) {
               User.findOne({'facebook.email' : profile.emails[0].value}, function (err, user) {

                      //    console.log(profile);
                        console.log(profile.emails[0].value);

                          if (err) return done(err);
                             console.log('ERROR');

                          if (user) {
                            console.log('FOUND');
                            console.log(user);

                           return   done(null, user);
                      //     console.log("this is newUser: " + newUser)

                          } else {
                            console.log('NEW');

                              var newUser = new User();

                            //  newUser.username = profile.emails[0].value;
                              newUser.facebook.token = accessToken;
                              //newUser.facebookprofileUrl = profile.profileUrl;
                              newUser.facebook.email = profile.emails[0].value;
                              newUser.facebook.id = profile.id;
                              newUser.facebook.name = profile.displayName;

                            //  newUser.firstname =profile.name.givenName;
                            //  newUser.lastname=profile.name.familyName;
                                             console.log('ACCESSTOKEN' + accessToken)
                                         console.log('EMAIL' + profile.emails[0].value)
                                         console.log('NAME' + profile.displayName)
                                         console.log('ID' + profile.id)

            	  /*
            	   * IF SOMETHING IS WRONG: TURN ALL newUser back to user
            	   */
                                 newUser.save(function(err) {
                              if (err)
                                  throw err;

                              // if successful, return the new user
                              return done(null, newUser);

                          });
                          }
                      });
                  });
              }
          ));


          app.get('/confirm-login', function (req, res) {
          	user = req.user
          	res.send(user);

            });


              //LOGOUT

      app.get('/logout', function(req, res, sess) {
            req.logout();
            sess.destroy
            //       delete req.sess; // delete the password from the session
          //  req.sess = user;  //refresh the session value
          console.log("THIS IS THE USER STUFF"  + sess.data);

            res.redirect('/');
        });



          //DATABASE POSTS

      //curl -X POST localhost:3000/posted
      app.post('/posted', function (req, res, next) {
        var post = new User({
          email: 'jlatouf2',
          password: 'password'
        })
        post.save(function (err, post) {
          if (err) { return next(err) }
          res.json(201, post)
        })
      })


      //curl -X POST localhost:3000/findStuff01

      app.post('/findStuff01', function (req, res, next) {
        // get all the users
        User.find({}, function(err, users) {
          if (err) throw err;

          // object of all the users
          console.log(users);
        });
      });

      //curl -X POST localhost:3000/postname

      app.post('/postname', function (req, res, next) {
        var newUser2 = Usertwo({
          name: 'Johna',
          username: 'Britt',
          password: 'pass',
          date: '12/10/1991',
          admin: false
        });

        newUser2.save(function (err, post) {
          if (err) {
         return next(err) ;
      }
          //res.json(201, post);
      	console.log(post);

        });
      });


      //curl -X POST localhost:3000/findDate

      app.post('/findDate', function (req, res, next) {
      //  Post.find({username: 'DeclanProud'}

        Usertwo.find({date: '12/10/1990'}, function(err, users) {
          if (err) throw err;

          // object of all the users
          console.log(users);

          res.send(users);
      //    res.json(201, post)

        });
      });

      /*
      app.post('/findDate23', function (req, res, next) {
          //  Post.find({username: 'DeclanProud'}
          //  console.log(req.body.date);
            Usertwo.find({date: {$gt : '12/10/1993'}}, function(err, users) {
          //    User2.find({ "LatestMark": {$gt : '12/10/1993'} function(err, users) {

            if (err) throw err;

            // object of all the users
            console.log(users);
          });
      });

      */



      app.get('/getCords', function (req, res, next) {
          Track.find()
           // .sort('-date')
            .exec(function(err, posts) {
              if (err) { return next(err) }
              res.send(posts)
          	console.log(posts );

            })
      })



      app.post('/postCoordinates', function (req, res, next) {
            var track = new Track({
            username: req.body.username,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            distance: req.body.distance,
          //  email: req.body.email,

            })
            track.save(function (err, post) {
              if (err) { return next(err) }
              res.json(201, post)
          console.log('worked')
            })
      })



      //EXAMPLE PAGE POSTS
      app.post('/blue', function(req, res, data) {
          console.log('Works');
          console.log(data);

          myObj = { "name":"John", "age":30, "car":null };
          res.send(myObj);
          //res.send(myObj.name);
      });

      //curl -X POST -H 'Content-Type: application/json' -d '{"email":"davidwalsh","password":"something"}' http://localhost:3000/red
      //This obtains the $scope.firstname:
      app.post('/red', function(req, res, data) {
          console.log(bob1 = req.body.email);
          console.log(bob2 = req.body.password);

          res.send(req.body.email);
          //res.send(myObj.name);
      });


      app.post('/orange', function(req, res, name) {
            //So you can send full JSON Data to backend and it will work, but has to be processed right.
          console.log("This is request object: " + req.body.name);
          myObj = { "name":"John", "age":30, "car":null };
          console.log("This is name: " + myObj.name);

          res.send(myObj);
      });




      //SERVER INFORMATION
      app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, '/client/index.html'));
      });

      http.listen(3000, function () {
        console.log('Example app listening on port 3000!');
      });
