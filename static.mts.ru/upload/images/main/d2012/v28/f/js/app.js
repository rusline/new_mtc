(function($){
    $(document).ready(
        function() {

            if (window.PIE) {
                $('.location, .sublevel, .menu, .rounds, .showcase div, .internet, .search-box input, .pie').each(function() {
                    PIE.attach(this);
                });
            }

            $('.internet-icon').hover(function() {
                $(this).addClass('is-active');
            }, function() {
                $(this).removeClass('is-active');
            });

            $('.speed-popup').click(function(e) {
                var windowHeight = $(window).height()
                    ,documentHeight = $(document).height()
                    ,height = windowHeight > documentHeight ? windowHeight : documentHeight
                    ,top;

                e.preventDefault();
                $('.l-overlay')
                    .height(height)
                    .addClass('is-active')
                    .click(function(e) {
                        if ($(e.target).hasClass('l-overlay')) {
                            $(this).removeClass('is-active');
                        }
                    });

                top = $(this).offset().top - $('.l-overlay').offset().top + 25;

                $('.l-overlay .popup')
                    .css('top', top)
                    .text($(this).attr('data-content'));
            });

            $('.internet_tabs').click(function(e) {
                var $target = $(e.target)
                    ,$targetParent = $target.parent()
                    ,$tabs = $('.internet_tabs_title_item')
                    ,$content = $('.internet_tabs_content_item');

                if ($targetParent.hasClass('internet_tabs_title_item')) {
                    $tabs.removeClass('is-active');
                    $content.removeClass('is-active');
                }
            });

            $('.internet_tabs_title_item').click(function(e) {
                e.preventDefault();
                e.stopPropagation();
                $('.internet_tabs_title_item, .internet_tabs_content_item').removeClass('is-active');
                $(this).addClass('is-active');
                $($('.internet_tabs_content_item')[$(this).attr('data-tab')]).addClass('is-active');
            });

            var $iframe = $('.cabinet iframe');

            if ($iframe[0]) {
                $iframe[0].onload = function() {
                    var iframeDocument = $iframe.contents().get(0);

                    $(iframeDocument).click(function(e) {
                        e.preventDefault();
                        $iframe.toggleClass('is-active');
                    });
                }
            }

            var nav_sublevel = $('#nav .sublevel');

            if ( !nav_sublevel.children().length ) {
                nav_sublevel.remove();
                $('.sublevel2').css({
                    'position': 'relative',
                    'margin-top': ''
                });
            }

            // $($('.menu ul')[$('.menu ul').length - 1]).css({
            //     'border-left': '1px solid #f58e91'
            // });

            //search-box
            $("#q").focus(function() {
                if (($(this).val() == 'Поиск') || ($(this).val().length == 0)) $(this).removeClass("empty").val('')
            })
            $("#q").blur(function() {
                if (($(this).val() == 'Поиск') || ($(this).val().length == 0)) $(this).addClass("empty").val("Поиск")
            })

            //regions
            $(".current-region a, .another-reg").click(function() {
                $("#shadow").height($(document).height());
                $("#shadow").addClass("black").show();
                $("#regions2").fadeIn("fast")
                return false;
            });
            $("#shadow").click(function() {
                closeRegions()
            });
            $("#regions2 .closer").click(function() {
                closeRegions()
            });
            $("#landing .popup").click(function() {
                $("#shadow").fadeIn("fast")
                $("#regions2").fadeIn("fast")
                return false;
            });
            $(".my-reg").click(function() {
                $(this).parents(".location").hide();
                return false;
            });

            $("#regions2 .td-col2, #regions2 .td-col3").hide();
            $("#regions2 .td-col1 a.dotted-link").click(function() {
                $(".td-col1 .active").removeClass("active");
                $(this).parents(".region-scroll li").addClass("active");
                $("#regions2 .td-col2").show();
                return false;
            });
            $("#regions2 .td-col2 a.dotted-link").click(function() {
                $(".td-col2 .active").removeClass("active");
                $(this).parents(".region-scroll li").addClass("active");
                $("#regions2 .td-col3").show();
                return false;
            });
            $("#regions2 .td-col3 a").click(function() {
                $(".td-col3 .active").removeClass("active");
                $(this).parents(".region-scroll li").addClass("active");
            });

            if($("#regions2").length){
                var availableTags = [
                    "Армения",
                    "Азербайджан",
                    "Астана",
                    "Армавир",
                    "Архангельск",
                    "Беларусь",
                    "Брянск",
                    "Барнаул"
                ];
                $("#autocomplete").autocomplete({
                    source: availableTags
                });
            };


                //slider
                $(".slider h3").click(
                        function() {
                            var x = $(this).parent()
                    if (x.hasClass('opened')){
                        x.find(".holder").hide()
                    x.removeClass("opened")
                    }
                    else
                {
                    x.find(".holder").show()
                    x.addClass("opened")
                }
                return false
                        }
                        )

                //dlists
                $('.dlist dt').click(
                        function() {
                            var dt = $(this)
                    var dd = dt.next('dd')
                    if (dd.is(":visible"))
                {
                    dt.removeClass("opened")
                    dd.fadeOut('fast')
                }
                    else
                {
                    dt.addClass("opened")
                    dd.fadeIn('fast')
                }
                return false
                        }
                        )

                $("#kol, #time").bind("focus", function() {
                    $(this).val("");
                    $(this).removeClass("valcol");
                });

                        //$("#ma-popup, #ma-select").css({"top":$(document).scrollTop()});
                        $('span.ma-close').click(
                                function() {
                                    $('#ma-popup').hide();
                                    $('.h-models-popup').hide();
                                    $("body").css({"overflow":"visible"});
                                    return false;
                                }
                                );
                        $('.mp-shadow').click(
                                function() {
                                    $('.h-models-popup').hide();
                                    $("body").css({"overflow":"visible"});
                                }
                                );

                        //ma-select scroller init
                        //Закомментировала, потому что в МТС блок сделан аяксом и скроллбар вызывается там.

                        /*if($('#ma-select .list').length){
                          $('#ma-select .list').jScrollPane({
                          "contentWidth": 605,
                          "verticalDragMaxHeight": 74,
                          "verticalDragMinHeight": 74
                          });
                          };*/

                        /*if($('#ma-select .list').length){
                          $('#ma-select .list').jScrollPane({
                          "contentWidth": 605,
                          "verticalDragMaxHeight": 74,
                          "verticalDragMinHeight": 74
                          });
                          };*/

                        $(".app-list .model-content, .h-models-popup").hide();
                        $(".inspect a").click(
                                function() {
                                    $(".app-list .model-content").show();
                                    return false;
                                }
                                );
                        $(".models_a a, .model-content ul a").click(
                                function() {
                                    $(".h-models-popup").show();
                                    $("body").css({"overflow":"hidden"});
                                    return false;
                                }
                                );
                        $(".b-app-choose").hide();
                        $(".inspect2 a").click(
                                function() {
                                    $(".b-app-choose").toggle();
                                    return false;
                                }
                                );


                        //forms
                        $("form").not(".search-box form, .connect form, .no-jqt").jqTransform({imgPath:"../../../static.mts.ru/f/i/forms/default.htm"});

                        $(".binfo").click(function() {
                            $(".mcol .mopen").removeClass("mopen");
                            $(this).parents(".mcol li").toggleClass("mopen");
                        })
                        $(".map-buble .close").click(function() {
                            $(this).parents(".mcol .mopen").removeClass("mopen");
                        })

                        $(".mb-link").click(function() {
                            $(".mb-serv .mopen").removeClass("mopen");
                            $(this).parents(".mb-serv li").toggleClass("mopen");
                            return false;
                        })
                        $(".map-buble .close").click(function() {
                            $(this).parents(".mb-serv .mopen").removeClass("mopen");
                            return false;
                        })

                        $(".mm-kol").click(function() {
                            $(".map-marker-open").removeClass("map-marker-open");
                            $(".map-wrap3").addClass("mw-index");
                            $(this).parents(".map-marker").addClass("map-marker-open");
                            return false;
                        })
                        $(".map-wrap3").click(function() {
                            $(".mw-index").removeClass("mw-index");
                            $(".map-marker-open").removeClass("map-marker-open");
                        })
                        $(".map-buble-close").click(function() {
                            $(".mw-index").removeClass("mw-index");
                            $(this).parents(".map-marker-open").removeClass("map-marker-open");
                        })

                        $(".serv-h6 a").click(function() {
                            $(this).parents(".services").toggleClass("serv-open");
                            return false;
                        })

                        $('.fl-popup span').click(function() {
                            var source = $(this).attr('rel')
                            //remove if exists
                            $("div.flp").remove()
                            //create new
                            var shadow = jQuery('<div id="newshadow" class="black flp"></div><div id="fc" class="flp"><div id="fc2"></div></div>')
                            var flashvars = {
                            };
                        var params = {
                            menu: "false",
                        wmode: "transparent"
                        };
                        var attributes = {
                        };
                        $("body").append(shadow)
                            $("#newshadow").height($(document).height())
                            $("#fc").css("top",parseInt($(window).scrollTop()+$(window).height()/2,10)+"px")
                            $("")
                            swfobject.embedSWF(source, "fc2", "678", "285", "10.0.0","expressInstall.swf", flashvars, params, attributes);
                        })

                        // $("#newshadow").live('click',function() {
                        //     $("div.flp").remove()
                        // })


                        $(".h-infoform-wrap2, .inf_form").hide();
                        $(".full_link").click(function() {
                            $(this).toggleClass("fl_minus");
                            $(".h-infoform-wrap2").toggle();
                            return false;
                        });
                        $(".full_no").click(function() {
                            $(this).toggleClass("fl_minus");
                            $(".inf_form").not(".b-infoform2 .inf_form").toggle();
                            $(".b-infoform2 .inf_form").hide();
                            return false;
                        });
                        $(".full_yes").click(function() {
                            $(".b-infoform2 .inf_form").toggle();
                            $(".h-infoform-wrap2 .fl_minus").removeClass("fl_minus");
                            $(".inf_form").not(".b-infoform2 .inf_form").hide();
                            return false;
                        });

                        if($('.zoom-link').length){
                            $(".zoom-link").fancybox();
                        };

                        $(".connectform .jqTransformInputWrapper:has('input.error')").addClass("err-inp");

                        $("#nav .more > a").click(function() {
                            $(this).parent().toggleClass("more-show");
                            return false;
                        });

                        $(".subcont .more").click(function() {
                            $(this).parents(".subcont").toggleClass("h-mp-open");
                            return false;
                        });

                        $(".morenumbs .more").click(function() {
                            $(this).parents(".morenumbs").toggleClass("h-mp-open");
                            return false;
                        });

                        $(".widget_menu").click(function() {
                            $(this).parents(".widget_customs").toggleClass("widget_customs-open");
                            $(this).parents(".b-widget, .b-widget-subhead").toggleClass("b-widget-subhead-open");
                            return false;
                        });

                        $(".roll_up").click(function() {
                            $(".widget_customs-open").removeClass("widget_customs-open");
                            $(this).parents(".b-widget").toggleClass("b-widget-hide");
                            //var aa = $(".b-widget-content", $(this).parents(".b-widget")).height();
                            if($(this).parents(".b-widget").hasClass("b-widget-hide")){
                                //$(".b-widget-content", $(this).parents(".b-widget")).animate({"height":"0", "min-height":"0", "padding-top":"0"}, 500);
                                $(".b-widget-content", $(this).parents(".b-widget")).slideUp("fast");

                                $(".b-widget-bot", $(this).parents(".b-widget")).hide();
                            }
                            else{
                                $(".b-widget-content", $(this).parents(".b-widget")).slideDown("fast");
                                //$(".b-widget-content", $(this).parents(".b-widget")).animate({"height":aa+4, "min-height":"163px", "padding-top":"4px"}, 500);
                                $(".b-widget-bot", $(this).parents(".b-widget")).show();
                            }
                        return false;
                        });

                        $(".roll_down").click(function() {
                            $(this).parents(".b-widget").removeClass("b-widget-hide");
                            $(".b-widget-content", $(this).parents(".b-widget")).slideDown("fast");
                            $(".b-widget-bot", $(this).parents(".b-widget")).show();
                            return false;
                        });

                        $(".widget_close").click(function() {
                            $(this).parents(".b-widget").slideUp();
                            $(".b-widget-bot", $(this).parents(".b-widget")).hide();
                            return false;
                        });
                        $(".b-widget-top .widget_close").click(function() {
                            $(this).parents(".b-widget-top").slideUp();
                            return false;
                        });
                        $(".b-searchcontact .h-wm-popup").hide();
                        $(".b-searchcontact .add_contact").click(function() {
                            $(".b-searchcontact .h-wm-popup").show();
                            return false;
                        });
                        $(".acf-close").click(function() {
                            $(this).parents(".b-searchcontact .h-wm-popup").hide();
                        });


                        if($(".photoslider-bullets").length){
                            $(".photoslider-bullets").sliderkit({
                                auto:true,
                                circular:true,
                                mousewheel:false,
                                shownavitems:5,
                                panelfx:"fading",
                                panelfxspeed:1000,
                                freeheight: true
                            });
                        };


                        $(".sitemap-link").click(function() {
                            $(this).parents(".h-sitemap-wrap").toggleClass("sm-dynamic");
                            if($(this).parents(".h-sitemap-wrap").hasClass("sm-dynamic")){
                                $(".sitemap-link span").html("Показать карту сайта");
                                $("body").css({"zoom" : "1"});
                            }
                            else{
                                $(".sitemap-link span").html("Скрыть карту сайта");
                                scrollTo(0,$('body').height()+513);
                            }
                        return false;
                        });


                        $(".hide-link a").click(function() {
                            $(this).parent().toggleClass("hide-hide");
                            $("." + $(this).attr("id")).not($('.h-package-descr .b-po-cols')).toggle();
                            if($('.h-package-descr').length){$(this).parents(".b-pack-opt").toggleClass("b-pack-opt-open");};
                            return false;
                        });

                        $(".corp-table .jqTransformRadioWrapper:has('input#fn')").addClass("fn_jq");
                        $(".corp-table .jqTransformRadioWrapper:has('input#pn')").addClass("pn_jq");
                        $(".corp-table #fn, .fn_jq .jqTransformRadio").click(function() {
                            $("#zn1").text("500");
                            $("#zn2").text("700");
                            $("#zn3").text("1000");
                        });
                        $(".corp-table #pn, .pn_jq .jqTransformRadio").click(function() {
                            $("#zn1").text("1200");
                            $("#zn2").text("1400");
                            $("#zn3").text("1700");
                        });

                        $(".sms-vars-dop").hide();
                        $(".sms-vars .jqTransformCheckbox").click(function() {
                            $(".sms-vars-dop", $(this).parents(".sms-vars li")).toggle();
                        });

                        $(".s-hide2").first().show();
                        $(".scol-tabs a").click(function() {
                            var idx = $(this).attr("href");
                            $(".scol-tabs .active").removeClass("active");
                            $(this).parents(".scol-tabs li").addClass("active");
                            $(".s-hide2").hide();
                            $($(this).attr("href")).show();
                            return false;
                        });

                        $(".other_media a").click(function() {
                            $(this).parent().toggleClass("other_media_minus");
                            $("#om").toggle();
                            return false;
                        });

                        $(".thl").click(function() {
                            $(".h-thide").toggle();
                            return false;
                        });

                        $(".install-btn").bind("click", function() {
                            $(".inst-ok").show();
                            $(this).hide();
                            return false;
                        });

                        $(".thanks_words").hide();
                        $(".say_thanks").bind("click", function() {
                            $(".thanks_ok").hide();
                            $(".thanks_words").toggle();
                            $(this).toggleClass("sth_inactive");
                            return false;
                        });
                        $("textarea#thanks_text").keypress(function() {
                            $(".thanks_words input#send").addClass("do");
                        });


                        $(".corp-overlay").css({"height" : $(document).height()});
                        $(".h-corp-popup-wrap .ma-close").click(function() {
                            $(this).parents(".h-corp-popup-wrap").hide();
                        })
                        $(".tr-hide").hide();
                        $(".corp-radio-var1 .jqTransformRadio, .corp-radio-var1 label").not(".corp-radio-var1 .other .jqTransformRadio, .corp-radio-var1 .other label").click(function() {
                            $(".tr-hide1").show();
                        });
                        $(".corp-radio-var1 .other .jqTransformRadio, .corp-radio-var1 .other label").click(function() {
                            $(".tr-hide1").hide();
                            $(".tr-hide2").hide();
                        });
                        $(".corp-radio-var2 .li-sh .jqTransformRadio, .corp-radio-var2 .li-sh label").click(function() {
                            $(".tr-hide2").show();
                        });
                        $(".corp-radio-var2 .v2 .jqTransformRadio, .corp-radio-var2 .other .jqTransformRadio, .corp-radio-var2 .v2 label, .corp-radio-var2 .other label").click(function() {
                            $(".tr-hide2").hide();
                        });


                        if($("#mms_carousel").length) {
                            $("#mms_carousel").jcarousel({
                                wrap: "circular",
                                scroll: 1
                            });
                            $(".h-mmsobjects-wrap .jcarousel-skin-tango .jcarousel-item").eq(1).addClass("jcarousel-item-current");
                            $(".h-mmsobjects-wrap .jcarousel-skin-tango .jcarousel-item img").click(function() {
                                $(this).parents(".jcarousel-item").toggleClass("jcarousel-item-current");
                            });
                            $(".jcarousel-next").click(function() {
                                $(".jcarousel-item-current").next().addClass("jcarousel-item-current");
                                $(".jcarousel-item-current").prev().removeClass("jcarousel-item-current");
                            });
                            $(".jcarousel-prev").click(function() {
                                $(".jcarousel-item-current").prev().addClass("jcarousel-item-current");
                                $(".jcarousel-item-current").next().removeClass("jcarousel-item-current");
                            });
                        };


                        if($("#mobi-recom").length) {
                            $("#mobi-recom").jcarousel({
                                scroll: 1
                            });
                        };


                        $(".h-decfeed-wrap").hide();
                        $(".b-dec-text button").click(function() {
                            $(".h-decfeed-wrap").show();
                            $(this).hide();
                            return false;
                        });


                        $(".h-dec-wrap .corp-hide").hide();
                        $(".h-dec-col1 .dec-checks .jqTransformCheckbox").click(function() {
                            var indexLi = $(this).parents(".dec-checks li").index();
                            $(this).parents(".dec-checks li").toggleClass("check");
                            var subDec = $(".check .sub-dec-checks");
                            if($(this).parents(".dec-checks li").hasClass("check")){
                                $(subDec).addClass("sd-" + indexLi);
                                $(".h-dec-col2-append").prepend(subDec);
                            }
                            else{
                                $(this).parents(".dec-checks li").append($(".sd-" + indexLi));
                            }
                        });


                        $(".alert_close, .alert_ok").click(function() {
                            $(this).parents(".h-alert-popup-wrap").hide();
                            return false;
                        });



                        if($(".h-speed-wrap").length) {
                            $(".photoslider-mini").sliderkit({
                                autospeed: 2000,
                                panelbtnshover: false,
                                circular: true,
                                fastchange: false
                            });

                            $( "#slider" ).slider({
                                value: 0,
                                min: 0,
                                max: 4,
                                step: 1,
                                slide: function( event, ui ) {
                                    $(this).closest(".h-spd-wrap").find(".speed-list li.active").removeClass("active");
                                    $(this).closest(".h-spd-wrap").find(".speed-list li").eq(ui.value).addClass("active");
                                    $(".ui-slider-handle").html($(this).closest(".h-spd-wrap").find(".speed-list li.active").html());
                                }
                            });
                            $( "#slider2" ).slider({
                                value: 0,
                                min: 0,
                                max: 2,
                                step: 1,
                                slide: function( event, ui ) {
                                    $(this).closest(".h-spd-wrap").find(".speed-list li.active").removeClass("active");
                                    $(this).closest(".h-spd-wrap").find(".speed-list li").eq(ui.value).addClass("active");
                                    $(".ui-slider-handle").html($(this).closest(".h-spd-wrap").find(".speed-list li.active").html());
                                }
                            });

                             $(".speed-list li:first-child").click(function() {
                                $(this).closest(".h-spd-wrap").find(".speed-list li.active").removeClass("active");
                                $(this).addClass("active");
                                $(this).closest(".h-spd-wrap").find(".ui-slider-handle").css("left", "0").html($(this).closest(".h-spd-wrap").find(".speed-list li.active").html()).addClass("ui-state-focus");
                            });
                            $(".speed-list li:last-child").click(function() {
                                $(this).closest(".h-spd-wrap").find(".speed-list li.active").removeClass("active");
                                $(this).addClass("active");
                                $(this).closest(".h-spd-wrap").find(".ui-slider-handle").css("left", "100%").html($(this).closest(".h-spd-wrap").find(".speed-list li.active").html());
                            });
                        };


        }
)

    function closeRegions()
    {
        $("#regions2").fadeOut("fast")
            $("#shadow").removeClass("black").hide()
            $("#flcontent").hide()
            $("#flcontent2").hide()
            $("#flcontent_").hide()
            $("#flcontent2_").hide()
    }
})(jQuery);
