module.exports = function(grunt){

    grunt.initConfig({
        watch:{
            ejs:{
                file:['views/**'],
                options:{
                    livereload:true
                }
            },
        js:{
            files:['public/javascripts/**'],
            //task: ['jshint'],
            options:{
                livereload:true,
            }
        }
        },
        nodemon:{
            dev:{
                options:{
                    file:'app.js',
                    args:[],
                    ignoreFiles:['node_modules/**','.DS_Store'],
                    watchedExtensions:['js'],
                    watchedFloders:['app','config'],
                    debug:true,
                    delayTime:1,
                    env:{
                        PORT:3000
                    },
                    cwd:__dirname
                }
            }
        },
        concurrent:{
            tasks:['nodemon','watch'],
            options:{
                logConcurrentOutput:true
            }
        }
    })
    grunt.loadNpmTasks('grunt-contrib-watch');
    //watch app.js
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.option('force',true);
    grunt.registerTask('default',['concurrent']);
}