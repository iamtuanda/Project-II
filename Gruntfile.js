module.exports = function (grunt) {
    grunt.initConfig({
        
        Cake: {
        
            path_webroot: 'app/webroot/',
        
            path_js: '<%= Cake.path_webroot %>js/',
            
            path_css: '<%= Cake.path_webroot %>css/'
        },
        pkg: grunt.file.readJSON('package.json'),
        bower: {
          install: {
            options: {
              targetDir: '<%= Cake.path_webroot %>vendor/',
              layout: 'byType',
              install: true,
              verbose: true,
              cleanTargetDir: true,
              cleanBowerDir: false
            }
          }
        },
        bowercopy: {
            options: {
                srcPrefix: 'bower_components',
                destPrefix: './app/webroot/'
            },
            scripts: {
                files: {
                    'js/jquery': 'jquery/**/jquery.min.js',
                    'js/bootstrap': 'bootstrap/**/bootstrap.min.js',
                    'css/bootstrap': 'bootstrap/**/bootstrap.min.css',
                    'js/angular': 'angular/**/angular.min.js',
                    'js/jquery-ui': 'jquery-ui/**/tabs.js',
                    'css/jquery-ui': 'jquery-ui/**/all.css',
                    'js/font-awsome': 'font-awsome/**/all.js',
                    'css/font-awsome': 'font-awsome/**/all.css'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-bowercopy');
    grunt.registerTask('default', ['bowercopy']);
};