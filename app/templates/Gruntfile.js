/*jshint node:true*/

// Generated on <%= (new Date).toISOString().split('T')[0] %> using
// <%= pkg.name %> <%= pkg.version %>
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'src/test/javascript/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'src/test/javascript/spec/**/*.js'

module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Configurable paths
  var config = {
    app: 'src/main',
    test: 'src/test',
    dist: 'target/classes'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    config: config,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },<% if (coffee) { %>
    coffee: {
      files: ['<%%= config.app %>/coffee/{,*/}*.{coffee,litcoffee,coffee.md}'],
        tasks: ['coffee:dist']
    },
    coffeeTest: {
      files: ['<%%= config.test %>/coffee/spec/{,*/}*.{coffee,litcoffee,coffee.md}'],
        tasks: ['coffee:test', 'test:watch']
    },<% } else { %>
    js: {
      files: ['<%%= config.app %>/resources/javascript/{,*/}*.js'],
        tasks: ['jshint'],
        options: {
        livereload: '<%%= connect.options.livereload %>'
      }
    },
    jstest: {
      files: ['<%%= config.test %>/spec/{,*/}*.js'],
        tasks: ['test:watch']
    },<% } %>
  gruntfile: {
    files: ['Gruntfile.js']
  },<% if (includeSass) { %>
    sass: {
      files: ['<%%= config.app %>/sass/{,*/}*.{scss,sass}'],
        tasks: ['sass:server', 'autoprefixer']
    },<% } %>
  styles: {
    files: ['<%%= config.app %>/resources/css/{,*/}*.css'],
      tasks: ['newer:copy:styles', 'autoprefixer']
  },
  livereload: {
    options: {
      livereload: '<%%= connect.options.livereload %>'
    },
    files: [
      '<%%= config.app %>/resources/**/*.jsp',
      '.tmp/styles/{,*/}*.css',<% if (coffee) { %>
      '.tmp/scripts/{,*/}*.js',<% } %>
      '<%%= config.app %>/resources/images/{,*/}*'
    ]
  }
},

  // The actual grunt server settings
  connect: {
  options: {
    port: 9000,
      open: true,
      livereload: 35729,
      // Change this to '0.0.0.0' to access the server from outside
      hostname: 'localhost'
  },
  livereload: {
    options: {
      middleware: function(connect) {
        return [
          connect.static('.tmp'),
          connect().use('/bower_components', connect.static('./src/main/bower_components')),
          connect.static(config.app)
        ];
      }
    }
  },
  test: {
    options: {
      open: false,
        port: 9001,
        middleware: function(connect) {
        return [
          connect.static('.tmp'),
          connect.static('test'),
          connect().use('/bower_components', connect.static('./src/main/bower_components')),
          connect.static(config.app)
        ];
      }
    }
  },
  dist: {
    options: {
      base: '<%%= config.dist %>',
        livereload: false
    }
  }
},

// Empties folders to start fresh
clean: {
  dist: {
    files: [{
      dot: true,
      src: [
        '.tmp',
        '<%%= config.dist %>/*',
        '!<%%= config.dist %>/.git*'
      ]
    }]
  },
  server: '.tmp'
},

// Make sure code styles are up to par and there are no obvious mistakes
jshint: {
  options: {
    jshintrc: '.jshintrc',
      reporter: require('jshint-stylish')
  },
  all: [
    'Gruntfile.js',
    '<%%= config.app %>/resources/javascript/{,*/}*.js',
    '!<%%= config.app %>/resources/javascript/vendor/*',
    '<%%= config.test %>/javascript/spec/{,*/}*.js'
  ]
},<% if (testFramework === 'mocha') { %>

  // Mocha testing framework configuration options
  mocha: {
    all: {
      options: {
        run: true,
          urls: ['http://<%%= connect.test.options.hostname %>:<%%= connect.test.options.port %>/index.html']
      }
    }
  },<% } else if (testFramework === 'jasmine') { %>

  // Jasmine testing framework configuration options
  jasmine: {
    all: {
      options: {
        specs: '<%%= config.test %>/javascript/spec/{,*/}*.js'
      }
    }
  },<% } %><% if (coffee) { %>

  // Compiles CoffeeScript to JavaScript
  coffee: {
    dist: {
      files: [{
        expand: true,
        cwd: '<%%= config.app %>/coffee',
        src: '{,*/}*.{coffee,litcoffee,coffee.md}',
        dest: '.tmp/scripts',
        ext: '.js'
      }]
    },
    test: {
      files: [{
        expand: true,
        cwd: '<%%= config.test %>/coffee/spec',
        src: '{,*/}*.{coffee,litcoffee,coffee.md}',
        dest: '.tmp/spec',
        ext: '.js'
      }]
    }
  },<% } %><% if (includeSass) { %>

  // Compiles Sass to CSS and generates necessary files if requested
  sass: {
    options: {<% if (includeLibSass) { %>
      sourceMap: true,
        includePaths: ['bower_components']
      <% } else { %>
      loadPath: 'bower_components'
      <% } %>},
    dist: {
      files: [{
        expand: true,
        cwd: '<%%= config.app %>/sass',
        src: ['*.{scss,sass}'],
        dest: '.tmp/styles',
        ext: '.css'
      }]
    },
    server: {
      files: [{
        expand: true,
        cwd: '<%%= config.app %>/sass',
        src: ['*.{scss,sass}'],
        dest: '.tmp/styles',
        ext: '.css'
      }]
    }
  },<% } %>

// Add vendor prefixed styles
autoprefixer: {
  options: {
    browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']<% if (includeSass) { %>,
      map: {
        prev: '.tmp/styles/'
      }
    <% } %>
  },
  dist: {
    files: [{
      expand: true,
      cwd: '.tmp/styles/',
      src: '{,*/}*.css',
      dest: '.tmp/styles/'
    }]
  }
},

// Automatically inject Bower components into the HTML file
wiredep: {
  app: {
    ignorePath: /^<%= config.app %>\/|\.\.\//,
      src: ['<%%= config.app %>/resources/jnt_template/html/template.<%= slugname %>.jsp']<% if (includeBootstrap) { %>,<% if (includeSass) { %>
      exclude: ['<%%= config.app %>/bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js']<% } else { %>
      exclude: ['<%%= config.app %>/bower_components/bootstrap/dist/js/bootstrap.js']<% } } %>
  }<% if (includeSass) { %>,
    sass: {
      src: ['<%%= config.app %>/sass/{,*/}*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
    }<% } %>
},

// Renames files for browser caching purposes
rev: {
  dist: {
    files: {
      src: [
        '<%%= config.dist %>/javascript/{,*/}*.js',
        '<%%= config.dist %>/css/{,*/}*.css',
        '<%%= config.dist %>/css/fonts/{,*/}*.*',
        '<%%= config.dist %>/images/{,*/}*.*'
      ]
    }
  }
},

// Reads HTML for usemin blocks to enable smart builds that automatically
// concat, minify and revision files. Creates configurations in memory so
// additional tasks can operate on them
useminPrepare: {
  options: {
    dest: '<%%= config.dist %>'
  },
  html: '<%%= config.app %>/jnt_template/html/template.<%= slugname %>.jsp'
},

// Performs rewrites based on rev and the useminPrepare configuration
usemin: {
  options: {
    assetsDirs: [
      '<%%= config.dist %>',
      '<%%= config.dist %>/images',
      '<%%= config.dist %>/css'
    ]
  },
  html: ['<%%= config.dist %>/**/*.jsp'],
    css: ['<%%= config.dist %>/css/{,*/}*.css']
},

// The following *-min tasks produce minified files in the dist folder
imagemin: {
  dist: {
    files: [{
      expand: true,
      cwd: '<%%= config.app %>/resources/images',
      src: '{,*/}*.{gif,jpeg,jpg,png}',
      dest: '<%%= config.dist %>/images'
    }]
  }
},

svgmin: {
  dist: {
    files: [{
      expand: true,
      cwd: '<%%= config.app %>/resources/images',
      src: '{,*/}*.svg',
      dest: '<%%= config.dist %>/images'
    }]
  }
},

htmlmin: {
  dist: {
    options: {
      collapseBooleanAttributes: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
        removeAttributeQuotes: true,
        removeCommentsFromCDATA: true,
        removeEmptyAttributes: true,
        removeOptionalTags: true,
        // true would impact styles with attribute selectors
        removeRedundantAttributes: false,
        useShortDoctype: true
    },
    files: [{
      expand: true,
      cwd: '<%%= config.dist %>',
      src: '**/*.jsp',
      dest: '<%%= config.dist %>'
    }]
  }
},

// By default, your `index.html`'s <!-- Usemin block --> will take care
// of minification. These next options are pre-configured if you do not
// wish to use the Usemin blocks.
// cssmin: {
//   dist: {
//     files: {
//       '<%%= config.dist %>/css/main.css': [
//         '.tmp/styles/{,*/}*.css',
//         '<%%= config.app %>/resources/css/{,*/}*.css'
//       ]
//     }
//   }
// },
// uglify: {
//   dist: {
//     files: {
//       '<%%= config.dist %>/javascript/scripts.js': [
//         '<%%= config.dist %>/javascript/scripts.js'
//       ]
//     }
//   }
// },
// concat: {
//   dist: {}
// },
<% if (includeModernizr) { %>

  // Generates a custom Modernizr build that includes only the tests you
  // reference in your app
  modernizr: {
    dist: {
      devFile: '<%%= config.app %>/bower_components/modernizr/modernizr.js',
        outputFile: '<%%= config.dist %>/javascript/vendor/modernizr.js',
        files: {
        src: [
          '<%%= config.dist %>/javascript/{,*/}*.js',
          '<%%= config.dist %>/css/{,*/}*.css',
          '!<%%= config.dist %>/javascript/vendor/*'
        ]
      },
      uglify: true
      }
    },<% } %>

    // Run some tasks in parallel to speed up build process
    concurrent: {
      server: [<% if (coffee) {  %>
        'coffee:dist'<% } %><% if (coffee && includeSass) {  %>,<% } %><% if (includeSass) { %>
        'sass:server'<% } %>
      ],
      test: [<% if (coffee) { %>
        'coffee',<% } %>
      ],
      dist: [<% if (coffee) { %>
        'coffee',<% } %><% if (includeSass) { %>
        'sass',<% } %>
        'imagemin',
        'svgmin'
      ]
    }
  });


  grunt.registerTask('serve', 'start the server and preview your app, --allow-remote for remote access', function (target) {
    if (grunt.option('allow-remote')) {
      grunt.config.set('connect.options.hostname', '0.0.0.0');
    }
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'wiredep',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run([target ? ('serve:' + target) : 'serve']);
  });

  grunt.registerTask('test', function (target) {
    if (target !== 'watch') {
      grunt.task.run([
        'clean:server',
        'concurrent:test',
        'autoprefixer'
      ]);
    }

    grunt.task.run([
      'connect:test',<% if (testFramework === 'mocha') { %>
      'mocha'<% } else if (testFramework === 'jasmine') { %>
      'jasmine'<% } %>
    ]);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'wiredep',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'cssmin',
    'uglify',<% if (includeModernizr) { %>
    'modernizr',<% } %>
    'rev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
