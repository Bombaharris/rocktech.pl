'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        express: {
            dev: {
                options: {
                    bases: ['src/'],
                    port: 8000,
                    hostname: "127.0.0.1",
                    livereload: false
                }
            },
            dist: {
                options: {
                    bases: ['dist/'],
                    port: 8001,
                    hostname: "127.0.0.1",
                    livereload: false
                }
            }
        },
        open: {
            dev: {
                path: 'http://127.0.0.1:8000/'
            },
            dist: {
                path: 'http://127.0.0.1:8001/'
            }
        },
        less: {
            app: {
                files: {"src/css/app.css": "src/less/app.less"}
            }
        },
        watch: {
            less: {
                files: ['src/less/*.less'],
                tasks: ['compile-theme']
            }
        },
        copy: {
            dist: {
                files: [
                    {src: 'src/index.html', dest: 'dist/index.html'},
                    {expand: true, cwd: 'src/app/partials/', src: ['**'], dest: 'dist/app/partials/'},
                    {expand: true, cwd: 'src/img/', src: ['**'], dest: 'dist/img/'},
                    {src: 'src/favicon.ico', dest: 'dist/favicon.ico'},
                    {expand: true, cwd: 'src/bower_components/font-awesome/fonts/', src: ['*'], dest: 'dist/fonts/'},
                    {expand: true, cwd: 'src/fonts/', src: ['*'], dest: 'dist/fonts/'}
                ]
            }
        },
        'useminPrepare': {
            options: {
                dest: 'dist'
            },
            html: 'src/index.html'
        },
        usemin: {
            html: ['dist/index.html']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-open');


    grunt.registerTask('dist-server', ['express:dist', 'open:dist', 'watch']);
    grunt.registerTask('dev-server', ['express:dev', 'open:dev', 'watch']);

    grunt.registerTask('compile-theme', ['less:app']);
    grunt.registerTask('dist', ['useminPrepare', 'copy', 'concat', 'cssmin', 'uglify', 'usemin']);

};
