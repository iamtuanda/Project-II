$(document).foundation();
$(document).ready(function() {
    $WIN = $(window);
    var doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);
    var clPreloader = function() {

        $("html").addClass('cl-preload');

        $WIN.on('load', function() {
            $("#loader").fadeOut("slow", function() {
                $("#preloader").delay(300).fadeOut("slow");
            }); 

            $("html").removeClass('cl-preload');
            $("html").addClass('cl-loaded');

        });
    };
    (function ssInit() {
        clPreloader();
    })();
});
