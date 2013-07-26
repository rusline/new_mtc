/*
 * UPDATED: 25.09.08
 *
 * jqTransform
 * by mathieu vilaplana mvilaplana@dfc-e.com
 * Designer ghyslain armand garmand@dfc-e.com
 *
 *
 * Version 1.0
 *
 ******************************************** */
 
(function($){
	var defaultOptions = {preloadImg:false};
	var jqTransformImgPreloaded = false;

	var jqTransformPreloadHoverFocusImg = function(strImgUrl) {
		//guillemets to remove for ie
		strImgUrl = strImgUrl.replace(/^url\((.*)\)/,'$1').replace(/^\"(.*)\"$/,'$1');
		var imgHover = new Image();
		imgHover.src = strImgUrl.replace(/\.([a-zA-Z]*)$/,'-hover.$1');
		var imgFocus = new Image();
		imgFocus.src = strImgUrl.replace(/\.([a-zA-Z]*)$/,'-focus.$1');				
	};

	
	/***************************
	  Labels
	***************************/
	var jqTransformGetLabel = function(objfield) {
		//20.01.2012 - Fixed by Aleksey Kislitsyn. Previous code of this function was CRAZY and STUPID!!!
		var oLabel = $('label[for=' + objfield.attr('id') + ']').css('cursor','pointer');
		if (oLabel.length > 0)
			return $(oLabel.get(0));
		return false;
	};
	
	/* Hide all open selects */
	var jqTransformHideSelect = function(oTarget){
		var ulVisible = $('.jqTransformSelectWrapper ul:visible');
		ulVisible.each(function(){
			var $select = $(this).parents(".jqTransformSelectWrapper:first").find("select").get(0);
			//do not hide if clicke on the label object associated to the select
			if( !(oTarget && $select.oLabel && $select.oLabel.get(0) == oTarget.get(0)) ){$(this).hide();}
		});
	};
	/* Check for an external click */
	var jqTransformCheckExternalClick = function(event) {
		if ($(event.target).parents('.jqTransformSelectWrapper').length === 0) { jqTransformHideSelect($(event.target)); }
	};

	/* Apply document listener */
	var jqTransformAddDocumentListener = function (){
		$(document).mousedown(jqTransformCheckExternalClick);
	};	
			
	/* Add a new handler for the reset action */
	var jqTransformReset = function(f){
		var sel;
		$('.jqTransformSelectWrapper select', f).each(function(){sel = (this.selectedIndex<0) ? 0 : this.selectedIndex; $('ul', $(this).parent()).each(function(){$('a:eq('+ sel +')', this).click();});});
		$('a.jqTransformCheckbox, a.jqTransformRadio', f).removeClass('jqTransformChecked');
		$('input:checkbox, input:radio', f).each(function(){if(this.checked){$('a', $(this).parent()).addClass('jqTransformChecked');}});
	};

	/***************************
	  Buttons
	 ***************************/
	$.fn.jqTransInputButton = function(){
		return this.each(function(){
			if($(this).hasClass('jqtransformdone'))
				return;
			
			//Page validators bug fix - restoring original onclick handler (fixed by Aleksey Kislitsyn, 11.10.2011)
            var onClickHandler = this.onclick;
            var onClickHandlerString = onClickHandler ? ' onclick="'
                + $.trim(this.onclick.toString().replace(/\n/g, "").replace(/^.*?\{(.*?)\}.*$/, '$1')).replace(/"/g, '&quot;') + '"' : "";
            //end of fix
            $(this).replaceWith('<button id="' + this.id + '" name="' + this.name + '" type="' + this.type
                + '" class="' + this.className + ' jqTransformButton"' + onClickHandlerString + '><span><span>' + $(this).attr('value') + '</span></span>');
		});
	};
	
	/***************************
	  Text Fields 
	 ***************************/
	$.fn.jqTransInputText = function(){
		return this.each(function(){
			var safari = $.browser.safari; /* We need to check for safari to fix the input:text problem */
			var $input = $(this);
	
			if($input.hasClass('jqtranformdone') || !$input.is('input')) {return;}
			$input.addClass('jqtranformdone');
	
			var oLabel = jqTransformGetLabel($(this));
			oLabel && oLabel.bind('click',function(){$input.focus();});
	
			var inputSize=$input.width();
			if($input.attr('size')){
				//inputSize = $input.attr('size')*10;
				$input.css('width',inputSize);
			}
			
			$input.addClass("jqTransformInput").wrap('<div class="jqTransformInputWrapper"><div class="jqTransformInputInner"><div></div></div></div>');
			var $wrapper = $input.parent().parent().parent();
			$wrapper.css("width", inputSize+10);
			$input
				//.focus(function(){$wrapper.addClass("jqTransformInputWrapper_focus");})
				//.blur(function(){$wrapper.removeClass("jqTransformInputWrapper_focus");})
				//.hover(function(){$wrapper.addClass("jqTransformInputWrapper_hover");},function(){$wrapper.removeClass("jqTransformInputWrapper_hover");})
			;
	
			/* If this is safari we need to add an extra class */
			//safari && $wrapper.addClass('jqTransformSafari');
			//safari && $input.css('width',$wrapper.width()+16);
			this.wrapper = $wrapper;
			
		});
	};
	
	/***************************
	  Check Boxes 
	 ***************************/	
	$.fn.jqTransCheckBox = function() {
		return this.each(function() {
			if ($(this).hasClass('jqTransformHidden'))
				return;
			
			var $input = $(this);
			var inputSelf = this;
			
			var aLink = $('<a href="javascript:void(0);" class="jqTransformCheckbox"></a>');
			
			//20.01.2012 - Fixed by Aleksey Kislitsyn
			//In good browsers [for] attribute fires click/change event automatically!!! There is no need to fire it manually!
			if ($.browser.msie && parseInt($.browser.version) < 9)
			{
				var oLabel = jqTransformGetLabel($input);
				oLabel && oLabel.click(function() {
					aLink.trigger('click');
				});
			}

			//wrap and add the link
			$input.addClass('jqTransformHidden').wrap('<span class="jqTransformCheckboxWrapper"></span>').parent().prepend(aLink);
			
			//onchange event fire flag (fixed by Aleksey Kislitsyn)
			var changeEventFired = false;
			
			//on change, change the class of the link
			$input.change(function() {
				this.checked && aLink.addClass('jqTransformChecked') || aLink.removeClass('jqTransformChecked');
				changeEventFired = true;
			});
			
			// Click Handler, trigger the click and change event on the input
			aLink.click(function() {
				//do nothing if the original input is disabled
				if ($input.attr('disabled'))
					return false;
				
				//reset the flag before trigger events
				changeEventFired = false;
				//save current state
				var chxPreviousState = inputSelf.checked;
				//save current 'has jqTransformChecked class'-state
				var chxHadCheckedClass = aLink.hasClass('jqTransformChecked');
				//initiate original control click
				$input.trigger('click');
				
				if (inputSelf.checked == chxPreviousState)
				{
					if (changeEventFired)
					{
						//alert('This is a bug!!!'); this bug really causes in IE!!! ha-ha-ha=)))
						changeEventFired = false;
					}
					
					inputSelf.checked = !inputSelf.checked;
				}
				
				//If change event fired but aLink's style is still the same, it's a hard bug too!!! (of course, in IE). Fire change event one more time!
				if (!changeEventFired || (chxHadCheckedClass == aLink.hasClass('jqTransformChecked')))
					$input.trigger('change');
			});
			
			// set the default state
			this.checked && aLink.addClass('jqTransformChecked');
		});
	};
	/***************************
	  Radio Buttons 
	 ***************************/	
	$.fn.jqTransRadio = function(){
		return this.each(function(){
			if ($(this).hasClass('jqTransformHidden'))
				return;
			
			var $input = $(this);
			var inputSelf = this;
			
			//Validator bug fix!!! (fixed by Aleksey Kislitsyn, 11.10.2011)
            $input.click(function() {
                this.checked = true;
            });
			
            var aLink = $('<a href="javascript:void(0);" class="jqTransformRadio" rel="' + this.name + '"></a>');
			
			var oLabel = jqTransformGetLabel($input);
			oLabel && oLabel.click(function() {
				aLink.trigger('click');
			});

            $input.addClass('jqTransformHidden').wrap('<span class="jqTransformRadioWrapper"></span>').parent().prepend(aLink);
			
            //We are following checkbox'es sample
            var changeEventFired = false;
			
            $input.change(function() {
                inputSelf.checked && aLink.addClass('jqTransformChecked') || aLink.removeClass('jqTransformChecked');
                changeEventFired = true;
            });
			
            // Click Handler
            aLink.click(function() {
                if ($input.attr('disabled'))
                    return;
				
                //reset the flag before trigger events
                changeEventFired = false;
                //save current state
                var rbPreviousState = inputSelf.checked;
				
                if (rbPreviousState) {
                    //RadioButton was already checked, there is no need to fire its change event
                    $input.trigger('click');
                    return;
                }
				
                //If we are here, radiobutton is not checked
                $input.trigger('click');
				
                if (inputSelf.checked == rbPreviousState) {
                    //control kept his unchecked state still
                    if (changeEventFired) {
                        //alert('This is a bug!!!'); //I dont't know if this bug causes in any browser, but it must be handled
                        changeEventFired = false;
                    }
					
                    inputSelf.checked = true;
                }
				
                if (!changeEventFired)
                    $input.trigger('change');
                
                // uncheck all others of same name input radio elements
                $('input[name="' + $input.attr('name') + '"]', inputSelf.form).not($input).each(function() {
                    $(this).attr('type') == 'radio' && $(this).trigger('change');
                });
            });
			
			// set the default state
			inputSelf.checked && aLink.addClass('jqTransformChecked');
		});
	};
	
	/***************************
	  TextArea 
	 ***************************/	
	$.fn.jqTransTextarea = function(){
		return this.each(function(){
			var textarea = $(this);
	
			if (textarea.hasClass('jqtransformdone'))
				return;

			textarea.addClass('jqtransformdone');
	
			var oLabel = jqTransformGetLabel(textarea);
			oLabel && oLabel.click(function(){textarea.focus();});
			
			var strTable = '<table cellspacing="0" cellpadding="0" border="0" class="jqTransformTextarea">';
			strTable +='<tr><td id="jqTransformTextarea-tl">&nbsp;</td><td id="jqTransformTextarea-tm">&nbsp;</td><td id="jqTransformTextarea-tr">&nbsp;</td></tr>';
			strTable +='<tr><td id="jqTransformTextarea-ml">&nbsp;</td><td id="jqTransformTextarea-mm"><div></div></td><td id="jqTransformTextarea-mr">&nbsp;</td></tr>';	
			strTable +='<tr><td id="jqTransformTextarea-bl">&nbsp;</td><td id="jqTransformTextarea-bm">&nbsp;</td><td id="jqTransformTextarea-br">&nbsp;</td></tr>';
			strTable +='</table>';					
			var oTable = $(strTable)
					.insertAfter(textarea)
					.hover(function(){
						!oTable.hasClass('jqTransformTextarea-focus') && oTable.addClass('jqTransformTextarea-hover');
					},function(){
						oTable.removeClass('jqTransformTextarea-hover');					
					})
				;
				
			textarea
				.focus(function(){oTable.removeClass('jqTransformTextarea-hover').addClass('jqTransformTextarea-focus');})
				.blur(function(){oTable.removeClass('jqTransformTextarea-focus');})
				.appendTo($('#jqTransformTextarea-mm div',oTable))
			;
			this.oTable = oTable;
			if($.browser.safari){
				$('#jqTransformTextarea-mm',oTable)
					.addClass('jqTransformSafariTextarea')
					.find('div')
						.css('height',textarea.height())
						.css('width',textarea.width())
				;
			}
		});
	};
	
	/***************************
	  Select 
	 ***************************/	
	$.fn.jqTransSelect = function(){
		return this.each(function(index){
			var $select = $(this);
			if($select.hasClass('jqTransformHidden')) {return;}
	
			var oLabel  =  jqTransformGetLabel($select);
			/* First thing we do is Wrap it */
			$select
				.addClass('jqTransformHidden')
				.wrap('<div class="jqTransformSelectWrapper"></div>')
			;
			var $wrapper = $select.parent().css({zIndex: 90 - index});
			
			/* Now add the html for the select */
			$wrapper.prepend('<div><span></span><a href="javascript:void(0);" class="jqTransformSelectOpen"></a></div><ul></ul>');
			var $ul = $('ul', $wrapper).css('width',$select.width());
			/* Now we add the options */
			$('option', this).each(function(i){
				var oLi = $('<li><a href="javascript:void(0);" index="'+ i +'">'+ $(this).html() +'</a></li>');
				$ul.append(oLi);
			});
			/* Hide the ul and add click handler to the a */
			$ul.hide().find('a').click(function(){
					$('a.selected', $wrapper).removeClass('selected');
					$(this).addClass('selected');	
					/* Fire the onchange event */
					if ($select[0].selectedIndex != $(this).attr('index') && $select[0].onchange)
					{
						$select[0].selectedIndex = $(this).attr('index');
						//$select[0].onchange();             //Fix for Firefox bug
						$($select[0]).trigger('change');
					}
					$select[0].selectedIndex = $(this).attr('index');
					$('span:eq(0)', $wrapper).html($(this).html());
					$ul.hide();
					return false;
			});
			/* Set the default */
			$('a:eq('+ this.selectedIndex +')', $ul).click();
			$('span:first', $wrapper).click(function(){$("a.jqTransformSelectOpen",$wrapper).trigger('click');});
			oLabel && oLabel.click(function(){$("a.jqTransformSelectOpen",$wrapper).trigger('click');});
			this.oLabel = oLabel;
			
			/* Apply the click handler to the Open */
			var oLinkOpen = $('a.jqTransformSelectOpen', $wrapper)
				.click(function(){
					//Check if box is already open to still allow toggle, but close all other selects
					if( $ul.css('display')=='none' ) {jqTransformHideSelect();}
					if($select.attr('disabled')){return false;}
					
					$ul.slideToggle('normal', function(){					
						var offSet = ($('a.selected', $ul).offset().top - $ul.offset().top);
						$ul.animate({scrollTop: offSet});
					});
					return false;
				})
			;
			//set the new width
			var iSelectWidth = $select.width();
			var oSpan = $('span:first',$wrapper);
			var newWidth = (iSelectWidth > oSpan.innerWidth())?iSelectWidth+oLinkOpen.outerWidth():$wrapper.width();
			$wrapper.css('width',newWidth);
			$ul.css('width',newWidth-2);
			oSpan.css('width',iSelectWidth);
			
		});
	};
	$.fn.jqTransform = function(options){
		var self = this;
		var safari = $.browser.safari; /* We need to check for safari to fix the input:text problem */
		var opt = $.extend({},defaultOptions,options);
		
		/* each form */
		 return this.each(function(){
                        if (this.tagName.toLowerCase() == "object") {return;} 
			var selfForm = $(this);
			if(selfForm.hasClass('jqtransformdone')) {return;}
			selfForm.addClass('jqtransformdone');
try
{
			$('input:submit, input:reset, input[type="button"]', this).jqTransInputButton();			
}
catch(eex)
{
}
			$('input:text, input:password', this).jqTransInputText();			
			$('input:checkbox', this).jqTransCheckBox();
			$('input:radio', this).jqTransRadio();
			$('textarea', this).jqTransTextarea();
			
			if( $('select', this).jqTransSelect().length > 0 ){jqTransformAddDocumentListener();}
			selfForm.bind('reset',function(){var action = function(){jqTransformReset(this);}; window.setTimeout(action, 10);});
			
			//preloading
			if(opt.preloadImg && !jqTransformImgPreloaded){
				jqTransformImgPreloaded = true;
				var oInputText = $('input:text:first', selfForm);
				if(oInputText.length > 0){
					//pour ie on eleve les ""
					var strWrapperImgUrl = oInputText.get(0).wrapper.css('background-image');
					jqTransformPreloadHoverFocusImg(strWrapperImgUrl);					
					var strInnerImgUrl = $('div.jqTransformInputInner',$(oInputText.get(0).wrapper)).css('background-image');
					jqTransformPreloadHoverFocusImg(strInnerImgUrl);
				}
				
				var oTextarea = $('textarea',selfForm);
				if(oTextarea.length > 0){
					var oTable = oTextarea.get(0).oTable;
					$('td',oTable).each(function(){
						var strImgBack = $(this).css('background-image');
						jqTransformPreloadHoverFocusImg(strImgBack);
					});
				}
			}
			
			
		}); /* End Form each */
				
	};/* End the Plugin */

})(jQuery);
				   
