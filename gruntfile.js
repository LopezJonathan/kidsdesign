//The "wrapper" function

module.exports = function(grunt) {
	//Project and task configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		/**
		* Grunt Sass
		* Compile Sass to CSS using node-sass
		* https://www.npmjs.com/package/grunt-sass
		*/
		sass: {

			options: {
				sourceMap: false
			},
			dist: {
				files: {
					'css/styles.css' : 'assets/scss/styles.scss'
				}
			}
		},
		
		/**
		* Grunt Contrib cssmin
		* Combine and minimize CSS files
		* https://www.npmjs.com/package/grunt-contrib-cssmin
		*/
		cssmin: {
			options: {
				mergeIntoShorthands: false,
				roundingPrecision: -1
			},
			target: {
				files: [
					{
					expand: true,
					cwd: 'assets/css/',
					src: ['*.css', '!*.min.css'],
					dest: 'css/',
					ext: '.min.css'
					}/*,
					
					{
					'css/combinedstyles.css': ['assets/css/styles.css', 'assets/css/svgfonts.css']
					}*/
				]
			}
		},
		
		/**
		* Grunt Contrib jshint
		* Validate JavaScript
		* https://www.npmjs.com/package/grunt-contrib-jshint
		*/
		jshint:{
			all: ['assets/js/*.js', './js/*.js']
		},
		
		/**
		* Grunt Contrib Uglify
		* Ugflify JavaScript
		* https://www.npmjs.com/package/grunt-contrib-uglify
		*/
		uglify:{
			options: {
				mangle: false
				},
				my_target:{
					files:{
						'js/scripts.min.js': ['assets/js/scripts.js']
				}
			}
		},
		
		/**
		* Grunt Contrib Imagemin
		* Minimize image size
		* https://www.npmjs.com/package/grunt-contrib-imagemin
		*/
		imagemin: { // Task 
			dynamic: { // Another target 
				files: [{
					expand: true, // Enable dynamic expansion 
					cwd: 'assets/img/', // Src matches are relative to this path 
					src: ['**/*.{png,jpg,gif}'], // Actual patterns to match 
					dest: 'img/' // Destination path prefix 
				}]
			}
		},

		/**
		* Grunt Contrib Watch
		* Monitor files and excute tasks
		* https://www.npmjs.com/package/grunt-contrib-watch
		*/
		watch: {

			sass: {

				files: [
					'assets/scss/*.scss'
				],
				tasks: [
					'sass'
				]
			},
			
			cssmin: {

				files: [
					'css/*.css'
				],
				tasks: [
					'cssmin'
				]
			},
			
			jshint: {

				files: [
					'assets/js/*.js',
					'./js/*.js'
				],
				tasks: [
					'jshint'
				]
			},
			
			uglify:{
			
				files: [
					'assets/js/*.js'
				],
				tasks: [
					'uglify'
				]
			}
		},

	});

	//Loading Grunt plugins and tasks
	require('load-grunt-tasks')(grunt);

	//Custom tasks
	grunt.registerTask('default', ['watch']);

};
