module.exports = function(grunt) { 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
    
        nodemon: {
              script: 'index.js' 
        }, 
    });

    grunt.loadNpmTasks('grunt-contrib-nodemon');
  
    grunt.registerTask('default',  [
        'nodemon'
      ]);

};