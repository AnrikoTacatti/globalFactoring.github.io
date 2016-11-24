var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglifyjs'),
    del         = require('del'),
    autoprefixer= require('gulp-autoprefixer');// задаём переменную и предаём ей значения ввиде пакета

/*
gulp.task('myTask',function () {
  return gulp.src('source-files')// здесь загружаем фалы
  .pipe(plugin())//сдесь вызываем плагин он принимает загрузку в себя делат с ними что либо
  .pipe(gulp.dest('folder'))// а здесь выгружаем прокурученные через плагин файлы
});
*/
gulp.task('sass',function () {
  return gulp.src('app/sass/**/*.sass')//'app/**/*.sass' global  шаблон где звёздачка означает что неважно в каой папке неважно какое название будт браться все файлы с раширением sass '!app/sass/*.sass' восклицательный означает исключение
  //return gulp.src('!app/sass/main.sass') //исключение все кроме main например
  //return gulp.src(['!app/sass/main.sass'],['app/sass/*.sass']) // если нужно несколько файлов но разные действия то можно перчислить в виде массива
  //return gulp.src('!app/sass/*.+(sass|scss)')// данный вариант выбирает все файлы sass & scss
  .pipe(sass({
		includePaths: require('node-bourbon').includePaths
	}).on('error', sass.logError))
  .pipe(autoprefixer(['last 15 versions','> 1%','ie 8','ie 7'],{cascade:true}))
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.reload({stream:true}))//с помощъю этой функции идёт мониторинг за изменениями
});

gulp.task('scripts', function(){//данный task берёт указнный плагин/библиотеку и минфицирует её и конкотенирует и всё запихивает в файл libs.min.js
  return gulp.src([
    'app/libs/jquery/dist/jquery.min.js',
    'app/libs/owl.carousel/dist/owl.carousel.min.js',
    'app/libs/parallax/parallax.min.js',
    'app/libs/jQuery.equalHeights/jquery.equalheights.min.js',

  ])
  .pipe(concat('libs.min.js'))//конкотенация
  .pipe(uglify())//минификация js файлов
  .pipe(gulp.dest('app/js'));//отправка прокурченного кода в libs.min.js
});

gulp.task('browser-sync',function () {// таск для browser-sync
  browserSync({
    server:{//указываем откуда нужно мониторить
      baseDir:'app'//адрес сервера
    },
    port:8080,//номер порта
    notify:false//убирает сообщения
  });
});

gulp.task('clean',function(){
  return del.sync('dist');
});

gulp.task('watch',['browser-sync','sass','scripts'],function () {// все парметры в [] выполнятся в квадратных скобках до того как выполнится основной
  gulp.watch('app/sass/**/*.sass',['sass']);// данный плагин уже встроен в gulp который автоматически выполняет таски созданные ранее где в первом парметре мы указываем путь до отслеживаемых файлов а вотором парюуказываем название таска});
  gulp.watch('app/*.html',browserSync.reload);// перзагрузка браузера если изменить html
  gulp.watch('app/js/**/*.js',browserSync.reload);//перзагрузка браузера если меняем js
});

gulp.task('build',['clean','sass','scripts'],function(){//компиляция готового проекта дабы не копировать шаблон постоянно
  var buildCss = gulp.src([
    'app/css/main.css',
    'app/css/header.css',
    'app/css/fonts.css'])
    .pipe(gulp.dest('dist/css'));

  var buildSass = gulp.src('app/sass/**/*.sass')
    .pipe(gulp.dest('dist/sass'))

  var buildImg = gulp.src('app/img/**/*')
    .pipe(gulp.dest('dist/img'))

  var buildFonts = gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));

  var buildJs = gulp.src('app/js/**/*')
    .pipe(gulp.dest('dist/js'));

  var buildLibsJs = gulp.src('app/libs/**/*')
    .pipe(gulp.dest('dist/libs'));

  var buildHtml = gulp.src('app/**/*.html')
    .pipe(gulp.dest('dist'));
});
gulp.task('default',['browser-sync','watch']);
