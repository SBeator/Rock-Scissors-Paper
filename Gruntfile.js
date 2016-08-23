// Gruntfile
module.exports = function (grunt) {
  grunt.initConfig({
    paths: {
      js: ['client/script/**/*.js', 'client/script/**/*.jsx', 'redux/**/*.*'],
      scss: ['client/style/**/*.scss'],
      main_scss: ['client/style/style.scss'],
      js_target: 'public/bundle.js',
      css_target: 'public/style.css'
    },

    eslint: {
      target: '<%= paths.js %>'
    },

    browserify: {
      options: {
        watch: true,
        debug: true,
        transform: [['babelify', { presets: ['es2015', 'react', 'stage-0'] }]]
      },
      script: {
        src: '<%= paths.js %>',
        dest: '<%= paths.js_target %>'
      }
    },

    sass: {                              // Task
      dist: {                            // Target
        options: {                       // Target options
          style: 'expanded',
          sourcemap: 'none'
        },
        files: {                                // Dictionary of files
          '<%= paths.css_target %>': '<%= paths.main_scss %>'     // 'destination': 'source'
        }
      }
    },

    webfont: {
      icons: {
        src: 'webfont/svg/*.svg',
        dest: 'public/fonts',
        destCss: 'client/style/global',
        options: {
          stylesheet: 'scss'
        }
      }
    },

    watch: {
      script: {
        files: '<%= paths.js %>',
        tasks: ['eslint']
      },
      style: {
        files: '<%= paths.scss %>',
        tasks: ['sass']
      }

    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-webfont');

  grunt.registerTask('default', ['eslint', 'browserify', 'sass', 'watch']);
};
