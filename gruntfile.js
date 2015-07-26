/// <binding ProjectOpened='watch' />

module.exports = function (grunt) {
    grunt.initConfig({
        clean: ["wwwroot/*", "temp/"],
        concat: {
            all: {
                src: ['app/**/*.module.js', 'app/**/*.services.js', 'app/**/*.controller.js', 'app/**/*.js'],
                dest: 'temp/evolution-web.js'
            }
        },
        jshint: {
            files: ['temp/*.js'],
            options: {
                '-W069': false,
                'force': true
            }
        },
        watch: {
            files: ["app/**/*.js",'app/**/*.html','css/**/*.css','fonts/*.ttf','images/*'],
            tasks: ["all"]
        },
        bowercopy: {
            options: {
                runBower: true,
                destPrefix: 'wwwroot/libs'
            },
            libs: {
                files: {
                    'angular': 'angular',
                    'angular-new-router': 'angular-new-router/dist',
                    'angular-resource': 'angular-resource',
                    'angular-strap': 'angular-strap/dist',
                    'angular-rx': 'angular-rx/dist',
                    'jquery': 'jquery/dist',
                    'underscore': 'underscore',
                    'bootstrap': 'bootstrap/dist/css',
                    'bootstrap-additions': 'bootstrap-additions/dist'
                }
            }
        },
        copy: {
            js: {
                expand: true,
                flatten: true,
                filter: 'isFile',
                src: ['temp/*.js'],
                dest: 'wwwroot/'
            },
            html: {
                expand: true,
                flatten: true,
                filter: 'isFile',
                src: ['app/*.html'],
                dest: 'wwwroot/'
            },
            components: {
                expand: true,
                flatten: false,
                filter: 'isFile',
                cwd:'app/',
                src: ['components/**/*.html'],
                dest: 'wwwroot/'
            },

            content: {
                expand: true,
                flatten: false,
                filter: 'isFile',
                src: ['css/*', 'fonts/*', 'images/*','data/**'],
                dest: 'wwwroot/'
            }
        },
        karma: {
            unit: {
                configFile: 'test/karma.conf.js',
                background: false,
                singleRun: true
            },
            unit_watch: {
                configFile: 'test/karma.conf.js',
                background: false,
                singleRun: false
        }
    }

});

    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bowercopy');
    grunt.loadNpmTasks('grunt-karma');
 
    grunt.registerTask("all", ['clean', 'jshint', 'karma:unit','bowercopy', 'concat', 'copy:js', 'copy:html', 'copy:components', 'copy:content']);
    grunt.registerTask('test', [
      'jshint',
      'karma:unit'
    ]);
}