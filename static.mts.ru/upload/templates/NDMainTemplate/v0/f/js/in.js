var SliderAr1 =  new Array(0, 100, 500, 1000, 4000, 10001);
var SliderAr2 =  new Array(0, 2, 6, 10, 50, 10001);
var SliderAr3 =  new Array(0, 2, 5, 10, 20, 10001);
var SliderAr4 =  new Array(0, 10, 20, 30, 40, 10001);
var SliderAr5 =  new Array(0, 10, 20, 30, 40, 10001);
var SliderAr6 =  new Array(0, 10, 20, 30, 40, 10001);

var Cmax = 1650;

function get_real_slider_value(slider_array, value, Cmax, round_step) {
	var count = slider_array.length;
	var step = Cmax / (count - 1);
	var max_value = slider_array[count];
	var range_from = Math.floor(value/step);
	var range_till = range_from + 1;
	var range_percent  = (value - (step*range_from))/step;
	if (range_percent<0.05) { range_percent=0;}
	if (range_percent>0.95) { range_percent=1;}

	var limit_range_from  = slider_array[range_from];
	var limit_range_till  = slider_array[range_till];
	var real_value_in_range  = (limit_range_till - limit_range_from) * range_percent;
	var real_value  = Math.floor(real_value_in_range + limit_range_from);
	if (round_step == 50 && range_till>3) {
		real_value  = Math.round(real_value/(round_step*10))*round_step*10;
	} else {
		real_value  = Math.round(real_value/round_step)*round_step;
	}
	
	if ((real_value > slider_array[count-2] && range_percent > 0.2) || isNaN(real_value)) {
		real_value = ">"+slider_array[count-2];
	}
	else if (real_value > slider_array[count-2] && range_percent <= 0.2) {
		real_value = slider_array[count-2];
	}
	return real_value;
}

function get_reverse_slider_value(slider_array, value, Cmax) {
 var count = slider_array.length;
 var step = Cmax / (count - 1);
 var max_value = slider_array[count];
 var range_from;
 if (value.indexOf(">") == 0) {
 	value = parseInt(value.substring(value.indexOf(">")+1, value.length)) + 1;
 }

 for(var i=0;i<slider_array.length;i++)
 {
  if(value>slider_array[i]) { range_from=i; }
 }

 var range_till = range_from + 1;
 var range_percent  = (value-slider_array[range_from])/(slider_array[range_till]-slider_array[range_from]);
 if (range_percent<0.05) { range_percent=0;}
 if (range_percent>0.95) { range_percent=1;}
 var real_value  = Math.floor((range_percent+range_from)*step); 
 if (isNaN(real_value)) real_value = 0;
 if (range_till>=count-1) {real_value=Cmax;}
 return real_value;
}

$(document).ready(function() {
    
    $("dl.dlist dt a").toggle(
      function () {
      	var x = this.id;
      	$('#'+x).addClass("open");
      	$('#'+x+'a').addClass("open");
      },
      function () {
      	var x = this.id;
      	$('#'+x).removeClass("open");
      	$('#'+x+'a').removeClass("open");
      }
    );
    
    $("div.que div.que-button").toggle(
      function () {
      	var x = this.id;
      	$(this).removeClass("queclose");
      	$(this).addClass("queopen");
        $(".que-open-wrap").removeClass("que-open-wrap");
        $(this).parents("div.que").addClass("que-open-wrap");
      	$(this).siblings("div.que-popup").show();
      },
      function () {
      	var x = this.id;
      	$(this).removeClass("queopen");
      	$(this).addClass("queclose");
      	$(this).siblings("div.que-popup").hide();
      }
    );
    
    $("input.dateshowcontrol").toggle(
      function () {
      	$("div.date-picker-container").css("visibility","visible");
      },
      function () {
      	$("div.date-picker-container").css("visibility","hidden");
      }
    );
    
	$('form').not(".def-f").jqTransform({imgPath:'../../../../../static.mts.ru/f/i/forms/default.htm'});

  $(".prompt-link a").bind("click", function(){
       $(this).parents(".h-bill-prompt").toggleClass("h-bill-hide");
       if($(".h-bill-prompt").hasClass("h-bill-hide")){
       $(".prompt-link a").html("Показать подсказку");
       }
       else{
       $(".prompt-link a").html("Скрыть подсказку");
       }
       return false;
     });

  $(".prompt-link3 a").bind("click", function(){
       $(this).parents(".h-bill-prompt").toggleClass("h-bill-hide");
       if($(".h-bill-prompt").hasClass("h-bill-hide")){
       $(".prompt-link3 a").html("Что это такое?");
       }
       else{
       $(".prompt-link3 a").html("Скрыть подсказку");
       }
       return false;
     });

  $(".expense-detail").bind("click", function(){
       $(this).parents(".history-table").toggleClass("expense-detail-open");
       if($(".history-table").hasClass("expense-detail-open")){
       $(".expense-detail").html("скрыть расходы");
       }
       else{
       $(".expense-detail").html("подробнее о расходах...");
       }
       return false;
     });

  $(".archive-link").bind("click", function(){
       $(this).parents(".h-issa-content").toggleClass("arch-open");
       if($(".h-issa-content").hasClass("arch-open")){
       $(".archive-link").html("Скрыть подсказку");
       }
       else{
       $(".archive-link").html("Что означают статусы?");
       }
       return false;
     });

  $(".multi-phone-link").bind("click", function(){
       $(this).parents(".history-table tr").toggleClass("multi-phone-open");
       return false;
     });

  $(".prompt-link2 a").bind("click", function(){
       $(this).parents(".h-bill-prompt").toggleClass("h-bill-hide2");
       return false;
     });

  $(".key-show").bind("click", function() {
      $(this).parents(".keyboard-wrap").addClass("keyboard-alt");
      return false;
      })

  $(".key-hide").bind("click", function() {
      $(this).parents(".keyboard-wrap").removeClass("keyboard-alt");
      return false;
      })

  $(".small-phone-img").bind("click", function() {
      $(".pic-gallery .active").removeClass("active");
      $(this).parents(".pic-gallery td").addClass("active");
      $("#big-phone-img").attr("src", $("a", this).attr("href"));
      return false;
      })

  $(".serv-bul")
      .bind("mouseenter", function() {
       $(this).addClass("serv-active");  
       })  
      .bind("mouseleave", function() {
       $(".serv-active").removeClass("serv-active");  
       })

  $(".serv-search input.text").bind("focus", function() {
      $(this).removeAttr("value");
      })

  $(".smsarchive-link").bind("click", function(){
       $(this).parents(".issa-sms").toggleClass("smsarchive-filter-hide");
       if($(".issa-sms").hasClass("smsarchive-filter-hide")){
       $(".smsarchive-link").html("+ Развернуть фильтры");
       }
       else{
       $(".smsarchive-link").html("- Скрыть фильтры");
       }
       return false;
     });

  $(".radio-td .jqTransformRadio").bind("click", function(){
       $(".radio-td-active").removeClass("radio-td-active");
       $("td.number input.text").removeAttr("value");
       $(this).parents(".radio-td").addClass("radio-td-active");
     });

  $(".ts-list a").bind("click", function() {
      $(".b-tar-open").removeClass("b-tar-open");
      $(".b-tar" + $(this).attr("rel")).addClass("b-tar-open");
      return false;
      })

  $(".pay-full-list > li:first-child").css({"padding" : "0"});
  $(".pay-full-list li:last-child").addClass("lch");
  $(".lev2-bul, .lev2-bul a").bind("click", function() {
      $(this).parents(".pay-full-list li").toggleClass("active");
      return false;
      })
  $(".lev3-bul, .lev3-bul a").bind("click", function() {
      $(this).parents(".pay-full-list li li").toggleClass("active");
      return false;
      })

  $("#more > a").bind("click", function() {
      $(this).parents("#more").toggleClass("more-show");
      return false;
      })

  $(".pe a").bind("click", function() {
      $(this).parents(".pers-enter").toggleClass("pers-enter-active");
      return false;
      })

  if(document.attachEvent){
    $(".h-pers-popup").css({"height": $("body").height()});
  }
  $(".get-pass-link").bind("click", function() {
      $(".h-pers-popup").addClass("h-pers-popup-open");
      return false;
      })

  $(".pp-close, .cancel").bind("click", function() {
      $(".h-pers-popup-open").removeClass("h-pers-popup-open");
      return false;
      })
  
  $(document).ready(function() {
      $('#mycarousel').jcarousel();
    });

  $(".hide-h2 a").bind("click", function() {
      $(this).parents(".h-hide-wrap").toggleClass("h-show-wrap");
      return false;
      });

  if($("#slider1").length){
    var init_val = get_reverse_slider_value(SliderAr1, $("#rur").val(), Cmax);
    $("#slider1").slider({
      value: init_val,
      min: 0,
      max: Cmax,
      step: 1,
      slide: function(event, ui) {
      	var real_value = get_real_slider_value(SliderAr1, ui.value, Cmax, 50);
        $("#slider1 .ui-slider-handle").text(real_value);
        $("#rur").val(real_value);
      },
      stop: function(event, ui) {
		var real_value = get_real_slider_value(SliderAr1, ui.value, Cmax, 50);
        $("#rur").val(real_value);
        $("#slider1 .ui-slider-handle").attr('title', real_value); 
		var real_slider_value = get_reverse_slider_value(SliderAr1, real_value.toString(), Cmax);
	    $("#slider1").slider( "option", "value", real_slider_value);

      }
    });
  };

  $("#rur")
    .bind("change", function() {
     var real_slider_value = get_reverse_slider_value(SliderAr1, $("#rur").val(), Cmax);
     $("#slider1").slider( "option", "value", real_slider_value);
    })  
  .bind("focusout", function() {
     var real_slider_value = get_reverse_slider_value(SliderAr1, $("#rur").val(), Cmax);
     $("#slider1").slider( "option", "value", real_slider_value);
  })  
  .bind("keyup", function() {
     var real_slider_value = get_reverse_slider_value(SliderAr1, $("#rur").val(), Cmax);
     $("#slider1").slider( "option", "value", real_slider_value);
  });
  

  if($("#slider2").length){
    var init_val = get_reverse_slider_value(SliderAr2, $("#kol").val(), Cmax);
    $("#slider2").slider({
      value: init_val,
      min: 0,
      max: Cmax,
      step: 1,
      slide: function(event, ui) {
      	var real_value = get_real_slider_value(SliderAr2, ui.value, Cmax, 1);
        $("#slider2 .ui-slider-handle").text(real_value);
        $("#kol").val(real_value);
      },
      stop: function(event, ui) {
	  	var real_value = get_real_slider_value(SliderAr2, ui.value, Cmax, 1);
        $("#kol").val(real_value);
        $("#slider2 .ui-slider-handle").attr('title', real_value);
		var real_slider_value = get_reverse_slider_value(SliderAr2, real_value.toString(), Cmax);
	    $("#slider2").slider( "option", "value", real_slider_value);
      }
    });
  };
 
  $("#kol")
    .bind("change", function() {
     var real_slider_value = get_reverse_slider_value(SliderAr2, $("#kol").val(), Cmax);
     $("#slider2").slider( "option", "value", real_slider_value);
    })  
  .bind("focusout", function() {
     var real_slider_value = get_reverse_slider_value(SliderAr2, $("#kol").val(), Cmax);
     $("#slider2").slider( "option", "value", real_slider_value);
  })  
  .bind("keyup", function() {
     var real_slider_value = get_reverse_slider_value(SliderAr2, $("#kol").val(), Cmax);
     $("#slider2").slider( "option", "value", real_slider_value);
  });  


  if($("#slider3").length){
    var init_val = get_reverse_slider_value(SliderAr3, $("#time").val(), Cmax);
    $("#slider3").slider({
      value: init_val,
      min: 0,
      max: Cmax,
      step: 1,
      slide: function(event, ui) {
      	var real_value = get_real_slider_value(SliderAr3, ui.value, Cmax, 1);
        $("#slider3 .ui-slider-handle").text(real_value);
        $("#time").val(real_value);
      },
      stop: function(event, ui) {
   	 	var real_value = get_real_slider_value(SliderAr3, ui.value, Cmax, 1);
        $("#time").val(real_value);
        $("#slider3 .ui-slider-handle").attr('title', real_value);
		var real_slider_value = get_reverse_slider_value(SliderAr3, real_value.toString(), Cmax);
	    $("#slider3").slider( "option", "value", real_slider_value);
      }
    });
  };

  $("#time")
    .bind("change", function() {
     var real_slider_value = get_reverse_slider_value(SliderAr3, $("#time").val(), Cmax);
     $("#slider3").slider( "option", "value", real_slider_value);
    })  
  .bind("focusout", function() {
     var real_slider_value = get_reverse_slider_value(SliderAr3, $("#time").val(), Cmax);
     $("#slider3").slider( "option", "value", real_slider_value);
  })  
  .bind("keyup", function() {
     var real_slider_value = get_reverse_slider_value(SliderAr3, $("#time").val(), Cmax);
     $("#slider3").slider( "option", "value", real_slider_value);
  });  


  if($("#slider4").length){
    var init_val = get_reverse_slider_value(SliderAr4, $("#kol-sms").val(), Cmax);
    $("#slider4").slider({
      value: init_val,
      min: 0,
      max: Cmax,
      step: 1,
      slide: function(event, ui) {
	 	var real_value = get_real_slider_value(SliderAr4, ui.value, Cmax, 1);
        $("#kol-sms").val(real_value);
        $("#slider4 .ui-slider-handle").text(real_value);
      },
      stop: function(event, ui) {
	 	var real_value = get_real_slider_value(SliderAr4, ui.value, Cmax, 1);
        $("#kol-sms").val(real_value);
        $("#slider4 .ui-slider-handle").attr('title', real_value);
		var real_slider_value = get_reverse_slider_value(SliderAr4, real_value.toString(), Cmax);
	    $("#slider4").slider( "option", "value", real_slider_value);
      }
    });
  };

  $("#kol-sms")
    .bind("change", function() {
     var real_slider_value = get_reverse_slider_value(SliderAr4, $("#kol-sms").val(), Cmax);
     $("#slider4").slider( "option", "value", real_slider_value);
    })  
  .bind("focusout", function() {
     var real_slider_value = get_reverse_slider_value(SliderAr4, $("#kol-sms").val(), Cmax);
     $("#slider4").slider( "option", "value", real_slider_value);
  })  
  .bind("keyup", function() {
     var real_slider_value = get_reverse_slider_value(SliderAr4, $("#kol-sms").val(), Cmax);
     $("#slider4").slider( "option", "value", real_slider_value);
  });  


  if($("#slider5").length){
    var init_val = get_reverse_slider_value(SliderAr5, $("#kol-mms").val(), Cmax);
    $("#slider5").slider({
      value: init_val,
      min: 0,
      max: Cmax,
      step: 1,
      slide: function(event, ui) {
		var real_value = get_real_slider_value(SliderAr5, ui.value, Cmax, 1);
		$("#kol-mms").val(real_value);
		$("#slider5 .ui-slider-handle").text(real_value);
      },
      stop: function(event, ui) {
	   	var real_value = get_real_slider_value(SliderAr5, ui.value, Cmax, 1);
       	$("#kol-mms").val(real_value);
       	$("#slider5 .ui-slider-handle").attr('title', real_value); 
		var real_slider_value = get_reverse_slider_value(SliderAr5, real_value.toString(), Cmax);
	    $("#slider5").slider( "option", "value", real_slider_value);
      }
    });
  };

  $("#kol-mms")
    .bind("change", function() {
     var real_slider_value = get_reverse_slider_value(SliderAr5, $("#kol-mms").val(), Cmax);
     $("#slider5").slider( "option", "value", real_slider_value);
    })  
  .bind("focusout", function() {
     var real_slider_value = get_reverse_slider_value(SliderAr5, $("#kol-mms").val(), Cmax);
     $("#slider5").slider( "option", "value", real_slider_value);
  })  
  .bind("keyup", function() {
     var real_slider_value = get_reverse_slider_value(SliderAr5, $("#kol-mms").val(), Cmax);
     $("#slider5").slider( "option", "value", real_slider_value);
  });  


  if($("#slider6").length){
    var init_val = get_reverse_slider_value(SliderAr6, $("#kol-mb").val(), Cmax);
    $("#slider6").slider({
      value: init_val,
      min: 0,
      max: Cmax,
      step: 1,
      slide: function(event, ui) {
	    var real_value = get_real_slider_value(SliderAr6, ui.value, Cmax, 1);
        $("#slider6 .ui-slider-handle").text(real_value);
		$("#kol-mb").val(real_value);
      },
      stop: function(event, ui) {
		var real_value = get_real_slider_value(SliderAr6, ui.value, Cmax, 1);
		$("#kol-mb").val(real_value);
		$("#slider6 .ui-slider-handle").attr('title', real_value); 
		var real_slider_value = get_reverse_slider_value(SliderAr6, real_value.toString(), Cmax);
	    $("#slider6").slider( "option", "value", real_slider_value);
      }
    });
  };

  $("#kol-mb")
   .bind("change", function() {
     var real_slider_value = get_reverse_slider_value(SliderAr6, $("#kol-mb").val(), Cmax);
     $("#slider6").slider( "option", "value", real_slider_value);
   })  
  .bind("focusout", function() {
    var real_slider_value = get_reverse_slider_value(SliderAr6, $("#kol-mb").val(), Cmax);
    $("#slider6").slider( "option", "value", real_slider_value);
  })  
  .bind("keyup", function() {
    var real_slider_value = get_reverse_slider_value(SliderAr6, $("#kol-mb").val(), Cmax);
    $("#slider6").slider( "option", "value", real_slider_value);
  });  


  $(".h-eye .jqTransformCheckbox").bind("click", function() {
      $(this).parents(".base-params tr").toggleClass("none-active");
      })


  $(".b-ch .jqTransformCheckbox").bind("click", function(){
       $(this).parents(".check-list li").toggleClass("sub-show");
       });

  $(".seltar-link, .show-link, .h-sel1 .change a").bind("click", function() {
      $(this).parents(".h-selred-wrap").toggleClass("h-selred-wrap-move");
      if($(this).parents(".h-selred-wrap").hasClass("h-selred-wrap-move")){
       $(".show-link").html("Свернуть");
       }
       else{
       $(".show-link").html("Развернуть");
       }
       return false;
      })

  $(".tar-services-list li")
     .bind("mouseenter", function() {
         $(this).addClass("sphover");  
         $(".sphover .serv-subinfo").each(function() {$(this).css({"margin-top": - $(this).height()/2})});
         })  
     .bind("mouseleave", function() {
       $(".sphover").removeClass("sphover");  
       })

     $(".jqTransformRadioWrapper:has('input:disabled')").addClass("jq-lock");
     $(".tar-services-list .jqTransformRadio").bind("click", function() {
         $(this).closest(".tar-services-list").find(".active").removeClass("active");
         $(this).closest("li").addClass("active");    
         })
  

  $(".h-no-scroll .compare-table tr").each(function(intIndex, item){$(item).addClass("item" + intIndex);});
  $(".h-scroll .compare-table tr").each(function(intIndex, item){$(item).addClass("item" + intIndex);}); 
  $(".th1").each(function() {$(this).css({"height": $(".h-scroll .compare-table th").height()+1})});   
  $(".item1 td").each(function() {$(this).css({"height": $(".item1 th").height()})});
  $(".item2 td").each(function() {$(this).css({"height": $(".item2 th").height()})}); 
  $(".item3 td").each(function() {$(this).css({"height": $(".item3 th").height()})}); 
  $(".item4 td").each(function() {$(this).css({"height": $(".item4 th").height()})}); 
  $(".item5 td").each(function() {$(this).css({"height": $(".item5 th").height()})}); 
  $(".item6 td").each(function() {$(this).css({"height": $(".item6 th").height()})}); 
  $(".item7 td").each(function() {$(this).css({"height": $(".item7 th").height()})}); 
  $(".item8 td").each(function() {$(this).css({"height": $(".item8 th").height()})}); 
  $(".item9 td").each(function() {$(this).css({"height": $(".item9 th").height()})}); 
  $(".item10 td").each(function() {$(this).css({"height": $(".item10 th").height()})}); 
  $(".item11 td").each(function() {$(this).css({"height": $(".item11 th").height()})}); 
  $(".item12 td").each(function() {$(this).css({"height": $(".item12 th").height()})}); 
  $(".item13 td").each(function() {$(this).css({"height": $(".item13 th").height()})}); 
  $(".item14 td").each(function() {$(this).css({"height": $(".item14 th").height()})}); 
  $(".item15 td").each(function() {$(this).css({"height": $(".item15 th").height()})}); 
  $(".item16 td").each(function() {$(this).css({"height": $(".item16 th").height()})}); 
  $(".item17 td").each(function() {$(this).css({"height": $(".item17 th").height()})}); 
  $(".item18 td").each(function() {$(this).css({"height": $(".item18 th").height()})}); 
  $(".item19 td").each(function() {$(this).css({"height": $(".item19 th").height()})}); 
  $(".item20 td").each(function() {$(this).css({"height": $(".item20 th").height()})});  

  $(".item1 th, .item1 td")
     .bind("mouseenter", function() {
         $(".item1").addClass("sphover");  
         })  
     .bind("mouseleave", function() {
       $(".sphover").removeClass("sphover");  
       })
  $(".item2 th, .item2 td")
     .bind("mouseenter", function() {
         $(".item2").addClass("sphover");  
         })  
     .bind("mouseleave", function() {
       $(".sphover").removeClass("sphover");  
       })
  $(".item3 th, .item3 td")
     .bind("mouseenter", function() {
         $(".item3").addClass("sphover");  
         })  
     .bind("mouseleave", function() {
       $(".sphover").removeClass("sphover");  
       })
  $(".item4 th, .item4 td")
     .bind("mouseenter", function() {
         $(".item4").addClass("sphover");  
         })  
     .bind("mouseleave", function() {
       $(".sphover").removeClass("sphover");  
       })
  $(".item5 th, .item5 td")
     .bind("mouseenter", function() {
         $(".item5").addClass("sphover");  
         })  
     .bind("mouseleave", function() {
       $(".sphover").removeClass("sphover");  
       })
  $(".item6 th, .item6 td")
     .bind("mouseenter", function() {
         $(".item6").addClass("sphover");  
         })  
     .bind("mouseleave", function() {
       $(".sphover").removeClass("sphover");  
       })
  $(".item7 th, .item7 td")
     .bind("mouseenter", function() {
         $(".item7").addClass("sphover");  
         })  
     .bind("mouseleave", function() {
       $(".sphover").removeClass("sphover");  
       })
   $(".item8 th, .item8 td")
     .bind("mouseenter", function() {
         $(".item8").addClass("sphover");  
         })  
     .bind("mouseleave", function() {
       $(".sphover").removeClass("sphover");  
       })
   $(".item9 th, .item9 td")
     .bind("mouseenter", function() {
         $(".item9").addClass("sphover");  
         })  
     .bind("mouseleave", function() {
       $(".sphover").removeClass("sphover");  
       })
   $(".item10 th, .item10 td")
     .bind("mouseenter", function() {
         $(".item10").addClass("sphover");  
         })  
     .bind("mouseleave", function() {
       $(".sphover").removeClass("sphover");  
       })
   $(".item11 th, .item11 td")
     .bind("mouseenter", function() {
         $(".item11").addClass("sphover");  
         })  
     .bind("mouseleave", function() {
       $(".sphover").removeClass("sphover");  
       })
   $(".item12 th, .item12 td")
     .bind("mouseenter", function() {
         $(".item12").addClass("sphover");  
         })  
     .bind("mouseleave", function() {
       $(".sphover").removeClass("sphover");  
       })
   $(".item13 th, .item13 td")
     .bind("mouseenter", function() {
         $(".item13").addClass("sphover");  
         })  
     .bind("mouseleave", function() {
       $(".sphover").removeClass("sphover");  
       })
   $(".item14 th, .item14 td")
     .bind("mouseenter", function() {
         $(".item14").addClass("sphover");  
         })  
     .bind("mouseleave", function() {
       $(".sphover").removeClass("sphover");  
       })
   $(".item15 th, .item15 td")
     .bind("mouseenter", function() {
         $(".item15").addClass("sphover");  
         })  
     .bind("mouseleave", function() {
       $(".sphover").removeClass("sphover");  
       })
   $(".item16 th, .item16 td")
     .bind("mouseenter", function() {
         $(".item16").addClass("sphover");  
         })  
     .bind("mouseleave", function() {
       $(".sphover").removeClass("sphover");  
       })
   $(".item17 th, .item17 td")
     .bind("mouseenter", function() {
         $(".item17").addClass("sphover");  
         })  
     .bind("mouseleave", function() {
       $(".sphover").removeClass("sphover");  
       })
   $(".item18 th, .item18 td")
     .bind("mouseenter", function() {
         $(".item18").addClass("sphover");  
         })  
     .bind("mouseleave", function() {
       $(".sphover").removeClass("sphover");  
       })
   $(".item19 th, .item19 td")
     .bind("mouseenter", function() {
         $(".item19").addClass("sphover");  
         })  
     .bind("mouseleave", function() {
       $(".sphover").removeClass("sphover");  
       })
   $(".item20 th, .item20 td")
     .bind("mouseenter", function() {
         $(".item20").addClass("sphover");  
         })  
     .bind("mouseleave", function() {
       $(".sphover").removeClass("sphover");  
       })

   $(".error-close").bind("click", function() {
       $(this).parents(".error-popup").hide();
       })

   $(".result-opacity").each(function() {$(this).css({"height": $(".h-white-wrap").height()})});  
    
});
