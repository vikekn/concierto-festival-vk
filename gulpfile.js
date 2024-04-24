const{src,dest, watch,parallel} = require("gulp")
//src identifica un archivo
//dest para guarlo
//CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
//Imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');
// Javascript
const terser = require('gulp-terser-js');

function css(done){

    //src('src/scss/app.scss')    //Identificar el archivo de SASS 
    src('src/scss/**/*.scss') // * para que detecte los cambios en todos los scss
        .pipe(sourcemaps.init())
        .pipe(plumber()) //para que no nos cierre el watch a la hora de poner una variable que no existe
        .pipe(sass())    //Compilarlo
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css'))     //almacenarlo en el disco duro
        //accion que se realiza despues de otra
    done(); //Callback que avisa a gulp cuando llegamos al final en la ejecucion de la funcion
}

function imagenes(done) {
    const opciones = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{png,jpg}')
        .pipe( cache( imagemin(opciones) ) )
        .pipe( dest('build/img') )
    done();
}

function versionWebp( done ) {
    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe( webp(opciones) )
        .pipe( dest('build/img') )
    done();
}

function versionAvif( done ) {
    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe( avif(opciones) )
        .pipe( dest('build/img') )
    done();
}

function javascript( done ) {
    src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe( terser() )
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/js'));

    done();
}


function dev(done){
watch('src/scss/**/*.scss', css)
watch('src/js/**/*.js', javascript)
}

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes,versionAvif,versionWebp,javascript,dev);

//npm run dev
//npx gulp dev
// la diferencia principal entre npm run dev y npx gulp dev es que el primero se enfoca en la ejecución de 
//scripts definidos en tu archivo package.json utilizando npm, mientras que el segundo se enfoca en la ejecución
// de una tarea específica definida en tu archivo de configuración de Gulp. 
//Ambos pueden ser utilizados en proyectos de desarrollo web, pero sus propósitos y 
//la configuración subyacente pueden ser diferentes.