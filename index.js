$(document).ready(function() {

var go = true;
var $curentImg = $('.curent-img');
var $curentPoint = $('.curent-point');

    function rotator(elem, point, time) {
        if(!go) {
            return;
        }
        var $nextImg = elem.next('.img-holder').length ? elem.next('.img-holder') : $('.img-holder:first');
        var $nextPoint = point.next().length ? point.next() : $('.point:first');
            elem.fadeOut(time);
            $nextPoint.addClass('curent-point').siblings().removeClass('curent-point');
            $nextImg.stop().fadeIn(time, function() {
                var $this = $(this);
                $this.addClass('curent-img').siblings().removeClass('curent-img');
                setTimeout(function() {
                    rotator($this, $nextPoint, time);
                }, time);
            });

    }

   var timer = setTimeout(function() {
        rotator($curentImg, $curentPoint, 1500);
    }, 3000);


    $('.point').click(function() {
        $('.img-holder:animated').stop(true);
        clearTimeout(timer);
            go = false;
            $curentPoint = $(this);
        var $index = $curentPoint.index();
            $curentImg = $('.img-holder').eq($index);
            $curentPoint.addClass('curent-point').siblings().removeClass('curent-point');
            $curentImg.fadeIn(500);
            $curentImg.siblings('.img-holder').removeClass('curent-img').fadeOut(500);
            timer = setTimeout(function() {
                go = true;
                rotator($curentImg, $curentPoint, 1500);
            }, 5000);
    });

    /*$('.slideshow-container').hover(function() {
        go = false;
        clearInterval(timer);
    }, function() {
        go = true;
        timer = setTimeout(function() {
            rotator($curentImg, $curentPoint, 1500);
        }, 1000);
    });*/


    $('.phone-menu-btn').click(function() {
        $('.fixed-nav').slideToggle(300);
        $(this).toggleClass('text-dark');
        $(this).toggleClass('text-white');
    });

    function fixed_nav() {
        if($(window).width() > 768) {
            $('.fixed-nav').slideDown(0).removeClass('mobile-menu');
            $('.phone-menu-btn').removeClass('text-dark').addClass('text-white');
        }
        else {
            $('.fixed-nav').slideUp(0).addClass('mobile-menu');
            $('.phone-menu-btn').addClass('text-dark').removeClass('text-white');
        }
    }

    fixed_nav();

    
    function nav_position() {
        var left = $('.triangle-left').offset().left;
        var nav_width = $('.fixed-nav').width();
        var left1 = left - nav_width;
        if($('#site-nav').hasClass('mobile-menu')) {
            $('.fixed-nav').css('left', '0px');
        }
        else {
            $('.fixed-nav').css('left', left1 + 'px');
        }
        
    }
    nav_position();

    $(window).resize(function() {
        fixed_nav();
        nav_position();
    });


        function active_item() {
            var first_nav_part = $('.nav-part:first').offset().top;
            var $scrollTop = $(window).scrollTop();
            $('.nav-part').each(function() {
                var $this = $(this);
                var $offset_top = $this.offset().top;
                if($offset_top <= $scrollTop) {
                    let $class_part = $this.attr('id').split('-').pop();
                    $('.navigation').find('.nav-item-' + $class_part).addClass('active-nav-item').siblings().removeClass('active-nav-item');
                }
                else if(first_nav_part > $scrollTop) {
                    $('.navigation .active-nav-item').removeClass('active-nav-item');
                }
            });
        }


        active_item();


        function check(elem, scrl) {
            var firstEl = elem.offset().top;
            var absEl = elem.find('.abs-position');
            if(firstEl < scrl) {
                absEl.addClass('change-position');
                absEl.css({top: '-' + (scrl - firstEl)/3 + 'px'});
            }
            else {
                absEl.removeClass('change-position');
                absEl.css({top: '0px'});
            }
                   
        }

        var holders = [];
        var i = 0;
        $('.holder-place').each(function() {
            holders[i]= $(this);
            i++;
        });

        function slow_elem_scroll() {
            $scrollTop = $(window).scrollTop();
            $(holders).each(function() {
                var $this = $(this);
                check($this, $scrollTop);
            });
        }

    $(window).scroll(function() {
     
        slow_elem_scroll();

        active_item();
    });

    $('.navigation li').click(function() {
        var id_part = $(this).attr('class').split('-').pop();
        var $offset = $('#nav-part-' + id_part).offset().top + 5;
        if($('.fixed-nav').hasClass('mobile-menu')) {
            $('.fixed-nav').slideUp(300);
            $('.phone-menu-btn').removeClass('text-white').addClass('text-dark');
        }
        $("html, body").animate({
            scrollTop: $offset
          }, 1000);
    });



    $('.tumb-container').bind('click', function() {
        var $this = $(this);
        $this.find('.shadow-div').addClass('non-shadow').end().siblings('.tumb-container').find('.shadow-div').removeClass('non-shadow');
        $this.parents('.col-md-6').siblings('.big-images').find('img:visible').fadeOut(500, function() {
            $this.parents('.col-md-6').siblings('.big-images').find('img').eq($this.index()).fadeIn(500);
        });
        $this.parents('.col-md-6').find('.pharagraphs p').eq($this.index()).fadeIn(0).siblings().fadeOut(0);
        $this.parents('.col-md-6').find('.headings h3:visible').stop().fadeOut(300, function() {
            $this.parents('.col-md-6').find('.headings h3').eq($this.index()).fadeIn(300);
        });
        $this.parents('.col-md-6').siblings('.bottom-content').find('.single-img:visible').fadeOut(300, function() {
            $this.parents('.col-md-6').siblings('.bottom-content').find('.single-img').eq($this.index()).fadeIn(300);
        });
        $this.parents('.col-md-6').siblings('.bottom-content').find('.single-text:visible').fadeOut();
        $this.parents('.col-md-6').siblings('.bottom-content').find('.single-text').eq($this.index()).fadeIn();

    });

    function change_slide_parts(el) {
        var $class = el.attr('id').split('-').pop();
        if(el.parents('.slider-wrapper').siblings('.slide').length) {
            el.parents('.slider-wrapper').siblings('.slide').find('.slide-text').find('.single-slide-text:visible').fadeOut(300, function() {
                el.parents('.slider-wrapper').siblings('.slide').find('.slide-text').find('.' + $class).fadeIn(300);
            });

            el.parents('.slider-wrapper').siblings('.slide').find('.slide-images').find('img:visible').fadeOut(300, function() {
                el.parents('.slider-wrapper').siblings('.slide').find('.slide-images').find('.' + $class).fadeIn(300);
            });
        }
    }
    
    function left_right(plus_minus, clicked) {
        if(clicked.parents('.left-right').length) {
            var move = clicked.parents('.left-right').siblings('.slider-wrapper').find('.single-slide').outerWidth(true);
            var spec_container = clicked.parents('.left-right').siblings('.slider-wrapper').find('.slider-container');
        }
        else {
            var move = clicked.outerWidth(true);
            var spec_container = clicked.parents('.slider-container');
        }

        if(plus_minus === '-') {
            let elem = spec_container.find('.active').next();
            spec_container.stop().animate({left: plus_minus + move + 'px'}, 500, function() {
            spec_container.find('.active').next().addClass('active').end().removeClass('active');
            spec_container.find('.single-slide:first').appendTo($(this));
            $(this).css('left', '0px');
            });
          
            change_slide_parts(elem);
        } 
        else {
            spec_container.find('.single-slide:last').prependTo(spec_container);
            let elem = spec_container.find('.active').prev();
            spec_container.css('left', '-' + move + 'px');
            spec_container.stop().animate({left: plus_minus + 0 + 'px'}, 500, function() {
            spec_container.find('.active').prev().addClass('active').end().removeClass('active');  
            });

            change_slide_parts(elem);
        }
    }
    $('.arrow-left, .arrow-right').click(function(event){
        var $this = $(this);
        if($(event.target).hasClass('fa-chevron-right')) {
            let minus = '-';
            left_right(minus, $this);
        }
        else {
            let plus = '+';
            left_right(plus, $this);
        }
    })


    $('.single-slide').click(function() {
        var elem = $(this);
        $(this).addClass('active').siblings().removeClass('active');
        change_slide_parts(elem);
    });

    $('.slider-container').swipeleft(function() {
        var $this = $(this).find('.active');
        var minus = '-';
        left_right(minus, $this);
    });

    $('.slider-container').swiperight(function() {
        var $this = $(this).find('.active');
        var plus = '+';
        left_right(plus, $this);
    });

});