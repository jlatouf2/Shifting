var path = require('path');

module.exports = function (grunt) {
  grunt.initConfig({

/*
REMEMBER TO ADD THE:
<script src="//localhost:35729/livereload.js"></script>
TO THE TOP OF YOUR PAGE FOR LIVERELOAD TO WORK!
*/
   nodemon: {
     dev: {
       script: 'app.js',
       options: {
         livereload: true,
         delay: "2500",

               }

      }
    },
    watch: {
      www: {
        files: ['index.*', 'partials/*.*', 'js/*.*', 'app.js'],
        options: {
          livereload: true
        }
      }
    },
    open : {
  dev : {
    path: 'http://localhost:3000/#/',
    app: 'Safari'
  }
},
/*
Google Chrome works correctly!
*/

      concurrent: {
    watchers: {
        tasks: ['nodemon', 'watch', 'open'],
        options: {
            logConcurrentOutput: true
        }
    }
}

  });
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks("grunt-concurrent");
  grunt.loadNpmTasks("grunt-open");

  grunt.registerTask('default', '', function() {
  });
  grunt.registerTask('serve', [ 'concurrent:watchers']);

};
