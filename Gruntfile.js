'use strict';
module.exports = function (grunt) {

	// load all tasks
	require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });

  grunt.config.init({
		pkg: grunt.file.readJSON('package.json'),

		dirs: {
			css: 'assets/css',
			js : 'assets/js'
		},

		makepot      : {
			target: {
				options: {
					domainPath     : '/languages/',
					potFilename    : '<%= pkg.name %>.pot',
					potHeaders     : {
						poedit                 : true,
						'x-poedit-keywordslist': true
					},
					processPot     : function (pot, options) {
						pot.headers[ 'report-msgid-bugs-to' ] = 'https://www.machothemes.com/';
						pot.headers[ 'language-team' ] = 'Macho Themes <office@machothemes.com>';
						pot.headers[ 'last-translator' ] = 'Macho Themes <office@machothemes.com>';
						pot.headers[ 'language-team' ] = 'Macho Themes <office@machothemes.com>';
						return pot;
					},
					updateTimestamp: true,
					type           : 'wp-theme'

				}
			}
		},
		addtextdomain: {
			target: {
				options: {
					updateDomains: true,
					textdomain   : '<%= pkg.name %>'
				},
				files  : {
					src: [
						'*.php',
						'!node_modules/**'
					]
				}
			}
		},

		// concat: {
		// 	dist: {
		// 		src : [
		// 			'assets/vendors/machothemes/components/machothemeobject.js',
		// 			'assets/vendors/machothemes/**/*.js',
		// 			'assets/vendors/machothemes/machothemes.js',
		// 			'!assets/vendors/machothemes/machothemes.min.js',
		// 			'!assets/vendors/machothemes/machothemes-concat.js'
		// 		],
		// 		dest: 'assets/vendors/machothemes/machothemes-concat.js'
		// 	},
		// 	prod: {
		// 		src : [
		// 			'assets/vendors/**/*.min.js'
		// 		],
		// 		dest: 'assets/js/plugins.min.js'
		// 	},
		// 	css : {
		// 		src : [
		// 			'assets/vendors/bootstrap/bootstrap.min.css',
		// 			'assets/vendors/**/*.min.css',
		// 			'assets/css/style.min.css',
		// 			'!assets/vendors/newsmag-icon/style.min.css'
		// 		],
		// 		dest: 'assets/css/plugins.min.css'
		// 	}
		// },

		clean: {
			init  : {
				src: [ 'build/' ]
			},
			build : {
				src: [
					'build/*',
					'!build/<%= pkg.name %>.zip'
				]
			},
			cssmin: {
				target: {
					files: [ {
						expand: true,
						cwd   : 'assets/css',
						src: [ '*.css', '!*.min.css', '!custom-editor-style.css' ],
						dest  : 'assets/css',
						ext   : '.min.css'
					} ]
				}
			},
			jsmin : {
				src: [
					'assets/js/*.min.js',
					'assets/js/*.min.js.map',
					'assets/js/**/*.min.js',
					'assets/js/**/*.min.js.map'
				]
			}
		},

		copy: {
			readme: {
				src : 'readme.md',
				dest: 'build/readme.txt'
			},
			build : {
				expand: true,
				src   : [ '**', '!node_modules/**', '!build/**', '!readme.md', '!gruntfile.js', '!package.json', '!nbproject/**' ],
				dest  : 'build/'
			}
		},

		compress: {
			build: {
				options: {
					pretty : true,
					archive: 'build/<%= pkg.name %>.zip'
				},
				expand : true,
				cwd    : 'build/',
				src    : [ '**/*' ],
				dest   : '<%= pkg.name %>/'
			}
		},

		uglify: {
			jsfiles: {
				files: [ {
					expand: true,
					cwd   : '<%= dirs.js %>/',
					src   : [
						'*.js',
						'!*.min.js',
						'!Gruntfile.js',
					],
					dest  : '<%= dirs.js %>/',
					ext   : '.min.js'
				} ]
			},
		},

		checktextdomain: {
			standard: {
				options: {
					text_domain       : [ 'printfox' ], //Specify allowed domain(s)
					create_report_file: "true",
					keywords          : [ //List keyword specifications
						'__:1,2d',
						'_e:1,2d',
						'_x:1,2c,3d',
						'esc_html__:1,2d',
						'esc_html_e:1,2d',
						'esc_html_x:1,2c,3d',
						'esc_attr__:1,2d',
						'esc_attr_e:1,2d',
						'esc_attr_x:1,2c,3d',
						'_ex:1,2c,3d',
						'_n:1,2,4d',
						'_nx:1,2,4c,5d',
						'_n_noop:1,2,3d',
						'_nx_noop:1,2,3c,4d'
					]
				},
				files  : [ {
					src   : [
						'**/*.php',
						'!**/node_modules/**',
						'!**/framework/**'
					], //all php
					expand: true
				} ]
			}
		},

		cssmin: {
			target: {
				files: [ {
					expand: true,
					cwd   : 'assets/css',
					src   : [ '*.css', '!*.min.css', '!custom-editor-style.css' ],
					dest  : 'assets/css',
					ext   : '.min.css'
				} ]
			}
		},
		
		sass: {
		  dist: {
			options: {
			  style: 'expanded',
			},
			files: [
			  {
				expand: true,
				cwd: 'assets/sass/',
				src: [ 'main.scss' ],
				dest: 'assets/css/',
				ext: '.css'
			  } ]
		  }
		},

	});
	
	grunt.config( 'watch', {
	scss: {
	  tasks: [ 'sass:dist' ],
	  files: [
		'assets/sass/*.scss',
	  ]
	}
	} );

	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.registerTask('default', []);

	// Compile SASS
	grunt.registerTask( 'startSass', [
	'sass:dist',
	] );
	
	// Build .pot file
	grunt.registerTask('buildpot', [
		'makepot'
	]);

	// Check Missing Text Domain Strings
	grunt.registerTask('textdomain', [
		'checktextdomain'
	]);

	// Minify CSS
	grunt.registerTask('mincss', [
		'clean:cssmin',
		'cssmin'
	]);

	// Minify JS
	grunt.registerTask('minjs', [
		'clean:jsmin',
		'uglify'
	]);

	// Task to minify all static resources
	grunt.registerTask('allmin', [
		'mincss',
		'minjs'
	]);

	// Build task
	grunt.registerTask('build-archive', [
		'allmin',
		'clean:init',
		'copy',
		'compress:build',
		'clean:build'
	]);

};