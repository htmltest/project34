var sliderSpeed     = 500;  // скорость смены слайда в презентации
var sliderPeriod    = 500; // время автоматической смены слайда в презентации
var sliderTimer     = null;

var speedSliderMain     = 1500;  // скорость прокрутки слайдера на главной странице
var periodSliderMain    = 5000; // период автоматической прокрутки слайдера (0 - автопрокрутки нет)

var timerSliderMain     = null;


(function($) {

    $(document).ready(function() {

        // слайдер на главной
        $('.slider').each(function() {
            var curSlider = $(this);
            curSlider.data('curIndex', 0);
            curSlider.data('disableAnimation', true);

            if (curSlider.find('li').length > 1 && periodSliderMain > 0) {
                timerSliderMain = window.setTimeout(nextSliderMain, periodSliderMain);
            }

        });

        function nextSliderMain() {
            window.clearTimeout(timerSliderMain);
            timerSliderMain = null;

            var curSlider = $('.slider');
            if (curSlider.data('disableAnimation')) {
                var curIndex = curSlider.data('curIndex');
                var newIndex = curIndex + 1;
                if (newIndex >= curSlider.find('li').length) {
                    newIndex = 0;
                }

                curSlider.data('disableAnimation', false);
                curSlider.find('li').eq(curIndex).css({'z-index': 2});
                curSlider.find('li').eq(newIndex).css({'z-index': 1}).show();
                curSlider.find('li').eq(curIndex).fadeOut(speedSliderMain, function() {
                    curSlider.data('curIndex', newIndex);
                    curSlider.data('disableAnimation', true);
                    if (periodSliderMain > 0) {
                        timerSliderMain = window.setTimeout(nextSliderMain, periodSliderMain);
                    }
                });
            }
        }

        $('.main-top-search').click(function() {
            $('.main-top-search form').width('auto');
            $('.main-top-search form input').focus();
            $('.main-top-search form input').val($('.main-top-search form input').val());
        });

        $(document).click(function(e) {
            if ($(e.target).parents().filter('.main-top-search').length == 0 && !$(e.target).hasClass('main-top-search')) {
                $('.main-top-search form').width('0');
                $('.main-top-search form input').blur();
            }
        });

        $('.side-ctrl-search').click(function() {
            $('.side-ctrl-search form').width('auto');
            $('.side-ctrl-search form input').focus();
            $('.side-ctrl-search form input').val($('.side-ctrl-search form input').val());
        });

        $(document).click(function(e) {
            if ($(e.target).parents().filter('.side-ctrl-search').length == 0 && !$(e.target).hasClass('side-ctrl-search')) {
                $('.side-ctrl-search form').width('0');
                $('.side-ctrl-search form input').blur();
            }
        });

        // прокрутка логотипов
        $('.partners').each(function() {
            var curSlider = $(this);
            var curWidth = 0;
            curSlider.find('ul').width(curSlider.find('li:first').width() * curSlider.find('li').length);
            curSlider.data('curLeft', 0);
            curSlider.data('enableMove', false)
        });

        $('.partners').mouseover(function(e) {
            var curSlider = $(this);
            var curLeftWrapper = $('.partners').offset().left;
            var curWidthWrapper = $('.partners').width();
            var curWidthPartners = curSlider.find('ul').width();
            if (!curSlider.data('enableMove')) {
                if (curWidthPartners > curWidthWrapper) {
                    if ((curLeftWrapper < e.pageX) && (e.pageX < curLeftWrapper + (curWidthWrapper / 3))) {
                        $('.partners').data('enableMove', true);
                        partnersPrev();
                    } else if ((curLeftWrapper + (curWidthWrapper / 3) * 2 < e.pageX) && (e.pageX < curLeftWrapper + curWidthWrapper)) {
                        $('.partners').data('enableMove', true);
                        partnersNext();
                    }
                }
            }
        });

        $('.partners').mouseout(function() {
            $('.partners').data('enableMove', false);
        });

        function partnersPrev() {
            var curSlider = $('.partners');
            if (curSlider.data('enableMove')) {
                var curWidthWindow = curSlider.width();
                var curWidthPartners = curSlider.find('ul').width();
                if (curWidthPartners > curWidthWindow) {
                    var curLeft = curSlider.data('curLeft');
                    curLeft -= 1;
                    if (curLeft <= 0) {
                        curLeft = 0;
                    }
                    curSlider.data('curLeft', curLeft);
                    curSlider.find('ul').css({'left': -curLeft});
                    window.setTimeout(partnersPrev, 20);
                }
            }
        }

        function partnersNext() {
            var curSlider = $('.partners');
            if (curSlider.data('enableMove')) {
                var curWidthWindow = curSlider.width();
                var curWidthPartners = curSlider.find('ul').width();
                if (curWidthPartners > curWidthWindow) {
                    var curLeft = curSlider.data('curLeft');
                    curLeft += 1;
                    if (curWidthWindow >= (curWidthPartners - curLeft)) {
                        curLeft = curWidthPartners - curWidthWindow;
                    }
                    curSlider.data('curLeft', curLeft);
                    curSlider.find('ul').css({'left': -curLeft});
                    window.setTimeout(partnersNext, 20);
                }
            }
        }

        $('.form-file input').change(function() {
            $(this).parent().find('span').html($(this).val());
        });

        $('.partners-list').each(function() {
            $('.partners-item:nth-child(4n)').addClass('partners-item-4n');
            if ($('.partners-item').length % 4 == 0) {
                $('.partners-item').eq($('.partners-item').length - 1).addClass('partners-item-last');
                $('.partners-item').eq($('.partners-item').length - 2).addClass('partners-item-last');
                $('.partners-item').eq($('.partners-item').length - 3).addClass('partners-item-last');
                $('.partners-item').eq($('.partners-item').length - 4).addClass('partners-item-last');
            }
            if ($('.partners-item').length % 4 == 3) {
                $('.partners-item').eq($('.partners-item').length - 1).addClass('partners-item-last');
                $('.partners-item').eq($('.partners-item').length - 2).addClass('partners-item-last');
                $('.partners-item').eq($('.partners-item').length - 3).addClass('partners-item-last');
            }
            if ($('.partners-item').length % 4 == 2) {
                $('.partners-item').eq($('.partners-item').length - 1).addClass('partners-item-last');
                $('.partners-item').eq($('.partners-item').length - 2).addClass('partners-item-last');
            }
            if ($('.partners-item').length % 4 == 1) {
                $('.partners-item').eq($('.partners-item').length - 1).addClass('partners-item-last');
            }
        });

        $('.text table').each(function() {
            $(this).find('tr:even').addClass('even');
        });

        $('.form-input input, .form-input textarea').each(function() {
            if ($(this).val() == '') {
                $(this).parent().find('span').css({'display': 'block'});
            }
        });

        $('.form-input input, .form-input textarea').focus(function() {
            $(this).parent().find('span').css({'display': 'none'});
        });

        $('.form-input input, .form-input textarea').blur(function() {
            if ($(this).val() == '') {
                $(this).parent().find('span').css({'display': 'block'});
            }
        });

        $('input[name="phone"]').mask('+7-999-999-99-99');

        $('.form-multicheck-item input:checked').parent().addClass('checked');
        updateMulticheck();

        $('.form-multicheck-item div').click(function() {
            $(this).find('span').toggleClass('checked');
            $(this).find('input').prop('checked', $(this).find('span').hasClass('checked')).trigger('change');
            updateMulticheck();
        });

        function updateMulticheck() {
            $('.form-multicheck').each(function() {
                var curEl = $(this);
                var curValue = '';
                curEl.find('.form-multicheck-item span.checked').each(function() {
                    if (curValue == '') {
                        curValue += $(this).parent().find('em').html();
                    } else {
                        curValue += ', ' + $(this).parent().find('em').html();
                    }
                });
                curEl.find('.form-multicheck-value div').html(curValue);
                if (curValue == '') {
                    curEl.find('.form-multicheck-placeholder').show();
                } else {
                    curEl.find('.form-multicheck-placeholder').hide();
                }
            });
        }

        $('.form-multicheck-value').click(function() {
            var curEl = $(this).parent();
            if (curEl.hasClass('open')) {
                curEl.removeClass('open');
            } else {
                $('.form-multicheck').removeClass('open');
                curEl.addClass('open');
            }
        });

        $(document).click(function(e) {
            if ($(e.target).parents().filter('.form-multicheck').length == 0) {
                $('.form-multicheck').removeClass('open');
            }
        });

        $('.form-select select').each(function() {
            if ($(this).parents().filter('.form-group-template').length == 0) {
                $(this).chosen({disable_search: true});
            }
        });

        $('.form-radio span input:checked').parent().addClass('checked');
        $('.form-radio div').click(function() {
            var curName = $(this).find('input').attr('name');
            $('.form-radio input[name="' + curName + '"]').parent().removeClass('checked');
            $(this).find('span').addClass('checked');
            $(this).find('input').prop('checked', true).trigger('change');
        });

        $('.form-checkbox input:checked').parent().addClass('checked');

        $('.form-checkbox div').click(function() {
            $(this).find('span').toggleClass('checked');
            $(this).find('input').prop('checked', $(this).find('span').hasClass('checked')).trigger('change');
        });

        $('.form-group-add a').click(function(e) {
            var curGroup = $(this).parents().filter('.form-group');
            curGroup.find('.form-group-list').append('<div class="form-group-new">' + curGroup.find('.form-group-template').html() + '</div>');

            var curIndexRadio = curGroup.find('.form-radios').length - 1;
            curGroup.find('.form-group-new:last .form-radio input').attr('name', 'langLevel[' + curIndexRadio + ']');

            curGroup.find('.form-group-new:last .form-select select').chosen({disable_search: true});

            curGroup.find('.form-group-new:last .form-input input').each(function() {
                if ($(this).val() == '') {
                    $(this).parent().find('span').css({'display': 'block'});
                }
            });

            curGroup.find('.form-group-new:last .form-input input').focus(function() {
                $(this).parent().find('span').css({'display': 'none'});
            });

            curGroup.find('.form-group-new:last .form-input input').blur(function() {
                if ($(this).val() == '') {
                    $(this).parent().find('span').css({'display': 'block'});
                }
            });

            curGroup.find('.form-group-new:last input[name="phone"]').mask('+7-999-999-99-99');

            curGroup.find('.form-group-new:last .form-multicheck-item input:checked').parent().addClass('checked');
            updateMulticheck();

            curGroup.find('.form-group-new:last .form-multicheck-item div').click(function() {
                $(this).find('span').toggleClass('checked');
                $(this).find('input').prop('checked', $(this).find('span').hasClass('checked')).trigger('change');
                updateMulticheck();
            });

            curGroup.find('.form-group-new:last .form-multicheck-value').click(function() {
                var curEl = $(this).parent();
                if (curEl.hasClass('open')) {
                    curEl.removeClass('open');
                } else {
                    $('.form-multicheck').removeClass('open');
                    curEl.addClass('open');
                }
            });

            curGroup.find('.form-group-new:last .form-radio span input:checked').parent().addClass('checked');
            curGroup.find('.form-group-new:last .form-radio div').click(function() {
                var curName = $(this).find('input').attr('name');
                $('.form-radio input[name="' + curName + '"]').parent().removeClass('checked');
                $(this).find('span').addClass('checked');
                $(this).find('input').prop('checked', true).trigger('change');
            });

            e.preventDefault();
        });

        $.extend($.validator.messages, {
            required: 'ОШИБКА! Не заполнено поле'
        });

        $('form').each(function() {
            $(this).validate({
                messages: {
                    email: {
                        required: 'ОШИБКА! Не указан адрес электронной почты',
                        email: 'ОШИБКА! Неверный формат адреса электронной почты'
                    }
                }
            });
        });

        $('body').on('click', '.window-link', function(e) {
            $.ajax({
                url: $(this).attr('href'),
                dataType: 'html',
                cache: false
            }).done(function(html) {
                if ($('.window').length > 0) {
                    windowClose();
                }
                windowOpen(html);

                $('.window .presentation').each(function() {
                    var curSlider = $(this);
                    curSlider.data('curIndex', 0);
                    curSlider.data('disableAnimation', true);

                    var curPages = curSlider.find('li').length;
                    var curPagesText = curPages;
                    if (curPages < 10) {
                        curPagesText = '0' + curPages;
                    }
                    curSlider.find('.presentation-pages-last').html(curPagesText);
                    curSlider.find('.presentation-progress div').width(curSlider.find('.presentation-progress').width() / curPages);
                });
            });

            e.preventDefault();
        });

        $('body').on('click', '.window .presentation-next', function(e) {
            var curSlider = $('.window .presentation');

            window.clearTimeout(sliderTimer);
            sliderTimer = null;
            curSlider.find('.presentation-play').hide();

            if (curSlider.data('disableAnimation')) {
                var curIndex = curSlider.data('curIndex');

                curIndex++;
                if (curIndex > curSlider.find('li').length - 1) {
                    curIndex = curSlider.find('li').length - 1;
                }

                curSlider.data('curIndex', curIndex);

                curSlider.find('.presentation-progress div').css({'left': curIndex * curSlider.find('.presentation-progress div').width()});

                curSlider.data('disableAnimation', false);
                curSlider.find('li:visible').fadeOut(sliderSpeed, function() {
                    curSlider.find('li').eq(curIndex).fadeIn(sliderSpeed, function() {
                        curSlider.data('disableAnimation', true);
                    });
                });
            }
            e.preventDefault();
        });

        $('body').on('click', '.window .presentation-play', function(e) {
            sliderTimer = window.setTimeout(nextSlider, sliderPeriod);
            e.preventDefault();
        });

        function nextSlider() {
            var curSlider = $('.window .presentation');

            window.clearTimeout(sliderTimer);
            sliderTimer = null;
            curSlider.find('.presentation-play').hide();

            if (curSlider.data('disableAnimation')) {
                var curIndex = curSlider.data('curIndex');

                curIndex++;
                if (curIndex > curSlider.find('li').length - 1) {
                    curIndex = curSlider.find('li').length - 1;
                }

                curSlider.data('curIndex', curIndex);

                curSlider.find('.presentation-progress div').css({'left': curIndex * curSlider.find('.presentation-progress div').width()});

                curSlider.data('disableAnimation', false);
                curSlider.find('li:visible').fadeOut(sliderSpeed, function() {
                    curSlider.find('li').eq(curIndex).fadeIn(sliderSpeed, function() {
                        if (curIndex < curSlider.find('li').length - 1) {
                            sliderTimer = window.setTimeout(nextSlider, sliderPeriod);
                        }
                        curSlider.data('disableAnimation', true);
                    });
                });
            }
            e.preventDefault();
        }

        $('body').on('click', '.window .presentation-last', function(e) {
            var curSlider = $('.window .presentation');

            window.clearTimeout(sliderTimer);
            sliderTimer = null;
            curSlider.find('.presentation-play').hide();

            if (curSlider.data('disableAnimation')) {
                var curIndex = curSlider.data('curIndex');

                curIndex = curSlider.find('li').length - 1;

                curSlider.data('curIndex', curIndex);

                curSlider.find('.presentation-progress div').css({'left': curIndex * curSlider.find('.presentation-progress div').width()});

                curSlider.data('disableAnimation', false);
                curSlider.find('li:visible').fadeOut(sliderSpeed, function() {
                    curSlider.find('li').eq(curIndex).fadeIn(sliderSpeed, function() {
                        curSlider.data('disableAnimation', true);
                    });
                });
            }
            e.preventDefault();
        });

        $('body').on('click', '.window .presentation-prev', function(e) {
            var curSlider = $('.window .presentation');

            window.clearTimeout(sliderTimer);
            sliderTimer = null;
            curSlider.find('.presentation-play').hide();

            if (curSlider.data('disableAnimation')) {
                var curIndex = curSlider.data('curIndex');

                curIndex--;
                if (curIndex < 0) {
                    curIndex = 0;
                }

                curSlider.data('curIndex', curIndex);

                curSlider.find('.presentation-progress div').css({'left': curIndex * curSlider.find('.presentation-progress div').width()});

                curSlider.data('disableAnimation', false);
                curSlider.find('li:visible').fadeOut(sliderSpeed, function() {
                    curSlider.find('li').eq(curIndex).fadeIn(sliderSpeed, function() {
                        curSlider.data('disableAnimation', true);
                    });
                });
            }
            e.preventDefault();
        });

        $('body').on('click', '.window .presentation-first', function(e) {
            var curSlider = $('.window .presentation');

            window.clearTimeout(sliderTimer);
            sliderTimer = null;
            curSlider.find('.presentation-play').hide();

            if (curSlider.data('disableAnimation')) {
                var curIndex = curSlider.data('curIndex');

                curIndex = 0;

                curSlider.data('curIndex', curIndex);

                curSlider.find('.presentation-progress div').css({'left': curIndex * curSlider.find('.presentation-progress div').width()});

                curSlider.data('disableAnimation', false);
                curSlider.find('li:visible').fadeOut(sliderSpeed, function() {
                    curSlider.find('li').eq(curIndex).fadeIn(sliderSpeed, function() {
                        curSlider.data('disableAnimation', true);
                    });
                });
            }
            e.preventDefault();
        });

        $('.photos-in a').click(function(e) {
            var curIndex = $('.photos-in a').index($(this));

            var html =  '<div class="photo-window-title">Фотоматериалы</div>' +
                        '<div class="text">' +
                            '<h1>' + $('.photos-in-item-name').html() + '</h1>' +
                            '<div class="presentation">' +
                                '<div class="presentation-content">' +
                                    '<ul>';

            $('.photos-in a').each(function() {
                html +=             '<li><img src="' + $(this).attr('href') + '" alt="" /></li>';
            });

            html +=                 '</ul>' +
                                    '<a href="#" class="photo-window-prev"></a>' +
                                    '<a href="#" class="photo-window-next"></a>' +
                                '</div>' +
                                '<div class="presentation-progress presentation-progress-2"><div></div></div>' +
                                '<div class="presentation-pages">' +
                                    '<div class="presentation-pages-first">01</div>' +
                                    '<div class="presentation-pages-last"></div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="present-text">' + $('.photos-in-item-anonce').html() + '</div>' +
                        '</div>';

            windowOpen(html);

            $('.window .presentation').each(function() {
                var curSlider = $(this);
                curSlider.data('curIndex', curIndex);
                curSlider.data('disableAnimation', true);

                var curPages = curSlider.find('li').length;
                var curPagesText = curPages;
                if (curPages < 10) {
                    curPagesText = '0' + curPages;
                }
                curSlider.find('.presentation-pages-last').html(curPagesText);
                curSlider.find('.presentation-progress div').width(curSlider.find('.presentation-progress').width() / curPages);
                curSlider.find('.presentation-progress div').css({'left': curIndex * curSlider.find('.presentation-progress div').width()});
                curSlider.find('li').hide();
                curSlider.find('li').eq(curIndex).show();
            });

            e.preventDefault();
        });

        $('body').on('click', '.window .photo-window-next', function(e) {
            var curSlider = $('.window .presentation');

            if (curSlider.data('disableAnimation')) {
                var curIndex = curSlider.data('curIndex');

                curIndex++;
                if (curIndex > curSlider.find('li').length - 1) {
                    curIndex = curSlider.find('li').length - 1;
                }

                curSlider.data('curIndex', curIndex);

                curSlider.find('.presentation-progress div').css({'left': curIndex * curSlider.find('.presentation-progress div').width()});

                curSlider.data('disableAnimation', false);
                curSlider.find('li:visible').fadeOut(sliderSpeed, function() {
                    curSlider.find('li').eq(curIndex).fadeIn(sliderSpeed, function() {
                        curSlider.data('disableAnimation', true);
                    });
                });
            }
            e.preventDefault();
        });

        $('body').on('click', '.window .photo-window-prev', function(e) {
            var curSlider = $('.window .presentation');

            if (curSlider.data('disableAnimation')) {
                var curIndex = curSlider.data('curIndex');

                curIndex--;
                if (curIndex < 0) {
                    curIndex = 0;
                }

                curSlider.data('curIndex', curIndex);

                curSlider.find('.presentation-progress div').css({'left': curIndex * curSlider.find('.presentation-progress div').width()});

                curSlider.data('disableAnimation', false);
                curSlider.find('li:visible').fadeOut(sliderSpeed, function() {
                    curSlider.find('li').eq(curIndex).fadeIn(sliderSpeed, function() {
                        curSlider.data('disableAnimation', true);
                    });
                });
            }
            e.preventDefault();
        });

        $('.info-block-header a').click(function(e) {
            var curLi = $(this).parent();
            if (!curLi.hasClass('active')) {
                var curBlock = curLi.parents().filter('.info-block');
                var curIndex = curBlock.find('.info-block-header li').index(curLi);
                curBlock.find('.info-block-header li.active').removeClass('active');
                curLi.addClass('active');
                curBlock.find('.info-block-tab.active').removeClass('active');
                curBlock.find('.info-block-tab').eq(curIndex).addClass('active');
            }
            e.preventDefault();
        });

        $('.form-edit-value a').click(function(e) {
            $(this).parents().filter('.form-edit').addClass('form-edit-open');
            e.preventDefault();
        });

    });

    $(window).load(function() {
        $('.main-middle').each(function() {
            var curHeight = 0;
            $('.main-middle .info-block').each(function() {
                if (curHeight < $(this).height()) {
                    curHeight = $(this).height();
                }
            });
            $('.main-middle .info-block').css({'min-height': curHeight});

            var leftHeight = $('.side-business-menu').outerHeight();
            var rightHeight = $('nav').outerHeight() + $('.main-middle').outerHeight();
            if (leftHeight > rightHeight) {
                $('.main-middle').css({'padding-bottom': leftHeight - rightHeight});
            } else {
                $('.side-business-menu').css({'padding-bottom': rightHeight - leftHeight + 56});
            }
        });
    });

    function windowOpen(contentWindow) {
        var windowWidth     = $(window).width();
        var windowHeight    = $(window).height();
        var curScrollTop    = $(window).scrollTop();

        $('body').css({'height': windowHeight, 'overflow': 'hidden'});
        $(window).scrollTop(0);
        $('.wrapper').css({'top': -curScrollTop});
        $('.wrapper').data('scrollTop', curScrollTop);

        $('body').append('<div class="window"><div class="window-overlay"></div><div class="window-loading"></div><div class="window-container window-container-load"><div class="window-content">' + contentWindow + '<a href="#" class="window-close"></a></div></div></div>')

        if ($('.window-container img').length > 0) {
            $('.window-container img').each(function() {
                $(this).attr('src', $(this).attr('src'));
            });
            $('.window-container').data('curImg', 0);
            $('.window-container img').load(function() {
                var curImg = $('.window-container').data('curImg');
                curImg++;
                $('.window-container').data('curImg', curImg);
                if ($('.window-container img').length == curImg) {
                    $('.window-loading').remove();
                    $('.window-container').removeClass('window-container-load');
                    windowPosition();
                }
            });
        } else {
            $('.window-loading').remove();
            $('.window-container').removeClass('window-container-load');
            windowPosition();
        }

        $('.window-overlay').click(function() {
            windowClose();
        });

        $('.window-close').click(function(e) {
            windowClose();
            e.preventDefault();
        });

        $('body').bind('keyup', keyUpBody);
    }

    function windowPosition() {
        var windowWidth     = $(window).width();
        var windowHeight    = $(window).height();

        if ($('.window-news').length > 0) {
            $('.window-news').css({'max-height': windowHeight - $('.window-tabs').height() - 104 - $('.window .archive-top').height()});
            $('.window-news').jScrollPane();
        }

        if ($('.window-container').width() > windowWidth - 40) {
            $('.window-container').css({'margin-left': 20, 'left': 'auto'});
            $('.window-overlay').width($('.window-container').width() + 40);
        } else {
            $('.window-container').css({'margin-left': -$('.window-container').width() / 2});
        }

        if ($('.window-container').height() > windowHeight - 40) {
            $('.window-container').css({'margin-top': 20, 'top': 'auto'});
            $('.window-overlay').height($('.window-container').height() + 40);
        } else {
            $('.window-container').css({'margin-top': -$('.window-container').height() / 2});
        }

    }

    function keyUpBody(e) {
        if (e.keyCode == 27) {
            windowClose();
        }
    }

    function windowClose() {
        $('body').unbind('keyup', keyUpBody);
        $('.window').remove();
        $('.wrapper').css({'top': 'auto'});
        $('body').css({'height': 'auto', 'overflow': 'visible'});
        $(window).scrollTop($('.wrapper').data('scrollTop'));
        window.clearTimeout(sliderTimer);
        sliderTimer = null;
    }

})(jQuery);