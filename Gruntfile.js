module.exports = function(grunt) {
    
    grunt.initConfig({

        eslint: {
            target: ["src/js/tickerBar.es6.js"]
        },
        
        babel: {
            options: {
                sourceMap: true,
                presets: ['es2015']
            },
            dist: {
                files: {
                    'dist/js/tickerBar.js' : 'src/js/tickerBar.es6.js'
                }
            }
        },
        
        uglify: {
            dist: {
                files: {
                    'dist/js/tickerBar.min.js' : 'dist/js/tickerBar.js'
                }
            }
        },
        
        postcss: {
            options: {
                processors: [
                    require('autoprefixer')
                ]
            },
            dist: {
                files: {
                    'dist/css/tickerBar.css' : 'src/css/tickerBar.css'
                }
            }
        }
        
    });

    grunt.loadNpmTasks("grunt-eslint");
    grunt.loadNpmTasks("grunt-babel");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-postcss");
    
    grunt.registerTask("lint", ["eslint"]);
    grunt.registerTask("build", ["eslint", "babel", "uglify", "postcss"]);
    
};